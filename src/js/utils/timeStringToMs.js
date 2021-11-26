export const timeStringToMs = timeString => {
  const [hours, minutes] = timeString.split(':').map(v => Number(v))

  return hours * 60 * 60 * 1000 + minutes * 60 * 1000
}
