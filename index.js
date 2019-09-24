if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function() {
    console.log('Service Worker Registered')
  })
}

async function getData(pageUrl) {
  const req = new Request(pageUrl)
  const resp = await fetch(req)
  const data = await resp.text()
  return data
}

document.addEventListener('readystatechange', async () => {
  if (document.readyState === 'complete') {
    console.log('readystate is complete')

    window.addEventListener(
      'hashchange',
      async () => {
        console.log('hashchange', window.location.hash)
        const url = window.location.hash.split('#')[1] + '.md'
        const data = await getData(url)
        const container = document.querySelector('.content-container')

        container.innerHTML = marked(data, { gfm: true })

        const bookmarkScrollTop = await idbKeyval.get('bookmark.scrollTop')
        window.scrollTo(0, bookmarkScrollTop || 0)

        // Clear bookmark
        await idbKeyval.clear()
      },
      false
    )

    const bookmarkPage = await idbKeyval.get('bookmark.page')
    window.location = bookmarkPage || '/#/table-of-contents'

    document.body.classList.add('ready')
  }
})

document.addEventListener('visibilitychange', async () => {
  console.log(document.visibilityState, 'visibility change')
  // Update app state `bookmark.page` and `bookmark.scrollTop`
  if (document.visibilityState === 'hidden') {
    await idbKeyval.set('bookmark.page', window.location.hash)
    await idbKeyval.set('bookmark.scrollTop', window.scrollY)
  }
})
