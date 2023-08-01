import { clipboard, contextBridge, ipcRenderer } from "electron";
import tiny from "tiny-json-http";
import { Store } from "./store";
import { GeneratedText, RequestType } from "../src/Jira/Jira";
import { SlackStatusType, getSlackStatus } from "../src/utilities/slack";

interface Task {
  url: string;
  data: {
    channel: string;
    name: string;
    timestamp: string;
  };
  headers: {
    Authorization: string;
  };
}

const runInSequence = (tasks: Task[]) => {
  if (tasks.length > 0) {
    const { url, data, headers } = tasks[0];

    tiny.post({ url, data, headers }, function _get(err) {
      if (err) {
        return console.error(err);
      }

      setTimeout(() => {
        tasks.shift();
        if (tasks.length > 0) runInSequence(tasks);
      }, 1000);
    });
  }
};

const generateText = (
  requestType: RequestType,
  type: string,
  prefix: string,
  issue: string,
  parentIssue?: string
): GeneratedText => {
  if (requestType === "branch") {
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

    return {
      issueKey: prefix,
      issueText: issue,
      text: `${prefix}-${branchName}`,
    };
  }

  if (requestType === "pr") {
    if (type !== "") {
      return {
        issueKey: prefix,
        issueText: issue,
        text: `${type} - ${prefix} - ${issue}`,
      };
    }

    return {
      issueKey: prefix,
      issueText: issue,
      text: `${prefix} - ${issue}`,
    };
  }

  return {
    issueKey: prefix,
    issueText: issue,
    text: "",
  };
};

export const api = {
  resizeWindow: () => ipcRenderer.sendSync("resize-window"),

  store: {
    get: (): Store => ipcRenderer.sendSync("store-get"),
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

  sendSlackReaction: async (
    channel: string,
    timestamp: string,
    emojiList: string[]
  ) => {
    const config = await ipcRenderer.sendSync("store-get");
    const url = `https://slack.com/api/reactions.add`;
    const authValue = config.slackToken;
    const headers = {
      Authorization: `Bearer ${authValue}`,
    };

    const tasks = emojiList.map((name) => ({
      url,
      data: { channel, name, timestamp },
      headers,
    }));

    runInSequence(tasks);
  },

  generateText: async (requestType: RequestType, clipboardText: string) => {
    try {
      const config: Store = await ipcRenderer.sendSync("store-get");
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
          requestType,
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
