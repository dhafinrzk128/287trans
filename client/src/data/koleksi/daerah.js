// Halaman daerah — tujuan iklan per ad group lokasi (Bintaro, BSD & Gading
// Serpong, Cipondoh, Tangerang Selatan). Halaman Ciledug juga bagian dari
// kelompok iklan ini, tapi entrinya tetap di layanan.js karena sudah live dan
// sudah tertaut dari footer.
//
// Bentuknya sama persis dengan halaman layanan (grup "layanan", seluruh
// armada, prosa di prosa/layanan.js), jadi template, prerender, dan sitemap
// tidak perlu disentuh. Bedanya hanya satu: daftar ini SENGAJA tidak dibaca
// Footer.jsx, supaya menambah halaman daerah tidak mengubah footer di
// seluruh situs. Tautan masuknya dari sitemap, iklan, dan halaman Tangerang
// Selatan (yang menaut ke Bintaro dan BSD).
//
// `deskripsi` berupa fungsi frasa harga (lihat KoleksiArmada.jsx). Panjangnya
// dijaga 133–145 karakter dengan frasa "mulai Rp799.000/hari".
//
// Judul sudah memuat "287 Trans", jadi Seo.jsx tidak menambah akhiran lagi.

export const KOLEKSI_DAERAH = [
  {
    slug: "rental-mobil-bintaro",
    grup: "layanan",
    label: "Rental Mobil Bintaro",
    semua: true,
    tampilanUnit: "kategori",
    judul: "Rental Mobil Bintaro Lepas Kunci | 287 Trans",
    deskripsi: (frasa) =>
      `Rental mobil Bintaro lepas kunci atau dengan supir${frasa ? `, ${frasa}` : ""}. Unit premium dari garasi kami di Ciledug, diantar ke sektor mana pun.`,
    h1: "Rental Mobil Bintaro Lepas Kunci & Dengan Supir",
    subjudul:
      "Rental mobil Bintaro dengan unit premium matic yang rapi dan terawat, untuk sewa lepas kunci maupun dengan supir. Unit berangkat dari garasi kami di Ciledug, lalu diantar ke sektor mana pun di Bintaro atau Anda ambil sendiri.",
    judulUnit: "Pilihan Armada untuk Bintaro",
    pengantarUnit:
      "Setiap kategori bisa disewa lepas kunci maupun dengan supir. Klik salah satu untuk melihat unit, foto, dan harga per harinya.",
    judulFaq: "Pertanyaan Seputar Rental Mobil Bintaro",
    judulCta: "Cek Unit Kosong untuk Bintaro",
    sapaanWa: "Halo, saya mau sewa mobil di Bintaro.",
  },
  {
    slug: "rental-mobil-bsd-serpong",
    grup: "layanan",
    label: "Rental Mobil BSD & Gading Serpong",
    semua: true,
    tampilanUnit: "kategori",
    judul: "Rental Mobil BSD & Gading Serpong | 287 Trans",
    deskripsi: (frasa) =>
      `Sewa mobil BSD & Gading Serpong lepas kunci${frasa ? `, ${frasa}` : ""}. Harian untuk tamu kantor, bulanan untuk karyawan. Antar ke kantor atau rumah.`,
    h1: "Rental Mobil BSD & Gading Serpong Lepas Kunci",
    subjudul:
      "Rental mobil BSD dan Gading Serpong dengan unit premium matic, dari sewa harian untuk tamu kantor sampai sewa bulanan untuk karyawan. Bisa lepas kunci atau dengan supir, diantar ke kantor, rumah, atau mal tujuan Anda.",
    judulUnit: "Pilihan Armada untuk BSD & Serpong",
    pengantarUnit:
      "Dari sedan dan Alphard untuk tamu kantor sampai MPV tujuh penumpang untuk keluarga. Klik kategori untuk melihat unit dan harganya.",
    judulFaq: "Pertanyaan Seputar Sewa Mobil di BSD & Serpong",
    judulCta: "Cek Unit untuk Agenda Anda di BSD",
    sapaanWa: "Halo, saya mau sewa mobil di BSD / Gading Serpong.",
  },
  {
    slug: "rental-mobil-cipondoh",
    grup: "layanan",
    label: "Rental Mobil Cipondoh",
    semua: true,
    tampilanUnit: "kategori",
    judul: "Rental Mobil Cipondoh Tangerang | 287 Trans",
    deskripsi: (frasa) =>
      `Rental mobil Cipondoh Tangerang lepas kunci${frasa ? `, ${frasa}` : ""}. Garasi kami di Ciledug, dekat Cipondoh: antar gratis untuk alamat terdekat.`,
    h1: "Rental Mobil Cipondoh Tangerang Lepas Kunci",
    subjudul:
      "Rental mobil Cipondoh dari garasi kami di Ciledug, yang letaknya berdekatan dengan Cipondoh. Lepas kunci atau dengan supir, prosesnya cukup lewat WhatsApp, dan unit bisa diantar ke rumah Anda.",
    judulUnit: "Pilihan Armada untuk Cipondoh",
    pengantarUnit:
      "Semua kategori di bawah ini berangkat dari garasi yang sama di Ciledug. Klik salah satu untuk melihat unit dan harganya.",
    judulFaq: "Pertanyaan Seputar Rental Mobil Cipondoh",
    judulCta: "Cek Unit Kosong untuk Cipondoh",
    sapaanWa: "Halo, saya mau sewa mobil di Cipondoh.",
  },
  {
    slug: "rental-mobil-tangerang-selatan",
    grup: "layanan",
    label: "Rental Mobil Tangerang Selatan",
    semua: true,
    tampilanUnit: "kategori",
    judul: "Rental Mobil Tangerang Selatan | 287 Trans",
    deskripsi: (frasa) =>
      `Rental mobil Tangerang Selatan lepas kunci atau dengan supir${frasa ? `, ${frasa}` : ""}. Serpong, BSD, Bintaro, Pondok Aren. Harian sampai bulanan.`,
    h1: "Rental Mobil Tangerang Selatan Lepas Kunci & Dengan Supir",
    subjudul:
      "Rental mobil Tangerang Selatan dengan unit premium matic, dari BSD dan Serpong sampai Bintaro dan Pondok Aren. Sewa lepas kunci atau dengan supir, harian sampai bulanan, langsung dari garasi kami di Ciledug.",
    judulUnit: "Pilihan Armada untuk Tangsel",
    pengantarUnit:
      "Harga tiap kategori di bawah ini mengikuti katalog. Klik salah satu untuk melihat unit, foto, dan kalender ketersediaannya.",
    judulFaq: "Pertanyaan Seputar Rental Mobil Tangerang Selatan",
    judulCta: "Cek Unit Kosong untuk Tangsel",
    sapaanWa: "Halo, saya mau sewa mobil di Tangerang Selatan.",
  },
];
