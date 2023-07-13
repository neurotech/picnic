import { useEffect, useState } from "react";
import { Card } from "./Card";
import styled from "@emotion/styled";
import { Button } from "./Button";
import { Alert, AlertProps } from "./Alert";
import { Theme, ThemeProvider } from "@emotion/react";
import { themes } from "./themes";
import { GlobalStyles } from "./GlobalStyles";
import { Stack } from "./layout/Stack";
import { Store } from "../electron/store";
import { Columns } from "./layout/Columns";
import { Column } from "./layout/Column";
import { Slack } from "./Slack/Slack";
import { PixelText } from "./PixelText";
import { Jira } from "./Jira/Jira";

const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

export const App = () => {
  const [config, setConfig] = useState<Store>(window.Main.store.get());
  const [theme, setTheme] = useState<Theme>(
    themes[config?.darkMode ? "dark" : "light"]
  );

  useEffect(() => {
    setConfig(window.Main.store.get());
  }, []);

  useEffect(() => {
    window.Main.store.set(config);
    setTheme(themes[config?.darkMode ? "dark" : "light"]);
  }, [config]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles theme={theme} />
      <Container>
        <Stack>
          <Button
            buttonText="Toggle Theme"
            onClick={() =>
              setConfig((previousState) => ({
                ...previousState,
                darkMode: !previousState.darkMode,
              }))
            }
            variant="purple"
          />
          <Columns>
            <Column columnWidth="25%">
              <Jira />
            </Column>
            <Column>
              <Slack />
            </Column>
          </Columns>
        </Stack>
      </Container>
    </ThemeProvider>
  );
};
