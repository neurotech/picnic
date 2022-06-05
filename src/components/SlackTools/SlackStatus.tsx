import styled from "styled-components";
import { palette } from "../../styles/palette";

interface SlackStatusProps {
  statusText: string;
}

const SlackStatusContainer = styled.div`
  border-radius: 6px;
  background-color: ${palette.brightgray};
  border: 2px solid #636478;
  padding: 1rem;
  text-align: center;
`;

export const SlackStatus = ({ statusText }: SlackStatusProps) => (
  <SlackStatusContainer>{statusText}</SlackStatusContainer>
);
