export type Palette = Record<Colour, Shades>;
type Colour =
  | "black"
  | "white"
  | "blue"
  | "red"
  | "purple"
  | "green"
  | "yellow"
  | "grey"
  | "ash"
  | "snow";

interface Shades {
  main: string;
  light: string;
  dark: string;
}

export const palette: Palette = {
  black: { main: "#000000", light: "#000000", dark: "#000000" },
  white: { main: "#ffffff", light: "#ffffff", dark: "#ffffff" },
  blue: { main: "#656fff", light: "#989fff", dark: "#060b5e" },
  red: { main: "#ff5169", light: "#ff7588", dark: "#4a0610" },
  purple: { main: "#a065ff", light: "#c09aff", dark: "#22064e" },
  green: { main: "#1ab67a", light: "#63f5bd", dark: "#002819" },
  yellow: { main: "#fac319", light: "#ffdc7b", dark: "#472602" },
  grey: { main: "#aaaaaa", light: "#d9d9d9", dark: "#646464" },
  ash: { main: "#27282E", light: "#7a7d8c", dark: "#1B1D21" },
  snow: { main: "#efefef", light: "#efefef", dark: "#efefef" },
};
