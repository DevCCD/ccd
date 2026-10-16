// ============================================================
// Service Worker del sitio CCD
// ------------------------------------------------------------
// - Páginas (HTML):      red primero; si no hay conexión, la copia guardada
//                        de esa página, y si nunca se visitó, /offline.html.
// - /_astro/* (con hash): caché primero (cada archivo es inmutable).
// - Resto del mismo origen (imágenes, manifest, iconos): devuelve la copia
//                        guardada y la actualiza en segundo plano.
// - Nunca guarda respuestas con error (404, 500...).
//
// Para forzar que todos los usuarios renueven su caché: subir VERSION.
// ============================================================
const VERSION = 'v2';
const STATIC_CACHE = `ccd-static-${VERSION}`;
const PAGES_CACHE = `ccd-pages-${VERSION}`;
const OFFLINE_URL = '/offline.html';
const MAX_PAGES = 50;

const PRECACHE_ASSETS = [
  OFFLINE_URL,
  '/favicon.svg',
  '/logoccd.svg',
  '/logo-ccd-white.svg',
  '/icons/web-app-manifest-192x192.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(PRECACHE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== STATIC_CACHE && key !== PAGES_CACHE)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

// Mantiene como máximo MAX_PAGES páginas guardadas (borra las más antiguas)
async function trimPages() {
  const cache = await caches.open(PAGES_CACHE);
  const keys = await cache.keys();
  if (keys.length > MAX_PAGES) {
    await Promise.all(keys.slice(0, keys.length - MAX_PAGES).map((k) => cache.delete(k)));
  }
}

async function handleNavigation(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const copy = response.clone();
      const cache = await caches.open(PAGES_CACHE);
      await cache.put(request, copy);
      await trimPages();
    }
    return response;
  } catch (_) {
    const cached = await caches.match(request, { ignoreSearch: true });
    return cached || caches.match(OFFLINE_URL);
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) {
    const copy = response.clone();
    const cache = await caches.open(STATIC_CACHE);
    await cache.put(request, copy);
  }
  return response;
}

async function staleWhileRevalidate(request, event) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(request);
  const update = fetch(request)
    .then((response) => {
      if (response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => cached);
  if (cached) {
    event.waitUntil(update);
    return cached;
  }
  return update;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Solo GET del mismo origen; los vídeos (Range) y el propio sw.js van directo a la red
  if (
    request.method !== 'GET' ||
    url.origin !== location.origin ||
    request.headers.has('range') ||
    url.pathname === '/sw.js'
  ) {
    return;
  }

  if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(handleNavigation(request));
    return;
  }

  if (url.pathname.startsWith('/_astro/')) {
    event.respondWith(cacheFirst(request));
    return;
  }

  event.respondWith(staleWhileRevalidate(request, event));
});
