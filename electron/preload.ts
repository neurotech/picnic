import { clipboard, contextBridge, ipcRenderer } from "electron";
import { Store } from "./store";

export const api = {
  store: {
    get: (): Store => ipcRenderer.sendSync("store-get"),
    set: (store: Store) => ipcRenderer.sendSync("store-set", store),
  },

  readClipboardText: () => clipboard.readText(),
  setClipboardText: (text: string) => clipboard.writeText(text),
};

contextBridge.exposeInMainWorld("Main", api);
