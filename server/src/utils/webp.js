const sharp = require("sharp");
const fs = require("fs/promises");

// Batas sisi terpanjang untuk berkas .webp yang disajikan ke pengunjung.
//
// Diukur di halaman iklan pada layar 375px dengan kerapatan 2x — ukuran HP
// yang paling banyak dipakai: slide carousel terlebar butuh sekitar 820
// piksel nyata. Foto yang diunggah biasanya 1080x1350, jadi 1200 memberi
// kelonggaran untuk layar lebih besar dan untuk zoom di editor titik fokus,
// tanpa mengirim piksel yang tidak pernah terlihat.
//
// Kualitasnya turun dari 80 ke 72. Pada satu foto galeri nyata: 1080x1350
// q80 = 281 KB, 960x1200 q72 = 154 KB. Selisihnya tidak terlihat di kotak
// setinggi ~200px, tapi tiga foto pertama sudah terunduh sebelum pengunjung
// sempat menggulir, jadi 45% itu langsung terasa di muat awal.
const SISI_MAKS = 1200;
const KUALITAS = 72;

// Varian kedua, khusus kartu mobil di grid katalog.
//
// 1200px adalah ukuran yang benar untuk foto hero: lebarnya tampil ~590px,
// jadi di layar retina butuh ~1180px nyata. Tapi kartu di grid katalog cuma
// selebar ~284px di desktop dan ~343px di ponsel. Diukur di produksi, satu
// kartu mengunduh ~41 KB untuk kotak segitu — dan satu halaman kategori bisa
// memuat tujuh kartu sekaligus.
const LEBAR_KECIL = 480;
const AKHIRAN_KECIL = "-kecil.webp";

// Membuat pendamping .webp bernama sama di sebelah gambar yang diunggah,
// supaya klien bisa meminta <basename>.webp dan kembali ke berkas aslinya
// kalau tidak ada (lihat client/src/components/SmartImage.jsx). Sengaja
// tidak dipakai untuk bukti transfer — berkas itu dipertahankan apa adanya.
async function generateWebpSibling(filePath) {
  const webpPath = filePath.replace(/\.[^.]+$/, ".webp");
  // Unggahan .webp diperbolehkan (lihat imageFileFilter di utils/upload.js),
  // dan untuk berkas itu nama tujuannya sama dengan sumbernya — sharp akan
  // membaca dan menulis berkas yang sama sekaligus, yang merusak isinya.
  if (webpPath === filePath) return;
  // Ditulis ke berkas sementara lalu diganti namanya, bukan ditimpa langsung.
  // Dua alasan: menimpa berkas yang sedang dibuka pihak lain gagal di
  // Windows, dan tanpa ini proses yang mati di tengah penulisan meninggalkan
  // .webp separuh jadi yang tetap disajikan ke pengunjung. Rename di
  // filesystem yang sama bersifat atomik — pembaca melihat versi lama atau
  // versi baru, tidak pernah yang setengah.
  const sementara = `${webpPath}.sedang-dibuat`;
  try {
    await sharp(filePath)
      .resize({ width: SISI_MAKS, height: SISI_MAKS, fit: "inside", withoutEnlargement: true })
      .webp({ quality: KUALITAS })
      .toFile(sementara);
    await fs.rename(sementara, webpPath);
  } catch (err) {
    await fs.unlink(sementara).catch(() => {});
    console.error(`[webp] Failed to generate WebP for ${filePath}:`, err.message);
  }
}

/**
 * Membuat varian kecil dari pendamping .webp yang sudah ada.
 *
 * Sengaja dibuat saat berkasnya diminta pertama kali (lihat penangan
 * /uploads di server/src/index.js), bukan lewat pass massal saat server
 * nyala. Alasannya pengalaman: pekerjaan massal yang menulis ulang berkas
 * gambar saat boot pernah membuat seluruh foto mobil hilang. Fungsi ini
 * hanya pernah MENAMBAH berkas — tidak menyentuh, menimpa, atau menghapus
 * apa pun yang sudah ada — sehingga kegagalan terburuknya cuma "varian
 * kecilnya tidak jadi", dan pengunjung tetap menerima gambar ukuran penuh.
 *
 * Mengembalikan true kalau berkasnya kini ada di disk.
 */
async function buatVarianKecil(pathKecil) {
  if (!pathKecil.endsWith(AKHIRAN_KECIL)) return false;
  const sumber = pathKecil.slice(0, -AKHIRAN_KECIL.length) + ".webp";
  const sementara = `${pathKecil}.sedang-dibuat`;
  try {
    await fs.access(sumber);
    await sharp(sumber)
      .resize({ width: LEBAR_KECIL, height: LEBAR_KECIL, fit: "inside", withoutEnlargement: true })
      .webp({ quality: KUALITAS })
      .toFile(sementara);
    await fs.rename(sementara, pathKecil);
    return true;
  } catch {
    await fs.unlink(sementara).catch(() => {});
    return false;
  }
}

async function generateWebpForFiles(files) {
  await Promise.all(files.map((f) => generateWebpSibling(f.path)));
}

module.exports = {
  generateWebpSibling,
  generateWebpForFiles,
  buatVarianKecil,
  SISI_MAKS,
  LEBAR_KECIL,
  AKHIRAN_KECIL,
};
