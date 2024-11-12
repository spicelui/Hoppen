const CACHE_NAME = "pwa-cache-v1";
const urlsToCache = [
  "/",
  "/create.html",
  "/home.html",
  "/style.css",
  "/showin.js",
  "/fine.png",
  "/happy.png",
  "/hopeless.png",
  "/lazy.png",
  "/lovely.png",
  "/angry.png",
  "/careless.png",
  "/code.js",
  "/jstest.js",
  "/SF-Pro.ttf",
  "/homestyle",
  "/worried.png",
  "/sleepy.png",
];

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Puedes definir reglas para rutas específicas, por ejemplo:
  if (url.pathname.startsWith('/pagina-dinamica')) {
      event.respondWith(
          caches.match(event.request)
              .then((response) => {
                  return response || fetch(event.request)
                      .then((networkResponse) => {
                          return caches.open(CACHE_NAME)
                              .then((cache) => {
                                  cache.put(event.request, networkResponse.clone());
                                  return networkResponse;
                              });
                      });
              })
      );
  } else {

    self.addEventListener('fetch', (event) => {
      event.respondWith(
          caches.match(event.request)
              .then((response) => {
                  return response || fetch(event.request);
              })
              .catch(() => {
                  return caches.match('/offline.html'); // Si no se encuentra en caché, muestra una página offline
              })
      );
  });
  
      // Manejo estándar de caché para otras rutas
      event.respondWith(
          caches.match(event.request)
              .then((response) => {
                  return response || fetch(event.request);
              })
      );
  }
});
