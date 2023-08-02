import styled from "@emotion/styled";
import { palette } from "../../theme/palette";
import { Issue } from "./Issue";
import { useState } from "react";
import { keyframes } from "@emotion/react";
import { Stack } from "../../layout/Stack";
import { Button } from "../../Button";

interface PreviousIssuesProps {
  issues: Issue[];
  setIssues: (issues: Issue[]) => void;
  validIssue: string | undefined;
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

const IssuesHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const IssuesHeaderText = styled.div`
  color: ${palette.white.main};
  background-color: ${palette.blue.main};
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
  border: 2px solid ${palette.blue.main};
  border-radius: 0 3px 3px 3px;
  display: flex;
  flex-direction: column;
`;

const IssuesFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const IssuesFooterText = styled.div`
  width: fit-content;
  padding: 0.15rem 0 0 0;
`;

const NoIssuesFound = styled.div`
  background-color: ${(props) => props.theme.issues.base.background};
  user-select: none;
  padding: 0.25rem 0.5rem;
  min-height: 2rem;
  text-align: center;
  flex: 1;
`;

export const PreviousIssues = ({
  issues,
  setIssues,
  validIssue,
}: PreviousIssuesProps) => {
  const [copied, setCopied] = useState<boolean>(false);
  const sortedIssues = issues.sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  return (
    <IssuesContainer>
      <IssuesHeader>
        <IssuesHeaderText>{"Previous Issues"}</IssuesHeaderText>
        {copied && <Copied copied={copied}>{"Copied!"}</Copied>}
      </IssuesHeader>
      <IssuesBody>
        {!issues.length ? (
          <NoIssuesFound>{"No issues found."}</NoIssuesFound>
        ) : (
          <Stack space="0">
            {sortedIssues.map((issue, index) => (
              <Issue
                key={index}
                issueKey={issue.key}
                issueText={issue.text}
                issueTimestamp={issue.timestamp}
                setCopied={setCopied}
                isLast={index === sortedIssues.length - 1}
                selected={issue.key === validIssue?.toUpperCase()}
              />
            ))}
          </Stack>
        )}
      </IssuesBody>
      {issues.length > 0 && (
        <IssuesFooter>
          <IssuesFooterText>
            <Button
              size="small"
              minWidth={10}
              buttonText="Clear"
              variant="red"
              onClick={() => setIssues([])}
            />
          </IssuesFooterText>
        </IssuesFooter>
      )}
    </IssuesContainer>
  );
};
