self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('app-cache').then((cache) => {
      return cache.addAll([
        '/horarymanager/index.html',
        '/horarymanager/',
        '/horaymanager/scripts/alerts.js',
        '/horaymanager/scripts/bootstrap.js',
        '/horaymanager/scripts/crypto.js',
        '/horaymanager/scripts/database.js',
        '/horaymanager/scripts/main.js',
        '/horaymanager/scripts/timems.js',
        '/horaymanager/logo.png'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
