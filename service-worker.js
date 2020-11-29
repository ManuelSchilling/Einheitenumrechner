let CacheName = 'v9';
this.addEventListener('install', function(event) {
    console.log('installing....');
    event.waitUntil(
        caches.open(CacheName).then(function(cache) {
            return cache.addAll([
				'beleg.json',
				'beleg.html',
				'beleg.js',
				'beleg.css',
				'panda.png',
		    		'calculator_mask.png'
            ]);
        })
    );
});

this.addEventListener('fetch', function(event) {
  console.log("fetch...");
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request).then(
          function(response) {
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            var responseToCache = response.clone();
            caches.open(CacheName)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });
            return response;
          }
        );
      })
    );
});

this.addEventListener('activate', function activator(event) {
    console.log('activate!');
    event.waitUntil(
        caches.keys().then(function(keys) {
            return Promise.all(keys
                .filter(function(key) {
                    return key.indexOf(CacheName) !== 0;
                })
                .map(function(key) {
                    return caches.delete(key);
                })
            );
        })
    );
});
self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
