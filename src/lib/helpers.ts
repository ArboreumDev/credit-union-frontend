// from stack overflow
export function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function dateStringToUnixTimestamp(date) {
  return Math.round(new Date(date).getTime() / 1000)
}

export function unixTimestampToDateString(timestamp) {
  return new Date(timestamp * 1000).toUTCString()
}