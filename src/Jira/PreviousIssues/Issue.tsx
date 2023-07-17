import styled from "@emotion/styled";
import formatRelative from "date-fns/formatRelative";
import { Column } from "../../layout/Column";
import { Columns } from "../../layout/Columns";
import { palette } from "../../theme/palette";
import { Status } from "../../Status";

interface IssueProps {
  issueKey: string;
  issueText: string;
  issueTimestamp: Date;
  setCopied: (copied: boolean) => void;
  isLast: boolean;
  selected: boolean;
}

const truncate = (string = "", maxLength = 75) =>
  string.length > maxLength ? `${string.substring(0, maxLength)}…` : string;

const IssueContainer = styled.div<{ selected: boolean; isLast: boolean }>`
  user-select: none;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  min-height: 2rem;
  align-items: center;
  flex: 1;
  padding: 0.5rem 0.25rem;

  font-size: 11px;
  line-height: 11px;

  border-bottom: ${(props) =>
    props.isLast ? "unset" : `1px solid ${props.theme.issues.base.border}`};

  background-color: ${(props) =>
    props.selected ? props.theme.issues.selected.background : "none"};

  color: ${(props) => props.theme.issues.base.color};

  :hover {
    cursor: pointer;

    background-color: ${(props) =>
      props.selected
        ? props.theme.issues.selected.background
        : props.theme.issues.hover.background};

    color: ${(props) => props.theme.issues.hover.color};
  }
  :active {
    cursor: pointer;

    background-color: ${(props) =>
      props.selected
        ? props.theme.issues.selected.background
        : props.theme.issues.active.background};

    color: ${(props) => props.theme.issues.active.color};
  }

  transition: background-color 0.15s;
`;

const IssueKey = styled.div`
  text-align: center;
  flex: 1 0 100%;
  align-self: center;
`;
const IssueText = styled.div`
  display: flex;
  align-items: center;
`;
const IssueTimestamp = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-align: right;
  font-style: italic;
  color: ${palette.ash.light};
  flex: 1;
  padding-right: 0.25rem;
`;

export const Issue = ({
  issueKey,
  issueText,
  issueTimestamp,
  setCopied,
  isLast,
  selected,
}: IssueProps) => {
  const readableDate = formatRelative(new Date(issueTimestamp), new Date());
  const formattedTimestamp =
    readableDate.charAt(0).toUpperCase() + readableDate.slice(1);

  return (
    <IssueContainer
      title={issueText}
      selected={selected}
      isLast={isLast}
      onClick={() => {
        window.Main.setClipboardText(issueKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }}
    >
      <Columns justifyContent="space-between">
        <Column>
          <Columns>
            <Column flexGrow={0} flexShrink={0} columnWidth="70px">
              <IssueKey>
                <Status variant={"indigo"} statusText={issueKey} />
              </IssueKey>
            </Column>
            <Column>
              <IssueText>
                <Status variant={"azure"} statusText={truncate(issueText)} />
              </IssueText>
            </Column>
          </Columns>
        </Column>
        <Column flexGrow={0} flexShrink={0} columnWidth="140px">
          <IssueTimestamp>{formattedTimestamp}</IssueTimestamp>
        </Column>
      </Columns>
    </IssueContainer>
  );
};
