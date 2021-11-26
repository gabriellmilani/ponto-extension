import { FORM_ELEMENT_ID } from '../constants/index.js'
import { getConfig } from './index.js'
import { appendIfNotExists } from '../utils/index.js'

export const renderMessage = async (text, gifUrl) => {
  const { fontSize, showGifs } = await getConfig()

  const fatherElement = document.getElementById(FORM_ELEMENT_ID)

  const wrapperElement = appendIfNotExists(
    fatherElement,
    'div',
    'batataWrapper'
  )

  const messageElement = appendIfNotExists(
    wrapperElement,
    'batata',
    'batataMessage'
  )

  if (showGifs && gifUrl) {
    const imageElement = appendIfNotExists(wrapperElement, 'img', 'batataImage')

    imageElement.setAttribute('src', gifUrl)
  } else {
    const imageElement = document.getElementById('batataImage')

    imageElement?.remove()
  }

  messageElement.style.fontSize = fontSize
  messageElement.innerText = text
}
