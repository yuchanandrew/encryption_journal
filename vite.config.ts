import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    sourcemap: false,        // Speeds up builds
    target: 'esnext',        // Optimize output for modern browsers
    chunkSizeWarningLimit: 1000, // Optional, avoids noisy warnings
  },
  server: {
    host: true,
    port: 5173,
    strictPort: true
  },
  preview: {
    allowedHosts: ['emjournal.dev','www.emjournal.dev','api.emjournal.dev']
  }
})
