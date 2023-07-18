import { Theme } from "@emotion/react";
import { palette } from "./palette";
import { Buttons, Statuses } from "./emotion";

const darkButtons: Buttons = {
  blue: {
    base: {
      background: palette.blue.main,
      color: palette.blue.dark,
      border: `${palette.blue.dark}ed`,
    },
    hover: {
      background: palette.blue.light,
      color: palette.white.main,
    },
  },
  red: {
    base: {
      background: palette.red.main,
      color: palette.red.dark,
      border: `${palette.red.dark}ed`,
    },
    hover: {
      background: palette.red.light,
      color: palette.white.main,
    },
  },
  purple: {
    base: {
      background: palette.purple.main,
      color: palette.purple.dark,
      border: `${palette.purple.dark}ed`,
    },
    hover: {
      background: palette.purple.light,
      color: palette.white.main,
    },
  },
  green: {
    base: {
      background: palette.green.main,
      color: palette.green.dark,
      border: `${palette.green.dark}ed`,
    },
    hover: {
      background: palette.green.light,
      color: palette.white.main,
    },
  },
  yellow: {
    base: {
      background: palette.yellow.main,
      color: palette.yellow.dark,
      border: `${palette.yellow.dark}ed`,
    },
    hover: {
      background: palette.yellow.light,
      color: palette.white.main,
    },
  },
  disabled: {
    base: {
      background: palette.ash.main,
      color: palette.ash.light,
      border: `${palette.ash.light}42`,
    },
    hover: { background: palette.ash.main, color: palette.ash.light },
  },
};

const lightButtons: Buttons = {
  blue: {
    base: {
      background: palette.blue.main,
      color: palette.white.main,
      border: `${palette.blue.dark}60`,
    },
    hover: {
      background: palette.blue.light,
      color: palette.blue.dark,
    },
  },
  red: {
    base: {
      background: palette.red.main,
      color: palette.white.main,
      border: `${palette.red.dark}60`,
    },
    hover: {
      background: palette.red.light,
      color: palette.red.dark,
    },
  },
  purple: {
    base: {
      background: palette.purple.main,
      color: palette.white.main,
      border: `${palette.purple.dark}60`,
    },
    hover: {
      background: palette.purple.light,
      color: palette.purple.dark,
    },
  },
  green: {
    base: {
      background: palette.green.main,
      color: palette.white.main,
      border: `${palette.green.dark}60`,
    },
    hover: {
      background: palette.green.light,
      color: palette.green.dark,
    },
  },
  yellow: {
    base: {
      background: palette.yellow.main,
      color: palette.white.main,
      border: `${palette.yellow.dark}60`,
    },
    hover: {
      background: palette.yellow.light,
      color: palette.yellow.dark,
    },
  },
  disabled: {
    base: {
      background: palette.grey.main,
      color: palette.grey.dark,
      border: `${palette.grey.dark}60`,
    },
    hover: { background: palette.grey.main, color: palette.grey.dark },
  },
};

const status: Statuses = {
  blue: { background: "rgba(32, 107, 196, 0.1)", color: "#206bc4" },
  azure: { background: "rgba(66, 153, 225, 0.1)", color: "#4299e1" },
  indigo: { background: "rgba(66, 99, 235, 0.1)", color: "#4263eb" },
  purple: { background: "rgba(174, 62, 201, 0.1)", color: "#ae3ec9" },
  pink: { background: "rgba(214, 51, 108, 0.1)", color: "#d6336c" },
  red: { background: "rgba(214, 57, 57, 0.1)", color: "#d63939" },
  orange: { background: "rgba(247, 103, 7, 0.1)", color: "#f76707" },
  yellow: { background: "rgba(245, 159, 0, 0.1)", color: "#f59f00" },
  lime: { background: "rgba(116, 184, 22, 0.1)", color: "#74b816" },
  green: { background: "rgba(47, 179, 68, 0.1)", color: "#2fb344" },
  teal: { background: "rgba(12, 166, 120, 0.1)", color: "#0ca678" },
  cyan: { background: "rgba(23, 162, 184, 0.1)", color: "#17a2b8" },
};

const dark: Theme = {
  body: {
    background: "#242529",
  },
  card: {
    background: "#1B1D21",
    border: "#323438",
    color: "#E3E3E3",
    header: "#FFFFFF",
  },
  alert: {
    success: {
      background: "rgba(57, 255, 113, 0.1)",
      color: "#39FF71",
    },
    error: {
      background: "rgba(255, 57, 57, 0.1)",
      color: "#FF3939",
    },
    warning: {
      background: "rgba(255, 188, 57, 0.1)",
      color: "#FFBC39",
    },
    info: {
      background: "rgba(57, 136, 255, 0.1)",
      color: "#3988FF",
    },
    neutral: {
      background: "rgba(144, 139, 157, 0.1)",
      color: "#908B9D",
    },
  },
  button: darkButtons,
  separator: "#323438",
  issues: {
    base: {
      background: "#242529",
      color: palette.grey.main,
      border: `${palette.blue.main}40`,
    },
    hover: {
      background: `${palette.yellow.main}20`,
      color: palette.grey.main,
    },
    active: {
      background: `${palette.yellow.main}60`,
      color: palette.grey.main,
    },
    selected: {
      background: `${palette.blue.main}10`,
      color: palette.green.dark,
    },
  },
  status,
  input: {
    base: {
      background: palette.white.main,
      color: palette.ash.dark,
      border: palette.grey.main,
      placeholder: palette.ash.light,
    },
    active: {
      background: palette.white.main,
      color: palette.ash.dark,
      border: palette.blue.main,
      boxShadow: `${palette.blue.main}40`,
    },
  },
};

const light: Theme = {
  body: {
    background: "#C9C9C9",
  },
  card: {
    background: "#FFFFFF",
    border: "#939393",
    color: "#404040",
    header: "#000000",
  },
  alert: {
    success: {
      background: "rgba(57, 255, 113, 0.26)",
      color: "#08872C",
    },
    error: {
      background: "rgba(255, 57, 57, 0.2)",
      color: "#FF3939",
    },
    warning: {
      background: "rgba(255, 188, 57, 0.2)",
      color: "#CD8C0E",
    },
    info: {
      background: "rgba(57, 136, 255, 0.17)",
      color: "#3988FF",
    },
    neutral: {
      background: "rgba(118, 113, 130, 0.17)",
      color: "#767182",
    },
  },
  button: lightButtons,
  separator: "#939393",
  issues: {
    base: {
      background: palette.grey.light,
      color: palette.ash.main,
      border: `${palette.blue.main}40`,
    },
    hover: {
      background: `${palette.yellow.main}20`,
      color: palette.ash.main,
    },
    active: {
      background: `${palette.yellow.main}60`,
      color: palette.ash.main,
    },
    selected: {
      background: `${palette.blue.main}10`,
      color: palette.green.dark,
    },
  },
  status,
  input: {
    base: {
      background: palette.snow.main,
      color: palette.ash.dark,
      border: palette.grey.main,
      placeholder: palette.ash.light,
    },
    active: {
      background: palette.white.main,
      color: palette.ash.dark,
      border: palette.blue.main,
      boxShadow: `${palette.blue.main}40`,
    },
  },
};

export const themes = { dark, light };
