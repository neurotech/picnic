export type Palette = Record<Colour, Shades>;
type Colour =
  | "blue"
  | "red"
  | "purple"
  | "green"
  | "yellow"
  | "white"
  | "grey"
  | "ash";

interface Shades {
  main: string;
  light: string;
  dark: string;
}

export const palette: Palette = {
  blue: { main: "#656fff", light: "#989fff", dark: "#060b5e" },
  red: { main: "#ff5169", light: "#ff7588", dark: "#4a0610" },
  purple: { main: "#a065ff", light: "#c09aff", dark: "#22064e" },
  green: { main: "#1ab67a", light: "#63f5bd", dark: "#002819" },
  yellow: { main: "#fac319", light: "#ffdc7b", dark: "#472602" },
  white: { main: "#ffffff", light: "#ffffff", dark: "#ffffff" },
  grey: { main: "#aaaaaa", light: "#d9d9d9", dark: "#646464" },
  ash: { main: "#27282E", light: "#7a7d8c", dark: "#646464" },
};
