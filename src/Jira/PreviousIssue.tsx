import styled from "@emotion/styled";
import { Button } from "../Button";
import format from "date-fns/format";

interface PreviousIssueProps {
  issueKey: string;
  issueText: string;
  issueTimestamp: Date;
}

const PreviousIssueContainer = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-height: 4rem;
  align-items: center;

  :hover {
    cursor: pointer;
    background-color: red;
  }
  :active {
    cursor: pointer;
    background-color: yellow;
  }
`;

const PreviousIssueText = styled.div``;

export const PreviousIssue = ({
  issueKey,
  issueText,
  issueTimestamp,
}: PreviousIssueProps) => {
  return (
    <PreviousIssueContainer
      onClick={() => window.Main.setClipboardText(issueKey)}
    >
      <PreviousIssueText>
        {`[${format(issueTimestamp, "p")}] ${issueText}`}
      </PreviousIssueText>
    </PreviousIssueContainer>
  );
};
