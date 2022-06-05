import {
  Column,
  Columns,
  JustifyContent,
  Space,
  Stack,
} from "@neurotech/elements";
import { useState } from "react";
import { language } from "../../utilities/language";
import { SlackStatusType } from "../../utilities/slack";
import { Button } from "../Button";
import { Tile } from "../Tile/Tile";
import { SlackStatus } from "./SlackStatus";

export const SlackTools = () => {
  const [statusText, setStatusText] = useState<string>(
    language.PleaseSelectAStatus
  );
  const handleStatusClick = async (status: SlackStatusType) => {
    setStatusText(language.SendingStatusToSlackAPI);

    const result = await window.Main.setSlackStatus(status);

    if (result?.success) {
      setStatusText(language.StatusSetSuccessfully);
    }

    if (result?.error) {
      setStatusText(language.ErrorSendingStatusToSlackAPI);
    }
  };

  return (
    <Tile
      content={
        <Columns
          alignItems={"stretch"}
          justifyContent={JustifyContent.Stretch}
          space={Space.Small}
        >
          <Column>
            <Stack>
              <Button
                emoji="⚠️"
                label="Clear"
                onClick={() => handleStatusClick("clear")}
              />
              <Button
                emoji="🚪"
                label="BRB"
                onClick={() => handleStatusClick("brb")}
              />
              <Button
                emoji="🍛"
                label="Lunch"
                onClick={() => handleStatusClick("lunch")}
              />
              <Button
                emoji="🌞"
                label="Sunshine"
                onClick={() => handleStatusClick("sunshine")}
              />
            </Stack>
          </Column>
          <Column>
            <Stack>
              <Button
                emoji="👕"
                label="Laundry"
                onClick={() => handleStatusClick("laundry")}
              />
              <Button
                emoji="🍵"
                label="Tea"
                onClick={() => handleStatusClick("tea")}
              />
              <Button
                emoji="🛍️"
                label="Shopping"
                onClick={() => handleStatusClick("shopping")}
              />
            </Stack>
          </Column>
          <Column flexGrow={1}>
            <SlackStatus statusText={statusText} />
          </Column>
        </Columns>
      }
      title={"Slack Tools"}
      variant={"yellow"}
    />
  );
};
