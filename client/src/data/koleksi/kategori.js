// Halaman per kategori kendaraan — isi menu "Pilihan Armada" di navbar,
// sekaligus tujuan iklan untuk kata kunci yang menyebut jenis mobil
// ("sewa suv tangerang", "rental mobil mewah tangerang").
//
// `tipe` dicocokkan persis dengan kolom `tipe` di database, jadi begitu
// admin memindahkan sebuah unit ke tipe lain, halaman ini ikut berubah
// tanpa perlu menyentuh kode. Konsekuensinya: kalau nanti ada nilai `tipe`
// baru yang dibuat dari panel admin, tambahkan entrinya di sini juga —
// tanpa itu unitnya tetap muncul di /katalog, hanya belum punya halaman
// sendiri.
//
// Urutan di bawah menentukan urutan menu: kategori dengan unit terbanyak
// didahulukan, karena itu yang paling mungkin dicari.

export const KOLEKSI_KATEGORI = [
  {
    slug: "sewa-mpv-tangerang",
    grup: "kategori",
    label: "MPV",
    tipe: "MPV",
    judul: "Sewa MPV Tangerang - Reborn, Zenix, Venturer",
    deskripsi: (frasa) =>
      `Sewa MPV 7 penumpang di Tangerang${frasa ? ` ${frasa}` : ""}. Innova Reborn, Zenix hybrid, dan Venturer. Semua matic, lepas kunci atau plus sopir.`,
    h1: "Sewa MPV Tangerang",
    subjudul: "Tujuh tipe MPV tujuh penumpang, semuanya matic dan keluaran 2024 — dari Innova Reborn diesel sampai Zenix hybrid varian tertinggi."
  },
  {
    slug: "sewa-suv-tangerang",
    grup: "kategori",
    label: "SUV",
    // "Hatchback" ikut dicocokkan karena Honda HR-V (SUV kompak) di database
    // masih bertipe Hatchback sampai diganti lewat panel admin. Halaman
    // /sewa-hatchback-tangerang sudah dilebur ke sini dan URL-nya di-301 di
    // server. Setelah tipe HR-V diganti jadi SUV, "Hatchback" boleh dihapus
    // dari daftar ini — tanpa menghapusnya pun tidak ada yang rusak.
    tipe: ["SUV", "Hatchback"],
    judul: "Sewa SUV Tangerang - Fortuner, Pajero, CRV",
    deskripsi: (frasa) =>
      `Sewa SUV Tangerang${frasa ? ` ${frasa}` : ""}: Fortuner, Pajero Sport, CRV Turbo, Palisade, sampai HR-V untuk dalam kota. Matic, lepas kunci atau plus sopir.`,
    h1: "Sewa SUV Tangerang",
    subjudul: "Dari crossover ringkas untuk dalam kota sampai SUV diesel tujuh penumpang — postur tinggi, kabin lega, dan pilihan mesin diesel maupun bensin untuk rute kota sampai luar kota."
  },
  {
    slug: "sewa-alphard-tangerang",
    grup: "kategori",
    label: "Luxury MPV (Alphard)",
    tipe: "Luxury MPV",
    judul: "Sewa Alphard Jakarta & Tangerang - Gen 4 & Hybrid",
    deskripsi: (frasa) =>
      `Sewa Alphard Jakarta & Tangerang${frasa ? ` ${frasa}` : ""}. Type-G Gen 3, Gen 4, dan Alphard HEV hybrid. Kursi kapten, dengan atau tanpa sopir.`,
    h1: "Sewa Alphard Jakarta & Tangerang",
    subjudul: "Tiga generasi Alphard dalam satu armada — pilihan standar untuk penjemputan tamu penting, pernikahan, dan agenda perusahaan di Jakarta maupun Tangerang."
  },
  {
    slug: "sewa-mobil-mewah-tangerang",
    grup: "kategori",
    label: "Luxury Sedan",
    tipe: "Luxury Sedan",
    judul: "Sewa Mobil Mewah Jakarta & Tangerang - Mercy & BMW",
    deskripsi: (frasa) =>
      `Sewa mobil mewah Jakarta & Tangerang${frasa ? ` ${frasa}` : ""}: Mercedes-Benz C300 dan E300, BMW 330i M-Sport, BMW M4 Competition Cabriolet. Bisa plus sopir.`,
    h1: "Sewa Mobil Mewah Jakarta & Tangerang",
    subjudul: "Empat sedan premium Mercedes-Benz dan BMW keluaran 2024 sampai 2025, untuk acara dan agenda di Jakarta maupun Tangerang yang menuntut kesan berbeda."
  },
  {
    slug: "sewa-suv-mewah-tangerang",
    grup: "kategori",
    label: "Luxury SUV",
    tipe: "Luxury SUV",
    judul: "Sewa Mercy GLC300 Jakarta & Tangerang - SUV Mewah",
    deskripsi: (frasa) =>
      `Sewa Mercedes-Benz GLC300 Jakarta & Tangerang${frasa ? ` ${frasa}` : ""}. SUV premium 2025, matic, 5 penumpang. Untuk acara formal dan agenda perusahaan.`,
    h1: "Sewa SUV Mewah Jakarta & Tangerang",
    subjudul: "Mercedes-Benz GLC300 keluaran 2025 — perpaduan postur SUV dengan kabin sekelas sedan premium, siap diantar ke alamat Anda di Jakarta maupun Tangerang."
  },
  // Mobil listrik. Title dan H1 menyebut Jakarta dan menonjolkan sewa
  // bulanan karena di situlah volumenya (Keyword Planner, Okt 2026, per
  // bulan): "sewa mobil listrik" 880, "... jakarta" 720, "rental mobil
  // listrik" 320, "... bulanan" 260, sedangkan "... tangerang" hanya 90 dan
  // "... lepas kunci" 40. Nama model tidak ditaruh di title: pencarian per
  // model ("sewa ioniq 5" 30) kecil dan sudah ditangani halaman detail unit,
  // dan title tetap benar saat armada listrik bertambah.
  {
    slug: "sewa-mobil-listrik-tangerang",
    grup: "kategori",
    label: "Mobil Listrik",
    tipe: "Electric",
    judul: "Sewa Mobil Listrik Jakarta & Tangerang - Harian & Bulanan",
    deskripsi: (frasa) =>
      `Sewa mobil listrik Jakarta & Tangerang${frasa ? ` ${frasa}` : ""}: Hyundai Ioniq 5, Kona Electric, Chery Omoda E5. Harian sampai bulanan, bisa lepas kunci.`,
    h1: "Sewa Mobil Listrik Jakarta & Tangerang",
    subjudul: "Hyundai Ioniq 5, Kona Electric N-Line, dan Chery Omoda E5 — kabin senyap total, akselerasi halus, dan tanpa satu rupiah pun biaya bensin selama masa sewa."
  },
  {
    slug: "sewa-sedan-tangerang",
    grup: "kategori",
    label: "Sedan",
    tipe: "Sedan",
    judul: "Sewa Sedan Tangerang - Honda Accord Turbo 2025",
    deskripsi: (frasa) =>
      `Sewa Honda Accord Turbo di Tangerang${frasa ? ` ${frasa}` : ""}. Sedan matic 5 penumpang keluaran 2025, nyaman untuk agenda kerja dan penjemputan tamu.`,
    h1: "Sewa Sedan Tangerang",
    subjudul: "Honda Accord Turbo keluaran 2025 — sedan eksekutif dengan kabin lega dan bantingan halus, di tarif jauh di bawah sedan Eropa."
  }
];
