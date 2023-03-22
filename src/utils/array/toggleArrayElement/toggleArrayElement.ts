import { removeAtIndex } from '../removeAtIndex/removeAtIndex'

export const toggleArrayElement = <T>(
  array: Array<T>,
  item: T,
  getValue = (item: T) => item
) => {
  const index = array.findIndex((i) => getValue(i) === getValue(item))

  if (index === -1) {
    return [...array, item]
  }

  return removeAtIndex(array, index)
}
