// Halaman layanan — tujuan untuk kata kunci yang tidak menyebut jenis atau
// nama mobil, melainkan LOKASI ("rental mobil ciledug") atau CARA SEWA
// ("sewa mobil lepas kunci tangerang").
//
// Memakai template yang sama dengan halaman kategori dan model
// (KoleksiArmada.jsx), jadi route, prerender, dan sitemap ikut dari daftar
// ini. Bedanya dengan dua grup lain:
// - `semua: true` — memuat seluruh unit katalog, bukan satu tipe/model.
// - Tidak masuk menu "Pilihan Armada" di navbar, dan tidak ditautkan dari
//   halaman detail mobil sebagai "koleksinya" (lihat KOLEKSI_ARMADA di
//   koleksiArmada.js). Tautannya ada di kolom Layanan pada footer.
// - Teks yang di halaman kategori dibentuk dari `label` ("Pilihan Tipe MPV")
//   ditulis sendiri di sini, karena "Pilihan Tipe Rental Mobil Ciledug"
//   bukan kalimat.
//
// `deskripsi` berupa fungsi frasa harga (lihat KoleksiArmada.jsx), sama
// seperti halaman kategori dan model.

// Tahun saat build, disuntikkan Vite (lihat vite.config.js) supaya title dan
// H1 halaman harga tidak perlu disunting tiap pergantian tahun. Berkas ini
// juga diimpor skrip Node (getRoutes.js) yang tidak melewati Vite, jadi ada
// cadangan tahun berjalan; di sana tahunnya tidak dipakai untuk apa pun.
const TAHUN = typeof __TAHUN_BUILD__ !== "undefined" ? __TAHUN_BUILD__ : new Date().getFullYear();

export const KOLEKSI_LAYANAN = [
  {
    slug: "rental-mobil-ciledug",
    grup: "layanan",
    label: "Rental Mobil Ciledug",
    semua: true,
    tampilanUnit: "kategori",
    judul: "Rental Mobil Ciledug Lepas Kunci | 287 Trans",
    deskripsi: (frasa) =>
      `Rental mobil Ciledug lepas kunci atau dengan supir${frasa ? `, ${frasa}` : ""}. Garasi kami di Ciledug: lihat unit dulu, ambil sendiri, atau diantar.`,
    h1: "Rental Mobil Ciledug — Garasi Kami Ada di Sini",
    subjudul:
      "Rental mobil Ciledug dari garasi yang memang ada di Ciledug. Datang lihat unitnya langsung sebelum sewa, ambil sendiri tanpa ongkos antar, atau minta kami antar ke rumah Anda — lepas kunci maupun dengan supir.",
    judulUnit: "Pilihan Armada dari Ciledug",
    pengantarUnit:
      "Seluruh kategori di bawah ini berangkat dari kantor yang sama di Ciledug. Klik salah satu untuk melihat unit dan harganya.",
    judulFaq: "Pertanyaan Seputar Rental Mobil di Ciledug",
    judulCta: "Cek Unit Kosong untuk Tanggal Anda",
    sapaanWa: "Halo, saya mau sewa mobil di Ciledug.",
  },
  {
    slug: "sewa-mobil-lepas-kunci-tangerang",
    grup: "layanan",
    label: "Sewa Lepas Kunci",
    semua: true,
    tampilanUnit: "tabel",
    judul: "Sewa Mobil Lepas Kunci Tangerang",
    deskripsi: (frasa) =>
      `Sewa mobil lepas kunci Tangerang${frasa ? ` ${frasa}` : ""}, syarat cukup KTP tanpa kartu kredit. Unit premium matic terawat, harian sampai bulanan.`,
    h1: "Sewa Mobil Lepas Kunci Tangerang",
    subjudul:
      "Sewa mobil lepas kunci Tangerang dengan unit premium keluaran terbaru: Anda yang menyetir, Anda yang mengatur jadwal, dan syaratnya cukup KTP.",
    judulUnit: "Daftar Unit Sewa Mobil Lepas Kunci Tangerang",
    pengantarUnit:
      "Seluruh unit di katalog bisa disewa lepas kunci. Harga di bawah ini tarif unit per hari, mengikuti katalog.",
    judulFaq: "Pertanyaan Seputar Sewa Lepas Kunci",
    judulCta: "Cek Unit Lepas Kunci untuk Tanggal Anda",
    sapaanWa: "Halo, saya mau sewa mobil lepas kunci.",
  },
  {
    slug: "harga-sewa-mobil-tangerang",
    grup: "layanan",
    label: "Harga Sewa",
    semua: true,
    tampilanUnit: "harga",
    judul: `Harga Sewa Mobil Tangerang ${TAHUN}`,
    deskripsi: (frasa) =>
      `Daftar harga sewa mobil Tangerang ${TAHUN} per unit: MPV, SUV, Alphard, sedan mewah, mobil listrik${frasa ? `. Harga ${frasa}` : ""}, lepas kunci atau plus sopir.`,
    h1: `Harga Sewa Mobil Tangerang ${TAHUN}`,
    subjudul:
      "Tarif harian seluruh unit 287 Trans dalam satu halaman, dikelompokkan per kategori dan diambil langsung dari katalog — jadi angkanya selalu sama dengan yang disebutkan tim kami.",
    judulUnit: "Daftar Harga per Kategori",
    pengantarUnit: "Tarif unit per hari (24 jam). Klik nama unit untuk melihat foto, spesifikasi, dan kalender ketersediaannya.",
    judulFaq: "Pertanyaan Seputar Harga Sewa",
    judulCta: "Minta Total Biaya untuk Tanggal Anda",
    sapaanWa: "Halo, saya mau tanya harga sewa mobil.",
  },
];
