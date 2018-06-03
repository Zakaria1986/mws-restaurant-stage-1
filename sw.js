
// this checks to see if the service worker supported by the browser

//this is a given cache name that can be update by cache version
var staticCacheName = 'restaurant-cache-v1';
// this are files names which make up the website
var restaurantFileToCache = [
'/',
'./index.html',
'/restaurant.html',
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

self.addEventListener('install', function(event) {
  // Perform install steps
  // Perform install steps
  event.waitUntil(
    caches.open(staticCacheName)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(restaurantFileToCache);
      })
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
        return fetch(event.request);
      }
    )
  );
});

