export const getIsPassedTest = (score: number, maxScore: number): boolean => {
  return score > maxScore / 2
}
