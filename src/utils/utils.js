export const prettifyTime = (time) => {
  let seconds = (time % 60).toFixed(0)
  if (seconds < 10) {
    seconds = `0${seconds}`
  }
  if (time < 60) {
    return `0:${seconds}`
  }
  const minutes = (time / 60).toFixed(0)
  return `${minutes}:${seconds}`
}
