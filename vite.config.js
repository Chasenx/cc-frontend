import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/stag--cc-project/static/dist/',
  // build: {
  //   rollupOptions: {
  //     output: {
  //       // 禁用代码分割
  //       manualChunks: undefined,
  //     },
  //   },
  // },
  plugins: [vue()],
  // server:{
  //   host:'local.bkpaas.ce.bktencent.com',
  //   // port:'8000'
  // }

})
