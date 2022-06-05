import { app, BrowserWindow, ipcMain, IpcMainEvent } from "electron";
import { join } from "path";
import { Low, JSONFile } from "lowdb";
import { Store, storeDefaults } from "../src/utilities/store";

let mainWindow: BrowserWindow | null;

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

function createWindow() {
  mainWindow = new BrowserWindow({
    // icon: path.join(assetsPath, 'assets', 'icon.png'),
    autoHideMenuBar: true,
    backgroundColor: "#181a20",
    darkTheme: true,
    width: 1100,
    height: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

async function registerConfig() {
  const __dirname = app.getPath("userData");
  const file = join(__dirname, "config.json");
  const adapter = new JSONFile<Store>(file);
  const store = new Low(adapter);
  await store.read();

  store.data ||= storeDefaults;
  await store.write();

  ipcMain.on("store-get", async (event: IpcMainEvent) => {
    event.returnValue = store.data;
  });

  ipcMain.on("store-set", async (event: IpcMainEvent, config: Store) => {
    store.data = config;
    await store.write();
    event.returnValue = "ok";
  });
}

app
  .on("ready", createWindow)
  .whenReady()
  .then(registerConfig)
  .catch((e) => console.error(e));

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
