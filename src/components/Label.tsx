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
  font-family: ${monoFontFamily};
  background-color: ${(props) => palette[props.variant]};
  padding: 0.25rem;
  border: 2px solid ${(props) => palette[`dark${props.variant}`]};
  border-radius: 4px;
  width: fit-content;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 12px;
  text-shadow: 1px 1px 0 ${(props) => palette[`dark${props.variant}`]};
`;

export const Label = ({ label, variant }: LabelProps) => (
  <LabelContainer variant={variant}>{label}</LabelContainer>
);
