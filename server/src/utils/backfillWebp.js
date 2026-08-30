const path = require("path");
const fs = require("fs/promises");
const sharp = require("sharp");

const { UPLOAD_ROOT } = require("./upload");
const { generateWebpSibling, SISI_MAKS } = require("./webp");

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

function jalurWebp(berkas) {
  return berkas.replace(/\.[^.]+$/, ".webp");
}

async function sudahPunyaWebp(berkas) {
  try {
    await fs.access(jalurWebp(berkas));
    return true;
  } catch {
    return false;
  }
}

// Pendamping .webp yang dibuat sebelum batas SISI_MAKS diberlakukan masih
// seukuran berkas aslinya, jadi tetap mengirim piksel yang tidak terpakai.
// Membacanya cuma perlu header, bukan seluruh gambar, jadi murah dilakukan
// tiap boot — dan setelah satu kali putaran semuanya sudah di bawah batas,
// sehingga putaran berikutnya tidak mengerjakan apa pun.
async function webpTerlaluBesar(berkas) {
  try {
    // Dibaca lewat buffer, bukan lewat jalur berkas: sharp menahan berkas
    // yang dibukanya, dan penahanan itu membuat penulisan ulang ke berkas
    // yang sama gagal.
    const isi = await fs.readFile(jalurWebp(berkas));
    const m = await sharp(isi).metadata();
    return Math.max(m.width || 0, m.height || 0) > SISI_MAKS;
  } catch {
    return false; // tidak terbaca: bukan urusan pengecilan, biarkan apa adanya
  }
}

async function tidakBisaDibacaSebagaiGambar(berkas) {
  try {
    await sharp(await fs.readFile(berkas)).metadata();
    return false;
  } catch {
    return true;
  }
}

/**
 * Melengkapi pendamping .webp yang belum ada, dan memperbarui yang dibuat
 * sebelum batas ukuran diberlakukan. Aman dijalankan berulang kali: yang
 * sudah ada dan sudah di bawah batas dilewati.
 */
async function backfillWebp() {
  const gambar = await kumpulkanGambar(UPLOAD_ROOT);
  const kurang = [];
  for (const berkas of gambar) {
    if (!(await sudahPunyaWebp(berkas)) || (await webpTerlaluBesar(berkas))) kurang.push(berkas);
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
    // Keberadaan berkas saja tidak cukup sebagai tanda berhasil di sini:
    // untuk yang sedang diperkecil, versi lamanya sudah ada sejak awal dan
    // akan tetap ada walau pembuatan ulangnya gagal.
    const beres = (await sudahPunyaWebp(berkas)) && !(await webpTerlaluBesar(berkas));
    if (beres) dibuat += 1;
    // Daftar ini dipakai bersihkanUploads() untuk memutuskan sebuah berkas
    // sudah mati dan boleh dihapus, jadi isinya harus benar-benar berkas yang
    // tidak bisa dibaca sebagai gambar. Konversi bisa gagal karena hal yang
    // tidak ada hubungannya dengan isi berkas — tujuan penulisan terkunci,
    // disk penuh — dan memasukkan korban keadaan seperti itu ke sini berarti
    // menghapus foto yang sebenarnya sehat.
    else if (await tidakBisaDibacaSebagaiGambar(berkas)) tidakTerbaca.push(berkas);
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
