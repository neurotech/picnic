import styled from "@emotion/styled";
import { Card } from "../Card";
import { Columns } from "../layout/Columns";
import { Column } from "../layout/Column";
import { Button } from "../Button";
import { Stack } from "../layout/Stack";
import { Alert } from "../Alert";
import { palette } from "../palette";
import { PreviousIssue } from "./PreviousIssue";
import { useState, useEffect } from "react";

const PreviousIssuesContainer = styled.div``;
const PreviousIssuesHeading = styled.div`
  color: ${palette.white.main};
  background-color: ${palette.purple.main};
  width: fit-content;
  padding: 0.25rem 0.5rem;
  border-radius: 3px 3px 0 0;
`;
const PreviousIssuesBody = styled.div`
  background-color: ${palette.ash.main};
  border: 2px solid ${palette.purple.main};
  border-radius: 0 3px 3px 3px;
  color: ${palette.ash.light};

  white-space: break-spaces;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface Issue {
  key: string;
  text: string;
  timestamp: Date;
}

const previousIssues: Issue[] = [
  { key: "FS-1234", text: "Issue Text 1", timestamp: new Date() },
  { key: "FS-5678", text: "Issue Text 2", timestamp: new Date() },
];

export const Jira = () => {
  const [clipboardText, setClipboardText] = useState<string>(
    window.Main.readClipboardText()
  );
  useEffect(() => {
    setInterval(() => setClipboardText(window.Main.readClipboardText()), 1000);
  }, []);

  return (
    <Card heading={"Jira"}>
      <Stack>
        <Alert
          alertText="No valid issue key found in clipboard."
          level="neutral"
        />
        <Columns>
          <Column>
            <Button buttonText="Generate a Branch Name" />
          </Column>
          <Column>
            <Button buttonText="Generate a PR Name" />
          </Column>
        </Columns>

        <PreviousIssuesContainer>
          <PreviousIssuesHeading>{"Previous Issues"}</PreviousIssuesHeading>
          <PreviousIssuesBody>
            {previousIssues.map((issue, index) => (
              <PreviousIssue
                key={index}
                issueKey={issue.key}
                issueText={issue.text}
                issueTimestamp={issue.timestamp}
              />
            ))}
          </PreviousIssuesBody>
        </PreviousIssuesContainer>
      </Stack>
    </Card>
  );
};
