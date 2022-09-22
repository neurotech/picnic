import styled, { css, keyframes } from "styled-components";
import { palette } from "../styles/palette";

const flow = keyframes`
  from {
    stroke-dashoffset:100;
  }
  to {
    stroke-dashoffset:0;
  }
`;

const FlowLine = styled.line<{ active: boolean }>`
  shape-rendering: geometricprecision;
  stroke-miterlimit: 10;

  stroke: ${(props) =>
    props.active ? palette.green.default : palette.gray.lighter};
  stroke-width: 2;
  stroke-dashoffset: ${(props) => (props.active ? 100 : 0)};
  stroke-dasharray: ${(props) => (props.active ? 5 : 555)};
  animation: ${(props) =>
    props.active
      ? css`
          ${flow} 10s linear 0s forwards infinite
        `
      : "none"};

  transition: stroke 0.25s;
`;

export const Connector = ({ active }: { active: boolean }) => {
  return (
    <svg
      width="50"
      height="2"
      viewBox="0 0 50 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <FlowLine active={active} y1="1" x2="50" y2="1" />
    </svg>
  );
};
