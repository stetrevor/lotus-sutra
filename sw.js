const version = 'v5'

self.addEventListener('install', function(e) {
  console.log('install')

  e.waitUntil(
    caches.open(`lotus-sutra-${version}`).then(function(cache) {
      const chapters = Array.from(
        new Array(28),
        (_, i) => `/lotus-sutra/chapter-${i + 1}.md`
      )
      return cache.addAll(
        chapters.concat([
          '/lotus-sutra/',
          '/lotus-sutra/index.html',
          '/lotus-sutra/index.js',
          '/lotus-sutra/style.css',
          '/lotus-sutra/icon.png',
          'https://cdn.jsdelivr.net/npm/marked@0.7.0/lib/marked.min.js'
        ])
      )
    })
  ).then(() => {
    return self.skipWaiting()
  })
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
  const cacheKeeplist = [`lotus-sutra-${version}`]

  event
    .waitUntil(
      caches.keys().then(keyList => {
        return Promise.all(
          keyList.map(key => {
            if (!cacheKeeplist.includes(key)) {
              return caches.delete(key)
            }
          })
        )
      })
    )
    .then(() => {
      self.clients.claim()
    })
})
