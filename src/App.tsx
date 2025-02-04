import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { Button } from './Button'
import { type Theme, ThemeProvider } from '@emotion/react'
import { themes } from './theme/themes'
import { GlobalStyles } from './theme/GlobalStyles'
import { Stack } from './layout/Stack'
import type { Store } from '../electron/store'
import { Columns } from './layout/Columns'
import { Column } from './layout/Column'
import { Slack } from './Slack/Slack'
import { Jira } from './Jira/Jira'
import { TextHelpers } from './TextHelpers/TextHelpers'
import { Card } from './Card'
import { ConfigDialog } from './ConfigDialog'
import { Reaction } from './Slack/Reaction'
import { type SlackDetails, parseInputForSlackDetails } from './utilities/slack'
import {
  AllSidesIcon,
  CameraIcon,
  GearIcon,
  MoonIcon
} from '@radix-ui/react-icons'
import { DrivewayCamera } from './DrivewayCamera/DrivewayCamera'
import { LivingWorlds } from './LivingWorlds/LivingWorlds'

const Container = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`

export const App = () => {
  const [configOpen, setConfigOpen] = useState<boolean>(false)
  const [config, setConfig] = useState<Store>(window.Main.store.get())
  const [drivewayCameraOpen, setDrivewayCameraOpen] = useState<boolean>(false)
  const [slackDetails, setSlackDetails] = useState<SlackDetails | undefined>()
  const [theme, setTheme] = useState<Theme>(
    themes[config?.darkMode ? 'dark' : 'light']
  )

  useEffect(() => {
    setConfig(window.Main.store.get())

    const interval = setInterval(async () => {
      setSlackDetails(
        parseInputForSlackDetails(window.Main.readClipboardText())
      )
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    window.Main.store.set(config)
    setTheme(themes[config?.darkMode ? 'dark' : 'light'])
  }, [config])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles theme={theme} />
      <ConfigDialog open={configOpen} />
      <DrivewayCamera open={drivewayCameraOpen} />
      <Container>
        <Stack justifyContent="space-between">
          <Stack>
            <Columns>
              <Column columnWidth="40%">
                <Slack />
              </Column>
              <Column columnWidth="60%">
                <Jira />
              </Column>
            </Columns>

            <Columns justifyContent="space-between">
              <Column flexGrow={1}>
                <Stack>
                  <Reaction slackDetails={slackDetails} />
                  <TextHelpers />
                  <Card heading="Tools">
                    <Columns>
                      <Column flexGrow={1}>
                        <Stack>
                          <Button
                            buttonText="Toggle Theme"
                            icon={<MoonIcon />}
                            onClick={() =>
                              setConfig((previousState) => ({
                                ...previousState,
                                darkMode: !previousState.darkMode
                              }))
                            }
                            variant="purple"
                            stretch
                          />
                          <Button
                            buttonText="Resize Window"
                            icon={<AllSidesIcon />}
                            onClick={() => window.Main.resizeWindow()}
                            variant="red"
                            stretch
                          />
                        </Stack>
                      </Column>
                      <Column flexGrow={1}>
                        <Stack>
                          <Button
                            buttonText="Open Config"
                            icon={<GearIcon />}
                            onClick={() => setConfigOpen(true)}
                            stretch
                          />
                          <Button
                            buttonText="Access Driveway Camera"
                            icon={<CameraIcon />}
                            onClick={() => setDrivewayCameraOpen(true)}
                            variant="green"
                            stretch
                          />
                        </Stack>
                      </Column>
                    </Columns>
                  </Card>
                </Stack>
              </Column>

              <Column flexGrow={0}>
                <LivingWorlds />
              </Column>
            </Columns>
          </Stack>
        </Stack>
      </Container>
    </ThemeProvider>
  )
}
