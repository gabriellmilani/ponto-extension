import { getConfig } from './core/index.js'

window.onload = async () => {
  const button = document.getElementById('save')
  const configForm = document.getElementById('configForm')

  const config = await getConfig()

  Object.keys(config).forEach(key => {
    const element = configForm.elements[key]

    if (!element) {
      console.warn('Found an incorrect/outdated config key on storage:', key)
      return
    }

    if (element.type === 'checkbox') {
      element.checked = config[key]
    } else {
      element.value = config[key]
    }
  })

  configForm.addEventListener('submit', event => {
    event.preventDefault()

    const config = Array.from(configForm.elements)
      .filter(
        element => element.nodeName === 'INPUT' || element.nodeName === 'SELECT'
      )
      .reduce((obj, current) => {
        return {
          ...obj,
          [current.name]:
            current.type === 'checkbox' ? current.checked : current.value,
        }
      }, {})

    chrome.storage.sync.set({ config }, () => {
      console.log(`config set to ${JSON.stringify(config)}`)
    })

    button.innerHTML = '✓'
    button.disabled = true
  })

  configForm.addEventListener('change', () => {
    button.innerHTML = 'Salvar'
    button.disabled = false
  })
}
