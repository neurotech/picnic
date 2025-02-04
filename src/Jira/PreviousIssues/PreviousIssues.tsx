import styled from '@emotion/styled'
import { IssueRow } from './Issue'
import { Stack } from '../../layout/Stack'
import { Button } from '../../Button'
import { Dossier } from '../../Dossier'

interface PreviousIssuesProps {
  issues: Issue[]
  setIssues: (issues: Issue[]) => void
  validIssue: string | undefined
}

export interface Issue {
  key: string
  text: string
  timestamp: Date
}

const NoIssuesFound = styled.div`
  background-color: ${(props) => props.theme.issues.base.background};
  user-select: none;
  padding: 0.25rem 0.5rem;
  min-height: 2rem;
  text-align: center;
  flex: 1;
`

export const PreviousIssues = ({
  issues,
  setIssues,
  validIssue
}: PreviousIssuesProps) => {
  const sortedIssues = issues.sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  })

  return (
    <Dossier
      headerText="Previous Issues"
      position="left"
      variant={issues.length ? 'green' : 'blue'}
      bodyContent={
        !issues.length ? (
          <NoIssuesFound>{'No issues found.'}</NoIssuesFound>
        ) : (
          <Stack space="0">
            {sortedIssues.map((issue, index) => (
              <IssueRow
                key={issue.key}
                issueKey={issue.key}
                issueText={issue.text}
                issueTimestamp={issue.timestamp}
                isLast={index === sortedIssues.length - 1}
                selected={issue.key === validIssue?.toUpperCase()}
              />
            ))}
          </Stack>
        )
      }
      footerContent={
        Boolean(issues.length) && (
          <Button
            size="small"
            minWidth={10}
            buttonText="Clear"
            variant="red"
            onClick={() => {
              setIssues([])
              if (validIssue) {
                window.Main.setClipboardText('')
              }
            }}
          />
        )
      }
    />
  )
}
