import { timeStringToMs, msToTimeString } from '../utils/index.js'

export const calculateExitTime = (
  startTime,
  timeWorking,
  timeInInterval,
  timeRemaining
) => {
  const shouldExitAt =
    timeStringToMs(startTime) + timeInInterval + timeWorking + timeRemaining

  return msToTimeString(shouldExitAt)
}
