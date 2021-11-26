import { TIME_ELEMENTS_PREFIX } from '../constants/index.js'

export const queryTimeStrings = () => {
  const timeNodes = document.querySelectorAll(`[id^="${TIME_ELEMENTS_PREFIX}"]`)

  return Array.from(timeNodes)
    .map(node => node.innerText)
    .filter(Boolean)
}
