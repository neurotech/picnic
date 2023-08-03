import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Button } from "./Button";
import { Theme, ThemeProvider } from "@emotion/react";
import { themes } from "./theme/themes";
import { GlobalStyles } from "./theme/GlobalStyles";
import { Stack } from "./layout/Stack";
import { Store } from "../electron/store";
import { Columns } from "./layout/Columns";
import { Column } from "./layout/Column";
import { Slack } from "./Slack/Slack";
import { Jira } from "./Jira/Jira";
import { TextHelpers } from "./TextHelpers/TextHelpers";
import { Card } from "./Card";
import { ConfigDialog } from "./ConfigDialog";
import { Reaction } from "./Slack/Reaction";
import { SlackDetails, parseInputForSlackDetails } from "./utilities/slack";
import { AllSidesIcon, GearIcon, MoonIcon } from "@radix-ui/react-icons";

const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

export const App = () => {
  const [configOpen, setConfigOpen] = useState<boolean>(false);
  const [config, setConfig] = useState<Store>(window.Main.store.get());
  const [slackDetails, setSlackDetails] = useState<SlackDetails | undefined>(
    undefined
  );
  const [theme, setTheme] = useState<Theme>(
    themes[config?.darkMode ? "dark" : "light"]
  );

  useEffect(() => {
    const interval = setInterval(async () => {
      const output = parseInputForSlackDetails(window.Main.readClipboardText());
      if (output) {
        setSlackDetails(output);
      } else {
        setSlackDetails(undefined);
      }
    }, 1500);
    return () => clearInterval(interval);
  }, []);

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
      <ConfigDialog open={configOpen} />
      <Container>
        <Stack>
          <Columns>
            <Column columnWidth="50%">
              <Jira />
            </Column>
            <Column columnWidth="50%">
              <Slack />
            </Column>
          </Columns>

          <Columns>
            <Column columnWidth="55%">
              <TextHelpers />
            </Column>
            <Column flexGrow={1}>
              <Reaction slackDetails={slackDetails} />
            </Column>
          </Columns>

          <Card heading="Tools">
            <Columns space="0.5rem" justifyContent="space-between">
              <Column columnWidth="33%">
                <Button
                  buttonText="Toggle Theme"
                  icon={<MoonIcon />}
                  onClick={() =>
                    setConfig((previousState) => ({
                      ...previousState,
                      darkMode: !previousState.darkMode,
                    }))
                  }
                  variant="purple"
                  stretch
                />
              </Column>
              <Column columnWidth="33%">
                <Button
                  buttonText="Resize Window"
                  icon={<AllSidesIcon />}
                  onClick={() => window.Main.resizeWindow()}
                  variant="red"
                  stretch
                />
              </Column>
              <Column columnWidth="33%">
                <Button
                  buttonText="Open Config"
                  icon={<GearIcon />}
                  onClick={() => setConfigOpen(true)}
                  stretch
                />
              </Column>
            </Columns>
          </Card>
        </Stack>
      </Container>
    </ThemeProvider>
  );
};
