import { Card } from "../Card";
import { Columns } from "../layout/Columns";
import { Column } from "../layout/Column";
import { Button } from "../Button";
import { Stack } from "../layout/Stack";
import { useState, useEffect } from "react";
import { Issue, PreviousIssues } from "./PreviousIssues/PreviousIssues";
import { Separator } from "../Separator";
import { Alert, AlertLevel } from "../Alert";
import { language } from "../utilities/language";

export type RequestType = "branch" | "pr" | "issueText";

export interface GeneratedText {
  text: string;
  issueKey: string;
  issueText: string;
}

const getIssue = (rawText: string): string => {
  let issue = "";

  if (typeof rawText !== "string" || rawText.length >= 10) {
    return issue;
  }

  const expression = /^[fs-]+\d+/gm;
  const matched = rawText.toLowerCase().match(expression);

  if (matched?.length) {
    issue = matched[0];
  }

  return issue.toLowerCase();
};

export const Jira = () => {
  const [alertText, setAlertText] = useState<string>(
    language.NoValidIssueKeyFoundInClipboard
  );
  const [alertLevel, setAlertLevel] = useState<AlertLevel>("neutral");
  const [validIssue, setValidIssue] = useState<string | undefined>();

  const [issues, setIssues] = useState<Issue[]>(
    window.Main.store.get().issues ?? []
  );

  useEffect(() => {
    const currentConfig = window.Main.store.get();
    window.Main.store.set({ ...currentConfig, issues });
  }, [issues]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const matched = getIssue(window.Main.readClipboardText());

      if (matched) {
        setValidIssue(matched);
        setAlertLevel("success");
        setAlertText(
          `${language.ValidIssueKeyFoundInClipboard} ${matched.toUpperCase()}`
        );

        const keyIsNew =
          issues.find((i) => i.key.toLowerCase() === matched) === undefined;

        if (keyIsNew) {
          const issue = await window.Main.generateText("issueText", matched);

          if (issue?.success) {
            setIssues((prevState) => [
              ...prevState,
              {
                key: matched.toUpperCase(),
                text: issue.data?.issueText || "",
                timestamp: new Date(),
              },
            ]);
          }

          if (issue?.error) {
            setAlertLevel("error");
            setAlertText(language.ErrorQueryingTheJiraAPI);
          }
        }
      } else {
        setValidIssue(undefined);
        setAlertLevel("neutral");
        setAlertText(language.NoValidIssueKeyFoundInClipboard);
      }
    }, 1500);
    return () => clearInterval(interval);
  }, [issues]);

  const handleGenerate = async (requestType: RequestType) => {
    if (validIssue) {
      setAlertLevel("info");
      setAlertText(language.QueryingTheJiraAPI);
      const result = await window.Main.generateText(requestType, validIssue);

      if (result && result.success && result.data) {
        window.Main.setClipboardText(result.data.text);
        setAlertLevel("success");
        setAlertText(
          `${language.SuccessfullyGeneratedA} ${
            requestType === "branch" ? "branch name" : "PR name"
          }.`
        );
      }

      if (result && result.error) {
        console.error("error!");
        setAlertLevel("error");
        setAlertText(language.ErrorQueryingTheJiraAPI);
      }
    }
  };

  return (
    <Card heading={"Jira"}>
      <Stack>
        <Alert alertText={alertText} level={alertLevel} />
        <Columns justifyContent="space-between">
          <Column columnWidth="50%">
            <Button
              disabled={!validIssue}
              stretch
              buttonText="Generate a Branch Name"
              onClick={() => handleGenerate("branch")}
            />
          </Column>
          <Column columnWidth="50%">
            <Button
              disabled={!validIssue}
              stretch
              buttonText="Generate a PR Name"
              onClick={() => handleGenerate("pr")}
              variant="green"
            />
          </Column>
        </Columns>
        <Separator />
        <PreviousIssues
          setIssues={setIssues}
          validIssue={validIssue}
          issues={issues}
        />
      </Stack>
    </Card>
  );
};
