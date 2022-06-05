import { Column, Columns, Stack } from "@neurotech/elements";
import { useState } from "react";
import { ConfigDialog } from "./components/ConfigDialog/ConfigDialog";
import { HeaderBar } from "./components/HeaderBar/HeaderBar";
import { JiraTools } from "./components/JiraTools/JiraTools";
import { Scratchpad } from "./components/Scratchpad/Scratchpad";
import { SlackTools } from "./components/SlackTools/SlackTools";
import { GlobalStyles } from "./styles/GlobalStyles";

export const App = () => {
  const [configDialogOpen, setConfigDialogOpen] = useState<boolean>(false);
  return (
    <>
      <GlobalStyles />
      <ConfigDialog
        isVisible={configDialogOpen}
        setDialogOpen={setConfigDialogOpen}
      />
      <Stack>
        <HeaderBar setConfigDialogOpen={setConfigDialogOpen} />
        <Columns>
          <Column columnWidth="34%">
            <Stack>
              <JiraTools />
              <SlackTools />
            </Stack>
          </Column>
          <Column columnWidth="66%">
            <Scratchpad />
          </Column>
        </Columns>
      </Stack>
    </>
  );
};
