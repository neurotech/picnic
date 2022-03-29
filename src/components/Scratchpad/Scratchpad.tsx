import { Column, Columns, Stack } from "@neurotech/elements";
import { evaluate, format } from "mathjs";
import { useState } from "react";
import styled from "styled-components";

const MIN_HEIGHT = "5rem";

const InputArea = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-height: ${MIN_HEIGHT};
  background-color: #2f3136;
  border: 2px solid #46484d;
  border-radius: 2px;
  color: #e8e8e9;
  font-size: 2rem;
  line-height: 1rem;
  padding: 1rem;
`;

const OutputArea = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-height: ${MIN_HEIGHT};
  background-color: #2f3136;
  border-radius: 2px;
  color: #e8e8e9;
  font-size: 2rem;
  padding: 1rem;
  display: flex;
  align-items: center;
`;

export const Scratchpad = () => {
  const [textInput, setTextInput] = useState<string>("");
  const [parsed, setParsed] = useState<string>("");

  const handleTextInput = (input: string) => {
    try {
      setTextInput(input);
      setParsed(format(evaluate(input)));
    } catch (error) {
      setParsed("");
    }
  };

  return (
    <Columns>
      <Column columnWidth="50%">
        <Stack>
          {"Input:"}
          <InputArea
            type={"text"}
            onChange={(event) => handleTextInput(event.target.value)}
            value={textInput}
          />
        </Stack>
      </Column>
      <Column columnWidth="50%">
        <Stack>
          {"Output:"}
          <OutputArea>{parsed}</OutputArea>
        </Stack>
      </Column>
    </Columns>
  );
};
