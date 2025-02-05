function isNumeric(input: string) {
  if (typeof input !== 'string') return false
  return !Number.isNaN(Number.parseFloat(input))
}

export const getIssue = (rawText: string): string => {
  const invalid =
    typeof rawText !== 'string' ||
    rawText.length >= 10 ||
    isNumeric(rawText) ||
    (!rawText.toLowerCase().startsWith('an') &&
      !rawText.toLowerCase().startsWith('pa') &&
      !rawText.toLowerCase().startsWith('fs') &&
      !rawText.toLowerCase().startsWith('dev') &&
      !rawText.toLowerCase().startsWith('star'))

  if (invalid) return ''

  const expression = /^([an-]*[pa-]*[fs-]*[dev-]*[star-]*)+\d+/gm
  const matched = rawText.toLowerCase().match(expression)

  if (matched?.length) {
    return matched[0].toLowerCase()
  }

  return ''
}
