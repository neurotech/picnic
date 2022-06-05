import styled from "styled-components";
import { monoFontFamily } from "../styles/GlobalStyles";
import { palette } from "../styles/palette";

type LabelVariant = "blue" | "green" | "yellow";

interface LabelProps {
  label: string;
  variant: LabelVariant;
}

type LabelContainerProps = Pick<LabelProps, "variant">;

const LabelContainer = styled.div<LabelContainerProps>`
  background-color: ${(props) => palette[props.variant]};
  border-radius: 4px;
  border: 2px solid ${(props) => palette[`dark${props.variant}`]};
  color: ${palette.white};
  font-family: ${monoFontFamily};
  font-size: 12px;
  font-weight: bold;
  padding: 0.25rem;
  text-shadow: 1px 1px 0 ${(props) => palette[`dark${props.variant}`]};
  text-transform: uppercase;
  width: fit-content;
`;

export const Label = ({ label, variant }: LabelProps) => (
  <LabelContainer variant={variant}>{label}</LabelContainer>
);
