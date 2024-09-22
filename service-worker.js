const CACHE_NAME = "dagobert-v2";

self.addEventListener("install", (event) => {
  console.log("Service Worker: Installing");
  event.waitUntil(caches.open(CACHE_NAME));
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone the response because it's a stream and can only be consumed once
        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      })
      .catch(() => {
        // If network request fails, try to get it from the cache
        return caches.match(event.request);
      })
  );
});
