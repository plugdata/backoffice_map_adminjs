const CACHE = 'กองชาง-v1'

const STATIC = [
  '/map/',
  '/map/styles.css',
]

// Install — cache static shell
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(STATIC)).then(() => self.skipWaiting())
  )
})

// Activate — delete old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  )
})

// Fetch strategy:
// - Map tiles  → network-first (always fresh)
// - API calls  → network-only (real-time data)
// - App shell  → cache-first with network fallback
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url)

  // Skip non-GET
  if (e.request.method !== 'GET') return

  // API — always network
  if (url.pathname.startsWith('/api/')) return

  // Map tiles (OSM/Esri) — network-first, cache as fallback
  if (url.hostname.includes('tile') || url.hostname.includes('openstreetmap') || url.hostname.includes('arcgisonline')) {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    )
    return
  }

  // App shell — cache-first
  e.respondWith(
    caches.match(e.request).then(cached => {
      const net = fetch(e.request).then(res => {
        if (res && res.status === 200) {
          const clone = res.clone()
          caches.open(CACHE).then(c => c.put(e.request, clone))
        }
        return res
      })
      return cached || net
    })
  )
})
