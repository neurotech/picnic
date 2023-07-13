import styled from "@emotion/styled";
import { ReactNode } from "react";

type PixelFont = "Px437 IBM VGA 8x16" | "GohuFont Medium";

interface PixelTextProps {
  text: string | ReactNode;
  fontFamily?: PixelFont;
}

interface StyledPixelTextProps {
  fontFamily: PixelFont;
}

const fontFamilySizeMap = {
  "Px437 IBM VGA 8x16": "16px",
  "GohuFont Medium": "11px",
};

const StyledPixelText = styled.div<StyledPixelTextProps>`
  font-family: "${(props) => props.fontFamily}";
  font-size: ${(props) => fontFamilySizeMap[props.fontFamily]};
  line-height: ${(props) => fontFamilySizeMap[props.fontFamily]};
  letter-spacing: 0;
  text-rendering: optimizeSpeed;
  image-rendering: pixelated;
  shape-rendering: optimizeSpeed;

  padding: 0.5rem;
  border-radius: 4px;
  flex: 0;

  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const PixelText = ({
  fontFamily = "Px437 IBM VGA 8x16",
  text,
}: PixelTextProps) => (
  <StyledPixelText fontFamily={fontFamily}>{text}</StyledPixelText>
);
