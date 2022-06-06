import { useEffect, useState } from "react";
import styled from "styled-components";
import { palette } from "../../styles/palette";
import { language } from "../../utilities/language";

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

const StatusContainer = styled.div<StatusProps>`
  align-items: center;
  background-color: ${palette.brightgray};
  border-color: ${(props) => (props.isValid ? palette.green : `#636478`)};
  border-radius: 4px;
  border-style: solid;
  border-width: 2px;
  display: flex;
  height: ${HEIGHT};
  padding: ${PADDING};
  position: relative;
  justify-content: center;
  user-select: none;
`;

export const Status = ({
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
    <StatusContainer
      isError={isError}
      isValid={isValid}
      isLoading={isLoading}
      isSuccess={isSuccess}
    >
      {statusMessage}
    </StatusContainer>
  );
};
