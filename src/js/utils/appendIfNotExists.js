export const appendIfNotExists = (fatherElement, tagName, id) => {
  let element = document.getElementById(id)

  if (!element) {
    element = document.createElement(tagName)
    element.setAttribute('id', id)

    fatherElement.appendChild(element)
  }

  return element
}
