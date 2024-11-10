import type { OpenDialogOptions } from 'electron'
import { existsSync, readFile, readFileSync, writeFileSync } from 'node:fs'
import path, { dirname, join } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { app, BrowserWindow, dialog, globalShortcut, ipcMain, Menu, nativeImage, Tray } from 'electron'

const __dirname = dirname(fileURLToPath(import.meta.url))

const windowObj: Record<string, BrowserWindow> = {}

const win: BrowserWindow | null = null

function createMainWindow() {
  windowObj.MainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  windowObj.MainWindow.loadURL(process.env.VITE_DEV_SERVER_URL!)
  windowObj.MainWindow.setMenu(null)
  // win.maximize()
  // win.once('ready-to-show', () => {
  //   win.show()
  // })

  windowObj.MainWindow.on('close', (event) => {
    event.preventDefault()
    windowObj.MainWindow?.hide()
  })

  if (process.env.NODE_ENV === 'development')
    windowObj.MainWindow.webContents.openDevTools()
}

function devTools(win: string) {
  if (process.env.NODE_ENV === 'development') {
    const current = windowObj[win]

    if (current.webContents.isDevToolsOpened()) {
      current.webContents.closeDevTools()
    }
    else {
      current.webContents.openDevTools()
    }
    console.log('devTools', win)
  }
}

app.whenReady().then(() => {
  const icon = nativeImage.createFromPath(join(__dirname, 'logo.png'))
  const tray = new Tray(icon)
  tray.on('click', () => {
    windowObj.MainWindow.show()
  })

  const menu = Menu.buildFromTemplate([
    {
      label: '打开主界面',
      click: () => {
        windowObj.MainWindow.show()
      },
    },
    {
      label: '退出',
      click: () => {
        app.exit()
      },
    },
  ])
  tray.setContextMenu(menu)

  tray.setToolTip('nimbus~')

  globalShortcut.register('CommandOrControl+Shift+I', () => {
    windowObj.MainWindow.webContents.openDevTools()
  })
  createMainWindow()
})

ipcMain.on('win', (_, win, type, ...args) => {
  switch (type) {
    case 'devTools':
      devTools(win)
      break
    case 'hide':
      windowObj[win].hide()
      break
  }
})

ipcMain.handle('readFileSync', (_, filePath, encoding = 'utf-8') => {
  return readFileSync(join(__dirname, filePath), {
    encoding,
  })
})

ipcMain.handle('readSystemFile', (_, filePath, encoding) => {
  return new Promise((resolve, reject) => {
    readFile(join(filePath), {
      encoding,
    }, (err, data) => {
      resolve({
        err,
        data,
      })
    })
  })
})

ipcMain.handle('writeFileSync', (_, filePath, data, encoding = 'utf-8') => {
  return writeFileSync(join(__dirname, filePath), data, {
    encoding,
  })
})

ipcMain.handle('message', (_, title, message, type = 'info') => {
  // dialog.showMessageBox({
  //   title,
  //   message,
  //   type,
  //   buttons: ['确定'],
  // })

  return dialog.showMessageBox(win!, {
    title,
    message,
    type,
    buttons: ['确定'],
  })
})

ipcMain.handle('existsSync', (_, filePath, data, type = 'info') => {
  return existsSync(join(__dirname, filePath))
})

ipcMain.handle('getFiles', (_, opt: OpenDialogOptions) => {
  return dialog.showOpenDialog({
    title: opt.title ?? '',
    defaultPath: opt.defaultPath ?? '',
    filters: opt.filters ?? [],
    properties: opt.properties ?? [],
    buttonLabel: opt.buttonLabel ?? '',
  })
})
