import { Stack } from "@neurotech/elements";
import styled from "styled-components";
import { monoFontFamily } from "../../styles/GlobalStyles";

interface StatusProps {
  branchName?: string;
  isError?: boolean;
  isValid: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
}

const StatusContainer = styled.div<StatusProps>`
  text-align: center;
`;

const BranchName = styled.div`
  font-family: ${monoFontFamily};
  font-size: 12px;
  font-weight: 100;
`;

export const Status = ({
  branchName,
  isError,
  isValid,
  isLoading,
  isSuccess,
}: StatusProps) => {
  const getStatusMessage = (): string => {
    if (isValid) {
      if (isLoading) {
        return "Querying the Jira API...";
      }

      if (isError) {
        return "Error querying the Jira API.";
      }

      if (isSuccess) {
        return "Branch name copied to clipboard:";
      }

      return "Valid issue key found in clipboard. Click the button above to continue.";
    } else {
      return "No valid issue key found in clipboard.";
    }
  };

  return (
    <StatusContainer
      isError={isError}
      isValid={isValid}
      isLoading={isLoading}
      isSuccess={isSuccess}
    >
      <Stack>
        {getStatusMessage()}
        {branchName !== "" && <BranchName>{branchName}</BranchName>}
      </Stack>
    </StatusContainer>
  );
};
