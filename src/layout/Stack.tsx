import { Children, ReactNode } from "react";
import styled from "@emotion/styled";

interface StackProps {
  children: ReactNode | ReactNode[];
}

const StyledStack = styled.div<StackProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;

  > :last-child {
    padding-bottom: 0;
  }
`;

const StackChild = styled.div`
  padding-bottom: 1rem;
`;

export const Stack = ({ children }: StackProps) => (
  <StyledStack>
    {Children.map(children, (child, index) => (
      <StackChild key={index}>{child}</StackChild>
    ))}
  </StyledStack>
);
