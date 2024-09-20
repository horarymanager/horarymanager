const CACHE_NAME = 'horarymanager-cache-v1';
const urlsToCache = [
  '/horarymanager/index.html',
  '/horarymanager/',
  '/horaymanager/scripts/alerts.js',
  '/horaymanager/scripts/bootstrap.js',
  '/horaymanager/scripts/crypto.js',
  '/horaymanager/scripts/database.js',
  '/horaymanager/scripts/main.js',
  '/horaymanager/scripts/timems.js',
  '/horaymanager/logo.png'
];

// Durante la fase de instalación del Service Worker, cachea los archivos importantes
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Archivos cacheados correctamente');
      return cache.addAll(urlsToCache);
    })
  );
});

// Intercepta las solicitudes de la red y responde con el caché si está disponible
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Actualiza el caché si hay cambios en los archivos
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Eliminando caché antiguo:', cacheName);
            return caches.delete(cacheName); // Elimina cachés antiguos
          }
        })
      );
    })
  );
});
