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
  console.log(`[prerender] ${routes.length} route(s) to render: ${routes.join(", ")}`);

  const server = await preview({ preview: { port: 4173, host: "127.0.0.1" }, logLevel: "warn" });
  const base = server.resolvedUrls.local[0];

  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Prerendering "visits" every page once per build. Without this, every
  // build would fire a real GTM pageview/conversion pull against production
  // analytics — the network call is blocked, the actual app content is
  // unaffected since GTM doesn't touch visible markup.
  await page.route("**googletagmanager.com**", (route) => route.abort());

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
      results.set(route, await page.content());
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
