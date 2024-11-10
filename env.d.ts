/// <reference types="vite/client" />

declare global {
  interface Window {
    isLogin: boolean
    loginData: Record<string, any> | null
  }

  const tools: {
    ipcInvoke: (method: string, ...args: any[]) => Promise<any>
    message: (title: string, content: string) => Promise<any>
  }
}

export { }
