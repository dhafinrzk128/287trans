// Definisi halaman koleksi armada — satu halaman per kategori kendaraan dan
// per model yang diiklankan.
//
// Kenapa ada file ini dan bukan halaman .jsx satu-satu: sebelumnya tiap
// tujuan iklan ditulis sebagai halaman React tersendiri berisi artikel
// panjang. Hasilnya dua masalah sekaligus — pengunjung dari iklan mendarat
// di artikel, bukan di daftar mobil yang mereka cari, dan menambah satu
// tujuan iklan berarti menyalin ulang seluruh kerangka halaman. Di sini
// yang ditulis tangan hanya teksnya; daftar unit, harga, dan speknya
// ditarik dari API katalog yang sama dengan /katalog, jadi halaman iklan
// tidak akan pernah menampilkan harga yang sudah basi.
//
// Menambah tujuan iklan baru = menambah satu entri di model.js atau
// kategori.js. Route, sitemap, prerender, dan menu navbar mengikuti
// sendiri dari daftar ini.

import { KOLEKSI_MODEL } from "./koleksi/model.js";
import { KOLEKSI_KATEGORI } from "./koleksi/kategori.js";

export const KOLEKSI = [...KOLEKSI_KATEGORI, ...KOLEKSI_MODEL];

export const KOLEKSI_PATHS = KOLEKSI.map((k) => `/${k.slug}`);

export function cariKoleksi(slug) {
  return KOLEKSI.find((k) => k.slug === slug) || null;
}

/**
 * Unit milik satu koleksi, diambil dari daftar mobil katalog.
 *
 * Dua cara mencocokkan, sengaja dibedakan:
 * - `tipe` — kategori seperti MPV/SUV, dicocokkan persis dengan kolom `tipe`
 *   di database. Halaman kategori ikut berubah begitu admin memindahkan
 *   sebuah unit ke tipe lain.
 * - `namaCocok` — keluarga model seperti Zenix/Fortuner, dicocokkan sebagai
 *   substring nama unit. Dipakai untuk halaman iklan yang membidik nama
 *   mobil, yang di database tersebar di beberapa varian dengan satu tipe
 *   yang sama.
 *
 * Unit tersedia didahulukan supaya yang bisa langsung disewa terbaca lebih
 * dulu, lalu diurutkan dari termurah — halaman ini tujuan iklan, dan angka
 * terendah adalah alasan orang bertahan membaca.
 */
export function unitKoleksi(koleksi, mobils) {
  if (!koleksi) return [];
  const cocok = mobils.filter((m) => {
    if (koleksi.tipe) return m.tipe === koleksi.tipe;
    if (koleksi.namaCocok) return m.namaMobil.toLowerCase().includes(koleksi.namaCocok.toLowerCase());
    return false;
  });
  return cocok.sort(
    (a, b) =>
      (a.status === "tersedia" ? 0 : 1) - (b.status === "tersedia" ? 0 : 1) ||
      a.hargaPerHari - b.hargaPerHari
  );
}

export function hargaTermurah(units) {
  if (!units.length) return null;
  return Math.min(...units.map((m) => m.hargaPerHari));
}

// Menu "Pilihan Armada" di navbar: kategori dulu (cara orang menelusuri
// sendiri), model setelahnya (cara orang datang dari iklan).
export const MENU_ARMADA = [
  { judul: "Kategori", items: KOLEKSI_KATEGORI },
  { judul: "Model Populer", items: KOLEKSI_MODEL },
];
