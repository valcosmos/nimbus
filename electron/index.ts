import process from 'node:process'
import { app, BrowserWindow } from 'electron'

function createMainWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      zoomFactor: 2,
    },
  })

  win.loadURL(process.env.VITE_DEV_SERVER_URL!)
}

app.whenReady().then(() => {
  createMainWindow()
})
