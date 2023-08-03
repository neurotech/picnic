import styled from "@emotion/styled";
import { ReactNode } from "react";

export type ButtonVariant =
  | "blue"
  | "red"
  | "purple"
  | "green"
  | "yellow"
  | "disabled";

type ButtonSize = "default" | "small";

interface ButtonProps {
  buttonText: string;
  disabled?: boolean;
  icon?: string | ReactNode;
  minWidth?: number;
  onClick?: () => void;
  stretch?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

interface StyledButtonProps {
  disabled: boolean;
  minWidth: number;
  stretch: boolean;
  variant: ButtonVariant;
  size: ButtonSize;
}

type Sizes = Record<ButtonSize, SizeProperties>;
interface SizeProperties {
  fontSize: string;
  padding: string;
}
const buttonSizes: Sizes = {
  default: { fontSize: "13px", padding: "0.5rem 0.75rem" },
  small: { fontSize: "11px", padding: "0.1rem 0.5rem" },
};

const StyledButton = styled.button<StyledButtonProps>`
  user-select: none;
  min-width: ${(props) => (props.minWidth ? `${props.minWidth}px` : "unset")};

  border: 1px solid ${(props) => props.theme.button[props.variant].base.border};
  border-radius: 4px;
  background: ${(props) => props.theme.button[props.variant].base.background};

  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans",
    Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-weight: 600;
  font-size: ${(props) => buttonSizes[props.size].fontSize};
  line-height: 19px;
  color: ${(props) => props.theme.button[props.variant].base.color};
  text-shadow: 0 1px 0
    ${(props) => props.theme.button[props.variant].base.textShadow};
  text-align: center;

  padding: ${(props) => buttonSizes[props.size].padding};
  width: ${(props) => (props.stretch ? "100%" : "unset")};

  span {
    filter: ${(props) =>
      `drop-shadow(0 1px 0px ${
        props.theme.button[props.variant ?? "blue"].base.dropShadow
      })`};
  }

  :hover {
    cursor: pointer;
    background: ${(props) =>
      props.theme.button[props.variant].hover.background};
    color: ${(props) => props.theme.button[props.variant].hover.color};
    text-shadow: none;

    span {
      filter: none;
    }
  }

  :disabled {
    cursor: not-allowed;
    border: 1px solid ${(props) => props.theme.button["disabled"].base.border};
    background: ${(props) => props.theme.button["disabled"].base.background};
    color: ${(props) => props.theme.button["disabled"].base.color};
    text-shadow: none;

    :hover,
    :active {
      background: ${(props) => props.theme.button["disabled"].base.background};
      color: ${(props) => props.theme.button["disabled"].base.color};
      text-shadow: none;
    }
  }

  transition: all 0.12s;
`;

const ButtonLabel = styled.div<Pick<ButtonProps, "icon">>`
  display: flex;
  justify-content: ${(props) => (props.icon ? "space-between" : "center")};
`;

const Emoji = styled.span<Pick<ButtonProps, "disabled" | "variant">>`
  align-self: center;
`;

export const Button = ({
  buttonText,
  disabled = false,
  icon: emoji,
  minWidth = emoji ? 130 : 90,
  onClick,
  stretch = false,
  variant = "blue",
  size = "default",
}: ButtonProps) => (
  <StyledButton
    disabled={disabled}
    minWidth={minWidth}
    onClick={onClick}
    stretch={stretch}
    variant={variant}
    size={size}
  >
    <ButtonLabel icon={emoji}>
      <div>{buttonText}</div>
      <Emoji disabled={disabled} variant={variant}>
        {emoji}
      </Emoji>
    </ButtonLabel>
  </StyledButton>
);
