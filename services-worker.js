const CACHE_NAME = 'v1';
const CACHE_ASSETS = [
  './',
  './index.html',
  './scripts/alerts.js',
  './scripts/bootstrap.js',
  './scripts/crypto.js',
  './scripts/database.js',
  './scripts/main.js',
  './scripts/timems.js',
  './styles/bootstrap.css',
  './styles/style.css',
];

// Instalar el Service Worker
self.addEventListener('install', (e) => {
  console.log('Service Worker: Instalado');

  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caché añadida');
        return cache.addAll(CACHE_ASSETS);
      })
      .catch(err => console.log('Service Worker Error: ', err))
  );
});

// Activar el Service Worker
self.addEventListener('activate', (e) => {
  console.log('Service Worker: Activado');
  // Remover caches antiguas
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Caché antigua eliminada');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Interceptar las peticiones de red
self.addEventListener('fetch', (e) => {
  console.log('Service Worker: Fetching', e.request.url);
  e.respondWith(
    fetch(e.request)
      .catch(() => caches.match(e.request)) // Si falla la conexión, busca en el caché
  );
});
