// Prosa halaman layanan (lihat ../layanan.js). Sama seperti prosa kategori
// dan model: berkas ini HANYA boleh diimpor dinamis lewat muatProsa() di
// koleksiArmada.js — satu import statis akan menariknya ke bundel utama.
//
// Bentuknya sama dengan prosa lain, ditambah dua kolom opsional per bagian:
//   poin   : daftar bernomor di bawah paragraf (dipakai untuk langkah-langkah)
//   tautan : { to, label } — satu tautan internal kontekstual di akhir bagian
//
// ATURAN yang sama dengan faqUmum.js: hanya tulis yang benar-benar berlaku.
// Tidak ada angka harga di sini (harga datang dari katalog), tidak ada
// jumlah pelanggan, rating, atau tahun berdiri.

export const PROSA_LAYANAN = {
  "rental-mobil-ciledug": {
    intro:
      "Mencari rental mobil Ciledug yang unitnya tidak perlu didatangkan dari jauh? Kantor 287 Trans ada di Jl. Lembang Baru II, Ciledug, dan dari sinilah seluruh armada kami berangkat. Artinya, untuk penyewa di Ciledug dan kecamatan sekitarnya — Larangan, Karang Tengah, Pinang, dan Cipondoh — jarak antara Anda dan mobilnya pendek. Unit bisa Anda ambil sendiri di kantor, atau kami antar ke rumah, kantor, maupun lokasi acara Anda. Semua unit bertransmisi matic, dirawat rutin, dan diperiksa sebelum diserahkan.",
    bagian: [
      {
        judul: "Kenapa Menyewa dari Kantor di Ciledug",
        isi: "Rental yang kantornya jauh biasanya punya dua konsekuensi: biaya antar yang lebih besar dan jadwal serah terima yang lebih kaku. Karena kami berada di Ciledug, keduanya bisa ditekan untuk penyewa di wilayah ini. Larangan dan Karang Tengah bersebelahan langsung dengan Ciledug, sementara Pinang dan Cipondoh masih satu wilayah Kota Tangerang. Posisi Ciledug yang berbatasan dengan Jakarta Selatan juga memudahkan kalau tujuan Anda justru ke arah Jakarta. Untuk kebutuhan mendadak di area ini, unit umumnya bisa disiapkan dalam waktu singkat selama tanggalnya masih kosong.",
      },
      {
        judul: "Ambil Sendiri atau Diantar ke Alamat Anda",
        isi: "Mengambil unit langsung di kantor kami tidak dikenakan biaya tambahan. Cara ini paling sering dipilih penyewa yang tinggal di sekitar Ciledug, karena Anda bisa sekalian melihat langsung kondisi unitnya saat serah terima. Kalau Anda lebih suka unitnya datang ke alamat Anda, kami antar dengan biaya yang dihitung dari jarak kantor kami ke lokasi Anda. Angkanya kami sebutkan di awal, sebelum pemesanan dikunci, jadi tidak ada tambahan yang baru muncul saat unit tiba.",
      },
      {
        judul: "Lepas Kunci atau Plus Sopir",
        isi: "Seluruh unit tersedia untuk dua cara sewa. Lepas kunci cocok kalau Anda terbiasa menyetir dan ingin jadwal yang sepenuhnya bebas; syaratnya cukup KTP yang masih berlaku, tanpa kartu kredit dan tanpa jaminan BPKB. Plus sopir lebih masuk akal untuk penjemputan tamu, acara keluarga, atau agenda kerja yang berpindah lokasi seharian. Biaya sopir dihitung terpisah dari tarif unit dan disebutkan sejak awal.",
        tautan: { to: "/artikel/syarat-sewa-mobil-lepas-kunci-tangerang", label: "Baca syarat lengkap sewa lepas kunci" },
      },
      {
        judul: "Memilih Unit Sesuai Kebutuhan",
        isi: "Untuk perjalanan keluarga dan luar kota, MPV tujuh penumpang seperti Innova Reborn dan Innova Zenix biasanya jadi pilihan pertama. SUV seperti Fortuner dan Pajero Sport dipilih untuk rute yang menuntut postur lebih tinggi. Untuk pernikahan, tamu perusahaan, atau acara formal di Jakarta Selatan dan Tangerang, Alphard serta sedan Mercedes-Benz dan BMW jadi pilihan utama. Harga tiap kategori di atas mengikuti katalog, jadi angka yang Anda lihat sama dengan yang disebutkan tim kami saat chat.",
      },
      {
        judul: "Cara Booking",
        isi: "Prosesnya bisa diselesaikan tanpa membuat akun, lewat website maupun WhatsApp.",
        poin: [
          "Pilih kategori atau unit, lalu cek kalender ketersediaannya di halaman unit.",
          "Kirim permintaan booking lewat form, atau chat WhatsApp dengan menyebutkan unit, tanggal mulai, dan lama sewa.",
          "Sebutkan apakah Anda mengambil sendiri di kantor Ciledug atau ingin diantar, beserta alamatnya.",
          "Tim kami mengonfirmasi ketersediaan dan total biayanya sebelum tanggal Anda dikunci.",
        ],
        tautan: { to: "/katalog", label: "Lihat katalog armada lengkap" },
      },
    ],
    faq: [
      {
        tanya: "Di mana alamat kantor 287 Trans di Ciledug?",
        jawab: "Kantor kami di Jl. Lembang Baru II, RT003/RW009, Ciledug, Kota Tangerang. Kantor buka setiap hari pukul 08.00 sampai 21.00. Sebaiknya kabari kami lebih dulu lewat WhatsApp sebelum datang, supaya unit yang Anda pilih sudah disiapkan.",
      },
      {
        tanya: "Apakah unit bisa diantar ke Larangan, Karang Tengah, Pinang, atau Cipondoh?",
        jawab: "Bisa. Keempat kecamatan itu termasuk area terdekat dari kantor kami. Biaya antar dihitung sesuai jarak dan kami sebutkan sebelum pemesanan dikunci. Kalau ingin tanpa biaya antar, unit bisa diambil sendiri di kantor.",
      },
      {
        tanya: "Apa syarat sewa lepas kunci di Ciledug?",
        jawab: "Cukup KTP yang masih berlaku. Tidak ada syarat kartu kredit, tidak ada jaminan BPKB, dan tidak perlu membuat akun. Karena Anda sendiri yang mengemudi, pastikan juga SIM Anda masih aktif.",
      },
      {
        tanya: "Berapa lama minimal sewa?",
        jawab: "Mulai dari satu hari, dihitung 24 jam dari waktu pengambilan. Untuk pemakaian lebih panjang tersedia skema mingguan, bulanan, sampai tahunan — sebutkan lama sewa Anda saat chat supaya kami bisa langsung memberi angkanya.",
      },
      {
        tanya: "Apakah unit dari Ciledug boleh dibawa ke luar kota?",
        jawab: "Boleh. Perjalanan luar kota termasuk pemakaian yang paling umum di armada kami. Sebutkan kota tujuan dan lama perjalanan saat memesan, supaya kami bisa menyiapkan unit yang paling sesuai dan menjelaskan ketentuannya lebih dulu.",
      },
    ],
  },

  // Sengaja tidak mengulang artikel syarat sewa lepas kunci: syaratnya cukup
  // diringkas di sini lalu ditautkan ke sana. Halaman ini menjawab "unitnya
  // apa, berapa, dan bagaimana memesannya"; artikel menjawab rinciannya.
  "sewa-mobil-lepas-kunci-tangerang": {
    intro:
      "Sewa mobil lepas kunci Tangerang cocok untuk Anda yang lebih nyaman menyetir sendiri: tidak ada sopir yang perlu dijemput, tidak ada jam kerja sopir yang membatasi agenda, dan kabin sepenuhnya milik Anda dan keluarga selama masa sewa. Di 287 Trans, seluruh unit di katalog — dari MPV tujuh penumpang sampai Alphard dan sedan Mercedes-Benz — bisa disewa lepas kunci. Semuanya bertransmisi matic, dirawat rutin, dan diperiksa sebelum diserahkan kepada Anda.",
    bagian: [
      {
        judul: "Kapan Lepas Kunci Lebih Masuk Akal",
        isi: "Lepas kunci paling terasa manfaatnya untuk perjalanan beberapa hari, liburan keluarga, dan pemakaian harian yang jadwalnya berubah-ubah. Anda bisa berangkat subuh, berhenti di mana saja, dan pulang larut tanpa memikirkan waktu istirahat sopir. Kalau agenda Anda justru padat dengan rapat di beberapa lokasi, atau rutenya belum Anda kenal, opsi plus sopir biasanya lebih menenangkan — dan bisa dipilih untuk unit yang sama.",
      },
      {
        judul: "Syarat Singkat",
        isi: "Siapkan KTP yang masih berlaku dan SIM aktif yang sesuai golongan kendaraan. Tidak ada syarat kartu kredit, tidak ada jaminan BPKB, dan Anda tidak perlu mendaftar akun untuk memesan. Rincian dokumen, cara menghitung hari sewa, dan biaya di luar tarif kami jelaskan di panduan terpisah.",
        tautan: { to: "/artikel/syarat-sewa-mobil-lepas-kunci-tangerang", label: "Baca panduan syarat sewa lepas kunci" },
      },
      {
        judul: "Yang Termasuk dan Tidak Termasuk Tarif",
        isi: "Angka di tabel adalah tarif unit untuk satu hari atau 24 jam. Bahan bakar dan tol selama pemakaian ditanggung penyewa, jadi biayanya mengikuti rute Anda sendiri. Unit bisa diambil di kantor kami di Ciledug tanpa biaya tambahan; kalau ingin diantar, biaya antar dihitung sesuai jarak dan disebutkan sebelum pemesanan dikunci. Untuk pemakaian mingguan atau bulanan, tanyakan skema jangka panjang saat chat.",
      },
      {
        judul: "Memilih Unit untuk Disetir Sendiri",
        isi: "Kalau Anda jarang menyetir mobil besar, MPV seperti Innova Reborn dan Innova Zenix paling mudah dikendalikan sekaligus muat tujuh penumpang. SUV seperti Fortuner dan Pajero Sport memberi posisi duduk lebih tinggi untuk rute luar kota. Untuk dalam kota, unit lima penumpang yang lebih ringkas lebih mudah diparkir. Alphard dan sedan premium juga tersedia lepas kunci untuk acara yang ingin Anda kendarai sendiri.",
      },
      {
        judul: "Serah Terima dan Pengembalian",
        isi: "Saat serah terima, periksa kondisi unit bersama tim kami sebelum berangkat. Unit dikembalikan pada tanggal yang disepakati di awal. Kalau rencana Anda berubah dan ingin memperpanjang, kabari kami sebelum tanggal pengembalian supaya ketersediaan unitnya bisa dicek lebih dulu.",
      },
      {
        judul: "Cara Booking Lepas Kunci",
        isi: "Pemesanan bisa lewat website maupun WhatsApp, tanpa membuat akun.",
        poin: [
          "Pilih unit dari tabel di atas, lalu buka halamannya untuk melihat kalender ketersediaan.",
          "Isi form permintaan booking dan pilih opsi lepas kunci, atau chat WhatsApp dengan menyebutkan unit, tanggal mulai, dan lama sewa.",
          "Tentukan apakah unit diambil di kantor Ciledug atau diantar ke alamat Anda.",
          "Tim kami mengonfirmasi ketersediaan dan total biayanya sebelum tanggal Anda dikunci.",
        ],
      },
    ],
    faq: [
      {
        tanya: "Apa saja syarat sewa mobil lepas kunci?",
        jawab: "KTP yang masih berlaku, ditambah SIM aktif karena Anda sendiri yang mengemudi. Tidak ada syarat kartu kredit, jaminan BPKB, maupun pendaftaran akun.",
      },
      {
        tanya: "Apakah semua unit bisa disewa lepas kunci?",
        jawab: "Bisa. Seluruh unit di katalog tersedia untuk lepas kunci maupun plus sopir, termasuk Alphard dan sedan Mercedes-Benz atau BMW.",
      },
      {
        tanya: "Apakah bensin dan tol sudah termasuk?",
        jawab: "Belum. Untuk sewa lepas kunci, bahan bakar dan tol selama pemakaian ditanggung penyewa. Tarif yang tertera adalah tarif unit per hari.",
      },
      {
        tanya: "Bisa sewa lepas kunci hanya satu hari?",
        jawab: "Bisa. Tidak ada minimum durasi khusus; satu hari dihitung 24 jam dari waktu pengambilan. Untuk kebutuhan lebih panjang tersedia skema mingguan, bulanan, sampai tahunan.",
      },
      {
        tanya: "Unit lepas kunci boleh dibawa ke luar kota?",
        jawab: "Boleh. Sebutkan kota tujuan dan lama perjalanan saat memesan, supaya kami bisa menyiapkan unit yang paling sesuai dan menjelaskan ketentuannya lebih dulu.",
      },
    ],
  },
};
