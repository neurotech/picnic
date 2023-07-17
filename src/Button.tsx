import styled from "@emotion/styled";

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
  emoji?: string;
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
  text-align: center;

  padding: ${(props) => buttonSizes[props.size].padding};
  width: ${(props) => (props.stretch ? "100%" : "unset")};

  :hover {
    cursor: pointer;
    background: ${(props) =>
      props.theme.button[props.variant].hover.background};
    color: ${(props) => props.theme.button[props.variant].hover.color};
  }

  :disabled {
    cursor: not-allowed;
    border: 1px solid ${(props) => props.theme.button["disabled"].base.border};
    background: ${(props) => props.theme.button["disabled"].base.background};
    color: ${(props) => props.theme.button["disabled"].base.color};

    :hover,
    :active {
      background: ${(props) => props.theme.button["disabled"].base.background};
      color: ${(props) => props.theme.button["disabled"].base.color};
    }
  }

  transition: all 0.12s;
`;

const ButtonLabel = styled.div<Pick<ButtonProps, "emoji">>`
  display: flex;
  justify-content: ${(props) => (props.emoji ? "space-between" : "center")};
`;

const Emoji = styled.span<Pick<ButtonProps, "disabled">>`
  text-shadow: none;
  filter: ${(props) => (props.disabled ? "grayscale(1)" : "none")};
`;

export const Button = ({
  buttonText,
  disabled = false,
  emoji,
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
    <ButtonLabel emoji={emoji}>
      <span>{buttonText}</span>
      <Emoji disabled={disabled}>{emoji}</Emoji>
    </ButtonLabel>
  </StyledButton>
);
