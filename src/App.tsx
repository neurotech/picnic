import { Stack } from "@neurotech/elements";
import { Scratchpad } from "./components/Scratchpad/Scratchpad";
import { GlobalStyles } from "./styles/GlobalStyles";

export const App = () => (
  <>
    <GlobalStyles />
    <Stack>
      {"Picnic"}
      <Scratchpad />
    </Stack>
  </>
);
