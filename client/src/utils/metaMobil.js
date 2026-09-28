import { formatRupiah } from "./format";

// Title dan meta description halaman detail mobil (/katalog/:id).
//
// Sebelumnya ke-24 unit memakai satu kalimat yang sama, hanya beda nama,
// harga, dan kapasitas — pola yang ikut membuat Search Console menganggap
// halaman detail saling duplikat. Di sini kalimatnya dipilih per `tipe`
// (dicocokkan persis dengan kolom `tipe` di database, sama seperti
// src/data/koleksi/kategori.js), dan diisi tahun serta bahan bakar unit,
// jadi dua unit di kategori yang sama pun tetap berbeda.
//
// ATURAN yang sama dengan faqUmum.js dan artikel.js: hanya tulis yang benar
// berlaku untuk seluruh unit di kategori itu. Klaim di bawah diambil dari
// teks halaman koleksi yang sudah terbit. Jaga tiap kalimat di bawah ~155
// karakter untuk nama unit terpanjang di kategorinya; lebih dari itu
// terpotong di hasil pencarian.
//
// `tipe` yang belum terdaftar di sini (misalnya kategori baru dari panel
// admin) jatuh ke kalimat umum di bawah, jadi halamannya tetap punya
// description yang benar.

function bahanBakar(mobil) {
  return (mobil.bahanBakar || "").toLowerCase();
}

const DESKRIPSI_PER_TIPE = {
  MPV: (m, nama, harga) =>
    `Sewa ${nama} di Tangerang ${harga}/hari. MPV ${bahanBakar(m)} ${m.kapasitas} penumpang, unit ${m.tahun}, lega untuk keluarga dan mudik. Bisa lepas kunci.`,
  SUV: (m, nama, harga) =>
    `Rental ${nama} Tangerang ${harga}/hari. SUV ${bahanBakar(m)} ${m.kapasitas} kursi, unit ${m.tahun}, tangguh untuk luar kota. Lepas kunci atau dengan sopir.`,
  "Luxury MPV": (m, nama, harga) =>
    `${nama} untuk pernikahan, tamu VIP, dan agenda kantor di Tangerang. ${m.kapasitas} penumpang, unit ${m.tahun}, ${harga}/hari, dengan atau tanpa sopir.`,
  "Luxury Sedan": (m, nama, harga) =>
    `Sewa ${nama} di Tangerang untuk acara formal dan pengantin. Unit ${m.tahun}, ${m.kapasitas} penumpang, ${harga}/hari, tersedia plus sopir.`,
  "Luxury SUV": (m, nama, harga) =>
    `Sewa ${nama} di Tangerang ${harga}/hari. SUV premium ${m.tahun}, ${m.kapasitas} penumpang, untuk acara formal dan agenda perusahaan. Dengan atau tanpa sopir.`,
  Electric: (m, nama, harga) =>
    `Sewa mobil listrik ${nama} di Tangerang ${harga}/hari. Tanpa biaya bensin, ${m.kapasitas} penumpang, unit ${m.tahun}. Lepas kunci atau dengan sopir.`,
  Sedan: (m, nama, harga) =>
    `Sewa sedan ${nama} di Tangerang ${harga}/hari. Unit ${m.tahun}, ${m.kapasitas} penumpang, nyaman untuk agenda kerja dan jemput tamu.`,
  Hatchback: (m, nama, harga) =>
    `Sewa ${nama} di Tangerang ${harga}/hari. ${m.kapasitas} penumpang, irit dan mudah diparkir untuk harian dalam kota. Lepas kunci atau plus sopir, cukup KTP.`,
};

function deskripsiUmum(m, nama, harga) {
  return `Sewa ${nama} di Tangerang mulai ${harga}/hari. Transmisi ${m.transmisi}, kapasitas ${m.kapasitas} orang. Booking cepat via WA 0811-144-287.`;
}

// Nama unit di database bisa membawa spasi di ujungnya (salah ketik di panel
// admin), yang muncul sebagai dua spasi di tengah title.
export function namaUnit(mobil) {
  return (mobil.namaMobil || "").trim();
}

// Komponen Seo menambahkan " | 287 Trans" sendiri.
export function judulMobil(mobil) {
  return `Sewa ${namaUnit(mobil)} Tangerang`;
}

export function deskripsiMobil(mobil) {
  const templat = DESKRIPSI_PER_TIPE[mobil.tipe] || deskripsiUmum;
  return templat(mobil, namaUnit(mobil), formatRupiah(mobil.hargaPerHari));
}
