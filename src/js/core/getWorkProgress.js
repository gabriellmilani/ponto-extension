import { timeStringToMs } from '../utils/index.js'
import { getConfig } from './index.js'

export const getWorkProgress = async timeStrings => {
  const { workHours } = await getConfig()

  const { timeWorking, timeInInterval } = timeStrings
    .map(timeStringToMs)
    .reduce(
      (acc, curr, index, array) => {
        const nextTime = array.at(index + 1)

        if (nextTime) {
          const key = index % 2 === 0 ? 'timeWorking' : 'timeInInterval'

          return {
            ...acc,
            [key]: acc[key] + nextTime - curr,
          }
        }
        return acc
      },
      { timeWorking: 0, timeInInterval: 0 }
    )

  const timeRemaining = timeStringToMs(workHours) - timeWorking

  return {
    timeWorking,
    timeInInterval,
    timeRemaining,
  }
}
