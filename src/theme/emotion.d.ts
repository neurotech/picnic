import "@emotion/react";
import { ButtonVariant } from "../Button";
import { StatusVariant } from "../Status";

export interface BaseColours {
  background: string;
  color: string;
  border?: string;
  placeholder?: string;
  boxShadow?: string;
  textShadow?: string;
  dropShadow?: string;
}

type Buttons = Record<ButtonVariant, ButtonStates>;

type Statuses = Record<StatusVariant, BaseColours>;

interface ButtonStates {
  base: BaseColours;
  hover: BaseColours;
}

interface AlertTheme {
  background: string;
  color: string;
}

interface InputStates {
  base: BaseColours;
  active: BaseColours;
}

interface IssuesTheme {
  base: BaseColours;
  hover: BaseColours;
  active: BaseColours;
  selected: BaseColours;
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
    separator: string;
    issues: IssuesTheme;
    status: Statuses;
    input: InputStates;
  }
}
