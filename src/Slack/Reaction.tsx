import styled from "@emotion/styled";
import { SlackDetails, getEmojiListForInput } from "../utilities/slack";
import { useEffect, useState } from "react";
import { Columns } from "../layout/Columns";
import { Column } from "../layout/Column";
import { Stack } from "../layout/Stack";
import { TextInput } from "../TextHelpers/TextInput";
import formatRelative from "date-fns/formatRelative";
import { Connector } from "../Connector";
import { palette } from "../theme/palette";

interface ReactionProps {
  slackDetails?: SlackDetails;
}

const DetailsContainer = styled.div``;

const Channel = styled.div<{ active: boolean }>`
  padding: 1rem;
  flex: 1;
  border: 1px solid
    ${(props) => (props.active ? palette.green.main : palette.yellow.light)};
  border-radius: 2px;

  text-align: center;
  color: ${(props) =>
    props.active ? palette.green.main : palette.yellow.light};
`;
const Timestamp = styled.div<{ active: boolean }>`
  padding: 1rem;
  flex: 1;
  border: 1px solid
    ${(props) => (props.active ? palette.green.main : palette.yellow.light)};
  border-radius: 2px;

  text-align: center;
  color: ${(props) =>
    props.active ? palette.green.main : palette.yellow.light};
`;

const ConnectorContainer = styled.div`
  align-self: center;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Validation = styled.div<{ isValid: boolean }>`
  height: 20px;
  border-radius: 4px;
  background-color: ${(props) =>
    props.isValid ? palette.green.main : palette.red.main};
`;

// https://phocassoftware.slack.com/archives/DBNMKSPFZ/p1667279007479369

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

  return (
    <Stack>
      <Columns space="0">
        <Column columnWidth="50%">
          <Channel active={!!slackDetails}>{slackDetails?.channel}</Channel>
        </Column>
        <Column columnWidth="50px">
          <ConnectorContainer>
            <Connector active={!!slackDetails} />
          </ConnectorContainer>
        </Column>
        <Column columnWidth="50%">
          <Timestamp active={!!slackDetails}>{formattedTimestamp}</Timestamp>
        </Column>
      </Columns>
      <InputContainer>
        <TextInput
          active={!!reactionInput}
          onChange={(event) => setReactionInput(event.target.value)}
          onKeyDown={(event) => handleSubmit(event.key)}
          value={reactionInput}
        />
      </InputContainer>
      <Validation isValid={emojiList.length > 0} />
    </Stack>
  );
};
