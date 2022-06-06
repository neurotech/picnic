import { useEffect, useState } from "react";
import styled from "styled-components";
import { palette } from "../../styles/palette";
import { language } from "../../utilities/language";
import { SlackStatusType } from "../../utilities/slack";

type Expiry = number | null | undefined;

interface SlackStatusProps {
  setExpiry: (expiry?: Expiry) => void;
  setStatusText: (statusText: string) => void;
  status: SlackStatusType;
  statusText?: string;
  expiry?: Expiry;
}

const SlackStatusContainer = styled.div`
  flex: 1;
`;

const SlackStatusText = styled.div`
  border-radius: 6px;
  background-color: ${palette.brightgray};
  border: 2px solid #636478;
  padding: 1rem;
  text-align: center;
`;

const getStatusText = (currentStatus: SlackStatusType): string => {
  switch (currentStatus) {
    case "loading":
      return language.SendingStatusToSlackAPI;

    case "error":
      return language.ErrorSendingStatusToSlackAPI;

    case "success":
      return language.StatusSetSuccessfully;

    case "clear":
      return language.StatusClearedSuccessfully;

    case "idle":
    default:
      return language.PleaseSelectAStatus;
  }
};

export const SlackStatus = ({
  setExpiry,
  setStatusText,
  status,
  statusText,
  expiry,
}: SlackStatusProps) => {
  const [timeoutID, setTimeoutID] = useState<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (expiry) {
      setExpiry(expiry);
      timeoutID && clearTimeout(timeoutID);
      setTimeoutID(
        setTimeout(() => {
          setStatusText(language.PleaseSelectAStatus);
          setExpiry();
        }, expiry + 1000)
      );
    }
  }, [expiry]);

  return (
    <SlackStatusContainer>
      <SlackStatusText>{statusText ?? getStatusText(status)}</SlackStatusText>
    </SlackStatusContainer>
  );
};
