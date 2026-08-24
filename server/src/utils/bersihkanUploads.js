const path = require("path");
const fs = require("fs/promises");

const prisma = require("./prisma");
const { UPLOAD_ROOT } = require("./upload");

// Menghapus berkas di volume produksi tidak bisa dibatalkan, jadi seluruh
// modul ini berdiri di atas satu aturan: sebuah berkas hanya dihapus kalau
// basis data tidak merujuknya DAN berkasnya sendiri tidak bisa dipakai
// sebagai gambar. Foto yang sedang tampil di situs tidak mungkin memenuhi
// syarat kedua, jadi kekeliruan pada pendataan rujukan pun tidak sampai
// menghapus foto yang hidup.

const LEWATI_FOLDER = new Set(["bukti-transfer"]);

// Aplikasi tidak pernah membuat folder ini: publicUrl() selalu menghasilkan
// /uploads/<subfolder>/<berkas>, yang jatuh ke <UPLOAD_ROOT>/<subfolder>.
// Adanya <UPLOAD_ROOT>/uploads berarti pernah ada penyalinan yang tersarang
// dua kali. Isinya tetap diadu dengan basis data sebelum dihapus, sebab
// kolomnya menyimpan teks bebas dan secara teori bisa menunjuk ke sana.
const FOLDER_NYASAR = path.join(UPLOAD_ROOT, "uploads");

/**
 * Semua path berkas yang ditunjuk basis data, sebagai path absolut.
 * Sengaja dibiarkan melempar galat: pemanggilnya harus membatalkan
 * penghapusan kalau daftar ini gagal disusun.
 */
async function kumpulkanRujukan() {
  const [fotoMobil, galeri, profil, booking] = await Promise.all([
    prisma.fotoMobil.findMany({ select: { urlFoto: true } }),
    prisma.galeriArmada.findMany({ select: { urlFoto: true } }),
    prisma.companyProfile.findMany({ select: { fotoUrl: true, heroFotoUrl: true } }),
    prisma.booking.findMany({ select: { buktiTransferUrl: true } }),
  ]);

  const rujukan = new Set();
  const tambah = (nilai) => {
    if (!nilai) return;
    // Sebagian baris menyimpan URL penuh ke layanan luar (data contoh memakai
    // picsum.photos). Itu tidak menunjuk berkas mana pun di volume ini.
    if (/^https?:\/\//i.test(nilai)) return;
    // Tersimpan sebagai URL publik (/uploads/mobil/x.png); yang dibandingkan
    // nanti path di disk, jadi awalan "uploads/" dilepas satu kali saja —
    // "/uploads/uploads/mobil/x.png" memang menunjuk ke folder tersarang.
    const relatif = String(nilai).replace(/^\/+/, "").replace(/^uploads\//, "");
    const absolut = path.resolve(UPLOAD_ROOT, relatif);
    rujukan.add(absolut);
    // Pendamping .webp tidak dicatat di basis data, tapi ia milik berkas
    // yang dirujuk — jangan sampai ikut terhapus.
    rujukan.add(absolut.replace(/\.[^.]+$/, ".webp"));
  };

  fotoMobil.forEach((f) => tambah(f.urlFoto));
  galeri.forEach((g) => tambah(g.urlFoto));
  profil.forEach((p) => {
    tambah(p.fotoUrl);
    tambah(p.heroFotoUrl);
  });
  booking.forEach((b) => tambah(b.buktiTransferUrl));

  return rujukan;
}

async function telusuri(dir, hasil = []) {
  let isi;
  try {
    isi = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return hasil;
  }
  for (const entri of isi) {
    const penuh = path.join(dir, entri.name);
    if (entri.isDirectory()) {
      if (dir === UPLOAD_ROOT && LEWATI_FOLDER.has(entri.name)) continue;
      await telusuri(penuh, hasil);
    } else {
      hasil.push(penuh);
    }
  }
  return hasil;
}

async function ukuran(berkas) {
  try {
    return (await fs.stat(berkas)).size;
  } catch {
    return -1;
  }
}

// Buang folder yang sudah tidak berisi apa-apa, dari yang terdalam.
async function hapusFolderKosong(dir) {
  let isi;
  try {
    isi = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entri of isi) {
    if (entri.isDirectory()) await hapusFolderKosong(path.join(dir, entri.name));
  }
  try {
    await fs.rmdir(dir); // gagal sendiri kalau masih ada isinya
  } catch {
    /* masih terpakai — biarkan */
  }
}

/**
 * @param {string[]} tidakTerbaca berkas yang gagal dibaca sharp saat backfill
 */
async function bersihkanUploads(tidakTerbaca = []) {
  const rujukan = await kumpulkanRujukan();

  const semua = await telusuri(UPLOAD_ROOT);
  const gagalDibaca = new Set(tidakTerbaca.map((b) => path.resolve(b)));

  const dihapus = [];
  for (const berkas of semua) {
    if (rujukan.has(berkas)) continue;

    const diFolderNyasar = berkas.startsWith(FOLDER_NYASAR + path.sep);
    const kosong = (await ukuran(berkas)) === 0;
    if (!diFolderNyasar && !kosong && !gagalDibaca.has(berkas)) continue;

    try {
      await fs.unlink(berkas);
      dihapus.push(berkas);
    } catch (err) {
      console.error(`[bersih] Gagal menghapus ${berkas}: ${err.message}`);
    }
  }

  await hapusFolderKosong(FOLDER_NYASAR);

  return { diperiksa: semua.length, dihapus };
}

module.exports = { bersihkanUploads };

if (require.main === module) {
  bersihkanUploads()
    .then(({ diperiksa, dihapus }) => {
      dihapus.forEach((b) => console.log(`[bersih] dihapus: ${b}`));
      console.log(`[bersih] ${diperiksa} berkas diperiksa, ${dihapus.length} dihapus.`);
      process.exit(0);
    })
    .catch((err) => {
      console.error("[bersih] Dibatalkan, tidak ada yang dihapus:", err.message);
      process.exit(1);
    });
}
