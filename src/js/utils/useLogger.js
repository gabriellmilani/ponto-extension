export const useLogger = isDebugActive => {
  const debug = (...data) => {
    if (isDebugActive) console.log(...data)
  }

  return {
    debug,
  }
}
