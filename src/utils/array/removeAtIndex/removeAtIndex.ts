export const removeAtIndex = (arr: Array<any>, index: number) => {
  const copy = [...arr]
  copy.splice(index, 1)

  return copy
}
