const prisma = require("./prisma");

// Pertanyaan umum untuk halaman depan, ditambahkan ke tabel faq kalau belum
// ada.
//
// Kenapa lewat basis data dan bukan berkas kode seperti /faq: halaman depan
// menarik FAQ dari /api/faq, yang disunting lewat panel admin. Memindahkannya
// ke kode berarti mencabut kendali itu dari pemilik. Jadi yang ditambahkan di
// sini hanyalah isi awalnya — begitu masuk, isinya milik panel admin.
//
// Kenapa pertanyaannya berbeda dari 22 pertanyaan di /faq: dua halaman yang
// memuat tanya-jawab yang sama saling menggerus, dan pengunjung yang membuka
// keduanya tidak mendapat apa pun dari yang kedua. Halaman depan menjawab yang
// ditanyakan orang yang belum pernah menyewa di sini sama sekali — sebagian
// besar pengunjungnya datang dari iklan kata kunci umum. /faq menjawab yang
// lebih rinci.
//
// TIDAK ada angka yang bisa basi di jawaban-jawaban ini: jumlah unit, jumlah
// kategori, dan tahun keluaran berubah mengikuti armada. Angka hidup sudah
// tampil sendiri di /armada dan /katalog, ditarik dari basis data. Yang
// ditulis di sini hanya sifat yang bertahan.

const FAQ_BERANDA = [
  {
    pertanyaan: "Unit di 287 Trans keluaran tahun berapa?",
    jawaban:
      "Sebagian besar armada kami keluaran tiga tahun terakhir, dan beberapa di antaranya keluaran tahun berjalan. Kami memang tidak menyimpan unit lama untuk menekan tarif — armada diperbarui, dan setiap unit diperiksa serta dibersihkan sebelum diserahkan. Tahun keluaran tiap unit tercantum di halaman katalog, jadi Anda bisa memastikannya sendiri sebelum memesan.",
  },
  {
    pertanyaan: "Semua mobilnya matic atau ada yang manual?",
    jawaban:
      "Seluruh unit di armada kami bertransmisi matic, dari kategori yang paling terjangkau sampai kelas luxury. Kalau Anda khusus membutuhkan transmisi manual, sampaikan lebih dulu lewat WhatsApp — kami akan terus terang kalau memang tidak tersedia, daripada Anda datang dan kecewa.",
  },
  {
    pertanyaan: "Bagaimana cara tahu unit masih kosong di tanggal saya?",
    jawaban:
      "Setiap halaman unit punya kalender ketersediaan yang menandai merah tanggal yang sudah dipesan pelanggan lain, jadi Anda bisa memeriksanya sendiri sebelum menghubungi kami. Saat Anda mengajukan permintaan booking, tim kami tetap mengonfirmasi ulang ketersediaannya sebelum tanggal Anda dikunci.",
  },
  {
    pertanyaan: "Kenapa tarif di sini lebih tinggi dibanding sebagian rental lain?",
    jawaban:
      "Karena armada yang kami sediakan memang bukan kelas yang sama. Kami tidak menyewakan unit murah keluaran lama; yang kami rawat adalah unit-unit terbaru dari kategori premium sampai luxury, seluruhnya matic dan diperiksa sebelum diserahkan. Kalau prioritas utama Anda adalah tarif serendah mungkin, kami terus terang bukan pilihan yang tepat — dan lebih baik Anda mengetahuinya sekarang daripada setelah menghubungi kami.",
  },
  {
    pertanyaan: "Melayani perorangan atau hanya perusahaan?",
    jawaban:
      "Keduanya. Sebagian pemesanan datang dari perorangan untuk keperluan keluarga, acara, dan perjalanan luar kota; sebagian lagi dari perusahaan untuk kendaraan operasional, penjemputan tamu, dan kontrak jangka panjang. Syarat dan prosesnya sama untuk keduanya — yang berbeda hanya pilihan durasi sewanya.",
  },
  {
    pertanyaan: "Saya baru pertama kali menyewa mobil, mulai dari mana?",
    jawaban:
      "Mulai dari dua hal: berapa orang yang ikut, dan tanggal berapa Anda butuh. Buka halaman katalog, pilih unit yang kapasitasnya sesuai, lalu cek kalender ketersediaannya. Kalau masih ragu memilih di antara beberapa unit, sebutkan saja jumlah penumpang, rute, dan tanggal Anda lewat WhatsApp — tim kami terbiasa membantu menyaringnya sebelum Anda memutuskan.",
  },
];

function normalkan(teks) {
  return (teks || "").trim().toLowerCase().replace(/\s+/g, " ");
}

/**
 * Menambahkan pertanyaan di atas ke tabel faq, sekali saja.
 *
 * Penjagaannya: kalau SALAH SATU pertanyaan di daftar ini sudah ada di basis
 * data, seluruh proses dilewati. Jadi kalau nanti sebagian pertanyaan ini
 * dihapus lewat panel admin, yang tersisa mencegah yang dihapus hidup lagi
 * pada boot berikutnya — penyuntingan pemilik menang atas berkas ini.
 *
 * Batasnya, dan ini disengaja: kalau SELURUH enam pertanyaan ini dihapus,
 * boot berikutnya akan memasukkannya kembali. Menghindari itu sepenuhnya
 * butuh tabel penanda tersendiri, dan sebuah tabel baru terasa berlebihan
 * untuk satu kali pengisian. Kalau kelak keadaan itu benar-benar terjadi,
 * di situlah tabel penanda layak dibuat.
 */
async function isiFaqBeranda() {
  const adaSekarang = await prisma.faq.findMany({
    select: { pertanyaan: true, urutan: true },
  });

  const sudahAda = new Set(adaSekarang.map((f) => normalkan(f.pertanyaan)));
  const dikenali = FAQ_BERANDA.filter((f) => sudahAda.has(normalkan(f.pertanyaan)));

  if (dikenali.length > 0) {
    return { dilewati: true, alasan: `${dikenali.length} pertanyaan sudah ada`, ditambah: [] };
  }

  // Ditaruh sesudah pertanyaan yang sudah lebih dulu ada, bukan di depannya:
  // urutan yang sekarang adalah pilihan pemilik, dan isian awal tidak pantas
  // menggeser apa pun yang sudah ditempatkan sendiri.
  let urutan = adaSekarang.reduce((maks, f) => Math.max(maks, f.urutan ?? 0), 0);

  const ditambah = [];
  for (const f of FAQ_BERANDA) {
    urutan += 1;
    await prisma.faq.create({
      data: { pertanyaan: f.pertanyaan, jawaban: f.jawaban, urutan },
    });
    ditambah.push(f.pertanyaan);
  }

  return { dilewati: false, ditambah };
}

module.exports = { isiFaqBeranda, FAQ_BERANDA, normalkan };
