import styled from "@emotion/styled";
import { useState } from "react";
import zalgo from "to-zalgo";
import { Connector } from "../Connector";
import { Column } from "../layout/Column";
import { Columns } from "../layout/Columns";
import { TextInput } from "./TextInput";
import { palette } from "../theme/palette";
import { css, keyframes } from "@emotion/react";
import { getRandomInt } from "../utilities/numbers";

const shakeLittle = keyframes`
  2% {
    transform: translate(2.5px, 1.5px) rotate(-0.5deg);
  }
  4% {
    transform: translate(2.5px, 0.5px) rotate(-0.5deg);
  }
  6% {
    transform: translate(2.5px, 0.5px) rotate(0.5deg);
  }
  8% {
    transform: translate(2.5px, 2.5px) rotate(1.5deg);
  }
  10% {
    transform: translate(1.5px, -1.5px) rotate(-0.5deg);
  }
  12% {
    transform: translate(-1.5px, 0.5px) rotate(0.5deg);
  }
  14% {
    transform: translate(0.5px, 1.5px) rotate(-0.5deg);
  }
  16% {
    transform: translate(-1.5px, 0.5px) rotate(0.5deg);
  }
  18% {
    transform: translate(1.5px, -1.5px) rotate(0.5deg);
  }
  20% {
    transform: translate(2.5px, 1.5px) rotate(-0.5deg);
  }
  22% {
    transform: translate(0.5px, -1.5px) rotate(1.5deg);
  }
  24% {
    transform: translate(0.5px, -0.5px) rotate(-0.5deg);
  }
  26% {
    transform: translate(0.5px, -1.5px) rotate(1.5deg);
  }
  28% {
    transform: translate(0.5px, 0.5px) rotate(0.5deg);
  }
  30% {
    transform: translate(2.5px, 0.5px) rotate(0.5deg);
  }
  32% {
    transform: translate(-0.5px, 0.5px) rotate(0.5deg);
  }
  34% {
    transform: translate(2.5px, 0.5px) rotate(-0.5deg);
  }
  36% {
    transform: translate(0.5px, 2.5px) rotate(0.5deg);
  }
  38% {
    transform: translate(-0.5px, 0.5px) rotate(-0.5deg);
  }
  40% {
    transform: translate(-1.5px, 1.5px) rotate(-0.5deg);
  }
  42% {
    transform: translate(1.5px, 2.5px) rotate(-0.5deg);
  }
  44% {
    transform: translate(-0.5px, 0.5px) rotate(-0.5deg);
  }
  46% {
    transform: translate(2.5px, 1.5px) rotate(-0.5deg);
  }
  48% {
    transform: translate(-1.5px, 2.5px) rotate(1.5deg);
  }
  50% {
    transform: translate(-0.5px, -1.5px) rotate(-0.5deg);
  }
  52% {
    transform: translate(-1.5px, 1.5px) rotate(1.5deg);
  }
  54% {
    transform: translate(-1.5px, -1.5px) rotate(-0.5deg);
  }
  56% {
    transform: translate(2.5px, 1.5px) rotate(0.5deg);
  }
  58% {
    transform: translate(-1.5px, -1.5px) rotate(0.5deg);
  }
  60% {
    transform: translate(1.5px, 0.5px) rotate(0.5deg);
  }
  62% {
    transform: translate(-0.5px, -1.5px) rotate(1.5deg);
  }
  64% {
    transform: translate(0.5px, 1.5px) rotate(-0.5deg);
  }
  66% {
    transform: translate(-0.5px, 2.5px) rotate(0.5deg);
  }
  68% {
    transform: translate(2.5px, 2.5px) rotate(1.5deg);
  }
  70% {
    transform: translate(1.5px, -1.5px) rotate(0.5deg);
  }
  72% {
    transform: translate(0.5px, 2.5px) rotate(-0.5deg);
  }
  74% {
    transform: translate(0.5px, -1.5px) rotate(1.5deg);
  }
  76% {
    transform: translate(-0.5px, 0.5px) rotate(0.5deg);
  }
  78% {
    transform: translate(1.5px, -0.5px) rotate(0.5deg);
  }
  80% {
    transform: translate(-0.5px, 2.5px) rotate(-0.5deg);
  }
  82% {
    transform: translate(-1.5px, 0.5px) rotate(1.5deg);
  }
  84% {
    transform: translate(-1.5px, 2.5px) rotate(-0.5deg);
  }
  86% {
    transform: translate(1.5px, -0.5px) rotate(0.5deg);
  }
  88% {
    transform: translate(-1.5px, 0.5px) rotate(0.5deg);
  }
  90% {
    transform: translate(0.5px, 0.5px) rotate(0.5deg);
  }
  92% {
    transform: translate(0.5px, -1.5px) rotate(-0.5deg);
  }
  94% {
    transform: translate(0.5px, 0.5px) rotate(-0.5deg);
  }
  96% {
    transform: translate(2.5px, 2.5px) rotate(1.5deg);
  }
  98% {
    transform: translate(1.5px, 2.5px) rotate(0.5deg);
  }
  0%, 100% {
    transform: translate(0, 0) rotate(0);
  }
`;

const getOutputAnimation = (active: boolean, seed: number) => {
  if (active) {
    return css`
      animation-name: ${shakeLittle};
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;
      animation-duration: ${seed}ms;
    `;
  }

  return "none";
};

const Container = styled.div``;

const ZalgoOutput = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 5rem;
  flex: 1;
  text-align: center;
  align-self: center;
  padding: 1rem;
  border: 2px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;

  background-color: ${palette.black.main};

  color: red;
  font-size: 22px;
  line-height: 30px;
  font-family: "Times New Roman", Times, serif;

  filter: ${(props) => (props.active ? "unset" : "grayscale(1)")};
`;

const Cage = styled.div<{ active: boolean; seed: number }>`
  filter: drop-shadow(2px 2px 4px rgba(255, 0, 0, 0.66));
  ${(props) => getOutputAnimation(props.active, props.seed)};
`;

const ConnectorContainer = styled.div`
  align-self: center;
`;

export const Zalgo = () => {
  const [zalgoInput, setZalgoInput] = useState<string>("");
  const [zalgoOutput, setZalgoOutput] = useState<string>("");

  const handleInput = (input: string) => {
    setZalgoInput(input);
    setZalgoOutput(zalgo(input));
  };

  const handleSubmit = (key: string) => {
    if (key === "Enter") {
      const chimes = new Audio("./sounds/chimes.wav");
      chimes.play();
      window.Main.setClipboardText(zalgoOutput);
    }

    if (key === "Escape") {
      handleInput("");
    }
  };

  const isActive = zalgoInput !== "" || Boolean(zalgoInput);

  return (
    <Container>
      <Columns space="0">
        <Column columnWidth="50%">
          <TextInput
            active={isActive}
            type="text"
            value={zalgoInput}
            onChange={(event) => handleInput(event.target.value)}
            onKeyDown={(event) => handleSubmit(event.key)}
            placeholder="zalgo text"
          />
        </Column>
        <Column columnWidth="50px">
          <ConnectorContainer>
            <Connector active={isActive} />
          </ConnectorContainer>
        </Column>
        <Column columnWidth="50%">
          <ZalgoOutput active={isActive}>
            {zalgoInput.split("").map((z) => (
              <Cage seed={getRandomInt(80, 165)} active={isActive}>
                {zalgo(z)}
              </Cage>
            ))}
          </ZalgoOutput>
        </Column>
      </Columns>
    </Container>
  );
};
