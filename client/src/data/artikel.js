// Daftar artikel panduan — metadata saja.
//
// Isi artikelnya ada di ./artikel/isi.js dan diimpor dinamis lewat
// muatIsiArtikel(), dengan alasan yang sama persis seperti prosa halaman
// koleksi (lihat muatProsa() di koleksiArmada.js): berkas ini diimpor statis
// oleh route, sitemap, dan footer, jadi apa pun yang ditaruh di sini ikut
// terunduh oleh setiap pengunjung beranda. Teks artikel tidak boleh ikut.
//
// Kenapa artikel ada terpisah dari halaman koleksi: halaman koleksi menjawab
// "unitnya apa dan berapa" untuk pengunjung iklan. Artikel menjawab
// pertanyaan yang diketik orang SEBELUM mereka tahu mau sewa unit apa
// ("syarat sewa lepas kunci", "mobil buat mudik"), lalu mengarahkannya ke
// halaman koleksi yang tepat lewat tautan internal.
//
// ATURAN saat menulis artikel baru: sama dengan faqUmum.js — hanya tulis yang
// benar-benar berlaku. Jangan menulis angka harga di dalam teks; harga hidup
// di database dan bisa berubah dari panel admin, sementara artikel tidak ikut
// berubah. Arahkan ke halaman koleksi atau katalog untuk harganya.
//
// Menambah artikel = satu entri di sini + isinya di artikel/isi.js dengan
// slug yang sama. Route, prerender, sitemap, dan halaman indeks mengikuti.

export const ARTIKEL = [
  {
    slug: "syarat-sewa-mobil-lepas-kunci-tangerang",
    judul: "Syarat Sewa Mobil Lepas Kunci di Tangerang",
    h1: "Syarat Sewa Mobil Lepas Kunci di Tangerang, Cukup KTP",
    deskripsi:
      "Syarat sewa mobil lepas kunci di 287 Trans Tangerang: cukup KTP, tanpa kartu kredit, tanpa akun. Cara booking, hitungan sewa, dan biaya di luar tarif.",
    ringkasan:
      "Dokumen yang perlu disiapkan, cara booking, cara hitung hari sewa, dan biaya apa saja yang ada di luar tarif harian.",
    terbit: "2026-09-23",
  },
  {
    slug: "sewa-mobil-pengantin-tangerang",
    judul: "Sewa Mobil Pengantin di Tangerang: Pilihan Unit",
    h1: "Sewa Mobil Pengantin di Tangerang: Memilih Unit untuk Hari H",
    deskripsi:
      "Panduan sewa mobil pengantin di Tangerang: Alphard, Mercedes-Benz, BMW, sampai M4 Cabriolet untuk sesi foto. Kapan harus booking dan apa yang perlu disiapkan.",
    ringkasan:
      "Unit yang paling sering dipilih untuk pengantin dan tamu keluarga, kapan sebaiknya booking, dan hal yang perlu disepakati sebelum hari H.",
    terbit: "2026-09-23",
  },
  {
    slug: "sewa-mobil-mudik-dari-tangerang",
    judul: "Sewa Mobil untuk Mudik dari Tangerang",
    h1: "Sewa Mobil untuk Mudik dari Tangerang: Unit, Waktu Booking, dan Biaya",
    deskripsi:
      "Mau sewa mobil untuk mudik dari Tangerang? Unit MPV dan SUV yang cocok untuk keluarga, kapan harus booking, dan biaya apa saja yang perlu dihitung.",
    ringkasan:
      "Memilih unit tujuh penumpang untuk perjalanan jauh, kenapa tanggal mudik harus dikunci lebih awal, dan cara menghitung total biayanya.",
    terbit: "2026-09-23",
  },
  {
    slug: "sewa-mobil-antar-jemput-bandara-soekarno-hatta",
    judul: "Sewa Mobil Antar Jemput Bandara Soekarno-Hatta",
    h1: "Sewa Mobil Antar Jemput Bandara Soekarno-Hatta dari Tangerang",
    deskripsi:
      "Sewa mobil untuk antar jemput Bandara Soekarno-Hatta dari Tangerang, lepas kunci atau plus sopir. Info yang perlu disiapkan dan memilih unit sesuai bagasi.",
    ringkasan:
      "Pilihan lepas kunci atau plus sopir untuk ke bandara, informasi penerbangan yang perlu disebutkan, dan memilih unit sesuai jumlah koper.",
    terbit: "2026-09-23",
  },
  {
    slug: "sewa-mobil-bulanan-tangerang",
    judul: "Sewa Mobil Bulanan di Tangerang",
    h1: "Sewa Mobil Bulanan di Tangerang untuk Pribadi dan Perusahaan",
    deskripsi:
      "Sewa mobil bulanan di Tangerang untuk pemakaian pribadi atau operasional kantor. Skema mingguan sampai tahunan, lepas kunci atau plus sopir.",
    ringkasan:
      "Kapan sewa bulanan lebih masuk akal dibanding harian, skema yang tersedia untuk perusahaan, dan cara meminta penawaran.",
    terbit: "2026-09-23",
  },
];

export const ARTIKEL_PATHS = ["/artikel", ...ARTIKEL.map((a) => `/artikel/${a.slug}`)];

export function cariArtikel(slug) {
  return ARTIKEL.find((a) => a.slug === slug) || null;
}

// HARUS tetap impor dinamis. Lihat catatan di muatProsa() (koleksiArmada.js):
// satu import statis saja ke ./artikel/isi.js akan menariknya kembali ke
// bundel utama tanpa ada yang gagal.
export async function muatIsiArtikel(slug) {
  const modul = await import("./artikel/isi.js");
  return modul.ISI_ARTIKEL[slug] || null;
}

export function kunciIsiArtikel(slug) {
  return `artikel_isi_${slug}`;
}
