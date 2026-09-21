// Definisi halaman koleksi armada — satu halaman per kategori kendaraan dan
// per model yang diiklankan.
//
// Kenapa ada file ini dan bukan halaman .jsx satu-satu: sebelumnya tiap
// tujuan iklan ditulis sebagai halaman React tersendiri berisi artikel
// panjang. Hasilnya dua masalah sekaligus — pengunjung dari iklan mendarat
// di artikel, bukan di daftar mobil yang mereka cari, dan menambah satu
// tujuan iklan berarti menyalin ulang seluruh kerangka halaman. Di sini
// yang ditulis tangan hanya teksnya; daftar unit, harga, dan speknya
// ditarik dari API katalog yang sama dengan /katalog, jadi halaman iklan
// tidak akan pernah menampilkan harga yang sudah basi.
//
// Menambah tujuan iklan baru = menambah satu entri di model.js atau
// kategori.js. Route, sitemap, prerender, dan menu navbar mengikuti
// sendiri dari daftar ini.

import { KOLEKSI_MODEL } from "./koleksi/model.js";
import { KOLEKSI_KATEGORI } from "./koleksi/kategori.js";

export const KOLEKSI = [...KOLEKSI_KATEGORI, ...KOLEKSI_MODEL];

export const KOLEKSI_PATHS = KOLEKSI.map((k) => `/${k.slug}`);

export function cariKoleksi(slug) {
  return KOLEKSI.find((k) => k.slug === slug) || null;
}

/**
 * Unit milik satu koleksi, diambil dari daftar mobil katalog.
 *
 * Dua cara mencocokkan, sengaja dibedakan:
 * - `tipe` — kategori seperti MPV/SUV, dicocokkan persis dengan kolom `tipe`
 *   di database. Halaman kategori ikut berubah begitu admin memindahkan
 *   sebuah unit ke tipe lain.
 * - `namaCocok` — keluarga model seperti Zenix/Fortuner, dicocokkan sebagai
 *   substring nama unit. Dipakai untuk halaman iklan yang membidik nama
 *   mobil, yang di database tersebar di beberapa varian dengan satu tipe
 *   yang sama.
 *
 * Unit tersedia didahulukan supaya yang bisa langsung disewa terbaca lebih
 * dulu, lalu diurutkan dari termurah — halaman ini tujuan iklan, dan angka
 * terendah adalah alasan orang bertahan membaca.
 */
export function unitKoleksi(koleksi, mobils) {
  if (!koleksi) return [];
  const cocok = mobils.filter((m) => {
    if (koleksi.tipe) return m.tipe === koleksi.tipe;
    if (koleksi.namaCocok) return m.namaMobil.toLowerCase().includes(koleksi.namaCocok.toLowerCase());
    return false;
  });
  return cocok.sort(
    (a, b) =>
      (a.status === "tersedia" ? 0 : 1) - (b.status === "tersedia" ? 0 : 1) ||
      a.hargaPerHari - b.hargaPerHari
  );
}

/**
 * Kebalikan dari unitKoleksi: koleksi mana saja yang memuat satu unit.
 *
 * Dipakai halaman detail mobil untuk menautkan unit ke halaman koleksinya —
 * kategorinya, dan halaman modelnya kalau unit itu termasuk model yang punya
 * halaman sendiri. Sebelum ini satu-satunya jalan dari halaman mobil ke
 * halaman koleksi adalah daftar kategori di footer, yang sama persis di
 * seluruh situs dan karena itu tidak memberi tahu apa pun tentang unit yang
 * sedang dibuka.
 *
 * Aturan pencocokannya sengaja dibaca dari definisi yang sama dengan
 * unitKoleksi(), bukan ditulis ulang — kalau nanti caranya berubah, kedua
 * arah ikut berubah bersamaan.
 */
export function koleksiUntukMobil(mobil) {
  if (!mobil) return [];
  return KOLEKSI.filter((k) => unitKoleksi(k, [mobil]).length > 0);
}

/**
 * Prosa satu halaman koleksi: pengantar, bagian artikel, dan tanya-jawabnya.
 *
 * Teks itu 88% dari seluruh data koleksi (45 KB mentah, ~7 KB terkompresi),
 * sementara metadata di atas dibutuhkan navbar, footer, dan daftar route di
 * setiap halaman. Selama keduanya tinggal di berkas yang sama, pembaca
 * beranda ikut mengunduh dua belas artikel yang tidak akan dibukanya.
 *
 * Maka impornya dinamis, dan HARUS tetap dinamis: Vite memisahkan berkas
 * prosa jadi chunk tersendiri justru karena tidak ada satu pun import statis
 * yang menyentuhnya. Menambahkan satu saja akan menariknya kembali ke bundel
 * utama tanpa ada yang gagal — pemisahan ini hilang diam-diam.
 *
 * Kenapa ini tidak mengulang kegagalan React.lazy yang dicatat di App.jsx:
 * yang bermasalah di sana adalah menunda KOMPONEN-nya, karena React.lazy
 * selalu suspend pada render pertama dan sempat memasang fallback <Suspense>
 * di tengah hydration. Di sini yang ditunda hanya DATA, dan halaman koleksi
 * tidak pernah menunggunya saat dimuat dari nol: prosanya sudah ikut
 * terpanggang ke <script id="__PRERENDER_DATA__"> (lihat utils/prerenderData.js),
 * jadi render pertama klien sudah memegangnya dan cocok dengan HTML statis.
 * Unduhan ini hanya terjadi pada perpindahan halaman di dalam situs, yang
 * memang tidak punya HTML statis untuk dicocokkan.
 */
export async function muatProsa(slug) {
  const koleksi = cariKoleksi(slug);
  if (!koleksi) return null;
  const modul =
    koleksi.grup === "model"
      ? await import("./koleksi/prosa/model.js")
      : await import("./koleksi/prosa/kategori.js");
  return (koleksi.grup === "model" ? modul.PROSA_MODEL : modul.PROSA_KATEGORI)[slug] || null;
}

// Kunci penyimpanan prosa di __PRERENDER_DATA__. Per slug, bukan satu kunci
// untuk semua: halaman koleksi hanya boleh memanggang prosanya sendiri ke
// HTML-nya sendiri — memanggang dua belasnya akan memindahkan berat yang
// baru saja dikeluarkan dari bundel ke dalam HTML, dan tidak menyelesaikan
// apa pun.
export function kunciProsa(slug) {
  return `koleksi_prosa_${slug}`;
}

export function hargaTermurah(units) {
  if (!units.length) return null;
  return Math.min(...units.map((m) => m.hargaPerHari));
}

// Menu "Pilihan Armada" di navbar: kategori dulu (cara orang menelusuri
// sendiri), model setelahnya (cara orang datang dari iklan).
export const MENU_ARMADA = [
  { judul: "Kategori", items: KOLEKSI_KATEGORI },
  { judul: "Model Populer", items: KOLEKSI_MODEL },
];
