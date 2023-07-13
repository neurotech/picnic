import styled from "@emotion/styled";
import { palette } from "../../theme/palette";
import { Issue } from "./Issue";
import { useState } from "react";
import { keyframes } from "@emotion/react";

interface PreviousIssuesProps {
  issues: Issue[];
}

export interface Issue {
  key: string;
  text: string;
  timestamp: Date;
}

interface CopiedProps {
  copied: boolean;
}

const IssuesContainer = styled.div``;

const IssuesHeading = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;
const IssuesHeadingText = styled.div`
  color: ${palette.white.main};
  background-color: ${palette.purple.main};
  width: fit-content;
  padding: 0.25rem 0.5rem;
  border-radius: 3px 3px 0 0;
  user-select: none;
`;

const fade = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Copied = styled.div<CopiedProps>`
  user-select: none;
  color: ${palette.yellow.dark};
  background-color: ${palette.yellow.main};
  font-weight: 500;
  border-radius: 3px;
  font-size: 11px;
  line-height: 11px;
  padding: 0.25rem 0.5rem;

  animation-direction: ${(props) => (props.copied ? "backwards" : "normal")};
  animation-name: ${fade};
  animation-duration: 1s;
  animation-timing-function: ease;
`;

const IssuesBody = styled.div`
  border: 2px solid ${palette.purple.main};
  border-radius: 0 3px 3px 3px;
  display: flex;
  flex-direction: column;
`;
const NoIssuesFound = styled.div`
  user-select: none;
  padding: 0.25rem 0.5rem;
  min-height: 2rem;
  text-align: center;
  flex: 1;
`;

export const PreviousIssues = ({ issues }: PreviousIssuesProps) => {
  const [copied, setCopied] = useState<boolean>(false);

  return (
    <IssuesContainer>
      <IssuesHeading>
        <IssuesHeadingText>{"Previous Issues"}</IssuesHeadingText>
        {copied && <Copied copied={copied}>{"Copied!"}</Copied>}
      </IssuesHeading>
      <IssuesBody>
        {!issues.length ? (
          <NoIssuesFound>{"No issues found."}</NoIssuesFound>
        ) : (
          issues.map((issue, index) => (
            <Issue
              key={index}
              issueKey={issue.key}
              issueText={issue.text}
              issueTimestamp={issue.timestamp}
              setCopied={setCopied}
            />
          ))
        )}
      </IssuesBody>
    </IssuesContainer>
  );
};
