import { AlertLevel } from "../Alert";
import {
  brbEmoji,
  foodEmoji,
  laundryEmoji,
  letterEmoji,
  phocasLetterEmoji,
  shoppingEmoji,
  sunshineEmoji,
  teaEmoji,
} from "./emoji";
import { language } from "./language";

export type SlackStatusType =
  | "idle"
  | "loading"
  | "error"
  | "success"
  | "clear"
  | "brb"
  | "lunch"
  | "sunshine"
  | "laundry"
  | "tea"
  | "shopping";

export interface SlackProfile {
  status_text: string;
  status_emoji: string;
  status_expiration: number;
}

export interface SlackStatusBody {
  profile: SlackProfile;
}

const getNowPlusOneHour = () => Math.floor(Date.now() / 1000) + 3600;
const getNowPlusFiveMinutes = () => Math.floor(Date.now() / 1000) + 300;
const getNowPlusFifteenMinutes = () => Math.floor(Date.now() / 1000) + 900;

const getBrbEmoji = (): string =>
  brbEmoji[(brbEmoji.length * Math.random()) | 0];

const getFoodEmoji = (): string =>
  foodEmoji[(foodEmoji.length * Math.random()) | 0];

const getSunshineEmoji = (): string =>
  sunshineEmoji[(sunshineEmoji.length * Math.random()) | 0];

const getLaundryEmoji = (): string =>
  laundryEmoji[(laundryEmoji.length * Math.random()) | 0];

const getTeaEmoji = (): string =>
  teaEmoji[(teaEmoji.length * Math.random()) | 0];

const getShoppingEmoji = (): string =>
  shoppingEmoji[(shoppingEmoji.length * Math.random()) | 0];

export const getSlackStatus = (
  statusType: SlackStatusType
): SlackStatusBody => {
  switch (statusType) {
    case "brb":
      return {
        profile: {
          status_emoji: getBrbEmoji(),
          status_text: "BRB",
          status_expiration: getNowPlusFiveMinutes(),
        },
      };

    case "lunch":
      return {
        profile: {
          status_emoji: getFoodEmoji(),
          status_text: "Lunch",
          status_expiration: getNowPlusOneHour(),
        },
      };

    case "sunshine":
      return {
        profile: {
          status_emoji: getSunshineEmoji(),
          status_text: "Sunshine break.",
          status_expiration: getNowPlusFifteenMinutes(),
        },
      };

    case "laundry":
      return {
        profile: {
          status_emoji: getLaundryEmoji(),
          status_text: "Laundry",
          status_expiration: getNowPlusFifteenMinutes(),
        },
      };

    case "tea":
      return {
        profile: {
          status_emoji: getTeaEmoji(),
          status_text: "Tea break ~",
          status_expiration: getNowPlusFifteenMinutes(),
        },
      };

    case "shopping":
      return {
        profile: {
          status_emoji: getShoppingEmoji(),
          status_text: "Food shopping has arrived.",
          status_expiration: getNowPlusFifteenMinutes(),
        },
      };

    case "clear":
    default:
      return {
        profile: {
          status_emoji: "",
          status_text: "",
          status_expiration: 0,
        },
      };
  }
};

export const getSuccessMessage = (status: SlackStatusType): string => {
  switch (status) {
    case "clear":
      return language.StatusClearedSuccessfully;

    case "brb":
      return language.StatusSetToBrb;

    case "lunch":
      return language.StatusSetToLunch;

    case "sunshine":
      return language.StatusSetToSunshine;

    case "laundry":
      return language.StatusSetToLaundry;

    case "tea":
      return language.StatusSetToTea;

    case "shopping":
      return language.StatusSetToShopping;

    default:
      return language.StatusSetSuccessfully;
  }
};

export const getAlertLevel = (status: SlackStatusType): AlertLevel => {
  switch (status) {
    case "idle":
      return "neutral";

    case "loading":
      return "warning";

    case "error":
      return "error";

    case "success":
      return "success";

    case "clear":
      return "warning";

    case "brb":
    case "lunch":
    case "sunshine":
    case "laundry":
    case "tea":
    case "shopping":
      return "info";

    default:
      return "neutral";
  }
};

export interface SlackDetails {
  channel: string;
  timestamp: string;
  unixTimestamp: string;
}

export const parseInputForSlackDetails = (
  input: string
): SlackDetails | undefined => {
  try {
    if (!input.toLowerCase().startsWith("http")) return;

    const inputAsUrl = new URL(input);
    const elements = inputAsUrl.pathname.split("/").slice(1);
    const channel = elements[1];
    const baseTimestamp = elements[2].substring(1);
    const unixTimestamp = baseTimestamp.substring(0, baseTimestamp.length - 3);
    const timestampElements = baseTimestamp.split("");
    timestampElements.splice(timestampElements.length - 6, 0, ".");

    const timestamp = timestampElements.join("");

    return { channel, timestamp, unixTimestamp };
  } catch (error) {
    return undefined;
  }
};

export const getEmojiListForInput = (input: string): string[] | undefined => {
  const inputNoSpaces = input.replace(" ", "");

  if (!/^[A-Za-z]+$/.test(inputNoSpaces)) return;

  const emojiList: string[] = [];
  const registry: Record<string, string[]> = {};

  try {
    inputNoSpaces.split("").forEach((char) => {
      const letterIsInRegistry = Object.keys(registry).find(
        (letter) => letter === char
      );

      if (letterIsInRegistry) {
        const registryEntry = registry[letterIsInRegistry];

        if (registryEntry.length === 1) {
          emojiList.push(phocasLetterEmoji[char]);
          registry[char] = [...registry[char], phocasLetterEmoji[char]];
        }

        if (registryEntry.length === 2) {
          throw new Error("No letters left!");
        }
      } else {
        emojiList.push(letterEmoji[char]);
        registry[char] = [letterEmoji[char]];
      }
    });
  } catch (error) {
    return;
  }

  return emojiList;
};
