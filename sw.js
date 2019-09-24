self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('lotus-sutra').then(function(cache) {
      // const chapters = Array.from(
      //   new Array(28),
      //   (_, i) => `/chapter-${i + 1}.html`
      // )
      const chapters = []
      return cache.addAll(
        chapters.concat([
          // '/',
          // '/index.html',
          // '/index.js',
          // '/style.css',
          // '/icon.png',
          'https://cdnjs.cloudflare.com/ajax/libs/marked/0.7.0/marked.min.js',
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
      return Promise.all(
        keyList.map(key => {
          if (!cacheKeeplist.includes(key)) {
            return caches.delete(key)
          }
        })
      )
    })
  )
})
