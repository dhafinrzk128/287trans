// Build-time sitemap.xml generator. Runs after `vite build` so dist/ exists,
// and reuses getRoutes.js so this can never list a URL the prerender step
// doesn't also render (or vice versa).

import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getSitemapRoutes, getCarRoutes } from "./getRoutes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, "..", "dist");
const SITE_URL = "https://287trans.id";

function escapeXml(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Mobil has no updatedAt column (see server/prisma/schema.prisma) so there's
// no real per-row "last changed" timestamp to report — using build time for
// every entry is honest about that rather than inventing per-page dates.
function priorityFor(route, carRoutes) {
  if (route === "/") return { priority: "1.0", changefreq: "daily" };
  if (route === "/katalog") return { priority: "0.9", changefreq: "daily" };
  if (carRoutes.has(route)) return { priority: "0.8", changefreq: "weekly" };
  return { priority: "0.5", changefreq: "monthly" };
}

async function main() {
  const carRoutes = new Set(await getCarRoutes());
  const routes = await getSitemapRoutes();
  const lastmod = new Date().toISOString().split("T")[0];

  const urls = routes
    .map((route) => {
      const { priority, changefreq } = priorityFor(route, carRoutes);
      return [
        "  <url>",
        `    <loc>${escapeXml(SITE_URL + route)}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${changefreq}</changefreq>`,
        `    <priority>${priority}</priority>`,
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  await writeFile(path.join(DIST_DIR, "sitemap.xml"), xml, "utf-8");
  console.log(`[sitemap] Wrote sitemap.xml with ${routes.length} URL(s).`);
}

main().catch((err) => {
  console.error("[sitemap] Failed:", err);
  process.exit(1);
});
