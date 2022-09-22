import styled, { keyframes } from "styled-components";

interface CharacterProps {
  delay: number;
}

const LogoContainer = styled.div`
  font-size: 1.66rem;
  font-weight: bold;
  user-select: none;
`;

const rainbowLoop = keyframes`
  0% {
    color: #ff00c8;
  }
  20% {
    color: #ff9900;
  }
  40% {
    color: #ffee00;
  }
  60% {
    color: #21EB95;
  }
  80% {
    color: #00B1FC;
  }
  100% {
    color: #9d60ff;
  }
`;

const wobbleLoop = keyframes`
  0% {
    transform: translate3d(0px, -1px, 0);
  }
  100% {
    transform: translate3d(0px, 1px, 0);
  }
`;

const RainbowCharacter = styled.span<CharacterProps>`
  animation-delay: ${(props) => props.delay}ms;
  animation-direction: alternate, alternate;
  animation-duration: 3000ms, 555ms;
  animation-iteration-count: infinite, infinite;
  animation-name: ${rainbowLoop}, ${wobbleLoop};
  animation-timing-function: linear, ease-in-out;
  display: inline-block;
`;

const rainbowText = (text: string) => {
  let delay = -Array.from(text).length * 100;

  return Array.from(text).map((char, index) => {
    return (
      <RainbowCharacter delay={(delay += 100)} key={index}>
        {char}
      </RainbowCharacter>
    );
  });
};

export const Logo = () => (
  <LogoContainer>{rainbowText("Picnic")}</LogoContainer>
);
