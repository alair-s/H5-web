import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
  base: '/h5/',
  plugins: [
    react(),
    tailwindcss(),
    ViteImageOptimizer({
      png: { quality: 75 },
      jpg: { quality: 80 },
      jpeg: { quality: 80 },
      avif: { quality: 75 },
      webp: { quality: 80 },
    }),
  ],
  build: {
    // JS 分包：vendor 库单独缓存，不随业务代码更新而失效
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-motion': ['motion'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  server: {
    host: '0.0.0.0',
    port: 5175,
  },
})