import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// Prerendering runs `vite preview` against a production build with no local
// backend, so it needs its own proxy target — the live API — instead of
// localhost:4000. Override with PRERENDER_API_BASE if needed.
const prerenderApiBase = process.env.PRERENDER_API_BASE || 'https://287trans.id'

// Semua halaman publik sudah diprerender, jadi JS tidak dibutuhkan untuk
// MENAMPILKAN halaman, hanya untuk interaksinya (hydration). Prioritas
// rendah membuat logo, ornamen hero, dan font mendapat bandwidth lebih dulu
// di jaringan lambat; JS tetap diunduh sejak awal, hanya tidak menyerobot.
// Diuji A/B dengan Lighthouse (Sep 2026): FCP simulasi 2,2 s -> 1,3 s.
function jsPrioritasRendah() {
  return {
    name: 'js-prioritas-rendah',
    transformIndexHtml: {
      order: 'post',
      handler: (html) =>
        html
          .replace(/<script type="module" crossorigin/g, '<script type="module" fetchpriority="low" crossorigin')
          .replace(/<link rel="modulepreload" crossorigin/g, '<link rel="modulepreload" fetchpriority="low" crossorigin'),
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), jsPrioritasRendah()],
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
