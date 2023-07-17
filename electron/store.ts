import { Issue } from "../src/Jira/PreviousIssues/PreviousIssues";

export interface Store {
  darkMode: boolean;
  issues: Issue[];
  jiraUrl: string;
  jiraUsername: string;
  jiraToken: string;
  slackToken: string;
}

export const defaultStoreValues: Store = {
  darkMode: true,
  issues: [],
  jiraUrl: "",
  jiraUsername: "",
  jiraToken: "",
  slackToken: "",
};
