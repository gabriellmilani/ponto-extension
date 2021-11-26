import { DEFAULT_CONFIG } from '../constants/index.js'

export const getConfig = async () => {
  const promise = new Promise(resolve => {
    chrome.storage.sync.get(['config'], options => {
      resolve(options.config)
    })
  })

  const storageConfig = await promise

  return {
    ...DEFAULT_CONFIG,
    ...storageConfig,
  }
}
