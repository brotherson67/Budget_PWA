const CACHE_NAME = "static-files-v1";

const FILES_TO_CACHE = ["/", "/index.html"];

self.addEventListener("install", (evt) => {
  console.log("Service worker installed");
});

self.addEventListener("activate", (evt) => {
  console.log("service worker activated");
});
