import { useLogger, msToTimeString, timeStringToMs } from '../utils/index.js'
import { GIFS, HOME_PAGE } from '../constants/index.js'
import {
  calculateExitTime,
  renderMessage,
  getWorkProgress,
  getConfig,
  queryTimeStrings,
  injectTheme,
} from './index.js'

export const process = async () => {
  const config = await getConfig()
  const { workHours, estimatedInterval, debug, theme } = config

  const logger = useLogger(debug)

  logger.debug('Process has been called with config: ', config)

  injectTheme(theme)

  if (location.href !== HOME_PAGE) {
    logger.debug(
      'Work time calculations will not be made because the current URL is not equal to the main page: ',
      {
        current: location.href,
        expected: HOME_PAGE,
      }
    )

    return
  }

  const timeStrings = queryTimeStrings()

  logger.debug(`Found ${timeStrings.length} registered times: `, timeStrings)

  const [firstShiftStart, firstShiftEnd, secondShiftStart] = timeStrings

  if (!firstShiftStart) {
    return renderMessage(
      'Bom dia jovem proletário, bora começar?',
      GIFS.GOOD_MORNING
    )
  }

  const { timeWorking, timeInInterval, timeRemaining } = await getWorkProgress(
    timeStrings
  )

  const shouldExitAt = calculateExitTime(
    firstShiftStart,
    timeWorking,
    timeInInterval || timeStringToMs(estimatedInterval),
    timeRemaining
  )

  logger.debug('Current work progress: ', {
    timeWorking: msToTimeString(timeWorking),
    timeInInterval: msToTimeString(timeInInterval),
    timeRemaining:
      timeRemaining < 0
        ? `-${msToTimeString(Math.abs(timeRemaining))}`
        : msToTimeString(timeRemaining),
    shouldExitAt,
  })

  if (timeRemaining === 0) {
    return renderMessage('Dia finalizado :)', GIFS.WORK_DONE)
  }

  if (timeRemaining < 0) {
    const overtime = msToTimeString(Math.abs(timeRemaining))
    return renderMessage(
      `Dia finalizado :) \n Você trabalhou ${overtime} a mais que sua carga horária.`,
      GIFS.WORK_DONE
    )
  }

  const hasEstimatedInterval = timeStringToMs(estimatedInterval) > 0

  if (!secondShiftStart && hasEstimatedInterval) {
    return renderMessage(
      `Se você fizer um intervalo de ${estimatedInterval}, poderá sair às ${shouldExitAt}.`,
      GIFS.WORKING_DOG
    )
  }

  const isShiftStart = timeStrings.length % 2 === 1

  if (isShiftStart || (!hasEstimatedInterval && !firstShiftEnd)) {
    return renderMessage(
      `Você deverá sair às ${shouldExitAt} para completar as ${workHours} horas diárias.`,
      GIFS.WORKING_CAT
    )
  }

  const timeRemainingString = msToTimeString(timeRemaining)

  renderMessage(
    `Ainda faltam ${timeRemainingString} para completar as ${workHours} horas diárias.`,
    GIFS.ANGRY
  )
}
