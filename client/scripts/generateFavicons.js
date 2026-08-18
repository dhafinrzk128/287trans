// One-off asset generator, not part of the build. Output is committed like
// any other public/ asset, so the build itself doesn't need sharp/png-to-ico
// — they aren't in package.json. To regenerate after changing logo.png:
//   npm install --no-save sharp png-to-ico && node scripts/generateFavicons.js
//
// Source is logo.png, not the existing favicon.svg — that SVG is an
// unrelated purple mark that doesn't match the site's real gold/black brand
// (logo.png, used everywhere else: header, admin panel, og:image). It looks
// stale/unused rather than intentional, so favicons are generated from the
// asset that's actually live on the site.

import sharp from "sharp";
import pngToIco from "png-to-ico";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, "..", "public");
const SOURCE = path.join(PUBLIC_DIR, "logo.png");

// logo.png isn't square (700x569) — `contain` fits it inside each square
// canvas on a transparent background instead of stretching it.
function renderSquarePng(size) {
  return sharp(SOURCE)
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
}

async function main() {
  const [png16, png32, png48, png180, png192, png512] = await Promise.all(
    [16, 32, 48, 180, 192, 512].map(renderSquarePng)
  );

  const ico = await pngToIco([png16, png32, png48]);

  await Promise.all([
    writeFile(path.join(PUBLIC_DIR, "favicon.ico"), ico),
    writeFile(path.join(PUBLIC_DIR, "apple-touch-icon.png"), png180),
    writeFile(path.join(PUBLIC_DIR, "icon-192.png"), png192),
    writeFile(path.join(PUBLIC_DIR, "icon-512.png"), png512),
  ]);

  console.log("[favicons] Wrote favicon.ico, apple-touch-icon.png, icon-192.png, icon-512.png to public/.");
}

main().catch((err) => {
  console.error("[favicons] Failed:", err);
  process.exit(1);
});
