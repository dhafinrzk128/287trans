const path = require("path");
const fs = require("fs/promises");

const { UPLOAD_ROOT } = require("./upload");
const { generateWebpSibling } = require("./webp");

// Foto yang diunggah sejak generateWebpSibling() dipasang sudah punya
// pendamping .webp. Yang diunggah sebelum itu tidak, dan klien tetap
// menanyakannya (lihat client/src/components/SmartImage.jsx) — gambarnya
// tetap tampil karena turun lagi ke berkas asli, tapi setiap kunjungan
// membayar satu permintaan 404 per foto lama.
//
// Bukti transfer sengaja dilewati: berkas itu dipertahankan apa adanya,
// dengan alasan yang sama seperti di utils/webp.js.
const LEWATI_FOLDER = new Set(["bukti-transfer"]);

const BISA_DIUBAH = new Set([".jpg", ".jpeg", ".png"]);

async function kumpulkanGambar(dir, hasil = []) {
  let isi;
  try {
    isi = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return hasil; // folder belum ada — wajar di pemasangan baru
  }
  for (const entri of isi) {
    const penuh = path.join(dir, entri.name);
    if (entri.isDirectory()) {
      if (LEWATI_FOLDER.has(entri.name)) continue;
      await kumpulkanGambar(penuh, hasil);
    } else if (BISA_DIUBAH.has(path.extname(entri.name).toLowerCase())) {
      // Berkas nol byte tidak pernah bisa jadi gambar; melewatinya di sini
      // menghindarkan satu galat sharp yang tidak berguna di log setiap boot.
      const stat = await fs.stat(penuh).catch(() => null);
      if (stat && stat.size > 0) hasil.push(penuh);
    }
  }
  return hasil;
}

async function sudahPunyaWebp(berkas) {
  try {
    await fs.access(berkas.replace(/\.[^.]+$/, ".webp"));
    return true;
  } catch {
    return false;
  }
}

/**
 * Melengkapi pendamping .webp untuk gambar lama yang belum punya.
 * Aman dijalankan berulang kali: yang sudah punya dilewati.
 */
async function backfillWebp() {
  const gambar = await kumpulkanGambar(UPLOAD_ROOT);
  const kurang = [];
  for (const berkas of gambar) {
    if (!(await sudahPunyaWebp(berkas))) kurang.push(berkas);
  }

  if (kurang.length === 0) {
    return { diperiksa: gambar.length, dibuat: 0, tidakTerbaca: [] };
  }

  // Satu per satu, bukan Promise.all: sharp memuat seluruh gambar ke memori,
  // dan mengubah puluhan berkas sekaligus bisa melonjakkan pemakaian memori
  // di kontainer yang jatahnya kecil.
  let dibuat = 0;
  const tidakTerbaca = [];
  for (const berkas of kurang) {
    await generateWebpSibling(berkas);
    if (await sudahPunyaWebp(berkas)) dibuat += 1;
    else tidakTerbaca.push(berkas);
  }

  return { diperiksa: gambar.length, dibuat, tidakTerbaca };
}

module.exports = { backfillWebp };

if (require.main === module) {
  backfillWebp()
    .then(({ diperiksa, dibuat, tidakTerbaca }) => {
      console.log(`[webp] ${diperiksa} gambar diperiksa, ${dibuat} dibuat, ${tidakTerbaca.length} gagal.`);
      process.exit(tidakTerbaca.length > 0 ? 1 : 0);
    })
    .catch((err) => {
      console.error("[webp] Backfill gagal:", err.message);
      process.exit(1);
    });
}
