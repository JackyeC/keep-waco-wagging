// Self-unregistering "kill switch" service worker.
//
// This site intentionally ships NO service worker. However, a browser that
// still holds a stale service worker from a previous app served on this origin
// (e.g. another project that ran on localhost:3000, or an older version of the
// site) can intercept navigations and fail them with net::ERR_FAILED.
//
// Serving this file guarantees that any such stale registration updates to a
// worker that removes itself and clears its caches, then reloads open tabs.
// Browsers with no existing registration never request /sw.js, so this file is
// inert for everyone else.

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      try {
        if (self.caches) {
          const keys = await caches.keys();
          await Promise.all(keys.map((key) => caches.delete(key)));
        }
        await self.registration.unregister();
        const clients = await self.clients.matchAll({ type: "window" });
        for (const client of clients) {
          client.navigate(client.url);
        }
      } catch {
        // Best effort — nothing to do if cleanup fails.
      }
    })(),
  );
});
