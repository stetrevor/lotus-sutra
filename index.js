if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/lotus-sutra/sw.js').then(function() {
    console.log('Service Worker Registered')
  })
}

function rafThrottle(fn) {
  let busy = false

  return function() {
    if (busy) return

    busy = true
    fn.apply(this, arguments)
    window.requestAnimationFrame(function() {
      busy = false
    })
  }
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

  const bookmarkScrollTop = window.localStorage.getItem('bookmark.scrollTop')
  window.scrollTo(0, bookmarkScrollTop || 0)

  // Clear bookmark
  window.localStorage.clear()
}

/* Reading speed is set at 250 Chinese character per minute, reading out aloud.
 * Refer to medium.com about read time.
 */
function calculateReadTime() {
  const content = document.querySelector('.content-container')
  const textHint = document.querySelector('.reading-progress__read-time')
  const minutes = Math.ceil(content.textContent.length / 250)
  textHint.textContent = minutes + ' min read'
}

function bookmark() {
  console.log('bookmark')
  // Update app state `bookmark.page` and `bookmark.scrollTop`
  window.localStorage.setItem('bookmark.page', window.location.hash)
  window.localStorage.setItem('bookmark.scrollTop', window.scrollY)
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
      rafThrottle(() => {
        const progress = document.querySelector(
          '.reading-progress__progress-bar'
        )
        const progressText = document.querySelector(
          '.reading-progress__progress'
        )
        const de = document.documentElement
        const scrollTop = de.scrollTop
        const scrollBottom = de.scrollHeight - de.clientHeight
        const scrollPercent = (scrollTop / scrollBottom) * 100
        progress.style.setProperty('--scroll', scrollPercent + '%')
        progressText.textContent = Math.ceil(scrollPercent) + '%'
      }),
      { passive: true }
    )

    window.addEventListener('beforeunload', bookmark)
    window.addEventListener('beforeunload', () => {
      window.localStorage.setItem('bookmark.page', window.location.hash)
      window.localStorage.setItem('bookmark.scrollTop', window.scrollY)
    })

    const bookmarkPage = window.localStorage.getItem('bookmark.page')
    // Check if bookmark is current page
    const hash = bookmarkPage || window.location.hash || '#/table-of-contents'
    window.location.hash = hash
    console.log('ready hash', hash)
    await loadPage(hash)
    calculateReadTime()

    document.body.classList.add('ready')
  }
})

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    bookmark()
  }
})
