import { JustifyContent, Stack, themes } from "@neurotech/elements";
import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { ConfigDialog } from "./components/ConfigDialog/ConfigDialog";
import { HeaderBar } from "./components/HeaderBar/HeaderBar";
import { JiraTools } from "./components/JiraTools/JiraTools";
import { Scratchpad } from "./components/Scratchpad/Scratchpad";
import { SlackTools } from "./components/SlackTools/SlackTools";
import { GlobalStyles } from "./styles/GlobalStyles";

const ColumnsContainer = styled.div`
  display: flex;
`;

const LeftColumn = styled.div`
  margin-right: 1rem;
  min-width: 600px;
`;

const RightColumn = styled.div`
  flex: 1;
`;

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

        <ColumnsContainer>
          <LeftColumn>
            <Stack justifyContent={JustifyContent.Stretch}>
              <JiraTools />
              <SlackTools />
            </Stack>
          </LeftColumn>

          <RightColumn>
            <Scratchpad />
          </RightColumn>
        </ColumnsContainer>
      </Stack>
    </ThemeProvider>
  );
};
