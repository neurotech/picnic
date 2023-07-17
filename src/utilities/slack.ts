import { AlertLevel } from "../Alert";
import {
  brbEmoji,
  foodEmoji,
  laundryEmoji,
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
