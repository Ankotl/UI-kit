export function last<T>(
  array: Array<T> | null | undefined,
  amount: number
): Array<T> | undefined

export function last<T>(array: Array<T> | null | undefined): T | undefined

export function last<T>(
  array: Array<T> | null | undefined,
  amount?: number
): Array<T> | T | undefined {
  if (!array || !Array.isArray(array)) {
    return
  }

  if (amount) {
    return array.slice(-Math.abs(amount))
  }

  return array[array.length - 1]
}
