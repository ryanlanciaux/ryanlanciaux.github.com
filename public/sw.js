/**
 * Self-destroying service worker.
 *
 * The Gatsby build shipped `gatsby-plugin-offline`, which registered a service
 * worker at this exact URL on every visitor's browser. Those registrations
 * outlive the Gatsby site and would keep serving the old cached shell forever.
 *
 * Browsers re-fetch a registered worker's script periodically, so serving this
 * file here replaces the Gatsby worker with one that deletes every cache,
 * unregisters itself, and reloads any open tab exactly once.
 *
 * Safe to delete once traffic from pre-2026 visitors has aged out (12+ months).
 */
self.addEventListener("install", () => {
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys()
      await Promise.all(keys.map((key) => caches.delete(key)))
      await self.registration.unregister()

      const clients = await self.clients.matchAll({ type: "window" })
      for (const client of clients) {
        client.navigate(client.url)
      }
    })()
  )
})
