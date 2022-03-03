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
});

self.addEventListener("fetch", (evt) => {});
