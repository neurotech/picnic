import styled from "@emotion/styled";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  heading: string;
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
`;

const Header = styled.header`
  border-bottom: 1px solid ${(props) => props.theme.card.border};
  color: ${(props) => props.theme.card.header};
  display: flex;
  font-size: 16px;
  font-weight: 500;
  line-height: 17px;
  padding: 1rem;
  width: -webkit-fill-available;
  user-select: none;
`;

const CardContent = styled.div`
  padding: 1rem;
  display: flex;
  align-self: stretch;
`;

export const Card = ({ children, heading }: CardProps) => (
  <CardContainer>
    <Header>{heading}</Header>
    <CardContent>{children}</CardContent>
  </CardContainer>
);
