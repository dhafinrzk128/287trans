// Post-build step: menyisipkan CSS aplikasi langsung ke dalam index.html,
// menggantikan <link rel="stylesheet"> yang menghalangi render.
//
// Kenapa: CSS ini satu-satunya berkas yang benar-benar menahan paint pertama,
// tapi ia harus ditemukan dulu di dalam HTML, baru diminta lewat koneksi
// terpisah — satu perjalanan bolak-balik tambahan sebelum apa pun bisa
// digambar. Lebih buruk lagi, permintaan itu berangkat bersamaan dengan bundel
// JavaScript yang jauh lebih besar, jadi di jaringan lambat CSS 9 KB antre di
// belakang JS 115 KB. Diukur pada PageSpeed (Slow 4G, Moto G Power): First
// Contentful Paint 3,0 detik padahal TBT hanya 10 ms — waktunya habis
// menunggu berkas, bukan menjalankan kode.
//
// Setelah disisipkan, gaya halaman tiba bersama HTML-nya. Tidak ada
// permintaan kedua, dan tidak ada perlombaan dengan JavaScript.
//
// Konsekuensi yang diterima sadar: berkas .css yang ter-hash sebelumnya bisa
// disimpan browser setahun penuh, sedangkan HTML selalu divalidasi ulang.
// Jadi pengunjung berulang kini menerima ~9 KB CSS lagi setiap kunjungan.
// Untuk situs yang mayoritas trafiknya kunjungan pertama dari iklan berbayar,
// kunjungan pertama yang lebih cepat lebih berharga daripada kunjungan
// berulang yang lebih hemat.
//
// Dijalankan SEBELUM prerender.js, supaya seluruh halaman statis yang
// dipotret ikut membawa gaya yang sudah tersisip.

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, "..", "dist");
const INDEX = path.join(DIST, "index.html");

// Hanya CSS aplikasi sendiri. <link> ke fonts.googleapis.com sengaja
// dibiarkan: berkasnya ada di origin lain, sudah dimuat non-blocking lewat
// media="print" + onload, dan isinya tidak kita miliki untuk disisipkan.
const POLA_LINK = /<link[^>]+rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/;

async function main() {
  const html = await readFile(INDEX, "utf-8");

  if (html.includes("<style>/* inline:")) {
    console.log("[inline-css] Sudah tersisip, dilewati.");
    return;
  }

  const cocok = html.match(POLA_LINK);
  if (!cocok) {
    console.warn("[inline-css] Tidak menemukan <link> stylesheet aplikasi di index.html — dilewati.");
    return;
  }

  const [tagPenuh, hrefCss] = cocok;
  const berkasCss = path.join(DIST, hrefCss.replace(/^\//, ""));
  const css = await readFile(berkasCss, "utf-8");

  // Penanda dipakai untuk mendeteksi sisipan pada eksekusi berikutnya, dan
  // untuk menelusuri asal gaya ini kalau nanti ada yang membuka HTML mentah.
  const gaya = `<style>/* inline: ${path.basename(berkasCss)} */${css}</style>`;
  await writeFile(INDEX, html.replace(tagPenuh, gaya), "utf-8");

  const kb = (n) => `${Math.round(n / 1024)} KB`;
  console.log(
    `[inline-css] ${path.basename(berkasCss)} (${kb(css.length)}) disisipkan ke index.html; ` +
      `satu permintaan penghalang-render dihapus.`
  );
}

main().catch((err) => {
  console.error("[inline-css] Gagal:", err);
  process.exit(1);
});
