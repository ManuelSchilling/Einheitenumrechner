var CACHE_NAME = 'cache_v1';
var urlsToCache = ['/'];

 self.addEventListener('install', e => {
 e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
        return cache.addAll(urlsToCache)
            .then(() => self.skipWaiting());
    })
  )
});

self.addEventListener('activate', event => {
 event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
        return response || fetch(event.request);
    })
  );
});
