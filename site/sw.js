// Network-first cache so the site opens offline after the first visit.
const CACHE = "ifrs-v2";
const FILES = ["./", "index.html", "assets/style.css", "assets/content.js", "assets/app.js",
  "manifest.webmanifest", "learn/", "learn/index.html", "learn/play.css", "learn/play.js", "learn/data.js", "learn/manifest.webmanifest", "assets/icons/icon-180.png", "assets/icons/icon-192.png", "assets/icons/icon-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(fetch(e.request).then(r => {
    const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r;
  }).catch(() => caches.match(e.request)));
});
