import { useEffect, useState } from "react";
import { Alert } from "../Alert";
import { Button } from "../Button";
import { Card } from "../Card";
import { Column } from "../layout/Column";
import { Columns } from "../layout/Columns";
import { Stack } from "../layout/Stack";
import { Separator } from "../Separator";
import {
  SlackDetails,
  SlackStatusType,
  getAlertLevel,
  getSuccessMessage,
  parseInputForSlackDetails,
} from "../utilities/slack";
import { language } from "../utilities/language";
import { Reaction } from "./Reaction";

export const Slack = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [statusText, setStatusText] = useState<string>(
    language.PleaseSelectAStatus
  );
  const [currentStatus, setCurrentStatus] = useState<SlackStatusType>("idle");
  const [slackDetails, setSlackDetails] = useState<SlackDetails | undefined>();

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

  const handleStatusClick = async (status: SlackStatusType) => {
    setIsLoading(true);
    setCurrentStatus("loading");

    const result = await window.Main.setSlackStatus(status);

    if (result?.success) {
      setCurrentStatus("success");
      setStatusText(getSuccessMessage(status));
    }

    if (result?.error) {
      setCurrentStatus("error");
    }

    setIsLoading(false);

    setTimeout(() => {
      setCurrentStatus("idle");
      setStatusText(language.PleaseSelectAStatus);
    }, 3000);
  };
  return (
    <Card heading={"Slack"}>
      <Stack>
        <Columns>
          <Column columnWidth="25%">
            <Stack>
              <Button
                disabled={isLoading}
                buttonText="BRB"
                emoji="🚪"
                onClick={() => handleStatusClick("brb")}
                stretch
                variant="green"
              />
              <Button
                disabled={isLoading}
                buttonText="Lunch"
                emoji="🍛"
                onClick={() => handleStatusClick("lunch")}
                stretch
                variant="yellow"
              />
              <Button
                disabled={isLoading}
                buttonText="Sunshine"
                emoji="🌞"
                onClick={() => handleStatusClick("sunshine")}
                stretch
                variant="blue"
              />
            </Stack>
          </Column>
          <Column columnWidth="25%">
            <Stack>
              <Button
                disabled={isLoading}
                buttonText="Laundry"
                emoji="👕"
                onClick={() => handleStatusClick("laundry")}
                stretch
                variant="green"
              />
              <Button
                disabled={isLoading}
                buttonText="Tea"
                emoji="🍵"
                onClick={() => handleStatusClick("tea")}
                stretch
                variant="yellow"
              />
              <Button
                disabled={isLoading}
                buttonText="Shopping"
                emoji="🛍️"
                onClick={() => handleStatusClick("shopping")}
                stretch
                variant="blue"
              />
            </Stack>
          </Column>
          <Column columnWidth="50%">
            <Alert
              alertText={statusText}
              level={getAlertLevel(currentStatus)}
              stretch
            />
          </Column>
        </Columns>
        <Button
          disabled={isLoading}
          buttonText="Clear Status"
          emoji="🧹"
          onClick={() => handleStatusClick("clear")}
          stretch
          variant="red"
        />
        <Separator />
        <Reaction slackDetails={slackDetails} />
      </Stack>
    </Card>
  );
};
