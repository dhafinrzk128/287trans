// Pertanyaan umum yang tampil di /faq, sekaligus sumber FAQPage schema di
// halaman itu.
//
// Kenapa dipisah dari Faq.jsx: daftar ini tumbuh dari 7 menjadi 22 dan akan
// terus bertambah. Menaruhnya di dalam komponen membuat berkas halaman itu
// didominasi teks, bukan tampilan.
//
// Kenapa daftar ini penting untuk pencarian: setiap pertanyaan adalah satu
// kalimat yang benar-benar diketik orang di Google — "rental mobil BSD bisa
// diantar?", "sewa mobil bulanan Tangerang", "rental mobil lepas kunci
// syaratnya apa". Halaman ini sudah ada dan sudah diindeks, jadi menambah
// pertanyaan menambah jangkauan kata kunci tanpa membuat halaman baru.
//
// ATURAN saat menambah: hanya tulis yang benar-benar berlaku. Angka yang
// belum pasti — tarif sopir, biaya antar, ketentuan asuransi, batas
// kilometer — sengaja TIDAK dicantumkan di sini dan diarahkan ke konfirmasi
// tim, sebab keterangan yang salah di halaman ini lebih merugikan daripada
// tidak ada keterangan sama sekali.

export const FAQ_UMUM = [
  // --- Syarat & cara sewa -------------------------------------------------
  {
    pertanyaan: "Apa saja syarat sewa mobil lepas kunci di 287 Trans?",
    jawaban:
      "Anda hanya perlu menyiapkan KTP yang masih berlaku dan mengisi form permintaan booking online. Tidak ada syarat kartu kredit atau jaminan tambahan, dan Anda tidak perlu membuat akun terlebih dahulu.",
  },
  {
    pertanyaan: "Bagaimana cara booking mobil di 287 Trans?",
    jawaban:
      "Pilih mobil di halaman Katalog, isi form permintaan booking dengan nama, nomor HP, dan tanggal sewa, lalu tim kami akan menghubungi Anda melalui telepon atau WhatsApp untuk konfirmasi ketersediaan dan detail serah terima unit. Kalau ingin lebih cepat, Anda juga bisa langsung chat WhatsApp dan menyebutkan unit serta tanggal yang dibutuhkan.",
  },
  {
    pertanyaan: "Apakah ada minimum durasi sewa?",
    jawaban:
      "Tidak ada minimum durasi khusus — sewa bisa dimulai dari 1 hari. Untuk kebutuhan jangka panjang, tersedia skema mingguan, bulanan, hingga tahunan dengan tarif per hari yang lebih hemat.",
  },
  {
    pertanyaan: "Bagaimana sistem hitungan sewanya?",
    jawaban:
      "Tarif dihitung per hari dengan durasi 24 jam, dikalikan jumlah hari sewa, terhitung dari tanggal pengambilan unit sampai tanggal pengembalian.",
  },

  // --- Harga & biaya ------------------------------------------------------
  {
    pertanyaan: "Berapa harga rental mobil harian di Tangerang?",
    jawaban:
      "Harga bervariasi tergantung kategori unit, mulai dari hatchback yang paling terjangkau hingga kategori premium dan luxury. Rentang harga per kategori bisa dilihat di halaman Armada, atau cek langsung setiap unit di Katalog untuk harga pastinya.",
  },
  {
    pertanyaan: "Apakah bensin dan tol sudah termasuk harga sewa?",
    jawaban:
      "Untuk unit lepas kunci, harga sewa belum termasuk bahan bakar dan tol — biaya ini ditanggung penyewa selama masa pemakaian. Dengan begitu Anda bisa menghitung sendiri total perjalanan sesuai rute. Biaya sopir juga dihitung terpisah dari tarif unit.",
  },
  {
    pertanyaan: "Apakah ada biaya tersembunyi di luar tarif harian?",
    jawaban:
      "Tidak. Yang di luar tarif unit hanya tiga hal, dan semuanya kami sebutkan di awal sebelum booking dikunci: bahan bakar dan tol selama pemakaian, biaya sopir kalau Anda memilih opsi plus sopir, dan biaya antar-jemput unit kalau Anda meminta unit diantar.",
  },

  // --- Sewa dengan sopir --------------------------------------------------
  {
    pertanyaan: "Apakah bisa sewa mobil dengan supir?",
    jawaban:
      'Bisa. Seluruh unit di katalog kami tersedia untuk sewa plus driver selain opsi lepas kunci. Pilih opsi "Dengan Sopir" saat mengisi form booking, dan tim kami akan mengonfirmasi ketersediaan sopir untuk tanggal yang Anda butuhkan. Biaya sopir dihitung terpisah dari tarif unit dan kami sebutkan di awal.',
  },
  {
    pertanyaan: "Rental mobil plus driver untuk acara seharian, bisa?",
    jawaban:
      "Bisa, dan ini salah satu permintaan yang paling sering masuk ke kami — terutama untuk agenda kerja yang lokasinya berpindah seharian, penjemputan tamu perusahaan, dan acara keluarga. Sebutkan rencana rute serta perkiraan jam mulai dan selesai saat chat, supaya kami bisa menyiapkan sopir yang sesuai dan memberi angkanya sekaligus.",
  },

  // --- Area layanan -------------------------------------------------------
  {
    pertanyaan: "Area mana saja yang dilayani 287 Trans?",
    jawaban:
      "Kami melayani seluruh Jabodetabek: Kota Tangerang, Tangerang Selatan, Jakarta, Bekasi, Depok, dan Bogor. Kantor kami berada di Ciledug, Kota Tangerang, sehingga area Tangerang dan Tangerang Selatan adalah yang paling cepat kami layani.",
  },
  {
    pertanyaan: "Apakah melayani rental mobil di BSD, Gading Serpong, dan Alam Sutera?",
    jawaban:
      "Ya. Ketiga kawasan itu berada di Tangerang Selatan dan termasuk area yang rutin kami layani dari kantor kami di Ciledug. Unit bisa Anda ambil sendiri di kantor, atau kami antar ke alamat Anda dengan biaya antar sesuai jarak.",
  },
  {
    pertanyaan: "Apakah bisa sewa mobil di Bintaro dan Pondok Aren?",
    jawaban:
      "Bisa. Bintaro dan Pondok Aren termasuk area layanan kami dan jaraknya relatif dekat dari Ciledug, sehingga proses serah terima unit biasanya cepat. Sebutkan alamat lengkap saat booking supaya kami bisa langsung menghitung biaya antarnya.",
  },
  {
    pertanyaan: "Apakah melayani rental mobil di Karawaci, Cipondoh, dan Ciledug?",
    jawaban:
      "Ya, ketiganya berada di Kota Tangerang dan merupakan area terdekat dari kantor kami. Untuk Ciledug dan sekitarnya, unit umumnya bisa disiapkan dalam waktu singkat selama tanggalnya tersedia.",
  },
  {
    pertanyaan: "Apakah melayani Jakarta Selatan seperti Kebayoran dan Pondok Indah?",
    jawaban:
      "Melayani. Jakarta Selatan termasuk area layanan kami, dan permintaan dari kawasan seperti Kebayoran dan Pondok Indah cukup rutin — terutama untuk unit kategori premium dan luxury. Biaya antar dihitung sesuai jarak dari Ciledug.",
  },
  {
    pertanyaan: "Apakah mobilnya bisa diantar ke alamat saya?",
    jawaban:
      "Bisa, ke seluruh area layanan kami. Antar-jemput unit dikenakan biaya yang dihitung berdasarkan jarak dari kantor kami di Ciledug, dan angkanya kami sebutkan di awal sebelum booking dikunci — bukan di akhir. Kalau Anda ingin menghemat, unit juga bisa diambil sendiri di kantor kami tanpa biaya antar.",
  },
  {
    pertanyaan: "Berapa biaya antar mobil ke lokasi saya?",
    jawaban:
      "Biayanya tergantung jarak antara alamat Anda dan kantor kami di Ciledug, Kota Tangerang, jadi angkanya berbeda untuk tiap lokasi. Sebutkan alamat lengkap saat chat WhatsApp dan tim kami akan langsung memberi angka pastinya sebelum Anda memutuskan.",
  },

  // --- Pemakaian ----------------------------------------------------------
  {
    pertanyaan: "Apakah mobil boleh dibawa ke luar kota?",
    jawaban:
      "Boleh. Perjalanan luar kota adalah salah satu pemakaian paling umum di armada kami, terutama untuk unit MPV dan SUV bermesin diesel. Sebutkan kota tujuan dan lama perjalanan saat pemesanan supaya kami bisa menyiapkan unit yang paling sesuai dan menjelaskan ketentuannya lebih dulu.",
  },
  {
    pertanyaan: "Bisa sewa mobil untuk mudik atau perjalanan Lebaran?",
    jawaban:
      "Bisa, dan ini periode paling ramai di armada kami. Unit MPV diesel seperti Innova Reborn dan SUV tujuh penumpang paling banyak dicari untuk kebutuhan ini. Karena permintaannya menumpuk di tanggal yang sama, sebaiknya tanggal Anda dikunci jauh hari sebelum musimnya tiba.",
  },
  {
    pertanyaan: "Bisa sewa mobil untuk pernikahan atau acara khusus?",
    jawaban:
      "Bisa. Untuk kebutuhan pengantin dan acara, unit yang paling sering dipilih adalah Toyota Alphard, sedan mewah Mercedes-Benz dan BMW, serta BMW M4 Competition Cabriolet untuk sesi foto. Unit kategori ini jumlahnya terbatas, jadi konfirmasi tanggal lebih awal sangat menentukan.",
  },
  {
    pertanyaan: "Melayani antar-jemput Bandara Soekarno-Hatta?",
    jawaban:
      "Melayani. Penjemputan dan pengantaran ke Bandara Soekarno-Hatta termasuk permintaan yang rutin kami tangani, baik lepas kunci maupun plus sopir. Untuk penjemputan, sebutkan nomor penerbangan dan jam tiba saat booking supaya penyesuaian bisa dilakukan kalau jadwalnya berubah.",
  },

  // --- Jangka panjang -----------------------------------------------------
  {
    pertanyaan: "Apakah ada sewa mobil bulanan di Tangerang?",
    jawaban:
      "Ada. Sewa bulanan tersedia untuk seluruh unit di katalog, dengan tarif per hari yang lebih hemat dibanding sewa harian. Skema ini paling banyak diambil untuk kendaraan operasional perusahaan dan pemakaian pribadi jangka panjang. Sebutkan unit dan lama sewa saat chat supaya kami bisa langsung memberi angkanya.",
  },
  {
    pertanyaan: "Bisa sewa mobil untuk kebutuhan operasional perusahaan?",
    jawaban:
      "Bisa, dan sebagian pelanggan kami memang perusahaan. Tersedia skema mingguan, bulanan, hingga tahunan, dengan pilihan lepas kunci maupun plus sopir. Untuk kebutuhan beberapa unit sekaligus atau kontrak jangka panjang, hubungi tim kami lewat WhatsApp agar penawarannya bisa disusun sesuai kebutuhan.",
  },
];

export default FAQ_UMUM;
