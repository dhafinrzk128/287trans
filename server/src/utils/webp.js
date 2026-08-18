const sharp = require("sharp");

// Generates a same-name .webp sibling next to an uploaded image, so the
// client can request <basename>.webp and fall back to the original if it
// 404s (see client/src/utils/format.js#toWebpUrl). Deliberately not used
// for payment-proof uploads (bukti transfer) — those should keep their
// exact original bytes.
async function generateWebpSibling(filePath) {
  const webpPath = filePath.replace(/\.[^.]+$/, ".webp");
  try {
    await sharp(filePath).webp({ quality: 80 }).toFile(webpPath);
  } catch (err) {
    console.error(`[webp] Failed to generate WebP for ${filePath}:`, err.message);
  }
}

async function generateWebpForFiles(files) {
  await Promise.all(files.map((f) => generateWebpSibling(f.path)));
}

module.exports = { generateWebpSibling, generateWebpForFiles };
