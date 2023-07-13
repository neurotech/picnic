import styled from "@emotion/styled";

export type AlertLevel = "success" | "error" | "warning" | "info" | "neutral";

export interface AlertProps {
  alertText: string;
  level: AlertLevel;
  stretch?: boolean;
}

const StyledAlert = styled.div<Pick<AlertProps, "level" | "stretch">>`
  background: ${(props) => props.theme.alert[props.level].background};
  border-radius: 4px;

  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  color: ${(props) => props.theme.alert[props.level].color};
  padding: 0.5rem 1rem;
  text-align: center;
  flex: ${(props) => Number(props.stretch)};
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: content;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-x: clip;
  transition: all 0.25s;
`;

export const Alert = ({ alertText, level, stretch = false }: AlertProps) => (
  <StyledAlert level={level} stretch={stretch}>
    {alertText}
  </StyledAlert>
);
