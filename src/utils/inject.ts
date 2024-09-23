import browser from 'webextension-polyfill'

const body = document.querySelector('body')
console.log('browser.runtime.id')
console.log(browser.runtime.id)
const div = document.createElement('div')
div.setAttribute('id', 'miro-extension-url')
// script.setAttribute('type', 'text/javascript')
div.textContent = browser.runtime.getURL('/')
div.style.display = 'none'
body?.appendChild(div)
