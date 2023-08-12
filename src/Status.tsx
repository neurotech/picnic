import styled from "@emotion/styled";
import { ReactNode } from "react";

export type StatusVariant =
  | "blue"
  | "azure"
  | "indigo"
  | "purple"
  | "pink"
  | "red"
  | "orange"
  | "yellow"
  | "lime"
  | "green"
  | "teal"
  | "cyan";

interface StatusProps {
  statusText: string | ReactNode;
  variant: StatusVariant;
}

const StyledStatus = styled.div<Pick<StatusProps, "variant">>`
  display: flex;
  align-items: center;
  padding: 0.15rem 0.75rem;

  font-weight: 600;
  text-transform: none;
  letter-spacing: normal;
  border-radius: 100rem;
  line-height: 1.15;
  margin: 0;

  background-color: ${(props) => props.theme.status[props.variant].background};
  color: ${(props) => props.theme.status[props.variant].color};

  transition:
    background-color 0.2s,
    color 0.2s;
`;

export const Status = ({ statusText, variant }: StatusProps) => (
  <StyledStatus variant={variant}>{statusText}</StyledStatus>
);
