;(() => {
  ;['09:00', '11:30', '13:00', '14:00', '14:30', '17:00'].forEach(
    (time, index) => {
      const elementId = `ctl00_cphPrincipal_lblDailyTimeclock${index}`

      let element = document.getElementById(elementId)

      if (!element) {
        const fatherElement = document.getElementById('main')
        element = document.createElement('span')
        element.setAttribute('id', elementId)

        const textNode = document.createTextNode(time)

        element.appendChild(textNode)

        fatherElement.appendChild(element)
      } else {
        element.innerText = time
      }
    }
  )
})()
