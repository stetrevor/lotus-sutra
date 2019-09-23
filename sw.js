self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('video-store').then(function(cache) {
      const chapters = Array.from(
        new Array(28),
        (_, i) => `/chapter-${i + 1}.html`
      )
      return cache.addAll(
        chapters.concat([
          '/',
          '/index.html',
          '/index.js',
          '/style.css',
          '/icon.png'
        ])
      )
    })
  )
})

self.addEventListener('fetch', function(e) {
  console.log(e.request.url)
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request)
    })
  )
})
