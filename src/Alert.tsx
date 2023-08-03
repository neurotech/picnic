import styled from "@emotion/styled";

export type AlertLevel = "success" | "error" | "warning" | "info" | "neutral";

export interface AlertProps {
  alertText: string;
  level: AlertLevel;
  stretch?: boolean;
  className?: string;
  monospace?: boolean;
}

const StyledAlert = styled.div<
  Pick<AlertProps, "level" | "stretch" | "monospace">
>`
  background: ${(props) => props.theme.alert[props.level].background};
  border-radius: 4px;

  font-family: ${(props) =>
    props.monospace ? "'Consolas', monospace" : "unset"};
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  color: ${(props) => props.theme.alert[props.level].color};
  padding: 0.5rem 1rem;
  text-align: center;
  display: flex;
  flex: ${(props) => Number(props.stretch)};
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: content;
  align-items: center;
  justify-content: center;
  overflow-x: clip;
  width: ${(props) => (props.stretch ? "100%" : "unset")};

  transition: all 0.25s;
`;

export const Alert = ({
  alertText,
  className,
  level,
  stretch = false,
  monospace = false,
}: AlertProps) => (
  <StyledAlert
    monospace={monospace}
    className={className}
    level={level}
    stretch={stretch}
  >
    {alertText}
  </StyledAlert>
);
