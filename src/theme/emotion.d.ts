import '@emotion/react'
import type { ButtonVariant } from '../Button'
import type { StatusVariant } from '../Status'

export interface BaseColours {
  background: string
  gradientStart?: string
  gradientEnd?: string
  color?: string
  border?: string
  placeholder?: string
  boxShadow?: string
  textShadow?: string
  dropShadow?: string
}

type Buttons = Record<ButtonVariant, ButtonStates>

type Statuses = Record<StatusVariant, BaseColours>

interface ButtonStates {
  base: BaseColours
  hover: BaseColours
}

interface AlertTheme {
  background: string
  color: string
}

interface InputStates {
  base: BaseColours
  active: BaseColours
  disabled: BaseColours
}

interface IssuesTheme {
  base: BaseColours
  hover: BaseColours
  active: BaseColours
  selected: BaseColours
}

interface ProgressBar {
  container: BaseColours
  bar: BaseColours
}

declare module '@emotion/react' {
  export interface Theme {
    spacing: string;
    body: {
      background: string
    }
    card: {
      background: string
      border: string
      color: string
      header: string
    }
    alert: {
      success: AlertTheme
      error: AlertTheme
      warning: AlertTheme
      info: AlertTheme
      neutral: AlertTheme
    }
    button: Buttons
    separator: string
    issues: IssuesTheme
    status: Statuses
    input: InputStates
    progressBar: ProgressBar
  }
}
