import { createGlobalStyle } from "styled-components";
import { palette } from "./palette";

export const fontFamily = `-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"`;
export const monoFontFamily = `ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas,
    Liberation Mono, monospace`;

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    vertical-align: baseline;
    box-sizing: border-box;
    border: 0;
    outline: 0;
  }
  body {
    width: 100%;
    min-height: 100vh;
    padding: 1rem;
    background-color: ${palette.gray};
    color: white;
    font-family: ${fontFamily};
    font-size: 1rem;
    line-height: 1rem;
  }
`;
