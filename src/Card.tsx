import styled from '@emotion/styled'
import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  heading: string
  icon?: ReactNode
}

const CardContainer = styled.div`
  align-items: flex-start;
  background: ${(props) => props.theme.card.background};
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.card.border};
  color: ${(props) => props.theme.card.color};
  display: flex;
  flex-direction: column;
  flex: 1;
`

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => props.theme.spacing};
  border-bottom: 1px solid ${(props) => props.theme.card.border};
`

const Header = styled.header`
  color: ${(props) => props.theme.card.header};
  font-weight: 500;
  line-height: 18px;
  user-select: none;
`

const CardContent = styled.div`
  padding: ${(props) => props.theme.spacing};
  display: flex;
  align-self: stretch;
`

export const Card = ({ children, heading, icon }: CardProps) => (
  <CardContainer>
    <HeaderContainer>
      <Header>{heading}</Header>
      {icon}
    </HeaderContainer>
    <CardContent>{children}</CardContent>
  </CardContainer>
)
