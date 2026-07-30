import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
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
  }
})
