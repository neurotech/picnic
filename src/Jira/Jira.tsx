import { Card } from "../Card";
import { Columns } from "../layout/Columns";
import { Column } from "../layout/Column";
import { Button } from "../Button";
import { Stack } from "../layout/Stack";
import { useState, useEffect } from "react";
import { Issue, PreviousIssues } from "./PreviousIssues/PreviousIssues";
import { Separator } from "../Separator";
import { JiraStatus } from "./JiraStatus";

const getIssue = (rawText: string): string => {
  let issue = "";

  if (typeof rawText !== "string") {
    return issue;
  }

  const expression = /^[fs-]+\d+/gm;
  const matched = rawText.toLowerCase().match(expression);

  if (matched?.length) {
    issue = matched[0];
  }

  return issue.toLowerCase();
};

const parseClipboard = (
  setIssues: (issues: Issue[]) => void,
  setValidIssue: (validIssue?: string) => void
) => {
  const matched = getIssue(window.Main.readClipboardText());

  if (matched) {
    setValidIssue(matched);

    const keyIsNew =
      window.Main.store
        .get()
        .issues.find((i) => i.key.toLowerCase() === matched) === undefined;

    if (keyIsNew) {
      const config = window.Main.store.get();
      window.Main.store.set({
        ...config,
        issues: [
          ...config.issues,
          {
            key: matched.toUpperCase(),
            text: "TODO",
            timestamp: new Date(),
          },
        ],
      });
      setIssues(window.Main.store.get().issues);
    }
  } else {
    setValidIssue();
  }
};

export const Jira = () => {
  const [validIssue, setValidIssue] = useState<string | undefined>();
  const [issues, setIssues] = useState<Issue[]>(
    window.Main.store.get().issues ?? []
  );
  useEffect(() => {
    setInterval(() => parseClipboard(setIssues, setValidIssue), 1500);
  }, []);

  return (
    <Card heading={"Jira"}>
      <Stack>
        <JiraStatus validIssue={validIssue} />
        <Columns justifyContent="space-between">
          <Column columnWidth="50%">
            <Button
              disabled={!validIssue}
              stretch
              buttonText="Generate a Branch Name"
            />
          </Column>
          <Column columnWidth="50%">
            <Button
              disabled={!validIssue}
              stretch
              buttonText="Generate a PR Name"
              variant="green"
            />
          </Column>
        </Columns>
        <Separator />
        <PreviousIssues issues={issues} />
      </Stack>
    </Card>
  );
};
