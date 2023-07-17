import { Alert, AlertLevel } from "../Alert";

interface JiraStatusProps {
  alertLevel: AlertLevel;
  alertText: string;
}

export const JiraStatus = ({ alertLevel, alertText }: JiraStatusProps) => {
  return <Alert alertText={alertText} level={alertLevel} />;
};
