import { Column, Columns, Stack, themes } from "@neurotech/elements";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { ConfigDialog } from "./components/ConfigDialog/ConfigDialog";
import { HeaderBar } from "./components/HeaderBar/HeaderBar";
import { JiraTools } from "./components/JiraTools/JiraTools";
import { Scratchpad } from "./components/Scratchpad/Scratchpad";
import { SlackTools } from "./components/SlackTools/SlackTools";
import { GlobalStyles } from "./styles/GlobalStyles";

export const App = () => {
  const [configDialogOpen, setConfigDialogOpen] = useState<boolean>(false);
  return (
    <ThemeProvider theme={themes.dark}>
      <GlobalStyles />
      <ConfigDialog
        isVisible={configDialogOpen}
        setDialogOpen={setConfigDialogOpen}
      />
      <Stack>
        <HeaderBar setConfigDialogOpen={setConfigDialogOpen} />
        <Columns>
          <Column columnWidth="34%">
            <Stack flexGrow={1}>
              <JiraTools />
              <SlackTools />
            </Stack>
          </Column>
          <Column columnWidth="66%">
            <Scratchpad />
          </Column>
        </Columns>
      </Stack>
    </ThemeProvider>
  );
};
