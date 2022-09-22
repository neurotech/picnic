import styled from "styled-components";
import { palette } from "../../styles/palette";

export type ButtonVariant =
  | "gray"
  | "blue"
  | "green"
  | "red"
  | "yellow"
  | "pink"
  | "purple";

interface ButtonProps {
  disabled?: boolean;
  emoji?: string;
  fullWidth?: boolean;
  label: string;
  minWidth?: number;
  onClick: () => void;
  variant?: ButtonVariant;
}

const BaseButton = styled.button<
  Pick<ButtonProps, "emoji" | "minWidth" | "variant">
>`
  align-items: center;
  background-color: ${palette.gray.dark};
  border-radius: 4px;
  border: 1px solid ${palette.gray.darker};
  box-shadow: 0 2px 0 ${palette.gray.darker},
    inset 0 1px 0 ${palette.gray.lighter};
  color: ${(props) =>
    props.variant === "gray"
      ? "white"
      : palette[props.variant || "gray"].light};
  cursor: pointer;
  display: flex;
  min-width: ${(props) => props.minWidth || 30}px;
  width: 100%;
  justify-content: ${(props) => (props.emoji ? "space-between" : "center")};
  font-size: 16px;
  font-weight: 600;
  padding: 0.5rem;
  text-shadow: 1px 1px 0 ${(props) => props.variant && palette.gray.darker};

  :hover {
    background-color: ${(props) => props.variant && palette.gray.light};
    color: ${(props) =>
      props.variant === "gray"
        ? "white"
        : palette[props.variant || "gray"].default};
  }

  :disabled {
    background-color: ${palette.gray.light};
    box-shadow: none;
    color: ${palette.gray.lighter};
  }
`;

export const Button = ({
  disabled,
  emoji,
  label,
  onClick,
  minWidth,
  variant = "gray",
}: ButtonProps) => (
  <BaseButton
    disabled={disabled}
    emoji={emoji}
    minWidth={minWidth}
    onClick={onClick}
    variant={variant}
  >
    <span>{label}</span>
    {emoji && <span>{emoji}</span>}
  </BaseButton>
);
