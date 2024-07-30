import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
// import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // base: '/app-1',
  build: {
    manifest: true,
    emptyOutDir: true,
    // outDir: '../wwwroot/app-1',
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      }
    },
  },
})
