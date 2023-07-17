import { Children, ReactNode } from "react";
import styled from "@emotion/styled";

interface StackProps {
  children: ReactNode | ReactNode[];
  space?: string;
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

const StackChild = styled.div<Partial<StackProps>>`
  padding-bottom: ${(props) => props.space ?? "1rem"};
`;

export const Stack = ({ children, space }: StackProps) => (
  <StyledStack>
    {Children.map(children, (child, index) => (
      <StackChild key={index} space={space}>
        {child}
      </StackChild>
    ))}
  </StyledStack>
);
