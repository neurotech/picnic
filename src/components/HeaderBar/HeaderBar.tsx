import { Button, Column, Columns, JustifyContent } from "@neurotech/elements";
import styled from "styled-components";

interface HeaderBarProps {
  setConfigDialogOpen: (open: boolean) => void;
}

const Logo = styled.div`
  font-size: 1.66rem;
  font-weight: bold;
`;

export const HeaderBar = ({ setConfigDialogOpen }: HeaderBarProps) => (
  <Columns alignItems={"center"} justifyContent={JustifyContent.SpaceBetween}>
    <Column>
      <Logo>{"Picnic"}</Logo>
    </Column>
    <Column>
      <Button
        label={"Configure"}
        onClick={() => setConfigDialogOpen(true)}
        variant={"green"}
      />
    </Column>
  </Columns>
);
