import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import electron from 'vite-plugin-electron/simple'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar',
          ],
        },
      ],
    }),
    Components({
      resolvers: [NaiveUiResolver()],
    }),
    electron({
      main: {
        entry: 'electron/index.ts',
        vite: {
          build: {
            outDir: 'dist',
          },
        },
      },
      preload: {
        input: 'electron/preload.ts',
        vite: {
          build: {
            outDir: 'dist',
          },
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
