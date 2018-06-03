
// this checks to see if the service worker supported by the browser

//this is a given cache name that can be update by cache version
var staticCacheName = 'restaurant-cache-v1';
// this are files names which make up the website
var restaurantFileToCache = [
'/',
'./index.html',
'./restaurant.html',
'./css/styles.css',
'./js/dbhelper.js',
'./js/main.js',
'./js/restaurant_info.js',
'./data/restaurants.json',
'./img/1.jpg',
'./img/2.jpg',
'./img/3.jpg',
'./img/4.jpg',
'./img/5.jpg',
'./img/6.jpg',
'./img/7.jpg',
'./img/8.jpg',
'./img/9.jpg',
'./img/10.jpg'
];
// downloading the files
self.addEventListener('install', function(event){
	event.waitUntil(
	caches.open(staticCacheName).then(function(cache){
			return cache.addAll(restaurantFileToCache);
		});
	);
});
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(staticCacheName)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});

self.addEventListener('activate', function(event) {

  var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
// https://developers.google.com/web/fundamentals/primers/service-workers/
/* fetching the files from the cache
self.addEventListener('fetch', function(event){
	event.respondWidth(
		// This line of code fetches the files fromt cache
		caches.match(event.request).then(function(response){
			if(response){
				return response;
			}
			// Fetches the requested files from the network then caches in caches file
			return fetch(event.request).then(function(response){
				return caches.open(staticCacheName).then(function(cache){
					cache.put(event.request.url, response.clone);
					return response;
				});
			});
		});
	);
});
// update the old version of cache to new version
self.addEventListener('activate', function(event){
	var cacheWhitelist = [staticCacheName];
	event.waitUntil(
		caches.key().then(function(cacheNames){
			return Promise.all(
				cacheNames.map(function(cacheName){
					if(cacheWhitelist.indexOf(cacheName)=== -1){
						return caches.delete(cacheName)
					}
				});
			);
		});
	);
});
*/