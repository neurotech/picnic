import {
  Column,
  Columns,
  Input,
  JustifyContent,
  Space,
  Stack,
} from "@neurotech/elements";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { palette } from "../../styles/palette";
import {
  getStore,
  setStore,
  Store,
  storeDefaults,
} from "../../utilities/store";
import { Button } from "../Button/Button";
import { Tile } from "../Tile/Tile";

interface ConfigDialogProps {
  isVisible: boolean;
  setDialogOpen: (open: boolean) => void;
}

const ConfigDialogContainer = styled.div<{ isVisible: boolean }>`
  display: ${(props) => (props.isVisible ? "block" : "none")};
`;

const Backdrop = styled.div`
  align-items: flex-start;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  padding: 3rem;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 9;
`;

const Dialog = styled.div`
  border-radius: 0.33rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  z-index: 10;
`;

const Content = styled.div`
  flex: 1;
  padding-bottom: 1rem;
`;
const Footer = styled.div`
  border-top: 1px solid ${palette.gray.light};
  padding-top: 1rem;
`;

export const ConfigDialog = ({
  isVisible,
  setDialogOpen,
}: ConfigDialogProps) => {
  const [configuration, setConfiguration] = useState<Store>(storeDefaults);

  const getConfigValues = async () => {
    const storeValues = await getStore();
    setConfiguration(storeValues);
  };

  const saveConfigValues = async () => {
    await setStore(configuration);
    await getConfigValues();
  };

  useEffect(() => {
    getConfigValues();
  }, [isVisible]);

  return (
    <ConfigDialogContainer isVisible={isVisible}>
      <Backdrop>
        <Tile
          title={"Configure"}
          content={
            <Dialog>
              <Content>
                <Columns space={Space.Medium}>
                  <Column flexGrow={1}>
                    <Stack flexGrow={1}>
                      <Input
                        fullWidth
                        invalid={
                          !configuration.jiraUrl || configuration.jiraUrl === ""
                        }
                        label="Jira URL"
                        onChange={(e) =>
                          setConfiguration((prevState) => ({
                            ...prevState,
                            jiraUrl: e.target.value,
                          }))
                        }
                        value={configuration.jiraUrl}
                      />
                      <Input
                        fullWidth
                        invalid={
                          !configuration.jiraUsername ||
                          configuration.jiraUsername === ""
                        }
                        label="Jira Username"
                        onChange={(e) =>
                          setConfiguration((prevState) => ({
                            ...prevState,
                            jiraUsername: e.target.value,
                          }))
                        }
                        value={configuration.jiraUsername}
                      />
                      <Input
                        fullWidth
                        invalid={
                          !configuration.jiraToken ||
                          configuration.jiraToken === ""
                        }
                        label={"Jira Token"}
                        onChange={(e) =>
                          setConfiguration((prevState) => ({
                            ...prevState,
                            jiraToken: e.target.value,
                          }))
                        }
                        value={configuration.jiraToken}
                      />
                    </Stack>
                  </Column>
                  <Column flexGrow={1}>
                    <Stack flexGrow={1}>
                      <Input
                        fullWidth
                        invalid={
                          !configuration.slackToken ||
                          configuration.slackToken === ""
                        }
                        label={"Slack Token"}
                        onChange={(e) =>
                          setConfiguration((prevState) => ({
                            ...prevState,
                            slackToken: e.target.value,
                          }))
                        }
                        value={configuration.slackToken}
                      />
                    </Stack>
                  </Column>
                </Columns>
              </Content>
              <Footer>
                <Columns justifyContent={JustifyContent.FlexEnd}>
                  <Column>
                    <Button
                      label={"Cancel"}
                      onClick={() => setDialogOpen(false)}
                      variant={"gray"}
                    />
                  </Column>
                  <Column>
                    <Button
                      label={"Save"}
                      onClick={() => {
                        saveConfigValues();
                        setConfiguration(storeDefaults);
                        setDialogOpen(false);
                      }}
                      variant={"green"}
                    ></Button>
                  </Column>
                </Columns>
              </Footer>
            </Dialog>
          }
        ></Tile>
      </Backdrop>
    </ConfigDialogContainer>
  );
};
