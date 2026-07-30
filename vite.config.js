import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Don Bosco Public School Hathaura',
        short_name: 'Don Bosco',
        theme_color: '#0066CC',
      }
    })
  ],
  build: {
    outDir: 'dist',
  }
})
