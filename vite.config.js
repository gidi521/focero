import { defineConfig } from 'vite'
// import path from 'path-browserify'
import path from 'path';
import vue from '@vitejs/plugin-vue'
import ElementPlus from 'unplugin-element-plus/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ElementPlus({
      // options
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // 处理警告：The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
        // additionalData:'@import "@/styles/variable.scss";'  // 旧版本：全局导入样式变量文件
        additionalData: `@use "@/styles/variable.scss" as *;`  // 新版本：全局导入样式变量文件

      }
    }
  },
  //这里进行配置别名 
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 配置 @ 指向 src 目录
    },
  },
  // build: {
  //   // https://cn.vitejs.dev/guide/build.html#browser-compatibility
  //   target: "es2015",
  //   sourcemap: false,
  //   // 消除打包大小超过500kb警告
  //   chunkSizeWarningLimit: 4000,
  //   // rollupOptions: {
  //   //   input: {
  //   //     index: pathResolve("./index.html", import.meta.url)
  //   //   },
  //   //   // 静态资源分类打包
  //   //   output: {
  //   //     chunkFileNames: "static/js/[name]-[hash].js",
  //   //     entryFileNames: "static/js/[name]-[hash].js",
  //   //     assetFileNames: "static/[ext]/[name]-[hash].[ext]"
  //   //   }
  //   // }
  // },
})
