// ============================================================
// Auditoría de traducciones: lista los textos en español del sitio
// que todavía NO tienen traducción al inglés.
//
// Uso (después de `npm run build`):
//   node scripts/i18n-missing.mjs                 -> todo el sitio
//   node scripts/i18n-missing.mjs capacidades     -> solo rutas que contengan "capacidades"
//   node scripts/i18n-missing.mjs capacidades --json > faltan.json
//
// Replica las reglas del motor (src/i18n/client.js): recorre los nodos de
// texto y los atributos alt/title/placeholder/aria-label + <title> + meta
// description, ignorando lo que ya gestionan las claves (data-i18n) y lo
// marcado con data-no-i18n. Un texto cuenta como resuelto si está en el
// libro de frases (src/i18n/phrases) o en la lista `keep` (nombres propios,
// siglas, etc. que no se traducen).
//
// Nota: usa `parse5`, que llega como dependencia de Astro.
// ============================================================
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { parse } from "parse5";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");
const args = process.argv.slice(2);
const asJson = args.includes("--json");
const filter = args.find((a) => !a.startsWith("--"));

if (!fs.existsSync(dist)) {
  console.error("No existe dist/. Ejecuta `npm run build` primero.");
  process.exit(1);
}

const { phrases, keep } = await import(pathToFileURL(path.join(root, "src/i18n/phrases/index.js")).href);
const known = new Set([...Object.keys(phrases.en), ...keep]);

const collapse = (s) => s.replace(/\s+/g, " ").trim();
const hasLetters = (s) => /\p{L}/u.test(s);
const SKIP = new Set(["script", "style", "noscript", "template", "textarea"]);
const ATTRS = ["alt", "title", "placeholder", "aria-label"];

function htmlFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return e.name === "_astro" ? [] : htmlFiles(p);
    return e.name.endsWith(".html") ? [p] : [];
  });
}

const missing = new Map(); // texto -> Set(páginas)
const add = (text, page) => {
  const t = collapse(text);
  if (!t || !hasLetters(t) || known.has(t)) return;
  if (!missing.has(t)) missing.set(t, new Set());
  missing.get(t).add(page);
};

function walk(node, page, managed) {
  const attr = (n) => (node.attrs || []).find((a) => a.name === n);
  if (node.nodeName === "#text") {
    if (!managed && node.value.trim()) add(node.value, page);
    return;
  }
  if (!node.childNodes) return;
  const tag = node.tagName;
  if (SKIP.has(tag)) return;
  const isManaged = managed || !!attr("data-i18n") || !!attr("data-no-i18n");

  if (tag === "meta" && attr("name")?.value === "description" && !attr("data-i18n-content")) {
    add(attr("content")?.value ?? "", page);
  }
  if (tag === "title" && attr("data-i18n")) return; // título gestionado por clave
  if (!isManaged) {
    for (const a of ATTRS) {
      if (attr(a) && !attr(`data-i18n-${a}`)) add(attr(a).value, page);
    }
  }
  for (const child of node.childNodes) walk(child, page, isManaged);
}

const files = htmlFiles(dist)
  .map((f) => ({ file: f, route: "/" + path.relative(dist, f).split(path.sep).join("/").replace(/index\.html$/, "") }))
  .filter((f) => !filter || f.route.includes(filter));

for (const { file, route } of files) walk(parse(fs.readFileSync(file, "utf8")), route, false);

const out = [...missing.entries()].map(([text, pages]) => ({ text, pages: [...pages] }));
if (asJson) {
  console.log(JSON.stringify(out, null, 2));
} else {
  console.log(`Páginas revisadas: ${files.length}`);
  console.log(`Textos sin traducir: ${out.length}\n`);
  out.forEach(({ text, pages }, i) =>
    console.log(`${String(i + 1).padStart(4)}. ${text}\n      ↳ ${pages.slice(0, 3).join(", ")}${pages.length > 3 ? ` (+${pages.length - 3})` : ""}`),
  );
}
