import { Card } from "../Card";
import { Stack } from "../layout/Stack";
import { Separator } from "../Separator";
import { Time } from "./Time";
import { Vaporwave } from "./Vaporwave";
import { Zalgo } from "./Zalgo";

export const TextHelpers = () => {
  return (
    <Card heading="Text Helpers">
      <Stack>
        <Time />
        <Separator />
        <Vaporwave />
        <Separator />
        <Zalgo />
      </Stack>
    </Card>
  );
};
