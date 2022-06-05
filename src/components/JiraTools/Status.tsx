import { Column, Columns, Space } from "@neurotech/elements";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { monoFontFamily } from "../../styles/GlobalStyles";
import { palette } from "../../styles/palette";
import { language } from "../../utilities/language";
import { ClipboardIcon } from "./ClipboardIcon";

const HEIGHT = "3.5rem";
const PADDING = "0 0.5rem";

interface StatusProps {
  generatedText?: string;
  clipboardText?: string;
  isError?: boolean;
  isValid: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
}

const ClipboardContents = styled.div<{ isValid: boolean }>`
  align-items: center;
  background-color: ${(props) =>
    props.isValid ? palette.darkgreen : palette.brightgray};
  border-color: ${(props) => (props.isValid ? palette.green : `#636478`)};
  border-radius: 4px 0 0 4px;
  border-style: solid;
  border-width: 2px 1px 2px 2px;
  color: ${(props) => (props.isValid ? palette.brightgreen : palette.ash)};
  display: flex;
  font-size: 1rem;
  height: ${HEIGHT};
  justify-content: center;
  min-width: 7rem;
  padding: ${PADDING};
  transition: border-color 0.31s;
  width: 100%;
`;

const ClipboardText = styled.div`
  font-family: ${monoFontFamily};
  margin-left: 0.5rem;
`;

const StatusContainer = styled.div<StatusProps>`
  align-items: center;
  background-color: ${palette.brightgray};
  border-color: ${(props) => (props.isValid ? palette.green : `#636478`)};
  border-radius: 0 4px 4px 0;
  border-style: solid;
  border-width: 2px 2px 2px 1px;
  display: flex;
  height: ${HEIGHT};
  padding: ${PADDING};
  position: relative;
`;

export const Status = ({
  clipboardText,
  isError,
  isValid,
  isLoading,
  isSuccess,
}: StatusProps) => {
  const [statusMessage, setStatusMessage] = useState<string>("");

  const getStatusMessage = (): string => {
    if (isValid) {
      if (isLoading) {
        return language.QueryingTheJiraAPI;
      }

      if (isError) {
        return language.ErrorQueryingTheJiraAPI;
      }

      if (isSuccess) {
        return language.CopiedToClipboard;
      }

      return language.ValidIssueKeyFoundInClipboard;
    } else {
      return language.NoValidIssueKeyFoundInClipboard;
    }
  };

  useEffect(() => {
    setStatusMessage(getStatusMessage());
  }, [isValid, isLoading, isError, isSuccess]);

  return (
    <Columns alignItems={"center"} space={Space.None}>
      <Column>
        <ClipboardContents isValid={isValid}>
          <ClipboardIcon isValid={isValid} />
          <ClipboardText>{clipboardText}</ClipboardText>
        </ClipboardContents>
      </Column>
      <Column flexGrow={1}>
        <StatusContainer
          isError={isError}
          isValid={isValid}
          isLoading={isLoading}
          isSuccess={isSuccess}
        >
          {statusMessage}
        </StatusContainer>
      </Column>
    </Columns>
  );
};
