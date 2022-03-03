const CACHE_NAME = "static-files-v1";
const DATA_CACHE_NAME = "data-cache-v1";

const FILES_TO_CACHE = ["/", "/index.html"];

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
  // remove old caches
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
    fetch(evt.request).catch(() => {
      return caches.match(evt.request).then((response) => {
        if (response) {
          return response;
        } else if (evt.request.headers.get("accept").include("text/html")) {
          return caches.match("/");
        }
      });
    })
  );
});
