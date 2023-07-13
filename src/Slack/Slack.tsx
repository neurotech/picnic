import { useState } from "react";
import { AlertProps, Alert } from "../Alert";
import { Button } from "../Button";
import { Card } from "../Card";
import { Column } from "../layout/Column";
import { Columns } from "../layout/Columns";
import { Stack } from "../layout/Stack";

export const Slack = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<AlertProps>({
    level: "neutral",
    alertText: "Please select a status.",
  });

  const handleStatus = ({ level, alertText }: AlertProps) => {
    setIsLoading(true);
    setStatus({
      level: "info",
      alertText: `Sending status to the Slack API...`,
    });

    setTimeout(() => {
      setStatus({ level, alertText: `Status set to: ${alertText}!` });
      setIsLoading(false);

      setTimeout(() => {
        setStatus({
          level: "neutral",
          alertText: "Please select a status.",
        });
      }, 1500);
    }, 1500);
  };

  return (
    <Columns>
      <Column>
        <Card heading={"Slack"}>
          <Stack>
            <Columns>
              <Column>
                <Stack>
                  <Button
                    disabled={isLoading}
                    buttonText="BRB"
                    emoji="🚪"
                    onClick={() =>
                      handleStatus({ level: "success", alertText: "BRB" })
                    }
                    variant="green"
                  />
                  <Button
                    disabled={isLoading}
                    buttonText="Lunch"
                    emoji="🍛"
                    onClick={() =>
                      handleStatus({
                        level: "success",
                        alertText: "Lunch",
                      })
                    }
                    variant="yellow"
                  />
                  <Button
                    disabled={isLoading}
                    buttonText="Sunshine"
                    emoji="🌞"
                    onClick={() =>
                      handleStatus({
                        level: "success",
                        alertText: "Sunshine",
                      })
                    }
                  />
                </Stack>
              </Column>
              <Column>
                <Stack>
                  <Button
                    disabled={isLoading}
                    buttonText="Laundry"
                    emoji="👕"
                    onClick={() =>
                      handleStatus({
                        level: "success",
                        alertText: "Laundry",
                      })
                    }
                    variant="green"
                  />
                  <Button
                    disabled={isLoading}
                    buttonText="Tea"
                    emoji="🍵"
                    onClick={() =>
                      handleStatus({ level: "success", alertText: "Tea" })
                    }
                    variant="yellow"
                  />
                  <Button
                    disabled={isLoading}
                    buttonText="Shopping"
                    emoji="🛍️"
                    onClick={() =>
                      handleStatus({
                        level: "success",
                        alertText: "Shopping",
                      })
                    }
                  />
                </Stack>
              </Column>
              <Column columnWidth="200px">
                <Alert
                  alertText={status.alertText}
                  level={status.level}
                  stretch
                />
              </Column>
            </Columns>
            <Button
              disabled={isLoading}
              buttonText="Clear"
              emoji="❎"
              onClick={() =>
                handleStatus({
                  level: "warning",
                  alertText: "Cleared!",
                })
              }
              stretch
              variant="red"
            />
          </Stack>
        </Card>
      </Column>
    </Columns>
  );
};
