// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     // 将所有 /api 开头的请求代理到 http://localhost:3001
  //     '/api': {
  //       target: 'http://localhost:3001', // 你的 Express 服务器地址
  //       changeOrigin: true, // 必须设置为 true
  //     }
  //   }
  // }
})