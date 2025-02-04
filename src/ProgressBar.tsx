import styled from '@emotion/styled'

const BORDER_RADIUS = 2

interface ProgressBarProps {
  progress: number
}

const Container = styled.div`
  border: 1px solid ${(props) => props.theme.progressBar.container.border};
  background-color: ${(props) => props.theme.progressBar.container.background};
  border-radius: ${BORDER_RADIUS}px;
`

const Bar = styled.div<ProgressBarProps>`
  width: ${(props) => props.progress}%;
  background-color: ${(props) => props.theme.progressBar.bar.background};

  height: 0.5rem;
  transition: width 0.15s;
`

export const ProgressBar = ({ progress }: ProgressBarProps) => (
  <Container>
    <Bar progress={progress} />
  </Container>
)
