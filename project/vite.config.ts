import { fileURLToPath, URL } from 'node:url'
import { ConfigEnv, defineConfig, loadEnv, UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'node:path'
import { viteMockServe } from 'vite-plugin-mock'

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd())

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
    },
    server: {
      proxy: {
        [env.VITE_APP_API_URL]: {
          target: env.VITE_SERVE, // 使用环境变量
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    define: {
      __APP_TITLE__: JSON.stringify(env.VITE_APP_TITLE), // 注入全局变量
    }
  }
}


