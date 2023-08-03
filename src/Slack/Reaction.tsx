import styled from "@emotion/styled";
import { SlackDetails, getEmojiListForInput } from "../utilities/slack";
import { useEffect, useState } from "react";
import { Columns } from "../layout/Columns";
import { Column } from "../layout/Column";
import { Stack } from "../layout/Stack";
import { TextInput } from "../TextHelpers/TextInput";
import formatRelative from "date-fns/formatRelative";
import { Card } from "../Card";
import { Dossier } from "../Dossier";
import { Alert, AlertLevel } from "../Alert";

interface ReactionProps {
  slackDetails?: SlackDetails;
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledAlert = styled(Alert)`
  border-radius: 0;
`;

const getAlert = (
  slackDetails: SlackDetails | undefined,
  reactionInput: string,
  emojiListLength: number
): [string, AlertLevel] => {
  if (slackDetails) {
    if (!reactionInput) {
      return [
        "Valid Slack link found in clipboard. Please enter a word above.",
        "warning",
      ];
    }

    if (reactionInput) {
      if (emojiListLength < 1) {
        return [
          `"${reactionInput}" is invalid! You have too many occurrences of a letter.`,
          "error",
        ];
      } else {
        return [
          `"${reactionInput}" is valid. Press Enter to send your reaction!`,
          "success",
        ];
      }
    }
  }

  return ["Please copy a link to a Slack message to your clipboard.", "info"];
};

export const Reaction = ({ slackDetails }: ReactionProps) => {
  let formattedTimestamp;
  const [reactionInput, setReactionInput] = useState<string>("");
  const [emojiList, setEmojiList] = useState<string[]>([]);

  if (slackDetails && slackDetails.timestamp) {
    const readableDate = formatRelative(
      new Date(parseFloat(slackDetails.unixTimestamp)),
      new Date()
    );
    formattedTimestamp =
      readableDate.charAt(0).toUpperCase() + readableDate.slice(1);
  }

  useEffect(() => {
    const list = getEmojiListForInput(reactionInput);

    if (list && list.length) {
      setEmojiList(list);
    } else {
      setEmojiList([]);
    }
  }, [reactionInput]);

  const handleSubmit = async (key: string) => {
    if (key === "Enter") {
      if (!slackDetails) return;
      if (!getEmojiListForInput(reactionInput)) return;

      const chimes = new Audio("./sounds/chimes.wav");
      chimes.play();
      await window.Main.sendSlackReaction(
        slackDetails?.channel,
        slackDetails?.timestamp,
        emojiList
      );
      setReactionInput("");
    }

    if (key === "Escape") {
      setReactionInput("");
    }
  };

  const [alertText, alertLevel] = getAlert(
    slackDetails,
    reactionInput,
    emojiList.length
  );

  return (
    <Card heading={"Reaction"}>
      <Stack>
        <Columns>
          <Column columnWidth="50%">
            <Dossier
              headerText={"Message ID"}
              bodyContent={
                <StyledAlert
                  alertText={slackDetails?.channel || "—"}
                  level={slackDetails?.channel ? "success" : "neutral"}
                  monospace={Boolean(slackDetails)}
                  stretch
                />
              }
              position="left"
              variant={slackDetails?.channel ? "green" : "blue"}
            />
          </Column>
          <Column columnWidth="50%">
            <Dossier
              headerText={"Message Timestamp"}
              bodyContent={
                <StyledAlert
                  alertText={formattedTimestamp || "—"}
                  level={formattedTimestamp ? "success" : "neutral"}
                  stretch
                />
              }
              position="right"
              variant={formattedTimestamp ? "green" : "blue"}
            />
          </Column>
        </Columns>
        <InputContainer>
          <TextInput
            active={!!reactionInput}
            invalid={!!reactionInput && emojiList.length < 1}
            disabled={!slackDetails}
            onChange={(event) => setReactionInput(event.target.value)}
            onKeyDown={(event) => handleSubmit(event.key)}
            value={reactionInput}
          />
        </InputContainer>
        <Alert alertText={alertText} level={alertLevel} stretch />
      </Stack>
    </Card>
  );
};
