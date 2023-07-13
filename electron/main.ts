import { app, BrowserWindow, ipcMain, IpcMainEvent } from "electron";
import path from "node:path";
import { defaultStoreValues, Store } from "./store";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

process.env.DIST = path.join(__dirname, "../dist");
process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null;
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

const createWindow = () => {
  if (!process.env.PUBLIC) throw new Error("PUBLIC env var is undefined!");

  win = new BrowserWindow({
    backgroundColor: "#181a20",
    autoHideMenuBar: true,
    darkTheme: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      sandbox: false,
    },
  });

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    if (!process.env.DIST) throw new Error("DIST env var is undefined!");
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }
};

const registerConfig = async () => {
  const __dirname = app.getPath("userData");
  const file = path.join(__dirname, "config.json");
  const adapter = new JSONFile<Store>(file);
  const store = new Low(adapter, defaultStoreValues);
  await store.read();

  ipcMain.on("store-get", async (event: IpcMainEvent) => {
    event.returnValue = store.data;
  });

  ipcMain.on("store-set", async (event: IpcMainEvent, config: Store) => {
    store.data = config;
    await store.write();
    event.returnValue = "ok";
  });
};

app.on("window-all-closed", () => {
  win = null;
});

app
  .on("ready", createWindow)
  .whenReady()
  .then(registerConfig)
  .catch((e) => console.error(e));
