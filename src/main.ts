import { createPinia } from 'pinia'

import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import './assets/main.css'

window.isLogin = false

tools.ipcInvoke('existsSync', './loginData.json').then((res) => {
  if (res) {
    window.isLogin = res
  }

  const app = createApp(App)

  app.use(createPinia())
  app.use(router)

  // const meta = document.createElement('meta')
  // meta.name = 'naive-ui-style'
  // document.head.appendChild(meta)

  app.mount('#app')
})
