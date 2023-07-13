import { Issue } from "../src/Jira/PreviousIssues/PreviousIssues";

export interface Store {
  darkMode: boolean;
  issues: Issue[];
}

export const defaultStoreValues = {
  darkMode: true,
  issues: [],
};
