import styled from "@emotion/styled";

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
  statusText: string;
  variant: StatusVariant;
}

const StyledStatus = styled.div<Pick<StatusProps, "variant">>`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  gap: 0.5rem;

  font-weight: 600;
  text-transform: none;
  letter-spacing: normal;
  border-radius: 100rem;
  line-height: 1;
  margin: 0;

  background-color: ${(props) => props.theme.status[props.variant].background};
  color: ${(props) => props.theme.status[props.variant].color};
`;

export const Status = ({ statusText, variant }: StatusProps) => (
  <StyledStatus variant={variant}>{statusText}</StyledStatus>
);
