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

// Varian tambahan untuk kartu mobil di grid katalog.
//
// 1200px adalah ukuran yang benar untuk foto hero: lebarnya tampil ~590px,
// jadi di layar retina butuh ~1180px nyata. Tapi kartu di grid katalog cuma
// selebar ~284px di desktop dan ~343px di ponsel.
//
// Kenapa dua ukuran dan bukan satu:
// - 480px melayani desktop dan layar kerapatan rendah (kotak 284-300px).
// - 800px melayani ponsel retina. Kotak 343px pada kerapatan 2x butuh ~690px
//   nyata, jadi tanpa ukuran ini browser melompat ke berkas 1200px dan
//   penghematannya hilang justru di perangkat yang paling butuh — pengguna
//   ponsel berpaket data.
//
// Menambah ukuran baru cukup menambah satu baris di sini; penangan di
// server/src/index.js dan srcset di SmartImage mengikuti daftar ini.
const VARIAN = {
  "-kecil.webp": 480,
  "-sedang.webp": 800,
};
const AKHIRAN_VARIAN = Object.keys(VARIAN);

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
 * Nama berkas .webp ukuran penuh dari sebuah path varian, atau null kalau
 * path-nya bukan varian yang dikenal.
 */
function sumberVarian(pathVarian) {
  const akhiran = AKHIRAN_VARIAN.find((a) => pathVarian.endsWith(a));
  if (!akhiran) return null;
  return { sumber: pathVarian.slice(0, -akhiran.length) + ".webp", lebar: VARIAN[akhiran] };
}

/**
 * Membuat satu varian berukuran lebih kecil dari pendamping .webp yang ada.
 *
 * Sengaja dibuat saat berkasnya diminta pertama kali (lihat penangan
 * /uploads di server/src/index.js), bukan lewat pass massal saat server
 * nyala. Alasannya pengalaman: pekerjaan massal yang menulis ulang berkas
 * gambar saat boot pernah membuat seluruh foto mobil hilang. Fungsi ini
 * hanya pernah MENAMBAH berkas — tidak menyentuh, menimpa, atau menghapus
 * apa pun yang sudah ada — sehingga kegagalan terburuknya cuma "variannya
 * tidak jadi", dan pengunjung tetap menerima gambar ukuran penuh.
 *
 * Mengembalikan true kalau berkasnya kini ada di disk.
 */
async function buatVarianGambar(pathVarian) {
  const info = sumberVarian(pathVarian);
  if (!info) return false;
  // Akhiran temp sengaja bukan "-sedang" apa pun, supaya tidak pernah
  // tertukar dengan varian "-sedang.webp".
  const sementara = `${pathVarian}.tmp-dibuat`;
  try {
    await fs.access(info.sumber);
    await sharp(info.sumber)
      .resize({ width: info.lebar, height: info.lebar, fit: "inside", withoutEnlargement: true })
      .webp({ quality: KUALITAS })
      .toFile(sementara);
    await fs.rename(sementara, pathVarian);
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
  buatVarianGambar,
  sumberVarian,
  SISI_MAKS,
  VARIAN,
  AKHIRAN_VARIAN,
};
