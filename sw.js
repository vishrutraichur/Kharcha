// Kharcha service worker: lets the app open offline.
// Your data itself is cached by Firebase; this only caches the app's own files.
const CACHE = "kharcha-v2";
const SHELL = ["./", "index.html", "manifest.json", "fb.js", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET") return;
  // App page: network first so updates arrive, cache as fallback
  if (url.origin === location.origin && (e.request.mode === "navigate" || url.pathname.endsWith("index.html"))) {
    e.respondWith(fetch(e.request).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put("index.html", copy)); return r; })
      .catch(() => caches.match("index.html")));
    return;
  }
  // App files and the Firebase library: cache first
  if (url.origin === location.origin || url.hostname === "www.gstatic.com") {
    e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(r => {
      const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r;
    })));
  }
});
