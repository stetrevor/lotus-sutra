if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/lotus-sutra/sw.js').then(function() {
    console.log('Service Worker Registered')
  })
}
