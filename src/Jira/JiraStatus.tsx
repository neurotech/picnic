import { useEffect, useState } from "react";
import { Alert, AlertLevel } from "../Alert";

interface JiraStatusProps {
  validIssue?: string;
}

export const JiraStatus = ({ validIssue }: JiraStatusProps) => {
  const [alertLevel, setAlertLevel] = useState<AlertLevel>("neutral");
  const [alertText, setAlertText] = useState<string>(
    "No valid issue key found in clipboard."
  );

  useEffect(() => {
    if (validIssue) {
      setAlertText(`Valid issue key found: ${validIssue.toUpperCase()}`);
      setAlertLevel("success");
    } else {
      setAlertText("No valid issue key found in clipboard.");
      setAlertLevel("neutral");
    }
  }, [validIssue]);

  return <Alert alertText={alertText} level={alertLevel} />;
};
