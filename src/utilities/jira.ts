function isNumeric(input: string) {
  if (typeof input != "string") return false;
  return !isNaN(parseFloat(input));
}

export const getIssue = (rawText: string): string => {
  let issue = "";
  const invalid =
    typeof rawText !== "string" ||
    rawText.length >= 10 ||
    isNumeric(rawText) ||
    (!rawText.toLowerCase().startsWith("fs") &&
      !rawText.toLowerCase().startsWith("dev"));

  if (invalid) return issue;

  const expression = /^([fs-]*[dev-]*)+\d+/gm;
  const matched = rawText.toLowerCase().match(expression);

  if (matched?.length) {
    issue = matched[0];
  }

  return issue.toLowerCase();
};
