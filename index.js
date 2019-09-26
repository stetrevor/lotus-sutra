if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/lotus-sutra/sw.js').then(function() {
    console.log('Service Worker Registered')
  })
}

async function getData(pageUrl) {
  const req = new Request(pageUrl)
  const resp = await fetch(req)
  const data = await resp.text()
  return data
}

async function loadPage(locationHash = window.location.hash) {
  console.log('loadPage', locationHash)
  const url = (locationHash || '#/table-of-contents').split('#')[1] + '.md'
  const data = await getData('/lotus-sutra' + url)
  const container = document.querySelector('.content-container')

  container.innerHTML = marked(data, { gfm: true })

  const bookmarkScrollTop = await idbKeyval.get('bookmark.scrollTop')
  window.scrollTo(0, bookmarkScrollTop || 0)

  // Clear bookmark
  await idbKeyval.clear()
}

document.addEventListener('readystatechange', async () => {
  if (document.readyState === 'complete') {
    console.log('readystate is complete')

    window.addEventListener(
      'hashchange',
      async e => {
        await loadPage()
      },
      false
    )

    const bookmarkPage = await idbKeyval.get('bookmark.page')
    // Check if bookmark is current page
    const hash = bookmarkPage || window.location.hash || '#/table-of-contents'
    window.location.hash = hash
    console.log('ready hash', hash)
    await loadPage(hash)

    document.body.classList.add('ready')
  }
})

async function bookmark() {
  console.log('bookmark')
  // Update app state `bookmark.page` and `bookmark.scrollTop`
  await idbKeyval.set('bookmark.page', window.location.hash)
  await idbKeyval.set('bookmark.scrollTop', window.scrollY)
}

document.addEventListener('visibilitychange', async () => {
  if (document.visibilityState === 'hidden') {
    await bookmark()
  }
})

window.addEventListener('beforeunload', bookmark)
