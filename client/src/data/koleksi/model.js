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
    deskripsi: (frasa) =>
      `Sewa Toyota Innova Zenix di Tangerang${frasa ? ` ${frasa}` : ""}. Empat varian termasuk hybrid, matic, 7 penumpang, unit 2024. Lepas kunci atau plus sopir.`,
    h1: "Sewa Innova Zenix Tangerang",
    subjudul: "Empat varian Zenix keluaran 2024, semuanya matic dan berkapasitas 7 penumpang — tinggal pilih yang sesuai bujet dan kebutuhan perjalanan Anda."
  },
  {
    slug: "sewa-innova-reborn-tangerang",
    grup: "model",
    label: "Innova Reborn",
    namaCocok: "reborn",
    judul: "Sewa Innova Reborn Tangerang - Diesel 7 Kursi",
    deskripsi: (frasa) =>
      `Sewa Innova Reborn Tangerang${frasa ? ` ${frasa}` : ""}. Diesel, matic, 7 penumpang, unit 2024. Lepas kunci atau plus sopir, syarat cukup KTP.`,
    h1: "Sewa Innova Reborn Tangerang",
    subjudul: "Titik awal armada kami: MPV diesel 7 penumpang keluaran 2024, matic, tangguh untuk rute luar kota maupun pemakaian harian."
  },
  {
    slug: "sewa-fortuner-tangerang",
    grup: "model",
    label: "Toyota Fortuner",
    namaCocok: "fortuner",
    judul: "Sewa Fortuner Tangerang - 2.8 GR & Legender",
    deskripsi: (frasa) =>
      `Sewa Fortuner Tangerang${frasa ? ` ${frasa}` : ""}. Pilihan 2.8 GR diesel dan Legender, matic, 7 penumpang. Lepas kunci atau dengan sopir, unit terawat.`,
    h1: "Sewa Fortuner Tangerang",
    subjudul: "Dua pilihan Fortuner — 2.8 GR bermesin diesel dan Legender — sama-sama matic, 7 penumpang, dan siap untuk rute kota maupun luar kota."
  },
  {
    slug: "sewa-pajero-sport-tangerang",
    grup: "model",
    label: "Pajero Sport",
    namaCocok: "pajero",
    judul: "Sewa Pajero Sport Tangerang - Dakar Diesel",
    deskripsi: (frasa) =>
      `Sewa Mitsubishi Pajero Sport Dakar di Tangerang${frasa ? ` ${frasa}` : ""}. Diesel, matic, 7 penumpang, unit 2024. Lepas kunci atau dengan sopir, syarat cukup KTP.`,
    h1: "Sewa Pajero Sport Tangerang",
    subjudul: "Mitsubishi Pajero Sport Dakar keluaran 2024 — SUV diesel bertubuh besar dengan kabin senyap dan bantingan yang lebih lembut dari rata-rata kelasnya."
  },

  // Sedan mewah. Slug dan judulnya memakai "Mercy" karena begitulah orang
  // mengetiknya ("sewa mercy e300"), sementara nama resmi Mercedes-Benz
  // tetap ada di meta description, prosa, dan nama unit. Judul sengaja
  // berbeda dari halaman detail unit (/katalog/:id, "Sewa Mercedes-Benz E300
  // Tangerang") supaya keduanya tidak saling berebut kata kunci yang sama.
  //
  // namaCocok dibuat spesifik: "c300" saja juga cocok dengan "GLC300".
  {
    slug: "sewa-mercy-e300-tangerang",
    grup: "model",
    label: "Mercedes-Benz E300",
    namaCocok: "benz e300",
    judul: "Sewa Mercy E300 Tangerang - Sedan Eksekutif",
    deskripsi: (frasa) =>
      `Sewa Mercy E300 (Mercedes-Benz E300) di Tangerang${frasa ? ` ${frasa}` : ""}. Sedan eksekutif 2024, kursi belakang lega, untuk tamu VIP, pengantin, dan direksi.`,
    h1: "Sewa Mercy E300 Tangerang",
    subjudul: "Mercedes-Benz E300 keluaran 2024 — sedan eksekutif dengan ruang kaki belakang paling lega di antara sedan Mercedes kami, pilihan klasik untuk tamu yang duduk di belakang."
  },
  {
    slug: "sewa-mercy-c300-tangerang",
    grup: "model",
    label: "Mercedes-Benz C300",
    namaCocok: "benz c300",
    judul: "Sewa Mercy C300 Tangerang - Sedan Mewah Ringkas",
    deskripsi: (frasa) =>
      `Sewa Mercy C300 (Mercedes-Benz C300) di Tangerang${frasa ? ` ${frasa}` : ""}. Sedan mewah 2025 yang ringkas dan lincah untuk agenda kerja, acara, dan pengantin.`,
    h1: "Sewa Mercy C300 Tangerang",
    subjudul: "Mercedes-Benz C300 keluaran 2025 — sedan mewah yang ringkas di jalan padat, dengan kesenyapan dan kenyamanan kabin khas Mercedes."
  },
  {
    slug: "sewa-bmw-m4-competition-tangerang",
    grup: "model",
    label: "BMW M4 Competition",
    namaCocok: "m4 competition",
    judul: "Sewa BMW M4 Competition Tangerang - Cabriolet",
    deskripsi: (frasa) =>
      `Sewa BMW M4 Competition Cabriolet di Tangerang${frasa ? ` ${frasa}` : ""}. Atap terbuka, 2 penumpang, unit 2024, untuk mobil pengantin, prewedding, dan konten.`,
    h1: "Sewa BMW M4 Competition Tangerang",
    subjudul: "BMW M4 Competition Cabriolet keluaran 2024 — sport coupe beratap kain yang bisa dibuka, unit paling istimewa di armada kami untuk momen yang ingin diingat."
  },
  {
    slug: "sewa-bmw-330i-tangerang",
    grup: "model",
    label: "BMW 330i M-Sport",
    namaCocok: "330i",
    judul: "Sewa BMW 330i Tangerang - M-Sport Pro",
    deskripsi: (frasa) =>
      `Sewa BMW 330i G20 M-Sport Pro di Tangerang${frasa ? ` ${frasa}` : ""}. Sedan sport mewah keluaran 2025, matic, 5 penumpang. Lepas kunci atau plus sopir.`,
    h1: "Sewa BMW 330i Tangerang",
    subjudul: "BMW 330i G20 M-Sport Pro keluaran 2025 — sedan mewah dengan karakter kemudi sporty, untuk Anda yang ingin menikmati sendiri saat menyetir."
  }
];
