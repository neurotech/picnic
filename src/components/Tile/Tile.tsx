import { JustifyContent, Space, Stack } from "@neurotech/elements";
import { ReactElement } from "react";
import styled from "styled-components";
import { palette } from "../../styles/palette";

interface TileProps {
  content: ReactElement;
  title: string;
}

const TileHeader = styled.div`
  border-bottom: 1px solid ${palette.gray.light};
  color: ${palette.gray.bright};
  flex-grow: 0;
  font-size: 18px;
  font-weight: normal;
  margin: 0 0 1rem 0;
  padding: 0 0 1rem 0;
  text-shadow: 1px 1px 0 black;
  user-select: none;
`;

const TileBody = styled.div`
  background-color: ${palette.gray.default};
  border: 1px solid ${palette.gray.light};
  border-radius: 4px;
  box-shadow: 0 0 0 1px black;
  color: ${palette.gray.bright};
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1rem;
`;

export const Tile = ({ content, title }: TileProps) => {
  return (
    <Stack
      justifyContent={JustifyContent.FlexStart}
      flexGrow={1}
      flexShrink={0}
      space={Space.None}
    >
      <TileBody>
        <TileHeader>{title}</TileHeader>
        {content}
      </TileBody>
    </Stack>
  );
};
