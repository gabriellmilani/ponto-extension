export const msToTimeString = ms => {
  const dateObj = new Date()

  dateObj.setHours(0, 0, 0, ms)

  const hours = dateObj.getHours()
  const minutes = dateObj.getMinutes()

  return [hours, minutes].map(v => v.toString().padStart(2, '0')).join(':')
}
