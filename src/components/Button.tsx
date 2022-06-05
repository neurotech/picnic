import styled from "styled-components";
import { fontFamily } from "../styles/GlobalStyles";
import { palette } from "../styles/palette";

interface ButtonProps {
  disabled?: boolean;
  emoji?: string;
  label: string;
  onClick: () => void;
}

const StyledButton = styled.button<Pick<ButtonProps, "emoji">>`
  background-color: ${palette.red};
  border-radius: 6px;
  border: 2px solid ${palette.darkred};
  color: ${palette.white};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.emoji ? "space-between" : "center")};
  font-family: ${fontFamily};
  font-size: 1rem;
  font-weight: 500;
  line-height: 1rem;
  margin: 0;
  min-height: 2.5rem;
  min-width: ${(props) => (props.emoji ? "8.75rem" : "7rem")};
  padding: 0 1rem;
  text-shadow: 1px 1px 0 ${palette.darkred};
  transition: background-color 0.1s ease 0s, color 0.1s ease 0s,
    text-shadow 0.1s ease 0s;

  :hover {
    background-color: ${palette.lightred};
    color: ${palette.darkred};
    text-shadow: none;
  }

  :disabled {
    background-color: ${palette.brightgray};
    border-color: ${palette.gray};
    color: ${palette.gray};
    cursor: not-allowed;
    text-shadow: none;
  }
`;

export const Button = ({ disabled, emoji, label, onClick }: ButtonProps) => {
  return (
    <StyledButton emoji={emoji} disabled={disabled} onClick={onClick}>
      <span>{label}</span>
      {emoji !== "" && <span>{emoji}</span>}
    </StyledButton>
  );
};
