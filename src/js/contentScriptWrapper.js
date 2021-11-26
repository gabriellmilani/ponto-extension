;(async () => {
  try {
    const src = chrome.extension.getURL('src/js/contentScript.js')
    const contentScript = await import(src)
    contentScript.main()
  } catch (error) {
    console.error('Ocorreu um erro ao carregar a extensão do ponto :(', error)
  }
})()
