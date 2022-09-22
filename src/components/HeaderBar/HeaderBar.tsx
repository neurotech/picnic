import { Column, Columns, JustifyContent } from "@neurotech/elements";
import { Button } from "../Button/Button";
import { Logo } from "./Logo";

interface HeaderBarProps {
  setConfigDialogOpen: (open: boolean) => void;
}

export const HeaderBar = ({ setConfigDialogOpen }: HeaderBarProps) => (
  <Columns alignItems={"center"} justifyContent={JustifyContent.SpaceBetween}>
    <Column>
      <Logo />
    </Column>
    <Column>
      <Button
        label={"⚙️"}
        onClick={() => setConfigDialogOpen(true)}
        variant={"gray"}
      />
    </Column>
  </Columns>
);
