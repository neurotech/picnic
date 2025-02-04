import { Children, type ReactNode } from 'react'
import styled from '@emotion/styled'

interface StackProps {
  children: ReactNode | ReactNode[]
  space?: string
  justifyContent?: string
}

const StyledStack = styled.div<StackProps>`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: ${(props) => props.justifyContent ?? 'flex-start'};

  > :last-child {
    padding-bottom: 0;
  }
`

const StackChild = styled.div<Partial<StackProps>>`
  padding-bottom: ${(props) => props.space ?? '0.5rem'};
`

export const Stack = ({ children, justifyContent, space }: StackProps) => (
  <StyledStack justifyContent={justifyContent}>
    {Children.map(children, (child) => (
      <StackChild key={'index'} space={space}>
        {child}
      </StackChild>
    ))}
  </StyledStack>
)
