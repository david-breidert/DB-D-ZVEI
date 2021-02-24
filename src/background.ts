'use strict';

import { app, protocol, BrowserWindow, ipcMain, powerSaveBlocker } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
import { autoUpdater } from 'electron-updater';
import path from 'path';
import Datastore from 'nedb';
const isDevelopment = process.env.NODE_ENV !== 'production';

const db = new Datastore({
  filename: path.join(app.getPath('userData'), 'db.db'),
  autoload: true
});

app.commandLine.appendSwitch('disable-renderer-backgrounding');
powerSaveBlocker.start('prevent-app-suspension');

autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = false;
let mainWindow: BrowserWindow;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }]);

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1600,
    height: 900,
    minWidth: 430,
    minHeight: 500,
    frame: false,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      enableRemoteModule: true,
      nodeIntegration: (process.env.ELECTRON_NODE_INTEGRATION as unknown) as boolean,
      backgroundThrottling: false
    }
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    await win.loadURL('app://./index.html');
  }
  return win;
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString());
    }
  }
  db.persistence.compactDatafile();
  mainWindow = await createWindow();
  await autoUpdater.checkForUpdates();
});

if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}

autoUpdater.on('checking-for-update', () => {
  mainWindow.webContents.send('checking-for-update');
});
autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update-available');
});
autoUpdater.on('update-not-available', () => {
  mainWindow.webContents.send('update-not-available');
});
autoUpdater.on('download-progress', (progressData: object) => {
  mainWindow.webContents.send('download-progress', progressData);
});
autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall(true, true);
});

ipcMain.on('install-update', async () => {
  await autoUpdater.downloadUpdate();
});
ipcMain.on('close-window', event => {
  const win = BrowserWindow.fromId(event.frameId);
  if (win) win.destroy();
});
ipcMain.on('maximize-window', event => {
  const win = BrowserWindow.fromId(event.frameId);
  if (win) win.isMaximized() ? win.unmaximize() : win.maximize();
});
ipcMain.on('minimize-window', event => {
  const win = BrowserWindow.fromId(event.frameId);
  if (win) win.minimize();
});
