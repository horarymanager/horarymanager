const CACHE_NAME = 'horarymanager-cache-v1';
const urlsToCache = [
  '/horarymanager/index.html',
  '/horarymanager/',
  '/horarymanager/scripts/alerts.js',
  '/horarymanager/scripts/bootstrap.js',
  '/horarymanager/scripts/crypto.js',
  '/horarymanager/scripts/database.js',
  '/horarymanager/scripts/main.js',
  '/horarymanager/scripts/timems.js',
  '/horarymanager/logo.png'
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

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        // Si el archivo está en caché, lo devuelve
        return response;
      }
      // Si no está en caché, lo solicita a la red
      return fetch(event.request).catch(() => {
        // En caso de que no haya conexión, puedes devolver una página alternativa
        return caches.match('/horarymanager/index.html'); // Opcional, en caso de fallar la red
      });
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
