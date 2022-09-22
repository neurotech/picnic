import { clipboard, contextBridge, ipcRenderer } from "electron";
import tiny from "tiny-json-http";
import { Generated } from "../src/components/JiraTools/JiraTools";
import { getSlackStatus, SlackStatusType } from "../src/utilities/slack";
import { Store } from "../src/utilities/store";

const generateText = (
  generated: Generated,
  type: string,
  prefix: string,
  issue: string,
  parentIssue?: string
) => {
  if (generated === "branch") {
    let branchName = issue
      .toLowerCase()
      .replace(/\(xs\)|\(s\)|\(m\)|\(l\)|\(xl\)/gi, "")
      .replace(/:/g, "")
      .replace(/>/g, "")
      .replace(/</g, "")
      .replace(/\//g, "")
      .replace(/\\/g, "")
      .replace(/'/g, "")
      .replace(/\./g, "-")
      .replace(/\s/g, "-");

    if (branchName.endsWith("-")) {
      branchName = branchName.slice(0, -1);
    }

    if (parentIssue) {
      prefix = `${parentIssue}/${prefix}`;
    }

    if (type.toLowerCase() === "story") {
      prefix = `story/${prefix}`;
    }

    return `${prefix}-${branchName.toLowerCase()}`;
  }

  if (generated === "pr") {
    let prName = "";

    prName = `${prefix} - ${issue}`;

    if (type !== "") {
      prName = `${type} - ${prName}`;
    }

    return prName;
  }
};

export const api = {
  store: {
    get: () => ipcRenderer.sendSync("store-get"),
    set: (store: Store) => ipcRenderer.sendSync("store-set", store),
  },

  readClipboardText: () => clipboard.readText(),
  setClipboardText: (text: string) => clipboard.writeText(text),

  setSlackStatus: async (statusType: SlackStatusType) => {
    try {
      const config = await ipcRenderer.sendSync("store-get");
      const url = "https://slack.com/api/users.profile.set";
      const authValue = config.slackToken;
      const data = getSlackStatus(statusType);

      const response = await tiny.post({
        url,
        data,
        headers: {
          Authorization: `Bearer ${authValue}`,
        },
      });

      if (response.body) {
        return { success: true };
      }
    } catch (error) {
      console.error(error);
      return { success: false, error: true };
    }
  },

  generateText: async (generated: Generated, clipboardText: string) => {
    try {
      const config = await ipcRenderer.sendSync("store-get");
      const url = `${config.jiraUrl}/rest/api/3/search?jql=key="${clipboardText}"&fields=key,summary,status,issuetype,parent`;
      const username = config.jiraUsername;
      const password = config.jiraToken;
      const authValue = Buffer.from(username + ":" + password).toString(
        "base64"
      );

      const response = await tiny.get({
        url,
        headers: {
          Authorization: `Basic ${authValue}`,
        },
      });

      if (response.body && response.body.issues) {
        const issue = response.body.issues[0];
        const parentIssue = issue.fields.parent?.key ?? undefined;

        const data = generateText(
          generated,
          issue.fields.issuetype.name,
          issue.key,
          issue.fields.summary,
          parentIssue
        );

        return { success: true, data };
      }
    } catch (error) {
      console.error(error);
      return { success: false, error: true };
    }
  },
};

contextBridge.exposeInMainWorld("Main", api);
