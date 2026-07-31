import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: ['.monkeycode-ai.live']
  },
  resolve: {
    alias: [
      // Redirect all broken import paths to actual files in root
      { find: /^\.\.\/\.\.\/lib\/supabase$/, replacement: path.resolve(__dirname, 'lib/supabase.js') },
      { find: /^\.\.\/lib\/supabase$/, replacement: path.resolve(__dirname, 'lib/supabase.js') },
      { find: /^\.\/lib\/supabase$/, replacement: path.resolve(__dirname, 'lib/supabase.js') },
      { find: /^\.\.\/\.\.\/components\/(.*)$/, replacement: path.resolve(__dirname, '$1.jsx') },
      { find: /^\.\.\/components\/(.*)$/, replacement: path.resolve(__dirname, '$1.jsx') },
      { find: /^\.\/components\/(.*)$/, replacement: path.resolve(__dirname, '$1.jsx') },
      { find: /^\.\.\/\.\.\/pages\/public\/(.*)$/, replacement: path.resolve(__dirname, '$1.jsx') },
      { find: /^\.\.\/\.\.\/pages\/app\/(.*)$/, replacement: path.resolve(__dirname, '$1.jsx') },
      { find: /^\.\.\/pages\/public\/(.*)$/, replacement: path.resolve(__dirname, '$1.jsx') },
      { find: /^\.\.\/pages\/app\/(.*)$/, replacement: path.resolve(__dirname, '$1.jsx') },
    ]
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@supabase')) return 'supabase'
            if (id.includes('recharts')) return 'charts'
            if (id.includes('react-router')) return 'router'
            if (id.includes('react') || id.includes('scheduler')) return 'react'
            if (id.includes('qrcode')) return 'qrcode'
            return 'vendor'
          }
        },
      },
    },
  }
})
