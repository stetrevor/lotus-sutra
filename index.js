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
  const data = await getData('' + url)
  const container = document.querySelector('.content-container')

  container.innerHTML = marked(data, { gfm: true })

  const bookmarkScrollTop = await idbKeyval.get('bookmark.scrollTop')
  window.scrollTo(0, bookmarkScrollTop || 0)

  // Clear bookmark
  await idbKeyval.clear()
}

/* Reading speed is set at 250 Chinese character per minute, reading out aloud.
 * Refer to medium.com about read time.
 */
function calculateReadTime() {
  const content = document.querySelector('.content-container')
  const textHint = document.querySelector('.reading-progress__text-hint')
  const minutes = Math.ceil(content.textContent.length / 250)
  textHint.textContent = minutes + ' min read'
}

document.addEventListener('readystatechange', async () => {
  if (document.readyState === 'complete') {
    console.log('readystate is complete')

    window.addEventListener(
      'hashchange',
      async e => {
        await loadPage()
        calculateReadTime()
      },
      false
    )

    // Set up progress bar visibility
    window.addEventListener('hashchange', () => {
      const readingProgress = document.querySelector('.reading-progress')
      const toc = window.location.hash.endsWith('table-of-contents')
      readingProgress.style.display = toc ? 'none' : 'initial'
    })
    // Set up progress bar.
    // See https://medium.com/@nilayvishwakarma/build-a-scroll-progress-bar-with-vanilla-js-in-10-minutes-or-less-4ba07e2554f3.
    document.addEventListener(
      'scroll',
      () => {
        const progress = document.querySelector('.reading-progress__progress-bar')
        const de = document.documentElement
        const scrollTop = de.scrollTop
        const scrollBottom = de.scrollHeight - de.clientHeight
        const scrollPercent = (scrollTop / scrollBottom) * 100 + '%'
        progress.style.setProperty('--scroll', scrollPercent)
      },
      { passive: true }
    )

    const bookmarkPage = await idbKeyval.get('bookmark.page')
    // Check if bookmark is current page
    const hash = bookmarkPage || window.location.hash || '#/table-of-contents'
    window.location.hash = hash
    console.log('ready hash', hash)
    await loadPage(hash)
    calculateReadTime()

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
