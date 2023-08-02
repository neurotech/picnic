import { useState } from "react";
import { Alert } from "../Alert";
import { Button } from "../Button";
import { Card } from "../Card";
import { Column } from "../layout/Column";
import { Columns } from "../layout/Columns";
import { Stack } from "../layout/Stack";
import {
  SlackStatusType,
  getAlertLevel,
  getSuccessMessage,
} from "../utilities/slack";
import { language } from "../utilities/language";
import {
  CookieIcon,
  CrossCircledIcon,
  LinkBreak2Icon,
  MagicWandIcon,
  SunIcon,
} from "@radix-ui/react-icons";

export const Slack = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [statusText, setStatusText] = useState<string>(
    language.PleaseSelectAStatus
  );
  const [currentStatus, setCurrentStatus] = useState<SlackStatusType>("idle");

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
                icon={<LinkBreak2Icon />}
                onClick={() => handleStatusClick("brb")}
                stretch
              />
              <Button
                disabled={isLoading}
                buttonText="Lunch"
                icon={<CookieIcon />}
                onClick={() => handleStatusClick("lunch")}
                stretch
              />
            </Stack>
          </Column>
          <Column columnWidth="25%">
            <Stack>
              <Button
                disabled={isLoading}
                buttonText="Laundry"
                icon={<MagicWandIcon />}
                onClick={() => handleStatusClick("laundry")}
                stretch
              />
              <Button
                disabled={isLoading}
                buttonText="Sunshine"
                icon={<SunIcon />}
                onClick={() => handleStatusClick("sunshine")}
                stretch
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
          icon={<CrossCircledIcon />}
          onClick={() => handleStatusClick("clear")}
          stretch
          variant="red"
        />
      </Stack>
    </Card>
  );
};
