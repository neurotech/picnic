import styled from "styled-components";
import { fontFamily } from "../styles/GlobalStyles";
import { palette } from "../styles/palette";

interface ButtonProps {
  disabled: boolean;
  label: string;
  onClick: () => void;
}

const StyledButton = styled.button`
  background-color: ${palette.red};
  border-radius: 6px;
  border: 2px solid ${palette.darkred};
  cursor: pointer;
  font-family: ${fontFamily};
  font-size: 1rem;
  font-weight: 500;
  line-height: 1rem;
  margin: 0;
  height: 3.5rem;
  padding: 0 1rem;
  color: ${palette.white};
  text-shadow: 1px 1px 0 ${palette.darkred};

  transition: background-color 0.1s, color 0.1s;

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

export const Button = ({ disabled, label, onClick }: ButtonProps) => {
  return (
    <StyledButton disabled={disabled} onClick={onClick}>
      {label}
    </StyledButton>
  );
};
