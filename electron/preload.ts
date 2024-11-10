import { contextBridge, ipcRenderer } from 'electron'

let current: string = localStorage.getItem('current-win') ?? ''

ipcRenderer.on('currentWindow', (_, currentWindow) => {
  current = currentWindow
  localStorage.setItem('current-win', currentWindow)
})

contextBridge.exposeInMainWorld('win', {
  operation(type: string, ...args: any[]) {
    ipcRenderer.send('win', current, type, ...args)
  },
})

contextBridge.exposeInMainWorld('tools', {
  ipcSend(method: string, ...args: any[]) {
    ipcRenderer.send(method, ...args)
  },
  ipcInvoke(method: string, ...args: any[]) {
    return ipcRenderer.invoke(method, ...args)
  },
})
