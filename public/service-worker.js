const CACHE_NAME = "static-files-v1";
const DATA_CACHE_NAME = "data-cache-v1";

const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/js/idb.js",
  "/js/index.js",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
  "https://cdn.jsdelivr.net/npm/chart.js@2.8.0",
];

self.addEventListener("install", (evt) => {
  console.log("Service worker installed");

  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting();
});

self.addEventListener("activate", (evt) => {
  console.log("service worker activated");

  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim();
});

self.addEventListener("fetch", (evt) => {
  console.log(evt);
  evt.respondWith(
    caches
      .open(DATA_CACHE_NAME)
      .then((cache) => {
        return fetch(evt.request)
          .then((response) => {
            if (response.status === 200) {
              cache.put(evt.request, response.clone());
            }
            return response;
          })
          .catch(() => {
            return cache.match(evt.request);
          });
      })
      .catch((err) => console.log(err))
  );
  return;
});
