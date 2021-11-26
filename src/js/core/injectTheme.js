import { appendIfNotExists } from '../utils/index.js'

export const injectTheme = themeName => {
  const htmlHead = document.querySelector('head')

  if (themeName) {
    const stylesheetLink = appendIfNotExists(htmlHead, 'link', 'customTheme')
    const themePath = chrome.extension.getURL(`src/css/themes/${themeName}.css`)

    stylesheetLink.rel = 'stylesheet'
    stylesheetLink.type = 'text/css'
    stylesheetLink.href = themePath
  } else {
    const linkElement = document.querySelector('#customTheme')

    linkElement?.remove()
  }
}
