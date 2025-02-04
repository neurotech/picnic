function isNumeric(input: string) {
  if (typeof input !== 'string') return false
  return !Number.isNaN(Number.parseFloat(input))
}

export const getIssue = (rawText: string): string => {
  let issue = ''
  const invalid =
    typeof rawText !== 'string' ||
    rawText.length >= 10 ||
    isNumeric(rawText) ||
    (!rawText.toLowerCase().startsWith('pa') &&
      !rawText.toLowerCase().startsWith('fs') &&
      !rawText.toLowerCase().startsWith('dev') &&
      !rawText.toLowerCase().startsWith('star'))

  if (invalid) return issue

  const expression = /^([pa-]*[fs-]*[dev-]*[star-]*)+\d+/gm
  const matched = rawText.toLowerCase().match(expression)

  if (matched?.length) {
    issue = matched[0]
  }

  return issue.toLowerCase()
}
