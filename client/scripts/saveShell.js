// Post-build step: menyimpan salinan index.html yang belum diprerender
// sebagai dist/spa-shell.html.
//
// Kenapa: prerender.js menulis hasil potret halaman "/" ke dist/index.html.
// Sebelum ada berkas ini, server memakai berkas yang sama sebagai cadangan
// untuk setiap halaman yang tidak punya hasil prerender — /booking/:id,
// /status/:kode, /admin/*, dan 404. Akibatnya halaman-halaman itu dikirim
// dengan HTML beranda: pengunjung di ponsel lambat melihat isi beranda
// selama JS dimuat, lalu React menolak HTML itu (error #418) dan merender
// ulang dari nol. Shell ini isinya hanya spinner (lihat #root di index.html),
// dan main.jsx merender di atasnya alih-alih meng-hydrate.
//
// Dijalankan SETELAH inlineCss.js (supaya shell ikut membawa CSS yang sudah
// tersisip) dan SEBELUM prerender.js (supaya yang tersalin belum ditimpa).
// Snippet GTM ikut tersalin apa adanya, jadi tracking di halaman-halaman itu
// tidak berubah.

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, "..", "dist");
const INDEX = path.join(DIST, "index.html");
const SHELL = path.join(DIST, "spa-shell.html");

async function main() {
  const html = await readFile(INDEX, "utf-8");

  // Penjaga urutan: kalau index.html sudah berisi potret beranda, spinner
  // penandanya sudah hilang. Menyalinnya berarti mengulang bug yang mau
  // diperbaiki, jadi lebih baik build gagal dengan pesan yang jelas.
  // Yang dicari elemennya, bukan kata "data-shell" saja: komentar di
  // index.html yang menjelaskan spinner ini ikut terbawa ke hasil potret.
  if (!html.includes("<div data-shell")) {
    throw new Error(
      "index.html tidak berisi spinner data-shell — kemungkinan sudah ditimpa prerender. " +
        "Jalankan saveShell.js sebelum prerender.js."
    );
  }

  await writeFile(SHELL, html, "utf-8");
  console.log(`[save-shell] ${path.basename(SHELL)} disimpan (${Math.round(html.length / 1024)} KB).`);
}

main().catch((err) => {
  console.error("[save-shell] Gagal:", err.message);
  process.exit(1);
});
