import { Space, Stack } from "@neurotech/elements";
import { evaluate, format } from "mathjs";
import { useState } from "react";
import styled from "styled-components";
import { palette } from "../../styles/palette";
import { Connector } from "../Connector";
import { Label } from "../Label";
import { Tile } from "../Tile/Tile";

const MIN_HEIGHT = "5rem";

const InputArea = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-height: ${MIN_HEIGHT};
  background-color: ${palette.gray.dark};
  border: 2px solid ${palette.gray.lighter};
  border-radius: 2px;
  color: #e8e8e9;
  font-size: 2rem;
  line-height: 1rem;
  padding: 1rem;

  :focus-within {
    border-color: ${palette.blue.default};
    box-shadow: 0 0 0 4px ${palette.blue.default}40;
  }
`;

const OutputArea = styled.div<{ isValid: boolean }>`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-height: ${MIN_HEIGHT};
  background-color: ${(props) =>
    props.isValid ? palette.green.dim : palette.gray.light};
  border-width: 2px;
  border-style: solid;
  border-color: ${(props) =>
    props.isValid ? palette.green.default : palette.gray.lighter};
  border-radius: 2px;
  color: ${(props) =>
    props.isValid ? palette.green.default : palette.gray.lighter};
  font-size: 2rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  transition: border-color 0.31s;
  justify-content: center;
  line-height: 2.5rem;
`;

const Container = styled.div`
  display: flex;
  align-items: stretch;
`;
const LeftColumn = styled.div`
  flex: 1;
`;
const MiddleColumn = styled.div`
  display: flex;
  min-width: 50px;
  align-items: center;
`;
const RightColumn = styled.div`
  flex: 1;
`;

export const Scratchpad = () => {
  const [textInput, setTextInput] = useState<string>("");
  const [parsed, setParsed] = useState<string>("");

  const handleTextInput = (input: string) => {
    setTextInput(input);

    if (input === "") {
      return setParsed("");
    }

    try {
      setParsed(format(evaluate(input)));
    } catch (error) {
      setParsed("");
    }
  };

  const reset = (key: string) => {
    if (key === "Escape") {
      setTextInput("");
      setParsed("");
    }
  };

  return (
    <Tile
      title={"Scratchpad"}
      content={
        <Stack flexGrow={1} space={Space.XSmall}>
          <Container>
            <LeftColumn>
              <Label label={"Input"} variant={"blue"} />
            </LeftColumn>

            <MiddleColumn></MiddleColumn>

            <RightColumn>
              <Label label={"Output"} variant={"green"} />
            </RightColumn>
          </Container>
          <Container>
            <LeftColumn>
              <InputArea
                type={"text"}
                onKeyDown={(event) => reset(event.key)}
                onChange={(event) => handleTextInput(event.target.value)}
                value={textInput}
              />
            </LeftColumn>

            <MiddleColumn>
              <Connector active={parsed !== ""} />
            </MiddleColumn>

            <RightColumn>
              <OutputArea isValid={parsed !== ""}>{parsed}</OutputArea>
            </RightColumn>
          </Container>
        </Stack>
      }
    />
  );
};
