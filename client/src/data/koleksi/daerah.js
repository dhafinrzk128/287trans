// Halaman daerah — tujuan iklan per ad group lokasi (Bintaro, BSD, Cipondoh,
// Tangerang Selatan). Halaman Ciledug juga bagian dari kelompok iklan ini,
// tapi entrinya tetap di layanan.js karena sudah live dan sudah tertaut dari
// footer.
//
// Bentuknya sama persis dengan halaman layanan (grup "layanan", seluruh
// armada, prosa di prosa/layanan.js), jadi template, prerender, dan sitemap
// tidak perlu disentuh. Bedanya hanya satu: daftar ini SENGAJA tidak dibaca
// Footer.jsx, supaya menambah halaman daerah tidak mengubah footer di
// seluruh situs. Tautan masuknya dari sitemap, iklan, dan halaman Tangerang
// Selatan (yang menaut ke Bintaro dan BSD).
//
// Slug, title, H1, dan H2 (di prosa) mengikuti kata kunci dan judul iklan
// ad group-nya, bukan sebaliknya: halaman ini dinilai Google dari seberapa
// dekat isinya dengan iklan yang mengarah ke sini. Slug memakai frasa yang
// paling banyak dipakai di daftar kata kunci ad group — "sewa mobil" untuk
// Bintaro dan BSD, "rental mobil" untuk Cipondoh dan Tangsel. Kalau kata
// kunci ad group berubah arah, sesuaikan teksnya; slug jangan diganti
// setelah live tanpa 301 di server/src/index.js.
//
// `deskripsi` berupa fungsi frasa harga (lihat KoleksiArmada.jsx). Panjangnya
// dijaga 133–145 karakter dengan frasa "mulai Rp799.000/hari".
//
// Judul sudah memuat "287 Trans", jadi Seo.jsx tidak menambah akhiran lagi.

export const KOLEKSI_DAERAH = [
  {
    // Ad group "Rental Mobil Bintaro": 7 dari 8 kata kunci berawal "sewa
    // mobil ... bintaro". Judul iklan: Sektor 9, Graha Raya, mobil keluarga
    // 7 kursi, harian/mingguan/bulanan, antar ke sektor.
    slug: "sewa-mobil-bintaro",
    grup: "layanan",
    label: "Sewa Mobil Bintaro",
    semua: true,
    tampilanUnit: "kategori",
    judul: "Sewa Mobil Bintaro Lepas Kunci & Harian | 287 Trans",
    deskripsi: (frasa) =>
      `Sewa mobil Bintaro lepas kunci${frasa ? `, ${frasa}` : ""}. Antar ke Sektor 9 & Graha Raya. Mobil keluarga 7 kursi, harian, mingguan, bulanan.`,
    h1: "Sewa Mobil Bintaro Lepas Kunci & Dengan Supir",
    subjudul:
      "Sewa mobil Bintaro lepas kunci atau dengan supir, unit kami antar ke rumah Anda dari Sektor 1 sampai Sektor 9 dan Graha Raya. Mobil keluarga 7 kursi untuk liburan dan mudik, bisa harian, mingguan, sampai bulanan.",
    judulUnit: "Pilihan Unit Sewa Mobil Bintaro",
    pengantarUnit:
      "Innova Reborn, Innova Zenix, Fortuner, Pajero Sport, sampai Alphard — semua bisa disewa lepas kunci maupun dengan supir. Klik kategori untuk melihat unit dan harga per harinya.",
    judulFaq: "Tanya Jawab Sewa Mobil Bintaro",
    judulCta: "Cek Unit Sewa Mobil Bintaro yang Ready",
    sapaanWa: "Halo, saya mau sewa mobil di Bintaro.",
  },
  {
    // Ad group "Rental Mobil BSD": inti kata kuncinya "sewa mobil bsd" dan
    // "... lepas kunci". Judul iklan: BSD Serpong, Alam Sutera, tamu kantor,
    // meeting dan acara, antar ke cluster, harian/mingguan/bulanan.
    slug: "sewa-mobil-bsd-serpong",
    grup: "layanan",
    label: "Sewa Mobil BSD",
    semua: true,
    tampilanUnit: "kategori",
    judul: "Sewa Mobil BSD Serpong Lepas Kunci | 287 Trans",
    deskripsi: (frasa) =>
      `Sewa mobil BSD lepas kunci${frasa ? `, ${frasa}` : ""}. Antar ke cluster di BSD, Serpong & Alam Sutera. Untuk tamu kantor & meeting, harian–bulanan.`,
    h1: "Sewa Mobil BSD Lepas Kunci di Serpong & Alam Sutera",
    subjudul:
      "Sewa mobil BSD lepas kunci atau dengan supir, kami antar sampai depan cluster Anda di BSD City, Serpong, Gading Serpong, dan Alam Sutera. Untuk tamu kantor, meeting, dan acara — sewa harian, mingguan, sampai bulanan.",
    judulUnit: "Pilihan Unit Sewa Mobil BSD",
    pengantarUnit:
      "Dari sedan Mercedes-Benz dan Alphard untuk tamu kantor sampai MPV tujuh penumpang untuk keluarga. Klik kategori untuk melihat unit yang ready beserta harganya.",
    judulFaq: "Tanya Jawab Sewa Mobil BSD",
    judulCta: "Cek Unit BSD yang Ready",
    sapaanWa: "Halo, saya mau sewa mobil di BSD / Serpong.",
  },
  {
    // Ad group "Rental Mobil Cipondoh": seluruh kata kuncinya memuat
    // "rental mobil ... cipondoh". Judul iklan: terdekat, sewa mobil Cipondoh
    // Tangerang, lepas kunci, harian/mingguan/bulanan, Poris, butuh hari ini.
    slug: "rental-mobil-cipondoh",
    grup: "layanan",
    label: "Rental Mobil Cipondoh",
    semua: true,
    tampilanUnit: "kategori",
    judul: "Rental Mobil Cipondoh Terdekat, Lepas Kunci | 287 Trans",
    deskripsi: (frasa) =>
      `Rental mobil Cipondoh terdekat${frasa ? `, ${frasa}` : ""}. Sewa mobil Cipondoh Tangerang lepas kunci, garasi dekat, antar gratis alamat terdekat.`,
    h1: "Rental Mobil Cipondoh Tangerang Terdekat & Lepas Kunci",
    subjudul:
      "Rental mobil Cipondoh dari garasi kami di Ciledug — dekat, jadi unit cepat sampai ke lokasi Anda. Sewa mobil Cipondoh Tangerang lepas kunci atau dengan supir, harian, mingguan, sampai bulanan.",
    judulUnit: "Pilihan Unit Rental Mobil Cipondoh",
    pengantarUnit:
      "Semua kategori di bawah ini berangkat dari garasi yang sama di Ciledug. Klik salah satu untuk melihat unit yang ready dan harganya.",
    judulFaq: "Tanya Jawab Rental Mobil Cipondoh",
    judulCta: "Butuh Mobil Hari Ini? Cek Unit Cipondoh",
    sapaanWa: "Halo, saya mau sewa mobil di Cipondoh.",
  },
  {
    // Ad group "Rental Mobil Tangsel": kata kuncinya terbagi antara "rental
    // mobil" dan "sewa mobil" + tangsel/tangerang selatan, banyak dengan
    // "lepas kunci". Judul iklan menekankan harian/mingguan/bulanan,
    // operasional kantor, jangka panjang, dan minta penawaran.
    slug: "rental-mobil-tangerang-selatan",
    grup: "layanan",
    label: "Rental Mobil Tangsel",
    semua: true,
    tampilanUnit: "kategori",
    judul: "Rental Mobil Tangerang Selatan Lepas Kunci | 287 Trans",
    deskripsi: (frasa) =>
      `Rental mobil Tangerang Selatan lepas kunci${frasa ? `, ${frasa}` : ""}. Sewa mobil Tangsel harian, mingguan, bulanan untuk operasional kantor.`,
    h1: "Rental Mobil Tangerang Selatan Lepas Kunci & Dengan Supir",
    subjudul:
      "Rental mobil Tangsel harian, mingguan, sampai bulanan — lepas kunci atau dengan supir. Sewa mobil Tangerang Selatan untuk operasional kantor, bawa klien, maupun keluarga, dari Pondok Aren dan Bintaro sampai BSD dan Serpong.",
    judulUnit: "Pilihan Unit Rental Mobil Tangsel",
    pengantarUnit:
      "Harga tiap kategori di bawah ini mengikuti katalog. Klik salah satu untuk melihat unit, foto, dan kalender ketersediaannya.",
    judulFaq: "Tanya Jawab Sewa Mobil Tangerang Selatan",
    judulCta: "Butuh Mobil Sebulan? Minta Penawaran Sekarang",
    sapaanWa: "Halo, saya mau sewa mobil di Tangerang Selatan.",
  },
];
