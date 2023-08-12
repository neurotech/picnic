import { describe, expect, it } from "vitest";
import { getIssue } from "./jira";

const getIssueTestCases = [
  { input: "FS-123", output: "fs-123" },
  { input: "DEV-28088", output: "dev-28088" },
  { input: "MoreThanTenCharactersLong", output: "" },
  { input: "181820", output: "" }
];

describe("getIssue", () => {
  it.each(getIssueTestCases)(
    "returns $output when input is: $input",
    ({ input, output }) => {
      expect(getIssue(input)).toEqual(output);
    }
  );
});
