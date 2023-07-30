import { describe, expect, it, test } from "vitest";
import { getEmojiListForInput, parseInputForSlackDetails } from "./slack";

const parseInputForSlackDetailsCases = [
  {
    input: "asdf",
  },
  {
    input: "http://hackz.net",
  },
  {
    input: "https://github.com/org/repo/pull/999",
  },
  {
    input:
      "https://phocassoftware.slack.com/archives/GTMAS1W93/p1689551795320299?thread_ts=1688610203.817309&cid=GTMAS1W93",
    expectedValue: {
      channel: "GTMAS1W93",
      timestamp: "1689551795.320299",
      unixTimestamp: "1689551795320",
    },
  },
  {
    input:
      "https://phocassoftware.slack.com/archives/D02HY4X6ZGU/p1689661090330279",
    expectedValue: {
      channel: "D02HY4X6ZGU",
      timestamp: "1689661090.330279",
      unixTimestamp: "1689661090330",
    },
  },
  {
    input:
      "https://phocassoftware.slack.com/archives/G01H093HWPP/p1689654546437409",
    expectedValue: {
      channel: "G01H093HWPP",
      timestamp: "1689654546.437409",
      unixTimestamp: "1689654546437",
    },
  },
];

test.each(parseInputForSlackDetailsCases)(
  "parseInputForSlackDetails returns $expectedValue when input is $input",
  ({ input, expectedValue }) => {
    expect(parseInputForSlackDetails(input)).toStrictEqual(expectedValue);
  }
);

describe("getEmojiListForInput", () => {
  it("returns array of emoji for valid input", () => {
    expect(getEmojiListForInput("hi")).toEqual(["letter_h", "letter_i"]);
  });

  it("returns array of emoji with alternates for input with 2 occurences of a letter", () => {
    expect(getEmojiListForInput("hih")).toEqual([
      "letter_h",
      "letter_i",
      "phocas_h",
    ]);
  });

  it("returns undefined for input with more than 2 occurences of a letter", () => {
    expect(getEmojiListForInput("helllo")).toBeUndefined;
  });

  it("returns array of emoji for input that contains a space", () => {
    expect(getEmojiListForInput("h i")).toEqual(["letter_h", "letter_i"]);
  });

  it("returns undefined for input that contains a number", () => {
    expect(getEmojiListForInput("h3y")).toBeUndefined;
  });
});
