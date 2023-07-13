import "@emotion/react";
import { ButtonVariant } from "./Button";

type Buttons = Record<ButtonVariant, ButtonStates>;

interface ButtonStates {
  base: ButtonTheme;
  hover: ButtonTheme;
}

interface ButtonTheme {
  background: string;
  color: string;
}

interface AlertTheme {
  background: string;
  color: string;
}

declare module "@emotion/react" {
  export interface Theme {
    body: {
      background: string;
    };
    card: {
      background: string;
      border: string;
      color: string;
      header: string;
    };
    alert: {
      success: AlertTheme;
      error: AlertTheme;
      warning: AlertTheme;
      info: AlertTheme;
      neutral: AlertTheme;
    };
    button: Buttons;
  }
}
