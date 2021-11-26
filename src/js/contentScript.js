import { process } from './core/index.js'
import { REGISTER_TIME_BUTTON_ID } from './constants/index.js'

const registerTimeButton = document.getElementById(REGISTER_TIME_BUTTON_ID)

export const main = () => {
  registerTimeButton?.addEventListener('click', process)

  chrome.storage.onChanged.addListener(process)

  process()
}
