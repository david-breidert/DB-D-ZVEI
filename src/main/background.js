'use strict'

import {
  app,
  protocol,
  BrowserWindow,
  ipcMain,
  powerSaveBlocker
} from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import { autoUpdater } from 'electron-updater'
const isDevelopment = process.env.NODE_ENV !== 'production'
const path = require('path')
const Datastore = require('nedb')
const db = new Datastore({
  filename: path.join(app.getPath('userData'), 'db.db'),
  autoload: true
})

app.commandLine.appendSwitch('disable-renderer-backgrounding')
powerSaveBlocker.start('prevent-app-suspension')

autoUpdater.autoDownload = false
autoUpdater.autoInstallOnAppQuit = false
let mainWindow

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

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
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      backgroundThrottling: false
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    await win.loadURL('app://./index.html')
  }
  return win
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  db.persistence.compactDatafile()
  mainWindow = await createWindow()
  await autoUpdater.checkForUpdates()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

autoUpdater.on('checking-for-update', () => {
  mainWindow.webContents.send('checking-for-update')
})
autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update-available')
})
autoUpdater.on('update-not-available', () => {
  mainWindow.webContents.send('update-not-available')
})
autoUpdater.on('download-progress', progressData => {
  mainWindow.webContents.send('download-progress', progressData)
})
autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall(true, true)
})

ipcMain.on('app-version', event => {
  event.reply('app-version', { version: app.getVersion() })
})
ipcMain.on('install-update', async () => {
  let path = await autoUpdater.downloadUpdate()
  console.log(path)
})
ipcMain.on('close-window', event => {
  console.log('trying to kill window')
  BrowserWindow.fromId(event.frameId).destroy()
})
ipcMain.on('maximize-window', event => {
  let win = BrowserWindow.fromId(event.frameId)
  win.isMaximized() ? win.unmaximize() : win.maximize()
})
ipcMain.on('minimize-window', event => {
  BrowserWindow.fromId(event.frameId).minimize()
})

ipcMain.on('getEm', (evt, searchObj) => {
  db.find(searchObj, (err, docs) => {
    if (err) {
      throw err
    }
    console.log(docs)
    evt.reply('postEm', docs)
  })
})

ipcMain.on('addEm', (evt, em) => {
  console.log('Inserting EM')
  db.insert(em, (err, newEm) => {
    console.log('Replying with: ' + newEm)
    evt.reply('emAdded', newEm)
  })
})
ipcMain.on('editEm', (evt, em) => {
  console.log('Updating EM')
  db.update({ _id: em._id }, em)
})
ipcMain.on('deleteEm', (evt, em) => {
  console.log('Deleting EM ' + em._id)
  db.remove({ _id: em._id })
})
