import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'node:path'



// https://vite.dev/config/
import { UserConfigExport, ConfigEnv } from 'vite'

import { viteMockServe } from 'vite-plugin-mock'

export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    plugins: [
      vue(),
      vueJsx(),
      vueDevTools(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        mockPath: 'mock',
        enable: command === 'serve', // 保证在开发环境下能使用mock
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/style/variables.scss" as *;'
        }
      }
    }
  }
}