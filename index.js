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

document.addEventListener('readystatechange', () => {
  if (document.readyState === 'complete') {
    console.log('readystate is complete')
    window.location = '/#/'
    document.body.classList.add('ready')
  }
})

window.addEventListener('hashchange', async () => {
  console.log('hashchange', window.location.hash)
  let url
  if (window.location.hash === '#/') {
    url = '/table-of-contents.md'
  } else {
    url = window.location.hash.split('#')[1] + '.md'
  }
  const data = await getData(url)
  const container = document.querySelector('.content-container')

  container.innerHTML = marked(data, { gfm: true })
}, false)