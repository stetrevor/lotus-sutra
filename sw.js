self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('video-store').then(function(cache) {
      const chapters = Array.from(
        new Array(28),
        (_, i) => `/lotus-sutra/chapter-${i + 1}.html`
      )
      return cache.addAll(
        chapters.concat([
          '/lotus-sutra/',
          '/lotus-sutra/index.html',
          '/lotus-sutra/index.js',
          '/lotus-sutra/style.css',
          '/lotus-sutra/icon.png'
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

self.addEventListener('activate', event => {
  const cacheKeeplist = ['lotus-sutra']

  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (!cacheKeeplist.includes(key)) {
          return caches.delete(key)
        }
      }))
    })
  )
})
