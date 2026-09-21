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
    judul: "Sewa MPV Tangerang - Innova Reborn, Zenix & Venturer",
    deskripsi: "Sewa MPV 7 penumpang di Tangerang mulai Rp799.000/hari. Innova Reborn, Zenix hybrid, dan Venturer. Semua matic, lepas kunci atau plus sopir.",
    h1: "Sewa MPV Tangerang",
    subjudul: "Tujuh tipe MPV tujuh penumpang, semuanya matic dan keluaran 2024 — dari Innova Reborn diesel sampai Zenix hybrid varian tertinggi."
  },
  {
    slug: "sewa-suv-tangerang",
    grup: "kategori",
    label: "SUV",
    tipe: "SUV",
    judul: "Sewa SUV Tangerang - Fortuner, Pajero, CRV & Palisade",
    deskripsi: "Sewa SUV di Tangerang mulai Rp1.399.000/hari. Fortuner, Pajero Sport Dakar, Honda CRV Turbo, Destinator, dan Hyundai Palisade. Matic, lepas kunci atau plus sopir.",
    h1: "Sewa SUV Tangerang",
    subjudul: "Enam tipe SUV dari lima merek berbeda — postur tinggi, kabin lega, dan pilihan mesin diesel maupun bensin untuk rute kota sampai luar kota."
  },
  {
    slug: "sewa-alphard-tangerang",
    grup: "kategori",
    label: "Luxury MPV (Alphard)",
    tipe: "Luxury MPV",
    judul: "Sewa Alphard Tangerang - Gen 3, Gen 4 & Hybrid",
    deskripsi: "Sewa Toyota Alphard di Tangerang mulai Rp2.799.000/hari. Pilihan Type-G Gen 3, Gen 4, dan Alphard HEV hybrid. Kursi kapten, 6 penumpang, dengan atau tanpa sopir.",
    h1: "Sewa Alphard Tangerang",
    subjudul: "Tiga generasi Alphard dalam satu armada — pilihan standar untuk penjemputan tamu penting, pernikahan, dan agenda perusahaan."
  },
  {
    slug: "sewa-mobil-mewah-tangerang",
    grup: "kategori",
    label: "Luxury Sedan",
    tipe: "Luxury Sedan",
    judul: "Sewa Mobil Mewah Tangerang - Mercedes-Benz & BMW",
    deskripsi: "Sewa mobil mewah di Tangerang mulai Rp3.499.000/hari. Mercedes-Benz C300 dan E300, BMW 330i M-Sport, BMW M4 Competition Cabriolet. Unit terawat, dengan atau tanpa sopir.",
    h1: "Sewa Mobil Mewah Tangerang",
    subjudul: "Empat sedan premium Mercedes-Benz dan BMW keluaran 2024 sampai 2025, untuk acara dan agenda yang menuntut kesan berbeda."
  },
  {
    slug: "sewa-suv-mewah-tangerang",
    grup: "kategori",
    label: "Luxury SUV",
    tipe: "Luxury SUV",
    judul: "Sewa SUV Mewah Tangerang - Mercedes-Benz GLC300",
    deskripsi: "Sewa Mercedes-Benz GLC300 di Tangerang Rp3.499.000/hari. SUV premium keluaran 2025, matic, 5 penumpang. Untuk acara formal dan agenda perusahaan.",
    h1: "Sewa SUV Mewah Tangerang",
    subjudul: "Mercedes-Benz GLC300 keluaran 2025 — perpaduan postur SUV dengan kabin dan material sekelas sedan premium."
  },
  {
    slug: "sewa-mobil-listrik-tangerang",
    grup: "kategori",
    label: "Mobil Listrik",
    tipe: "Electric",
    judul: "Sewa Mobil Listrik Tangerang - Hyundai Ioniq 5",
    deskripsi: "Sewa Hyundai Ioniq 5 di Tangerang Rp1.999.000/hari. Mobil listrik matic 5 penumpang keluaran 2024, tanpa biaya bensin. Lepas kunci atau dengan sopir.",
    h1: "Sewa Mobil Listrik Tangerang",
    subjudul: "Hyundai Ioniq 5 keluaran 2024 — kabin senyap total, akselerasi halus, dan tanpa satu rupiah pun biaya bensin selama masa sewa."
  },
  {
    slug: "sewa-sedan-tangerang",
    grup: "kategori",
    label: "Sedan",
    tipe: "Sedan",
    judul: "Sewa Sedan Tangerang - Honda Accord Turbo 2025",
    deskripsi: "Sewa Honda Accord Turbo di Tangerang Rp1.499.000/hari. Sedan matic 5 penumpang keluaran 2025, nyaman untuk agenda kerja dan penjemputan tamu.",
    h1: "Sewa Sedan Tangerang",
    subjudul: "Honda Accord Turbo keluaran 2025 — sedan eksekutif dengan kabin lega dan bantingan halus, di tarif jauh di bawah sedan Eropa."
  },
  {
    slug: "sewa-hatchback-tangerang",
    grup: "kategori",
    label: "Hatchback",
    tipe: "Hatchback",
    judul: "Sewa Hatchback Tangerang - Honda HR-V SE, Termurah Kedua",
    deskripsi: "Sewa Honda HR-V SE di Tangerang Rp899.000/hari. Matic, 5 penumpang, irit dan mudah diparkir. Pilihan hemat untuk pemakaian harian dalam kota.",
    h1: "Sewa Hatchback Tangerang",
    subjudul: "Honda HR-V SE keluaran 2023 — dimensi ringkas untuk kota padat, dengan bagasi hatchback yang jauh lebih fleksibel dari sedan."
  }
];
