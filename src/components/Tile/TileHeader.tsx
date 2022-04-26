import { Column, Columns, JustifyContent } from "@neurotech/elements";
import styled from "styled-components";
import { palette } from "../../styles/palette";
import { TileVariant } from "./Tile";
import { Toggle } from "./Toggle";

interface TileHeaderProps {
  opened: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  variant: TileVariant;
}

const getVariantColours = (variant: TileVariant) => {
  switch (variant) {
    case "green":
      return {
        normal: { background: palette.green, text: palette.white },
        hover: {
          border: palette.darkgreen,
          text: palette.darkgreen,
          background: palette.lightgreen,
        },
      };

    case "yellow":
      return {
        normal: { background: palette.yellow, text: palette.white },
        hover: {
          border: palette.darkyellow,
          text: palette.darkyellow,
          background: palette.lightyellow,
        },
      };

    case "blue":
    default:
      return {
        normal: { background: palette.blue, text: palette.white },
        hover: {
          border: palette.darkblue,
          text: palette.darkblue,
          background: palette.lightblue,
        },
      };
  }
};

const StyledTileHeader = styled.div<{ variant: TileVariant }>`
  user-select: none;
  background-color: ${(props) =>
    getVariantColours(props.variant).normal.background};
  border: 2px solid ${palette.darkgray};
  border-radius: 4px 4px 0 0;
  font-weight: bold;
  padding: 0;
  text-shadow: 1px 1px 0 ${palette.darkgray};

  > * {
    cursor: pointer;
  }

  :hover {
    border-color: ${(props) => getVariantColours(props.variant).hover.border};
    color: ${(props) => getVariantColours(props.variant).hover.text};
    background-color: ${(props) =>
      getVariantColours(props.variant).hover.background};
    text-shadow: none;
  }
`;

const HeaderText = styled.div`
  margin: 0.33rem 0.5rem;
`;
export const TileHeader = ({
  opened,
  setOpen,
  title,
  variant,
}: TileHeaderProps) => {
  return (
    <StyledTileHeader onClick={() => setOpen(!opened)} variant={variant}>
      <Columns
        alignItems={"center"}
        justifyContent={JustifyContent.SpaceBetween}
      >
        <Column>
          <HeaderText>{title}</HeaderText>
        </Column>
        <Column>
          <Toggle onClick={() => setOpen(!opened)} open={opened} />
        </Column>
      </Columns>
    </StyledTileHeader>
  );
};
