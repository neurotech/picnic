import { Column, Columns, Stack } from "@neurotech/elements";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { monoFontFamily } from "../../styles/GlobalStyles";
import { palette } from "../../styles/palette";
import { Button } from "../Button";
import { Tile } from "../Tile/Tile";
import { ClipboardIcon } from "./ClipboardIcon";
import { Status } from "./Status";

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

const ClipboardContents = styled.div<{ isValid: boolean }>`
  align-items: center;
  background-color: ${palette.brightgray};
  border-color: ${(props) =>
    props.isValid ? palette.green : palette.brightgray};
  border-radius: 4px;
  border-style: solid;
  border-width: 2px;
  color: #e8e8e9;
  display: flex;
  font-size: 1rem;
  height: 3.5rem;
  justify-content: flex-start;
  padding: 0 0.5rem;
  transition: border-color 0.31s;
  width: 100%;
`;

const ClipboardText = styled.div`
  font-family: ${monoFontFamily};
  margin-left: 0.5rem;
`;

export const JiraTools = () => {
  const [branchName, setBranchName] = useState<string | undefined>("");
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

  const handleGenerate = async () => {
    const url = `TODO`;
    setLoading(true);

    const result = await window.Main.fetchUrl(url);

    if (result && result.success && result.data) {
      setSuccess(true);
      setBranchName(result.data);
      window.Main.writeToClipbard(result.data);
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
          <Columns alignItems="stretch">
            <Column columnWidth="65%">
              <Button
                disabled={!isValid}
                label={"Generate branch name from key"}
                onClick={handleGenerate}
              ></Button>
            </Column>
            <Column columnWidth="35%">
              <ClipboardContents isValid={isValid}>
                <ClipboardIcon isValid={isValid} />
                <ClipboardText>{clipboardText}</ClipboardText>
              </ClipboardContents>
            </Column>
          </Columns>
          <Status
            branchName={branchName}
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
