import { Space, Stack } from "@neurotech/elements";
import { ReactElement, useState } from "react";
import styled from "styled-components";
import { palette } from "../../styles/palette";
import { TileHeader } from "./TileHeader";

export type TileVariant = "blue" | "yellow" | "green";

interface TileProps {
  content: ReactElement;
  title: string;
  variant: TileVariant;
}

const TileBody = styled.div`
  background-color: ${palette.lightgray};
  border: 2px solid ${palette.darkgray};
  border-top-width: 0;
  border-radius: 0 0 4px 4px;
  color: ${palette.ash};
  padding: 1rem;
`;

export const Tile = ({ content, title, variant }: TileProps) => {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <Stack space={Space.None}>
      <TileHeader
        opened={open}
        setOpen={setOpen}
        title={title}
        variant={variant}
      />
      {open && <TileBody>{content}</TileBody>}
    </Stack>
  );
};
