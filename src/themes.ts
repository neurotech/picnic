import { Theme } from "@emotion/react";
import { palette } from "./palette";
import { Buttons } from "./emotion";

const darkButtons: Buttons = {
  blue: {
    base: { background: palette.blue.main, color: palette.blue.dark },
    hover: {
      background: palette.blue.light,
      color: palette.white.main,
    },
  },
  red: {
    base: { background: palette.red.main, color: palette.red.dark },
    hover: {
      background: palette.red.light,
      color: palette.white.main,
    },
  },
  purple: {
    base: { background: palette.purple.main, color: palette.purple.dark },
    hover: {
      background: palette.purple.light,
      color: palette.white.main,
    },
  },
  green: {
    base: { background: palette.green.main, color: palette.green.dark },
    hover: {
      background: palette.green.light,
      color: palette.white.main,
    },
  },
  yellow: {
    base: {
      background: palette.yellow.main,
      color: palette.yellow.dark,
    },
    hover: {
      background: palette.yellow.light,
      color: palette.white.main,
    },
  },
  disabled: {
    base: { background: palette.ash.main, color: palette.ash.light },
    hover: { background: palette.ash.main, color: palette.ash.light },
  },
};

const lightButtons: Buttons = {
  blue: {
    base: { background: palette.blue.main, color: palette.white.main },
    hover: {
      background: palette.blue.light,
      color: palette.blue.dark,
    },
  },
  red: {
    base: { background: palette.red.main, color: palette.white.main },
    hover: {
      background: palette.red.light,
      color: palette.red.dark,
    },
  },
  purple: {
    base: { background: palette.purple.main, color: palette.white.main },
    hover: {
      background: palette.purple.light,
      color: palette.purple.dark,
    },
  },
  green: {
    base: { background: palette.green.main, color: palette.white.main },
    hover: {
      background: palette.green.light,
      color: palette.green.dark,
    },
  },
  yellow: {
    base: {
      background: palette.yellow.main,
      color: palette.white.main,
    },
    hover: {
      background: palette.yellow.light,
      color: palette.yellow.dark,
    },
  },
  disabled: {
    base: { background: palette.grey.main, color: palette.grey.dark },
    hover: { background: palette.grey.main, color: palette.grey.dark },
  },
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
};

export const themes = { dark, light };
