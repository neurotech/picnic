import styled from "@emotion/styled";
import { useContext } from "react";
import { ColumnsContext } from "./Columns";

interface ColumnProps {
  children?: React.ReactNode;
  flexGrow?: number;
  flexShrink?: number;
  space?: string;
  columnWidth?: string;
}

const StyledColumn = styled.div<ColumnProps>`
  display: flex;
  flex-basis: auto;
  flex-grow: ${(props) => props.flexGrow};
  flex-shrink: ${(props) => props.flexShrink};
  min-width: 0;
  padding-left: ${(props) => props.space};
  width: ${(props) => (props.columnWidth ? props.columnWidth : "unset")};
`;

export const Column = ({
  children,
  flexGrow,
  flexShrink,
  columnWidth,
}: ColumnProps) => {
  const { space } = useContext(ColumnsContext);

  return (
    <StyledColumn
      flexGrow={flexGrow}
      flexShrink={flexShrink}
      space={space}
      columnWidth={columnWidth}
    >
      {children}
    </StyledColumn>
  );
};
