export const trimStringWithEllipsis = (value: string, maxLetters: number) => {
  return value.slice(0, maxLetters) + (value.length > maxLetters ? '...' : '')
}

export const normalizeString = (value: string) => {
  return value.toLowerCase().trim()
}

export const capitalizeFirstLetter = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1)
}
