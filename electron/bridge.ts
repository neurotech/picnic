import { clipboard, contextBridge, ipcRenderer } from "electron";
import tiny from "tiny-json-http";

const getBranchName = (prefix: string, issue: string) => {
  let branchName = issue
    .toLowerCase()
    .replace(/\(xs\)|\(s\)|\(m\)|\(l\)|\(xl\)/gi, "")
    .replace(/:/g, "")
    .replace(/>/g, "")
    .replace(/</g, "")
    .replace(/\//g, "")
    .replace(/\\/g, "")
    .replace(/\./g, "-")
    .replace(/\s/g, "-");

  if (branchName.endsWith("-")) {
    branchName = branchName.slice(0, -1);
  }

  return `${prefix}-${branchName}`;
};

export const api = {
  /**
   * Here you can expose functions to the renderer process
   * so they can interact with the main (electron) side
   * without security problems.
   *
   * The function below can accessed using `window.Main.readClipboardText`
   */

  readClipboardText: () => {
    return clipboard.readText();
  },

  writeToClipbard: (text: string) => {
    return clipboard.writeText(text);
  },

  // eslint-disable-next-line no-undef
  fetchUrl: async (url: string) => {
    try {
      const username = "TODO";
      const password = "TODO";
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
        const branchName = getBranchName(issue.key, issue.fields.summary);

        return { success: true, data: branchName };
      }
    } catch (error) {
      console.error(error);
      return { success: false, error: true };
    }
  },

  /**
   * Provide an easier way to listen to events
   */
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data));
  },
};

contextBridge.exposeInMainWorld("Main", api);
