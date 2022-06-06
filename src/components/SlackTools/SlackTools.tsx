import {
  Button,
  Column,
  Columns,
  JustifyContent,
  Space,
  Stack,
} from "@neurotech/elements";
import { useState } from "react";
import styled from "styled-components";
import { language } from "../../utilities/language";
import { getSlackStatus, SlackStatusType } from "../../utilities/slack";
import { Tile } from "../Tile/Tile";
import { SlackStatus } from "./SlackStatus";

const ClearButton = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const getSuccessMessage = (status: SlackStatusType): string => {
  switch (status) {
    case "clear":
      return language.StatusClearedSuccessfully;

    case "brb":
      return language.StatusSetToBrb;

    case "lunch":
      return language.StatusSetToLunch;

    case "sunshine":
      return language.StatusSetToSunshine;

    case "laundry":
      return language.StatusSetToLaundry;

    case "tea":
      return language.StatusSetToTea;

    case "shopping":
      return language.StatusSetToShopping;

    default:
      return language.StatusSetSuccessfully;
  }
};

export const SlackTools = () => {
  const [statusText, setStatusText] = useState<string | undefined>(undefined);
  const [currentStatus, setCurrentStatus] = useState<SlackStatusType>("idle");
  const [expiry, setExpiry] = useState<number | null | undefined>();

  const handleStatusClick = async (status: SlackStatusType) => {
    setExpiry(null);
    setCurrentStatus("loading");

    const result = await window.Main.setSlackStatus(status);

    if (result?.success) {
      setStatusText(getSuccessMessage(status));

      if (status !== "clear") {
        const statusObject = getSlackStatus(status);
        const delay = Math.floor(
          statusObject.profile.status_expiration - new Date().getTime() / 1000
        );

        setExpiry(delay * 1000);
      } else {
        setExpiry(2750);
      }
    }

    if (result?.error) {
      setCurrentStatus("error");
    }
  };

  return (
    <Tile
      content={
        <Stack space={Space.None}>
          <Columns
            alignItems={"stretch"}
            justifyContent={JustifyContent.Stretch}
            space={Space.Small}
          >
            <Column>
              <Stack>
                <Button
                  emoji="🚪"
                  label="BRB"
                  onClick={() => handleStatusClick("brb")}
                  variant={"green"}
                />
                <Button
                  emoji="🍛"
                  label="Lunch"
                  onClick={() => handleStatusClick("lunch")}
                  variant={"green"}
                />
                <Button
                  emoji="🌞"
                  label="Sunshine"
                  onClick={() => handleStatusClick("sunshine")}
                  variant={"green"}
                />
              </Stack>
            </Column>
            <Column>
              <Stack>
                <Button
                  emoji="👕"
                  label="Laundry"
                  onClick={() => handleStatusClick("laundry")}
                  variant={"green"}
                />
                <Button
                  emoji="🍵"
                  label="Tea"
                  onClick={() => handleStatusClick("tea")}
                  variant={"green"}
                />
                <Button
                  emoji="🛍️"
                  label="Shopping"
                  onClick={() => handleStatusClick("shopping")}
                  variant={"green"}
                />
              </Stack>
            </Column>
            <Column flexGrow={1}>
              <SlackStatus
                setExpiry={setExpiry}
                setStatusText={setStatusText}
                status={currentStatus}
                statusText={statusText}
                expiry={expiry}
              />
            </Column>
          </Columns>
          <ClearButton>
            <Button
              emoji="⚠️"
              fullWidth
              label="Clear"
              onClick={() => handleStatusClick("clear")}
              variant={"red"}
            />
          </ClearButton>
        </Stack>
      }
      title={"Slack Tools"}
      variant={"yellow"}
    />
  );
};
