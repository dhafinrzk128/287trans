import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'

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

// `vite preview` hanya mengenali dist/<route>/index.html kalau URL-nya
// berakhiran garis miring. /sewa-mpv-tangerang (tanpa garis miring, bentuk
// yang ditaut di seluruh situs) jatuh ke cadangan SPA, yaitu dist/index.html
// — yang setelah prerender berisi potret BERANDA. Router lalu merender
// halaman koleksi di atas HTML beranda: error #418 di setiap muat ulang,
// React membuang HTML statisnya, dan data prerender yang terbaca pun milik
// beranda, jadi hero sempat tampil tanpa harga.
//
// Produksi tidak begitu: server Express (server/src/index.js, penangan
// "Prerendered pages live on disk...") langsung mengirim berkas prerender
// untuk bentuk tanpa garis miring. Middleware ini meniru penangan itu, supaya
// hasil `npm run preview` bisa dipercaya saat memeriksa hidrasi.
//
// Aman untuk scripts/prerender.js, yang juga memakai `vite preview`: selama
// crawl belum ada satu pun berkas prerender di dist (semuanya ditulis setelah
// crawl selesai), jadi setiap permintaan tetap jatuh ke cangkang SPA.
function previewSepertiProduksi() {
  return {
    name: 'preview-seperti-produksi',
    configurePreviewServer(server) {
      const dist = path.resolve(server.config.root, server.config.build.outDir)
      server.middlewares.use((req, res, next) => {
        if (req.method !== 'GET' && req.method !== 'HEAD') return next()
        let pathname
        try {
          pathname = decodeURIComponent(new URL(req.url, 'http://x').pathname)
        } catch {
          return next()
        }
        if (/^\/(api|uploads|assets)(\/|$)/.test(pathname) || path.extname(pathname)) return next()
        const berkas = path.join(dist, pathname, 'index.html')
        if (!berkas.startsWith(dist) || !fs.existsSync(berkas)) return next()
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.setHeader('Cache-Control', 'no-cache')
        res.end(req.method === 'HEAD' ? undefined : fs.readFileSync(berkas))
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), jsPrioritasRendah(), previewSepertiProduksi()],
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
