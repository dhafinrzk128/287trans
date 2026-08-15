import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// Prerendering runs `vite preview` against a production build with no local
// backend, so it needs its own proxy target — the live API — instead of
// localhost:4000. Override with PRERENDER_API_BASE if needed.
const prerenderApiBase = process.env.PRERENDER_API_BASE || 'https://287trans.id'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': 'http://localhost:4000',
      '/uploads': 'http://localhost:4000',
    },
  },
  preview: {
    proxy: {
      '/api': { target: prerenderApiBase, changeOrigin: true },
      '/uploads': { target: prerenderApiBase, changeOrigin: true },
    },
  },
})
