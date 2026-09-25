// ============================================================
// Motor de traducción en el cliente
// ------------------------------------------------------------
// Dos mecanismos que conviven:
//
// 1. CLAVES (translations.js): elementos marcados con data-i18n,
//    data-i18n-alt, data-i18n-placeholder, etc. Para textos de la
//    interfaz (navbar, home, formulario, footer...).
//
// 2. LIBRO DE FRASES (phrases/*.js): sin marcar nada en el HTML.
//    El motor recorre los nodos de texto de la página y busca cada
//    texto en español (con espacios colapsados) en el diccionario
//    { "texto en español": "English text" }. Sirve para el contenido
//    que viene de src/data/* y para páginas largas. Se carga bajo
//    demanda: quien navega en español nunca descarga el diccionario.
//
// Para excluir una zona de la traducción automática: data-no-i18n.
// Expone window.CCDi18n = { getLang, setLang, applyLang }.
// ============================================================

import { translations, defaultLang, STORAGE_KEY } from "./translations.js";

const ATTR_MAP = {
  "data-i18n-placeholder": "placeholder",
  "data-i18n-aria-label": "aria-label",
  "data-i18n-alt": "alt",
  "data-i18n-title": "title",
  "data-i18n-src": "src", // imágenes con texto incrustado (una versión por idioma)
  "data-i18n-content": "content", // <meta name="description">
};

// Atributos que el libro de frases también traduce
const PHRASE_ATTRS = ["alt", "title", "placeholder", "aria-label"];
const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEMPLATE", "TEXTAREA"]);

const collapse = (s) => s.replace(/\s+/g, " ").trim();

export function getLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && translations[saved]) return saved;
  } catch (_) {
    /* localStorage no disponible */
  }
  return defaultLang;
}

// ---------- 1. Traducción por claves ----------
function applyKeyed(lang) {
  const dict = translations[lang] || translations[defaultLang];

  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] != null) el.textContent = dict[key];
  });

  // Atributos traducibles. Si el valor contiene {name}, se sustituye por el
  // atributo data-name del elemento (p. ej. "Foto de {name}").
  Object.entries(ATTR_MAP).forEach(([dataAttr, attr]) => {
    document.querySelectorAll(`[${dataAttr}]`).forEach((el) => {
      const key = el.getAttribute(dataAttr);
      if (dict[key] == null) return;
      const value = dict[key].replace("{name}", el.getAttribute("data-name") || "");
      el.setAttribute(attr, value);
    });
  });

  // Estado visual del selector de idioma
  document.querySelectorAll("[data-lang-current]").forEach((el) => {
    el.textContent = lang.toUpperCase();
  });
  document.querySelectorAll("[data-lang-option]").forEach((el) => {
    const isActive = el.getAttribute("data-lang-option") === lang;
    el.classList.toggle("font-bold", isActive);
    el.classList.toggle("text-primary", isActive);
    el.setAttribute("aria-current", isActive ? "true" : "false");
  });
}

// ---------- 2. Traducción por libro de frases ----------
let phrasesPromise;
const loadPhrases = () =>
  (phrasesPromise ??= import("./phrases/index.js").then((m) => m.phrases));

// Registro de lo modificado para poder restaurar el español original
let touchedText = []; // [textNode, textoOriginal]
let touchedAttrs = []; // [elemento, atributo, valorOriginal]
let touchedSelects = []; // [select, opcionesEnOrdenOriginal]
let activeDict = null; // diccionario de frases del idioma activo (null en español)

function restorePhrases() {
  touchedText.forEach(([node, original]) => (node.nodeValue = original));
  touchedAttrs.forEach(([el, attr, original]) => el.setAttribute(attr, original));
  touchedSelects.forEach(([select, options]) => options.forEach((o) => select.appendChild(o)));
  touchedText = [];
  touchedAttrs = [];
  touchedSelects = [];
  activeDict = null;
}

function translateValue(dict, value) {
  const lead = value.match(/^\s*/)[0];
  const trail = value.match(/\s*$/)[0];
  const hit = dict[collapse(value)];
  return hit == null ? null : lead + hit + trail;
}

async function applyPhrases(lang) {
  restorePhrases();
  if (lang === defaultLang) return;

  const dict = (await loadPhrases())[lang];
  if (!dict) return;
  activeDict = dict;
  // Si el usuario cambió de idioma mientras cargaba el diccionario, no aplicar
  if (getLang() !== lang) return;

  // Nodos de texto (fuera de zonas ya gestionadas por claves o excluidas)
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const p = node.parentElement;
      if (!p || SKIP_TAGS.has(p.tagName)) return NodeFilter.FILTER_REJECT;
      if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      if (p.closest("[data-i18n],[data-no-i18n]")) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    const next = translateValue(dict, node.nodeValue);
    if (next != null) {
      touchedText.push([node, node.nodeValue]);
      node.nodeValue = next;
    }
  });

  // Listas desplegables marcadas con data-i18n-sort: reordenar A-Z en el idioma activo
  // (la primera opción, el marcador "Selecciona...", se queda arriba)
  document.querySelectorAll("select[data-i18n-sort]").forEach((select) => {
    const options = [...select.options];
    const [first, ...rest] = options;
    const selected = select.value;
    rest.sort((a, b) => a.text.localeCompare(b.text, lang));
    [first, ...rest].forEach((o) => select.appendChild(o));
    select.value = selected;
    touchedSelects.push([select, options]);
  });

  // <title> (si no lo gestiona una clave)
  const titleEl = document.querySelector("title:not([data-i18n])");
  if (titleEl && titleEl.firstChild) {
    const next = translateValue(dict, titleEl.firstChild.nodeValue);
    if (next != null) {
      touchedText.push([titleEl.firstChild, titleEl.firstChild.nodeValue]);
      titleEl.firstChild.nodeValue = next;
    }
  }

  // Atributos: alt, title, placeholder, aria-label y meta description
  PHRASE_ATTRS.forEach((attr) => {
    document.querySelectorAll(`body [${attr}]`).forEach((el) => {
      if (el.hasAttribute(`data-i18n-${attr}`) || el.closest("[data-no-i18n]")) return;
      const original = el.getAttribute(attr);
      const next = translateValue(dict, original);
      if (next != null) {
        touchedAttrs.push([el, attr, original]);
        el.setAttribute(attr, next);
      }
    });
  });
  const meta = document.querySelector('meta[name="description"]:not([data-i18n-content])');
  if (meta) {
    const original = meta.getAttribute("content") || "";
    const next = translateValue(dict, original);
    if (next != null) {
      touchedAttrs.push([meta, "content", original]);
      meta.setAttribute("content", next);
    }
  }
}

// ---------- API pública ----------
export async function applyLang(lang) {
  applyKeyed(lang);
  await applyPhrases(lang);
  document.dispatchEvent(new CustomEvent("ccd:langchange", { detail: { lang } }));
}

// Traduce un texto en español suelto (para contenido creado por scripts)
export function tr(text) {
  return (activeDict && activeDict[collapse(text)]) || text;
}

export function setLang(lang) {
  if (!translations[lang]) return;
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch (_) {
    /* ignore */
  }
  return applyLang(lang);
}

function init() {
  applyLang(getLang());

  document.querySelectorAll("[data-lang-option]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      setLang(el.getAttribute("data-lang-option"));
      // Cierra el desplegable móvil del selector si estuviese abierto
      const panel = document.getElementById("lang-menu-mobile");
      if (panel) panel.classList.add("hidden");
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

window.CCDi18n = { getLang, setLang, applyLang, tr };
