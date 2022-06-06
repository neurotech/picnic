import { Button, Column, Columns, Stack } from "@neurotech/elements";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { monoFontFamily } from "../../styles/GlobalStyles";
import { palette } from "../../styles/palette";
import { Tile } from "../Tile/Tile";
import { ClipboardIcon } from "./ClipboardIcon";
import { Status } from "./Status";

export type Generated = "branch" | "pr";

const ClipboardContents = styled.div<{ isValid: boolean }>`
  align-items: center;
  background-color: ${(props) =>
    props.isValid ? palette.darkgreen : palette.brightgray};
  border-color: ${(props) => (props.isValid ? palette.green : `#636478`)};
  border-radius: 4px;
  border-style: solid;
  border-width: 2px;
  color: ${(props) => (props.isValid ? palette.brightgreen : palette.ash)};
  cursor: pointer;
  display: flex;
  font-size: 1rem;
  justify-content: center;
  flex: 1;
  align-self: stretch;
  transition: border-color 0.31s;
`;

const ClipboardText = styled.div`
  font-family: ${monoFontFamily};
  margin-left: 0.5rem;
`;

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
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [previousKey, setPreviousKey] = useState<string>();
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
    } else {
      setPreviousKey(clipboardText);
    }
  }, [clipboardText]);

  const handleGenerate = async (generated: Generated) => {
    setLoading(true);
    const result = await window.Main.generateText(generated, clipboardText);

    if (result && result.success && result.data) {
      setSuccess(true);
      window.Main.setClipboardText(result.data);
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
            <Column columnWidth={"40%"}>
              <Button
                disabled={!isValid}
                label={"Generate branch name"}
                onClick={() => handleGenerate("branch")}
                variant={"blue"}
              />
            </Column>
            <Column columnWidth={"35%"}>
              <Button
                disabled={!isValid}
                label={"Generate PR name"}
                onClick={() => handleGenerate("pr")}
                variant={"blue"}
              />
            </Column>
            <Column columnWidth={"25%"}>
              <ClipboardContents
                onClick={() =>
                  previousKey && window.Main.setClipboardText(previousKey)
                }
                isValid={isValid}
              >
                <ClipboardIcon isValid={isValid} />
                <ClipboardText>{previousKey}</ClipboardText>
              </ClipboardContents>
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
