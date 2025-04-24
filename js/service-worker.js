self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("sentinel-cache").then(cache => {
      return cache.addAll([
        "dashboard.html",
        "login.html",
        "scanner.html",
        "test.html",
        "js/dashboard.js",
        "js/scanner.js",
        "js/tests.js",
        "css/style.css"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('sentinelcore-cache-v1').then(cache => {
      return cache.addAll([
        'terminal.html',
        'js/terminalHandler.js',
        'css/terminal.css',
        'manifest.json',
        'icons/icon-192.png',
        'icons/icon-512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
