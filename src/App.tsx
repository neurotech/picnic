import { Column, Columns, Stack } from "@neurotech/elements";
import { JiraTools } from "./components/JiraTools/JiraTools";
import { Scratchpad } from "./components/Scratchpad/Scratchpad";
import { SlackTools } from "./components/SlackTools/SlackTools";
import { Tile } from "./components/Tile/Tile";
import { GlobalStyles } from "./styles/GlobalStyles";

export const App = () => (
  <>
    <GlobalStyles />
    <Stack>
      {"Picnic"}
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
