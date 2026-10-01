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
// `deskripsi` berupa fungsi harga termurah supaya angka "mulai dari" di meta
// description ikut katalog, bukan ditulis mati. Saat datanya belum ada
// (perpindahan halaman di dalam situs sebelum katalog termuat), fungsi ini
// dipanggil dengan null dan harus tetap menghasilkan kalimat yang utuh.
// Batas 155 karakter berlaku untuk versi berharga.

export const KOLEKSI_LAYANAN = [
  {
    slug: "rental-mobil-ciledug",
    grup: "layanan",
    label: "Rental Mobil Ciledug",
    semua: true,
    tampilanUnit: "kategori",
    judul: "Rental Mobil Ciledug - Lepas Kunci & Premium",
    deskripsi: (harga) =>
      `Rental mobil Ciledug lepas kunci atau plus sopir${harga ? `, mulai ${harga}/hari` : ""}. Armada premium terawat, ambil di kantor kami atau diantar ke Larangan & Cipondoh.`,
    h1: "Rental Mobil Ciledug",
    subjudul:
      "287 Trans adalah rental mobil Ciledug dengan unit premium keluaran terbaru — lepas kunci atau plus sopir, diambil langsung di kantor kami atau diantar ke alamat Anda.",
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
    deskripsi: (harga) =>
      `Sewa mobil lepas kunci Tangerang${harga ? ` mulai ${harga}/hari` : ""}, syarat cukup KTP tanpa kartu kredit. Unit premium matic terawat, harian sampai bulanan.`,
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
];
