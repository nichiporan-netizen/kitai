const CACHE_NAME = 'kitai-cache-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Пропускаем запросы к Firebase (они должны идти в сеть, а не в кэш)
  if (event.request.url.includes('firebase') || event.request.url.includes('google')) {
    return;
  }
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
