import { Button } from "../Button";
import { ClockIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import enNZ from "date-fns/locale/en-NZ";
import enAU from "date-fns/locale/en-AU";
import utcToZonedTime from "date-fns-tz/utcToZonedTime";
import { Columns } from "../layout/Columns";
import { Column } from "../layout/Column";

const getTime = (nzFirst?: boolean) => {
  const now = new Date();
  const formatString = "h:mm a";
  const localTime = format(now, formatString, { locale: enAU });
  const nzTime = format(utcToZonedTime(now, "Pacific/Auckland"), formatString, {
    locale: enNZ,
  });

  if (nzFirst) {
    window.Main.setClipboardText(`${nzTime} NZ / ${localTime} AU`);
  } else {
    window.Main.setClipboardText(`${localTime} AU / ${nzTime} NZ`);
  }
};

export const Time = () => (
  <Columns>
    <Column columnWidth="50%">
      <Button
        buttonText="Get Local & NZ Time"
        icon={<ClockIcon />}
        onClick={() => getTime()}
        stretch
      />
    </Column>
    <Column columnWidth="50%">
      <Button
        buttonText="Get NZ & Local Time"
        icon={<ClockIcon />}
        onClick={() => getTime(true)}
        stretch
        variant="yellow"
      />
    </Column>
  </Columns>
);
