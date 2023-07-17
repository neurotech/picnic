import styled from "@emotion/styled";
import { useState } from "react";
import vaporwave from "vaporwave";
import { Connector } from "../Connector";
import { Column } from "../layout/Column";
import { Columns } from "../layout/Columns";
import { TextInput } from "./TextInput";
import { palette } from "../theme/palette";
import { css, keyframes } from "@emotion/react";

const gradientLoop = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const gradientBackground =
  "linear-gradient(-45deg,#f77a54,#ff68a2, #24b2e6, #29ecbf,  #ffdf27);";

const getOutputAnimation = (active: boolean) => {
  if (active) {
    return css`
      animation: ${gradientLoop} 15s ease infinite;
    `;
  }

  return "none";
};

const StyledVaporwave = styled.div``;

const VaporwaveOutput = styled.div<{ active: boolean }>`
  min-height: 5rem;
  flex: 1;
  text-align: center;
  align-self: center;
  padding: 1rem;
  border: 2px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;

  color: ${palette.white.main};
  font-size: 20px;
  line-height: 30px;
  text-shadow: 1.5px 1.5px 0 rgba(0, 0, 0, 0.33);

  background: ${(props) => (props.active ? gradientBackground : "none")};
  background-size: 400% 400%;
  ${(props) => getOutputAnimation(props.active)};

  filter: ${(props) => (props.active ? "unset" : "grayscale(1)")};
`;

const ConnectorContainer = styled.div`
  align-self: center;
`;

export const Vaporwave = () => {
  const [vaporwaveInput, setVaporwaveInput] = useState<string>("");
  const [vaporwaveOutput, setVaporwaveOutput] = useState<string>("");

  const handleInput = (input: string) => {
    setVaporwaveInput(input);
    setVaporwaveOutput(vaporwave(input));
  };

  const handleSubmit = (key: string) => {
    if (key === "Enter") {
      const chimes = new Audio("./sounds/chimes.wav");
      chimes.play();
      window.Main.setClipboardText(vaporwaveOutput);
    }

    if (key === "Escape") {
      handleInput("");
    }
  };

  const isActive = vaporwaveInput !== "" || Boolean(vaporwaveInput);

  return (
    <StyledVaporwave>
      <Columns space="0">
        <Column columnWidth="50%">
          <TextInput
            active={isActive}
            type="text"
            value={vaporwaveInput}
            onChange={(event) => handleInput(event.target.value)}
            onKeyDown={(event) => handleSubmit(event.key)}
            placeholder="vaporwave text"
          />
        </Column>
        <Column columnWidth="50px">
          <ConnectorContainer>
            <Connector active={isActive} />
          </ConnectorContainer>
        </Column>
        <Column columnWidth="50%">
          <VaporwaveOutput active={isActive}>{vaporwaveOutput}</VaporwaveOutput>
        </Column>
      </Columns>
    </StyledVaporwave>
  );
};
