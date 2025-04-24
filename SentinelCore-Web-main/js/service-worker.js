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
