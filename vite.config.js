import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // This makes ALL imports work regardless of folder depth
      '../../lib/supabase': resolve(__dirname, 'lib/supabase.js'),
      '../lib/supabase': resolve(__dirname, 'lib/supabase.js'),
      './lib/supabase': resolve(__dirname, 'lib/supabase.js'),
      '../../components/Chatbot': resolve(__dirname, 'Chatbot.jsx'),
      '../components/Chatbot': resolve(__dirname, 'Chatbot.jsx'),
      './components/Chatbot': resolve(__dirname, 'Chatbot.jsx'),
      '../../components/Navbar': resolve(__dirname, 'Navbar.jsx'),
      '../../components/Footer': resolve(__dirname, 'Footer.jsx'),
      '../components/Navbar': resolve(__dirname, 'Navbar.jsx'),
      '../components/Footer': resolve(__dirname, 'Footer.jsx'),
    }
  },
  build: {
    outDir: 'dist',
  }
})
