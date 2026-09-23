// Halaman per keluarga model — tujuan iklan untuk kata kunci yang menyebut
// nama mobil ("sewa innova zenix", "rental fortuner tangerang").
//
// Dicocokkan lewat `namaCocok` (substring nama unit), bukan `tipe`: satu
// keluarga model tersebar di beberapa varian yang semuanya bertipe sama —
// halaman Zenix harus memuat empat varian Zenix saja, bukan seluruh MPV.
//
// Slug-nya sengaja dipertahankan persis seperti halaman artikel yang
// digantikannya, supaya URL akhir iklan yang sudah berjalan tidak perlu
// diubah dan peringkat organik yang sudah terbentuk tidak dibuang.

export const KOLEKSI_MODEL = [
  {
    slug: "sewa-innova-zenix-tangerang",
    grup: "model",
    label: "Innova Zenix",
    namaCocok: "zenix",
    judul: "Sewa Innova Zenix Tangerang - Hybrid 7 Kursi",
    deskripsi: "Sewa Toyota Innova Zenix di Tangerang mulai Rp849.000/hari. Empat varian termasuk hybrid, matic, 7 penumpang, unit 2024. Lepas kunci atau plus sopir.",
    h1: "Sewa Innova Zenix Tangerang",
    subjudul: "Empat varian Zenix keluaran 2024, semuanya matic dan berkapasitas 7 penumpang — tinggal pilih yang sesuai bujet dan kebutuhan perjalanan Anda."
  },
  {
    slug: "sewa-innova-reborn-tangerang",
    grup: "model",
    label: "Innova Reborn",
    namaCocok: "reborn",
    judul: "Sewa Innova Reborn Tangerang - Diesel 7 Kursi",
    deskripsi: "Sewa Toyota Innova Reborn di Tangerang mulai Rp799.000/hari. Diesel, matic, 7 penumpang, unit 2024. Tarif termurah di armada kami, lepas kunci atau plus sopir.",
    h1: "Sewa Innova Reborn Tangerang",
    subjudul: "Tarif termurah di seluruh armada kami: Rp799.000 per hari untuk MPV diesel 7 penumpang keluaran 2024."
  },
  {
    slug: "sewa-fortuner-tangerang",
    grup: "model",
    label: "Toyota Fortuner",
    namaCocok: "fortuner",
    judul: "Sewa Fortuner Tangerang - 2.8 GR & Legender",
    deskripsi: "Sewa Toyota Fortuner di Tangerang mulai Rp1.399.000/hari. Pilihan 2.8 GR diesel dan Legender, matic, 7 penumpang. Lepas kunci atau dengan sopir, unit terawat.",
    h1: "Sewa Fortuner Tangerang",
    subjudul: "Dua pilihan Fortuner — 2.8 GR bermesin diesel dan Legender — sama-sama matic, 7 penumpang, dan siap untuk rute kota maupun luar kota."
  },
  {
    slug: "sewa-pajero-sport-tangerang",
    grup: "model",
    label: "Pajero Sport",
    namaCocok: "pajero",
    judul: "Sewa Pajero Sport Tangerang - Dakar Diesel",
    deskripsi: "Sewa Mitsubishi Pajero Sport Dakar di Tangerang Rp1.399.000/hari. Diesel, matic, 7 penumpang, unit 2024. Lepas kunci atau dengan sopir, syarat cukup KTP.",
    h1: "Sewa Pajero Sport Tangerang",
    subjudul: "Mitsubishi Pajero Sport Dakar keluaran 2024 — SUV diesel bertubuh besar dengan kabin senyap dan bantingan yang lebih lembut dari rata-rata kelasnya."
  }
];
