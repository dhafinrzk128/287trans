// Isi artikel panduan. JANGAN diimpor statis — lihat muatIsiArtikel() di
// ../artikel.js. Semua fakta di sini diambil dari yang sudah berlaku di
// faqUmum.js; kalau kebijakan di sana berubah, periksa juga berkas ini.
//
// Bentuk tiap artikel:
//   intro   : paragraf pembuka
//   bagian  : [{ judul, paragraf: [..], poin?: [..], tautan?: { to, label } }]
//   terkait : tautan internal di akhir artikel (halaman koleksi / katalog)

export const ISI_ARTIKEL = {
  "syarat-sewa-mobil-lepas-kunci-tangerang": {
    intro:
      "Banyak orang menunda sewa mobil lepas kunci karena membayangkan syaratnya ribet: harus punya kartu kredit, harus menitipkan jaminan, harus daftar akun dulu. Di 287 Trans prosesnya jauh lebih sederhana. Berikut semua yang perlu Anda siapkan, dari dokumen sampai cara menghitung total biayanya, supaya tidak ada yang mengejutkan saat serah terima unit.",
    bagian: [
      {
        judul: "Dokumen yang perlu disiapkan",
        paragraf: [
          "Syarat utamanya hanya KTP yang masih berlaku. Tidak ada syarat kartu kredit, tidak ada jaminan tambahan, dan Anda tidak perlu membuat akun untuk memesan.",
          "Karena Anda sendiri yang akan mengemudikan unitnya, pastikan juga SIM Anda masih aktif dan sesuai golongan kendaraan. Ini bukan soal syarat dari kami, melainkan kewajiban setiap pengemudi di jalan.",
        ],
      },
      {
        judul: "Cara booking",
        paragraf: [
          "Ada dua jalur, silakan pilih yang paling nyaman.",
        ],
        poin: [
          "Lewat website: pilih unit di katalog, isi form permintaan booking (nama, nomor HP, tanggal sewa), lalu tim kami menghubungi Anda untuk konfirmasi ketersediaan dan detail serah terima.",
          "Lewat WhatsApp: langsung sebutkan unit yang diminati, tanggal mulai, dan lama sewa. Cara ini biasanya paling cepat.",
        ],
        tautan: { to: "/katalog", label: "Lihat unit yang tersedia di katalog" },
      },
      {
        judul: "Cara menghitung hari sewa",
        paragraf: [
          "Tarif dihitung per hari dengan durasi 24 jam, dikalikan jumlah hari sewa, terhitung dari tanggal pengambilan sampai tanggal pengembalian unit. Tidak ada minimum durasi khusus: sewa bisa dimulai dari satu hari.",
          "Kalau kebutuhan Anda lebih dari beberapa hari, tanyakan skema mingguan atau bulanan. Tarif per harinya lebih hemat dibanding sewa harian biasa.",
        ],
      },
      {
        judul: "Biaya di luar tarif harian",
        paragraf: [
          "Tidak ada biaya tersembunyi. Yang berada di luar tarif unit hanya tiga hal, dan semuanya disebutkan di awal sebelum booking dikunci:",
        ],
        poin: [
          "Bahan bakar dan tol selama pemakaian, ditanggung penyewa.",
          "Biaya sopir, hanya kalau Anda memilih opsi plus sopir.",
          "Biaya antar-jemput unit, hanya kalau Anda minta unit diantar. Unit bisa diambil sendiri di kantor kami di Ciledug tanpa biaya antar.",
        ],
      },
      {
        judul: "Lepas kunci atau plus sopir?",
        paragraf: [
          "Lepas kunci cocok kalau Anda terbiasa menyetir dan ingin jadwal yang sepenuhnya bebas. Plus sopir lebih masuk akal untuk agenda yang padat, rute yang belum Anda kenal, atau saat Anda perlu fokus pada tamu dan pekerjaan. Seluruh unit di katalog kami tersedia untuk kedua opsi.",
        ],
      },
    ],
    terkait: [
      { to: "/sewa-mpv-tangerang", label: "Sewa MPV Tangerang (7 penumpang)" },
      { to: "/sewa-suv-tangerang", label: "Sewa SUV Tangerang" },
      { to: "/faq", label: "Pertanyaan lain seputar sewa mobil" },
    ],
  },

  "sewa-mobil-pengantin-tangerang": {
    intro:
      "Mobil pengantin muncul di hampir semua foto penting hari itu: saat pengantin tiba, saat berangkat ke resepsi, dan di sesi foto berdua. Karena itu memilih unitnya layak dipikirkan lebih dari sekadar \"yang penting mewah\". Panduan ini membahas unit yang paling sering dipilih untuk pernikahan di Tangerang dan sekitarnya, serta hal yang sebaiknya disepakati jauh sebelum hari H.",
    bagian: [
      {
        judul: "Unit yang paling sering dipilih",
        paragraf: [
          "Setiap unit punya kesan yang berbeda di foto dan di jalan. Berikut pilihan yang paling sering diminta untuk kebutuhan pengantin dan keluarga:",
        ],
        poin: [
          "Toyota Alphard: kabin lega dengan kursi kapten, nyaman untuk pengantin yang memakai gaun atau kain panjang, dan pas untuk menjemput orang tua atau tamu kehormatan.",
          "Sedan Mercedes-Benz dan BMW: pilihan klasik untuk mobil pengantin, tampil elegan di foto kedatangan.",
          "BMW M4 Competition Cabriolet: atapnya bisa dibuka, jadi paling sering dipakai untuk sesi foto pre-wedding atau foto pasangan setelah akad.",
        ],
        tautan: { to: "/sewa-mobil-mewah-tangerang", label: "Lihat pilihan sedan mewah" },
      },
      {
        judul: "Booking sejauh mungkin sebelum tanggalnya",
        paragraf: [
          "Unit kategori ini jumlahnya terbatas, dan tanggal pernikahan populer cenderung menumpuk di akhir pekan yang sama. Begitu tanggal acara sudah pasti, konfirmasikan unitnya. Menunggu terlalu dekat dengan hari H adalah alasan paling umum pasangan tidak mendapat unit yang mereka incar.",
        ],
      },
      {
        judul: "Dengan sopir atau lepas kunci?",
        paragraf: [
          "Untuk hari H, kebanyakan pasangan memilih plus sopir. Pengantin dan keluarga bisa fokus pada acara, sementara sopir mengurus rute, parkir, dan waktu tempuh antar lokasi. Seluruh unit bisa disewa dengan sopir, dan biayanya disebutkan di awal.",
          "Untuk sesi foto yang lebih santai, lepas kunci juga bisa dipilih kalau salah satu dari Anda nyaman menyetir unitnya.",
        ],
      },
      {
        judul: "Yang perlu disampaikan saat chat",
        paragraf: ["Supaya penawaran yang Anda terima langsung akurat, siapkan informasi ini:"],
        poin: [
          "Tanggal acara dan jam mulai sampai selesai pemakaian.",
          "Lokasi akad, resepsi, dan titik penjemputan.",
          "Unit yang diincar, plus satu pilihan cadangan.",
          "Rencana dekorasi di mobil (bunga, pita), supaya bisa dipastikan lebih dulu.",
        ],
      },
    ],
    terkait: [
      { to: "/sewa-alphard-tangerang", label: "Sewa Alphard Tangerang" },
      { to: "/sewa-mobil-mewah-tangerang", label: "Sewa Mercedes-Benz & BMW" },
      { to: "/sewa-suv-mewah-tangerang", label: "Sewa Mercedes-Benz GLC300" },
    ],
  },

  "sewa-mobil-mudik-dari-tangerang": {
    intro:
      "Mudik dengan mobil sewaan memberi keluarga Anda kebebasan mengatur jam berangkat, tempat istirahat, dan barang bawaan sendiri. Tapi musim mudik juga periode paling ramai untuk rental mobil. Panduan ini membantu Anda memilih unit yang tepat untuk perjalanan jauh dan mengamankan tanggalnya sebelum kehabisan.",
    bagian: [
      {
        judul: "Unit yang cocok untuk perjalanan jauh",
        paragraf: [
          "Untuk mudik keluarga, yang paling banyak dicari adalah kendaraan tujuh penumpang dengan mesin yang kuat menempuh jarak jauh:",
        ],
        poin: [
          "Toyota Innova Reborn diesel: pilihan paling populer untuk mudik. Kabinnya lega, bagasinya cukup untuk koper keluarga, dan mesin dieselnya efisien di jalan tol.",
          "Toyota Innova Zenix: kabin lebih senyap, dengan pilihan varian hybrid yang hemat bahan bakar.",
          "Toyota Fortuner dan Mitsubishi Pajero Sport: SUV tujuh penumpang dengan postur tinggi, nyaman kalau rute Anda melewati jalan antarkota yang kondisinya tidak selalu mulus.",
        ],
        tautan: { to: "/sewa-mpv-tangerang", label: "Bandingkan pilihan MPV" },
      },
      {
        judul: "Kunci tanggal jauh hari",
        paragraf: [
          "Permintaan mudik menumpuk di tanggal yang sama, dan unit diesel tujuh penumpang biasanya yang pertama habis. Begitu rencana tanggal berangkat dan pulang sudah jelas, kunci unitnya. Semakin dekat ke musim mudik, pilihan unit semakin sedikit.",
        ],
      },
      {
        judul: "Menghitung total biaya perjalanan",
        paragraf: [
          "Tarif sewa dihitung per hari (24 jam) dari tanggal pengambilan sampai pengembalian. Untuk unit lepas kunci, bahan bakar dan tol ditanggung penyewa, jadi Anda bisa menghitung sendiri totalnya sesuai rute. Kalau memilih plus sopir, biaya sopir dihitung terpisah dan disebutkan di awal.",
          "Unit bisa diambil sendiri di kantor kami di Ciledug tanpa biaya antar, atau diantar ke rumah Anda dengan biaya sesuai jarak.",
        ],
      },
      {
        judul: "Sampaikan kota tujuan saat booking",
        paragraf: [
          "Mobil boleh dibawa ke luar kota. Sebutkan kota tujuan, jumlah penumpang, dan lama perjalanan saat memesan, supaya kami bisa menyiapkan unit yang paling sesuai dan menjelaskan ketentuannya lebih dulu, termasuk kalau Anda ingin memakai sopir untuk perjalanan beberapa hari.",
        ],
      },
    ],
    terkait: [
      { to: "/sewa-innova-reborn-tangerang", label: "Sewa Innova Reborn Tangerang" },
      { to: "/sewa-innova-zenix-tangerang", label: "Sewa Innova Zenix Tangerang" },
      { to: "/sewa-fortuner-tangerang", label: "Sewa Fortuner Tangerang" },
      { to: "/sewa-pajero-sport-tangerang", label: "Sewa Pajero Sport Tangerang" },
    ],
  },

  "sewa-mobil-antar-jemput-bandara-soekarno-hatta": {
    intro:
      "Dari Tangerang, Bandara Soekarno-Hatta memang dekat, tapi perjalanan ke sana jarang sesederhana kelihatannya: koper banyak, jadwal penerbangan yang bisa berubah, dan tamu yang perlu dijemput tepat waktu. Sewa mobil untuk antar jemput bandara memberi Anda kendali penuh atas jadwal dan kenyamanannya. Berikut hal yang perlu diperhatikan.",
    bagian: [
      {
        judul: "Lepas kunci atau plus sopir",
        paragraf: [
          "Keduanya bisa. Lepas kunci cocok kalau Anda menyetir sendiri dan mobilnya masih dipakai beberapa hari setelah tiba. Plus sopir lebih praktis untuk menjemput tamu perusahaan atau keluarga, karena Anda tidak perlu memikirkan parkir dan antrean di terminal.",
        ],
      },
      {
        judul: "Informasi penerbangan yang perlu disebutkan",
        paragraf: [
          "Untuk penjemputan, sebutkan nomor penerbangan dan jam tiba saat booking. Dengan begitu penyesuaian bisa dilakukan kalau jadwal penerbangannya berubah, dan tamu Anda tidak menunggu terlalu lama di terminal.",
        ],
      },
      {
        judul: "Pilih unit sesuai jumlah penumpang dan koper",
        paragraf: ["Jumlah koper sering lebih menentukan daripada jumlah penumpang:"],
        poin: [
          "Rombongan keluarga dengan banyak koper: MPV tujuh penumpang seperti Innova Reborn atau Zenix.",
          "Tamu kehormatan atau eksekutif: Toyota Alphard atau sedan Mercedes-Benz dan BMW, untuk kesan pertama yang baik.",
          "Satu atau dua orang dengan bagasi ringan: sedan seperti Honda Accord sudah lebih dari cukup.",
        ],
        tautan: { to: "/sewa-alphard-tangerang", label: "Lihat pilihan Alphard" },
      },
      {
        judul: "Biaya yang perlu diperhitungkan",
        paragraf: [
          "Tarif sewa dihitung per hari. Untuk lepas kunci, bahan bakar dan tol ditanggung penyewa. Biaya sopir dan biaya antar unit, kalau dipakai, disebutkan di awal sebelum booking dikunci, jadi tidak ada angka yang muncul belakangan.",
        ],
      },
    ],
    terkait: [
      { to: "/sewa-mpv-tangerang", label: "Sewa MPV Tangerang" },
      { to: "/sewa-sedan-tangerang", label: "Sewa Sedan Tangerang" },
      { to: "/sewa-mobil-mewah-tangerang", label: "Sewa Mobil Mewah Tangerang" },
    ],
  },

  "sewa-mobil-bulanan-tangerang": {
    intro:
      "Kalau mobil dibutuhkan setiap hari selama berminggu-minggu, sewa harian cepat terasa mahal. Sewa bulanan dibuat untuk kebutuhan seperti ini: kendaraan operasional kantor, mobil pengganti selama kendaraan pribadi diperbaiki, atau pemakaian pribadi jangka panjang tanpa perlu membeli mobil. Berikut cara kerjanya di 287 Trans.",
    bagian: [
      {
        judul: "Kapan sewa bulanan lebih masuk akal",
        paragraf: [
          "Sewa bulanan tersedia untuk seluruh unit di katalog, dengan tarif per hari yang lebih hemat dibanding sewa harian. Semakin panjang pemakaiannya, semakin terasa selisihnya. Skema ini paling cocok kalau mobil dipakai rutin, bukan hanya sesekali di akhir pekan.",
        ],
      },
      {
        judul: "Pilihan skema",
        poin: [
          "Mingguan, bulanan, sampai tahunan.",
          "Lepas kunci untuk dipakai sendiri, atau plus sopir untuk kebutuhan operasional.",
          "Satu unit atau beberapa unit sekaligus untuk perusahaan.",
        ],
        paragraf: [],
      },
      {
        judul: "Untuk kebutuhan perusahaan",
        paragraf: [
          "Sebagian pelanggan kami adalah perusahaan yang membutuhkan kendaraan untuk menjemput tamu, mobilitas tim, atau agenda direksi. Untuk kebutuhan beberapa unit atau kontrak jangka panjang, penawarannya disusun sesuai kebutuhan: jumlah unit, lama kontrak, dan apakah perlu sopir.",
        ],
        tautan: { to: "/sewa-mobil-mewah-tangerang", label: "Unit premium untuk kebutuhan eksekutif" },
      },
      {
        judul: "Cara meminta penawaran",
        paragraf: ["Hubungi kami lewat WhatsApp dan sebutkan:"],
        poin: [
          "Unit atau kategori yang dibutuhkan.",
          "Lama sewa dan tanggal mulai.",
          "Lepas kunci atau plus sopir.",
          "Jumlah unit, kalau lebih dari satu.",
        ],
      },
    ],
    terkait: [
      { to: "/sewa-mpv-tangerang", label: "Sewa MPV Tangerang" },
      { to: "/sewa-suv-tangerang", label: "Sewa SUV Tangerang" },
      { to: "/katalog", label: "Katalog lengkap armada" },
    ],
  },
};
