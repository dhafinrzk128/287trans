// Post-build step: crawl the freshly-built SPA with a real browser and save
// the fully-rendered HTML for each public route, so Googlebot (and anyone
// with JS disabled) gets real content instead of an empty <div id="root">.
//
// Why not vite-react-ssg / vite-plugin-prerender: the former wants the
// react-router data-router API this app doesn't use, the latter hasn't been
// published since 2022 and predates this project's Vite major version by a
// lot. A small script against `vite preview` + Playwright has no
// compatibility surface to break.
//
// Why this needs its own API proxy: the Railway build step has no database
// connection (see root package.json's build script — prisma:generate runs
// against a placeholder DATABASE_URL just to generate types, nothing else
// touches the DB at build time). So instead of querying Prisma directly,
// this crawls against the *live* site's API (see vite.config.js `preview.proxy`
// and getRoutes.js) to get real car data. Override the target with
// PRERENDER_API_BASE if you ever need to point this at a different environment.
//
// KONSEKUENSINYA, DAN INI SUDAH DUA KALI MEMAKAN WAKTU:
//
// Karena isinya datang dari API yang hidup, hasil build ini BUKAN fungsi dari
// kode sumbernya saja. Railway meng-cache langkah `npm run build` berdasarkan
// pohon sumber, jadi deploy ulang tanpa perubahan berkas sama sekali tidak
// menjalankan skrip ini — log build-nya kosong dari baris [prerender], dan
// HTML statis yang lama tetap terpasang.
//
// Akibatnya, isi yang berasal dari basis data (deskripsi unit, tanya-jawab
// halaman depan) butuh DUA deploy: yang pertama mengisi basis data lewat
// startup server, yang kedua memotret ulang HTML-nya. Dan deploy kedua itu
// hanya berjalan kalau ada yang berubah di sumber — karena itulah angka di
// bawah ada.
//
// Naikkan REVISI satu angka untuk memaksa build kedua berjalan. Angkanya
// sendiri tidak dipakai untuk apa pun selain dicatat ke log, supaya terlihat
// di log build bahwa langkah ini benar-benar dijalankan, bukan diambil dari
// cache.
//
// Pengunjung tidak terpengaruh menunggu ini: halaman tetap mengambil datanya
// sendiri saat dibuka. Yang tertinggal hanya potret statis untuk perayap.
const REVISI = 2;

import { preview } from "vite";
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getAllRoutes } from "./getRoutes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, "..", "dist");

function outputPathFor(route) {
  return route === "/" ? DIST_DIR : path.join(DIST_DIR, route);
}

async function main() {
  const routes = await getAllRoutes();
  console.log(`[prerender] revisi ${REVISI} — berjalan, bukan dari cache.`);
  console.log(`[prerender] ${routes.length} route(s) to render: ${routes.join(", ")}`);

  const server = await preview({ preview: { port: 4173, host: "127.0.0.1" }, logLevel: "warn" });
  const base = server.resolvedUrls.local[0];
  const previewOrigin = new URL(base).origin;

  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Prerendering "visits" every page once per build. Without this, every
  // build would fire a real GTM pageview/conversion pull against production
  // analytics — the network call is blocked, the actual app content is
  // unaffected since GTM doesn't touch visible markup.
  await page.route("**googletagmanager.com**", (route) => route.abort());

  // <Reveal> (src/hooks/useReveal.js) starts every element hidden and uses
  // IntersectionObserver to fade it in once scrolled into view. A real
  // Chromium viewport during this crawl means anything within the fold
  // actually intersects and gets captured with the "is-visible" class baked
  // in — which a fresh client hydration never starts with (useState always
  // starts at false), causing a hydration mismatch on every page that uses
  // <Reveal>, which is nearly all of them. Stubbing the observer out keeps
  // every element captured in its true initial (hidden) state, matching
  // hydration exactly; real visitors still get the fade-in animation as
  // they scroll, same as before this existed.
  await page.addInitScript(() => {
    window.IntersectionObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });

  // General version of the same problem: any effect that measures the real
  // DOM (offsetLeft/offsetWidth, getBoundingClientRect, etc.) and mutates
  // state in response — e.g. <TipeToggle>'s sliding pill indicator — also
  // runs for real during this crawl, baking its post-measurement result
  // into the captured HTML. A fresh hydration starts from the pre-effect
  // state, so the two never match. Components with this pattern should
  // check this flag and skip the measurement during prerendering, staying
  // in their initial state so the captured HTML matches what hydration
  // expects; the effect still runs normally for real visitors.
  await page.addInitScript(() => {
    window.__PRERENDERING__ = true;
  });

  // Captured HTML is held in memory and only written to disk after every
  // route has been crawled. `vite preview` falls back to dist/index.html for
  // any path it doesn't have a static file for yet — writing results to disk
  // mid-crawl would make an already-rendered route (e.g. "/") leak into the
  // fallback shell served to routes crawled after it, baking one page's
  // <title>/<meta>/canonical into another's output.
  const results = new Map();
  const failures = [];
  for (const route of routes) {
    try {
      const url = new URL(route, base).toString();
      await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
      await page.waitForTimeout(150); // let React settle just past network-idle

      // index.html carries GTM's standard inline loader, which injects its own
      // <script src="...gtm.js?id=..."> at runtime. That injected tag is part
      // of the live DOM by the time we snapshot it, so it gets baked into the
      // static HTML — and then every real visitor loads GTM twice: once from
      // the baked tag, once from the inline loader running again. Two
      // initialisations of the same container risk double-firing tags, which
      // would inflate conversion counts. Drop the injected tags before
      // capturing; the inline loader stays untouched, so real visitors still
      // get GTM exactly once.
      await page.evaluate(() => {
        document
          .querySelectorAll('script[src*="googletagmanager.com"]')
          .forEach((el) => el.remove());
      });

      // index.html loads the Google Fonts stylesheet with media="print" plus an
      // onload that flips it to "all" — the standard way to fetch a stylesheet
      // without letting it gate first paint. By snapshot time that onload has
      // already run, so the DOM says media="all" and *that* is what gets baked
      // into the static HTML: every prerendered page then ships a genuinely
      // render-blocking stylesheet on a third-party origin, which is the exact
      // cost the attribute existed to avoid. Put it back to its pre-onload
      // value so the served HTML starts where a fresh load should.
      await page.evaluate(() => {
        document.querySelectorAll("link[rel='stylesheet'][onload]").forEach((el) => {
          if (/this\.media\s*=/.test(el.getAttribute("onload") || "")) el.media = "print";
        });
      });

      // React Router's lazy-route preloading inserts <link rel="modulepreload">
      // tags with an absolute href computed from the current origin — since
      // that's this preview server, it bakes http://127.0.0.1:4173/... into
      // the captured HTML. Strip it back to root-relative so it resolves
      // correctly against whatever origin actually serves the built site.
      const html = (await page.content()).split(previewOrigin).join("");
      results.set(route, html);
      console.log(`[prerender] ok    ${route}`);
    } catch (err) {
      console.error(`[prerender] FAIL  ${route} — ${err.message}`);
      failures.push(route);
    }
  }

  await browser.close();
  await new Promise((resolve) => server.httpServer.close(resolve));

  // Write everything that *did* render, regardless of whether other routes
  // failed — a single flaky route (e.g. a network blip hitting the live API
  // proxy) shouldn't cost every other successfully-rendered page its content.
  for (const [route, html] of results) {
    const outDir = outputPathFor(route);
    await mkdir(outDir, { recursive: true });
    await writeFile(path.join(outDir, "index.html"), html, "utf-8");
  }

  if (failures.length > 0) {
    console.error(`[prerender] ${failures.length} route(s) failed: ${failures.join(", ")}`);
    process.exit(1);
  }
  console.log("[prerender] Done.");
}

main().catch((err) => {
  console.error("[prerender] Unexpected error:", err);
  process.exit(1);
});
