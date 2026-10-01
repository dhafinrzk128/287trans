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
};
