import styled from "@emotion/styled";
import formatRelative from "date-fns/formatRelative";

interface IssueProps {
  issueKey: string;
  issueText: string;
  issueTimestamp: Date;
  setCopied: (copied: boolean) => void;
}

const IssueContainer = styled.div`
  user-select: none;
  padding: 0.25rem 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-height: 2rem;
  align-items: center;
  flex: 1;

  background-color: ${(props) => props.theme.issues.base.background};
  color: ${(props) => props.theme.issues.base.color};

  :hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.issues.hover.background};
    color: ${(props) => props.theme.issues.hover.color};
  }
  :active {
    cursor: pointer;
    background-color: ${(props) => props.theme.issues.active.background};
    color: ${(props) => props.theme.issues.active.color};
  }

  transition: background-color 0.15s;
`;

export const Issue = ({
  issueKey,
  issueText,
  issueTimestamp,
  setCopied,
}: IssueProps) => {
  const readableDate = formatRelative(new Date(issueTimestamp), new Date());
  const formattedTimestamp =
    readableDate.charAt(0).toUpperCase() + readableDate.slice(1);
  return (
    <IssueContainer
      onClick={() => {
        window.Main.setClipboardText(issueKey);

        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }}
    >
      <>{`[${formattedTimestamp}] ${issueText}`}</>
    </IssueContainer>
  );
};
