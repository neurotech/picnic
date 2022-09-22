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
  background-color: ${(props) => palette[props.variant].dim};
  border: 1px solid ${(props) => palette[props.variant].dark};
  border-radius: 4px;
  color: ${(props) => palette[props.variant].default};
  font-family: ${monoFontFamily};
  font-size: 12px;
  font-weight: normal;
  padding: 0.25rem;
  text-transform: uppercase;
  width: fit-content;
`;

export const Label = ({ label, variant }: LabelProps) => (
  <LabelContainer variant={variant}>{label}</LabelContainer>
);
