import { Column, Columns, JustifyContent, Stack } from "@neurotech/elements";
import { useEffect, useState } from "react";
import { Button } from "../Button";
import { Tile } from "../Tile/Tile";
import { Status } from "./Status";

export type Generated = "branch" | "pr";

const getIssue = (rawText: string): string => {
  let issue = "";

  if (typeof rawText !== "string") {
    return issue;
  }

  const expression = /^[FS-]+\d+/gm;
  const matched = rawText.match(expression);

  if (matched?.length) {
    issue = matched[0];
  }

  return issue;
};

export const JiraTools = () => {
  const [generatedText, setGeneratedText] = useState<string | undefined>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [clipboardText, setClipboardText] = useState<string>(
    getIssue(window.Main.readClipboardText())
  );
  const isValid = clipboardText !== "";

  useEffect(() => {
    setInterval(
      () => setClipboardText(getIssue(window.Main.readClipboardText())),
      1000
    );
  }, []);

  useEffect(() => {
    if (clipboardText === "") {
      setSuccess(false);
    }
  }, [clipboardText]);

  const handleGenerate = async (generated: Generated) => {
    setLoading(true);
    const result = await window.Main.generateText(generated, clipboardText);

    if (result && result.success && result.data) {
      setSuccess(true);
      setGeneratedText(result.data);
      window.Main.writeToClipboard(result.data);
    }

    if (result && result.error) {
      setError(true);
    }

    setLoading(false);
  };

  return (
    <Tile
      content={
        <Stack padLastChild={false}>
          <Columns>
            <Column>
              <Button
                disabled={!isValid}
                label={"Generate branch name"}
                onClick={() => handleGenerate("branch")}
              />
            </Column>
            <Column>
              <Button
                disabled={!isValid}
                label={"Generate PR name"}
                onClick={() => handleGenerate("pr")}
              />
            </Column>
          </Columns>

          <Status
            clipboardText={clipboardText}
            isError={error}
            isValid={isValid}
            isLoading={loading}
            isSuccess={success}
          />
        </Stack>
      }
      title={"Jira Tools"}
      variant={"green"}
    />
  );
};
