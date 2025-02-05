import styled from '@emotion/styled'
import { Card } from '../Card'

const StyledIframe = styled.iframe`
  border: 1px solid rgba(0, 0, 0, 0.5);
`

export const LivingWorlds = () => {
  return (
    <Card heading="Living Worlds">
      <StyledIframe
        width={640}
        height={480}
        src={'./living-worlds/index.html'}
        title="living-worlds"
      />
    </Card>
  )
}
