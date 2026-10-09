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
  // Halaman paling "lokal": garasi kami memang di Ciledug. Angle-nya
  // kedekatan — lihat unit dulu, ambil sendiri, antar gratis kalau dekat.
  // Jangkauan antar gratis sengaja tidak disebut angkanya; penyewa diminta
  // mengirim alamat supaya tim yang memastikan.
  "rental-mobil-ciledug": {
    intro:
      "Saat mencari sewa mobil Ciledug, wajar kalau Anda ingin unitnya benar-benar dekat. Garasi dan kantor 287 Trans ada di Jl. Lembang Baru II, Ciledug, dan dari sinilah seluruh armada kami berangkat. Untuk Anda yang tinggal di Ciledug, Karang Tengah, atau Larangan, kami tetangga sendiri: Anda bisa mampir melihat kondisi unit sebelum memutuskan, dan serah terima tidak perlu menunggu mobil menembus macet dari kota lain.",
    bagian: [
      {
        judul: "Kenapa Rental Mobil Ciledug di 287 Trans",
        isi: "Kedekatan bukan sekadar soal jarak di peta. Untuk penyewa di Ciledug, kedekatan mengubah cara Anda menyewa.",
        poin: [
          "Lihat dulu, baru sewa. Datang ke garasi, periksa kabin dan kondisi unit dengan mata sendiri, lalu putuskan. Kabari kami lewat WhatsApp sebelum datang supaya unitnya sudah disiapkan.",
          "Ambil sendiri tanpa ongkos. Mengambil dan mengembalikan unit di garasi tidak dikenakan biaya antar sama sekali.",
          "Diantar pun bisa gratis. Alamat yang dekat dengan garasi — banyak di antaranya di Ciledug sendiri dan wilayah yang bersebelahan — diantar tanpa ongkos kirim. Kirim alamat Anda, kami pastikan sebelum Anda memesan.",
          "Kebutuhan mendadak lebih mudah dilayani. Karena unit tidak perlu didatangkan dari jauh, permintaan di hari yang sama umumnya bisa disiapkan selama tanggalnya masih kosong.",
        ],
      },
      {
        judul: "Sewa Mobil Lepas Kunci Ciledug atau Dengan Supir",
        isi: "Sewa mobil lepas kunci Ciledug cukup dengan KTP yang masih berlaku dan SIM aktif — tanpa kartu kredit, tanpa jaminan BPKB, tanpa membuat akun. Pilihan ini paling pas untuk mudik, liburan keluarga, atau keperluan harian yang jadwalnya berubah-ubah. Kalau Anda butuh mobil untuk hajatan, menjemput keluarga dari bandara, atau agenda kerja ke Jakarta, unit yang sama bisa disewa dengan supir; biaya supir dihitung terpisah dari tarif unit dan disebutkan sejak awal.",
        tautan: { to: "/artikel/syarat-sewa-mobil-lepas-kunci-tangerang", label: "Baca syarat lengkap sewa lepas kunci" },
      },
      {
        judul: "Dari Ciledug ke Mana Saja",
        isi: "Ciledug berbatasan langsung dengan Jakarta Selatan, jadi rute ke Petukangan, Kebayoran, dan pusat kota terasa dekat, sementara arah Tangerang dan Tangerang Selatan juga mudah dijangkau. Karena itu mobil sewaan dari Ciledug dipakai untuk banyak keperluan: MPV tujuh penumpang seperti Innova Reborn dan Innova Zenix untuk mudik dan liburan, SUV seperti Fortuner untuk perjalanan luar kota, serta Alphard dan sedan Mercedes-Benz atau BMW untuk pernikahan dan acara keluarga. Semua kategori itu keluar dari garasi yang sama, dan harganya tercantum di halaman ini.",
      },
      {
        judul: "Area Layanan di Sekitar Ciledug",
        isi: "Selain Kecamatan Ciledug sendiri, kami melayani rental mobil Karang Tengah Ciledug, Larangan, dan Pondok Aren yang bersebelahan dengan garasi. Petukangan di sisi Jakarta Selatan juga dekat, begitu pula kawasan CBD Ciledug yang mudah dicari sebagai titik temu serah terima. Tamu dari luar kota yang mencari Ciledug rent car pun bisa kami antarkan unitnya ke penginapan. Untuk alamat di luar jangkauan antar gratis, ongkos antar dihitung sesuai jarak dan disebutkan di awal, jadi tidak ada tambahan yang baru muncul saat unit tiba.",
      },
      {
        judul: "Cara Sewa Mobil di Ciledug",
        isi: "Bisa lewat WhatsApp saja, atau mampir langsung ke garasi.",
        poin: [
          "Lihat kategori dan harga di halaman ini, lalu pilih unit yang sesuai kebutuhan Anda.",
          "Chat WhatsApp dengan menyebutkan unit, tanggal mulai, lama sewa, serta lepas kunci atau dengan supir.",
          "Pilih cara serah terima: ambil sendiri di garasi Ciledug, atau kirim alamat Anda untuk diantar.",
          "Tim kami mengonfirmasi ketersediaan dan total biayanya sebelum tanggal Anda dikunci.",
        ],
        tautan: { to: "/katalog", label: "Lihat katalog armada lengkap" },
      },
    ],
    faq: [
      {
        tanya: "Di mana alamat garasi 287 Trans di Ciledug?",
        jawab: "Garasi dan kantor kami ada di Jl. Lembang Baru II, RT003/RW009, Ciledug, Kota Tangerang. Kabari kami lewat WhatsApp sebelum datang supaya unit yang ingin Anda lihat sudah disiapkan.",
      },
      {
        tanya: "Boleh melihat unit langsung sebelum menyewa?",
        jawab: "Boleh, dan justru itu keuntungan menyewa dari rental yang garasinya ada di Ciledug. Sebutkan unit yang ingin dilihat saat chat, lalu datang ke garasi untuk memeriksanya sendiri sebelum memesan.",
      },
      {
        tanya: "Apakah antar unit ke Karang Tengah atau Larangan gratis?",
        jawab: "Untuk alamat yang dekat dengan garasi, unit diantar tanpa ongkos kirim, dan banyak alamat di Karang Tengah maupun Larangan masuk hitungan itu. Kirim alamat lengkap atau share location lewat WhatsApp; kami pastikan gratis atau tidak sebelum Anda memesan.",
      },
      {
        tanya: "Apa syarat sewa mobil lepas kunci di Ciledug?",
        jawab: "Cukup KTP yang masih berlaku dan SIM aktif sesuai golongan kendaraan. Tidak ada syarat kartu kredit, tidak ada jaminan BPKB, dan tidak perlu membuat akun.",
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

  // Halaman harga: tabelnya yang utama. Prosa di sini hanya menjelaskan cara
  // membaca angkanya — tidak ada satu pun angka harga yang ditulis di teks.
  "harga-sewa-mobil-tangerang": {
    intro:
      "Harga sewa mobil di Tangerang sangat bergantung pada kelas unitnya, jadi kami menampilkan seluruhnya apa adanya: setiap unit, setiap kategori, dengan tarif harian yang sama persis dengan katalog dan dengan yang disebutkan tim kami saat Anda chat. Kalau ada perubahan tarif, tabel ini ikut berubah dengan sendirinya.",
    bagian: [
      {
        judul: "Cara Membaca Tarif di Tabel",
        isi: "Angka di setiap baris adalah tarif unit untuk satu hari, dihitung 24 jam sejak waktu pengambilan. Total sewa adalah tarif harian dikalikan jumlah hari. Tarif yang sama berlaku untuk sewa lepas kunci; kalau Anda memilih plus sopir, biaya sopir ditambahkan terpisah dan disebutkan sejak awal.",
      },
      {
        judul: "Biaya di Luar Tarif Unit",
        isi: "Ada tiga kemungkinan tambahan, dan semuanya kami sebutkan sebelum pemesanan dikunci: bahan bakar dan tol selama pemakaian, biaya sopir bila memilih opsi itu, dan biaya antar bila unit diminta datang ke alamat Anda. Mengambil unit sendiri di kantor kami di Ciledug tidak dikenakan biaya.",
        tautan: { to: "/sewa-mobil-lepas-kunci-tangerang", label: "Lihat ketentuan sewa mobil lepas kunci" },
      },
      {
        judul: "Sewa Mingguan, Bulanan, dan Tahunan",
        isi: "Untuk pemakaian panjang, tarif per harinya lebih rendah dibanding sewa harian, dan selisihnya makin terasa seiring lamanya masa sewa. Skema ini banyak dipakai untuk kendaraan operasional perusahaan dan pemakaian pribadi jangka panjang. Angkanya disusun sesuai unit dan durasi, jadi sebutkan keduanya saat chat.",
        tautan: { to: "/artikel/sewa-mobil-bulanan-tangerang", label: "Panduan sewa mobil bulanan di Tangerang" },
      },
    ],
    faq: [
      {
        tanya: "Apakah harga di tabel sudah termasuk sopir?",
        jawab: "Belum. Tarif di tabel adalah tarif unit. Kalau Anda memilih plus sopir, biayanya dihitung terpisah dan kami sebutkan di awal, sebelum pemesanan dikunci.",
      },
      {
        tanya: "Apakah harga sudah termasuk bensin dan tol?",
        jawab: "Belum. Bahan bakar dan tol selama pemakaian ditanggung penyewa, sehingga totalnya mengikuti rute Anda sendiri.",
      },
      {
        tanya: "Apakah ada biaya tersembunyi?",
        jawab: "Tidak. Di luar tarif unit hanya ada bahan bakar dan tol, biaya sopir bila dipilih, dan biaya antar bila unit diminta diantar. Semuanya disebutkan sebelum booking dikunci.",
      },
      {
        tanya: "Apakah harga bisa berubah?",
        jawab: "Tarif bisa disesuaikan dari waktu ke waktu, dan tabel di halaman ini selalu mengikuti katalog terbaru. Angka yang dikonfirmasi tim kami saat pemesanan adalah angka yang berlaku untuk tanggal Anda.",
      },
    ],
  },
  // --- Halaman daerah (lihat ../daerah.js) ---------------------------------
  // Tiap halaman ditulis dari sudut kebutuhan daerahnya sendiri, bukan satu
  // teks yang diganti nama tempatnya — itu justru yang membuat halaman
  // tujuan iklan dinilai tidak relevan. Ongkos antar gratis hanya berlaku
  // untuk alamat yang dekat dengan garasi; jangkauannya sengaja tidak disebut
  // angkanya, penyewa diminta mengirim alamat supaya tim yang memastikan.

  // Bintaro: hunian mapan, profesional dan ekspatriat. Angle: unit rapi,
  // proses cepat, serah terima di sektor mana pun.
  "rental-mobil-bintaro": {
    intro:
      "Bintaro adalah kawasan hunian yang tertata, dan penghuninya terbiasa dengan layanan yang tertata pula. Penyewa kami di sini beragam: profesional yang butuh mobil untuk agenda kantor, keluarga yang menyambut kerabat dari luar kota, sampai ekspatriat dan tamu perusahaan yang lebih nyaman diantar supir. Kebutuhan mereka mirip — sewa mobil Bintaro yang unitnya bersih, harganya jelas sejak awal, dan prosesnya tidak memakan setengah hari.",
    bagian: [
      {
        judul: "Kenapa Memilih 287 Trans untuk Rental Mobil Bintaro",
        isi: "Beberapa hal yang membuat sewa mobil di Bintaro lewat kami terasa ringkas, dan semuanya bisa Anda cek sendiri sebelum memesan.",
        poin: [
          "Garasi kami di Ciledug tidak jauh dari Bintaro, jadi unit tidak perlu menempuh perjalanan panjang sebelum sampai ke rumah Anda — dan Anda juga bisa datang melihat unitnya lebih dulu.",
          "Unit premium keluaran terbaru, seluruhnya matic, dibersihkan dan diperiksa sebelum diserahkan. Kabin yang rapi penting kalau mobilnya dipakai menjemput tamu atau rekan kerja.",
          "Rental mobil Bintaro lepas kunci cukup dengan KTP yang masih berlaku dan SIM aktif — tanpa kartu kredit, tanpa jaminan BPKB, tanpa membuat akun.",
          "Harga di halaman ini ditarik langsung dari katalog, jadi angka yang Anda baca sama dengan yang disebutkan tim kami di WhatsApp.",
        ],
      },
      {
        judul: "Sewa Mobil Lepas Kunci Bintaro atau Dengan Supir",
        isi: "Sewa mobil lepas kunci Bintaro paling cocok kalau Anda terbiasa menyetir sendiri dan jadwalnya berubah-ubah: mengantar anak sekolah pagi, rapat di Sudirman siang, lalu makan malam di Bintaro Jaya Xchange. Kalau agenda Anda padat dengan pertemuan di beberapa lokasi, atau Anda menyambut tamu yang belum mengenal jalanan Jakarta, opsi dengan supir biasanya lebih menenangkan. Keduanya tersedia untuk unit yang sama. Biaya supir dihitung terpisah dari tarif unit dan disebutkan sejak awal, sedangkan bahan bakar dan tol selama pemakaian ditanggung penyewa.",
        tautan: { to: "/artikel/syarat-sewa-mobil-lepas-kunci-tangerang", label: "Baca syarat lengkap sewa lepas kunci" },
      },
      {
        judul: "Rental Mobil Bulanan Bintaro",
        isi: "Untuk kebutuhan yang lebih panjang — mobil pengganti selama kendaraan Anda di bengkel, kendaraan untuk karyawan yang baru ditempatkan, atau tamu yang menetap beberapa bulan — tersedia rental mobil bulanan Bintaro dengan tarif per hari yang lebih hemat dibanding sewa harian. Skema mingguan dan tahunan juga ada. Sebutkan unit dan lama sewa saat chat, dan tim kami langsung memberi angkanya.",
      },
      {
        judul: "Area Layanan di Bintaro",
        isi: "Kami melayani rent car Bintaro untuk seluruh sektor, dari Bintaro Sektor 1 sampai Sektor 9. Rental mobil Bintaro sektor 9 dan klaster-klaster di sekitarnya kami layani sama seperti sektor lain, begitu pula rental mobil Graha Raya Bintaro, Pondok Aren, dan kawasan Emerald. Unit bisa diserahkan di rumah, di lobi kantor, atau di titik yang mudah dijangkau seperti Bintaro Jaya Xchange. Ongkos antar mengikuti jarak dari garasi kami, alamat yang dekat bahkan gratis, dan angkanya disebutkan sebelum pemesanan dikunci.",
      },
      {
        judul: "Cara Sewa Mobil di Bintaro",
        isi: "Seluruh prosesnya bisa diselesaikan lewat WhatsApp.",
        poin: [
          "Lihat kategori dan harga di halaman ini, lalu pilih unit sesuai jumlah penumpang dan keperluan Anda.",
          "Chat WhatsApp dengan menyebutkan unit, tanggal mulai, lama sewa, serta lepas kunci atau dengan supir.",
          "Kirim alamat serah terima di Bintaro, atau beri tahu kami kalau Anda ingin mengambil sendiri di garasi Ciledug.",
          "Tim kami mengonfirmasi ketersediaan dan total biaya — termasuk ongkos antar kalau ada — sebelum tanggal Anda dikunci.",
        ],
      },
    ],
    faq: [
      {
        tanya: "Apakah unit bisa diantar ke Bintaro Sektor 9 atau Graha Raya?",
        jawab: "Bisa. Seluruh sektor Bintaro, Graha Raya, dan Pondok Aren termasuk area layanan kami. Ongkos antar mengikuti jarak dari garasi di Ciledug dan kami sebutkan sebelum pemesanan dikunci; kalau ingin tanpa ongkos, unit bisa diambil sendiri di garasi.",
      },
      {
        tanya: "Apa syarat rental mobil Bintaro lepas kunci?",
        jawab: "KTP yang masih berlaku dan SIM aktif sesuai golongan kendaraan. Tidak ada syarat kartu kredit, jaminan BPKB, maupun pendaftaran akun.",
      },
      {
        tanya: "Bisa sewa mobil dengan supir untuk menjemput tamu di Bintaro?",
        jawab: "Bisa. Seluruh unit tersedia dengan supir, termasuk Alphard dan sedan Mercedes-Benz atau BMW yang sering dipilih untuk tamu penting. Sebutkan jam jemput dan rutenya saat chat; biaya supir disebutkan terpisah dari tarif unit.",
      },
      {
        tanya: "Apakah ada sewa mobil bulanan di Bintaro?",
        jawab: "Ada. Sewa bulanan tersedia untuk seluruh unit dengan tarif per hari yang lebih hemat dibanding harian, lepas kunci maupun dengan supir. Skema mingguan dan tahunan juga bisa.",
      },
      {
        tanya: "Berapa lama minimal sewa?",
        jawab: "Mulai dari satu hari, dihitung 24 jam dari waktu pengambilan sampai pengembalian.",
      },
      {
        tanya: "Apakah bensin dan tol sudah termasuk?",
        jawab: "Belum. Bahan bakar dan tol selama pemakaian ditanggung penyewa, jadi biayanya mengikuti rute Anda sendiri. Biaya di luar tarif unit selalu kami sebutkan di awal.",
      },
    ],
  },

  // BSD & Gading Serpong: kantor, mal, keluarga muda. Angle: harian untuk
  // tamu kantor, bulanan untuk karyawan.
  "rental-mobil-bsd-serpong": {
    intro:
      "Serpong punya ritme sendiri. Di jam kerja, perkantoran BSD City dan Alam Sutera dipenuhi rapat dan tamu dari luar kota; di akhir pekan, keluarga muda memadati The Breeze, AEON, dan Summarecon Serpong. Kebutuhan mobilnya pun berbeda-beda — ada yang hanya perlu sehari untuk menjemput klien, ada yang butuh kendaraan sebulan penuh untuk karyawan yang baru pindah tugas. Karena itu sewa mobil BSD di 287 Trans tersedia harian, mingguan, sampai bulanan, semuanya dari armada yang sama.",
    bagian: [
      {
        judul: "Kenapa Sewa Mobil BSD di 287 Trans",
        isi: "Yang biasanya dicari penyewa di BSD dan Gading Serpong adalah kepastian: unitnya sesuai, harganya jelas, dan serah terimanya tepat waktu.",
        poin: [
          "Satu armada untuk dua kebutuhan: sedan Mercedes-Benz atau Alphard untuk menjemput tamu kantor, MPV tujuh penumpang untuk keluarga.",
          "Harga per hari tercantum di halaman ini dan diambil dari katalog — angkanya tidak berubah setelah Anda chat.",
          "Rental mobil BSD lepas kunci cukup dengan KTP dan SIM aktif, tanpa kartu kredit dan tanpa jaminan BPKB.",
          "Unit bisa diantar ke lobi kantor, rumah, atau mal, jadi Anda tidak perlu menyisihkan waktu untuk mengambilnya.",
        ],
      },
      {
        judul: "Sewa Mobil Harian BSD untuk Tamu dan Agenda Kantor",
        isi: "Sewa mobil harian BSD banyak dipakai untuk menjemput tamu dari bandara, mengantar klien antargedung, atau agenda perusahaan yang berpindah lokasi seharian. Untuk kebutuhan seperti ini, opsi dengan supir biasanya lebih praktis: Anda fokus pada tamu, sementara rute dan parkir menjadi urusan supir. Satu hari dihitung 24 jam dari waktu pengambilan, dan biaya supir disebutkan terpisah dari tarif unit sejak awal.",
      },
      {
        judul: "Sewa Bulanan untuk Karyawan",
        isi: "Perusahaan di BSD dan Alam Sutera kadang butuh kendaraan untuk karyawan yang baru ditempatkan, tim proyek dengan kontrak beberapa bulan, atau pengganti mobil operasional yang sedang diperbaiki. Untuk itu tersedia skema bulanan dengan tarif per hari yang lebih hemat dibanding harian, lepas kunci maupun dengan supir. Kebutuhan beberapa unit sekaligus juga bisa dibicarakan lewat WhatsApp supaya penawarannya disusun sesuai kebutuhan Anda.",
      },
      {
        judul: "Lepas Kunci untuk Akhir Pekan Keluarga",
        isi: "Sewa mobil lepas kunci Serpong cocok untuk akhir pekan: belanja di AEON, makan di The Breeze, lalu lanjut ke luar kota tanpa memikirkan jam istirahat supir. Pilih MPV seperti Innova Reborn atau Innova Zenix kalau rombongan Anda sampai tujuh orang, atau SUV seperti Fortuner dan Pajero Sport untuk perjalanan dengan barang bawaan lebih banyak. Bahan bakar dan tol ditanggung penyewa, jadi biayanya mengikuti rute Anda sendiri.",
        tautan: { to: "/artikel/syarat-sewa-mobil-lepas-kunci-tangerang", label: "Baca syarat lengkap sewa lepas kunci" },
      },
      {
        judul: "Area Layanan BSD, Gading Serpong, dan Sekitarnya",
        isi: "Kami melayani rental mobil di BSD City, dari kawasan perumahan sampai perkantorannya, rental mobil Gading Serpong termasuk sekitar Summarecon Serpong, serta sewa mobil Alam Sutera. Wilayah Serpong lainnya juga termasuk, jadi rental mobil Serpong untuk alamat di luar ketiga kawasan itu tetap bisa kami layani. Unit bisa diserahkan di rumah, di kantor, atau di titik yang mudah dijangkau seperti The Breeze dan AEON. Ongkos antar dihitung dari jarak garasi kami di Ciledug dan disebutkan sebelum pemesanan dikunci.",
      },
      {
        judul: "Cara Sewa Mobil di BSD dan Serpong",
        isi: "Sewa mobil Serpong cukup lewat WhatsApp, tanpa perlu datang ke kantor kami.",
        poin: [
          "Pilih kategori di halaman ini sesuai jumlah penumpang dan keperluan — tamu kantor, keluarga, atau operasional.",
          "Chat WhatsApp dengan menyebutkan unit, tanggal mulai, lama sewa (harian, mingguan, atau bulanan), serta lepas kunci atau dengan supir.",
          "Kirim alamat serah terima di BSD, Gading Serpong, atau Alam Sutera.",
          "Kami konfirmasi ketersediaan dan total biayanya sebelum tanggal Anda dikunci.",
        ],
      },
    ],
    faq: [
      {
        tanya: "Apakah unit bisa diantar ke kantor saya di BSD atau Alam Sutera?",
        jawab: "Bisa. Unit diantar ke lobi kantor, rumah, atau titik temu yang Anda pilih di BSD, Gading Serpong, maupun Alam Sutera. Ongkos antar dihitung dari jarak garasi kami di Ciledug dan disebutkan sebelum pemesanan dikunci.",
      },
      {
        tanya: "Ada sewa mobil bulanan untuk karyawan di BSD?",
        jawab: "Ada. Skema bulanan tersedia untuk seluruh unit dengan tarif per hari yang lebih hemat dibanding harian. Untuk beberapa unit sekaligus atau kontrak lebih panjang, hubungi kami lewat WhatsApp agar penawarannya disusun sesuai kebutuhan.",
      },
      {
        tanya: "Apa syarat sewa mobil BSD lepas kunci?",
        jawab: "KTP yang masih berlaku dan SIM aktif sesuai golongan kendaraan. Tidak ada syarat kartu kredit, jaminan BPKB, atau pendaftaran akun.",
      },
      {
        tanya: "Bisa sewa dengan supir untuk menjemput tamu kantor?",
        jawab: "Bisa. Seluruh unit tersedia dengan supir. Sebutkan jam jemput, lokasi, dan rencana rutenya saat chat; biaya supir disebutkan terpisah dari tarif unit.",
      },
      {
        tanya: "Berapa lama minimal sewa?",
        jawab: "Mulai dari satu hari, dihitung 24 jam dari waktu pengambilan. Untuk kebutuhan lebih panjang ada skema mingguan, bulanan, dan tahunan.",
      },
      {
        tanya: "Boleh dibawa ke luar kota dari Serpong?",
        jawab: "Boleh. Sebutkan kota tujuan dan lama perjalanan saat memesan, supaya kami bisa menyiapkan unit yang paling sesuai dan menjelaskan ketentuannya lebih dulu.",
      },
    ],
  },

  // Cipondoh: dekat dari garasi Ciledug. Angle: antar gratis untuk alamat
  // terdekat dan proses yang tidak ribet.
  "rental-mobil-cipondoh": {
    intro:
      "Cipondoh dan Ciledug sama-sama berada di Kota Tangerang dan letaknya berdekatan, dan jarak sedekat itu terasa saat Anda menyewa mobil. Unit yang Anda pesan berangkat dari garasi kami di Ciledug, bukan dari pusat kota, sehingga serah terima di Cipondoh tidak bergantung pada perjalanan panjang. Syaratnya pun ringkas, dan sebagian besar urusannya selesai lewat chat — tanpa formulir panjang, dan tanpa harus datang ke kantor kalau Anda tidak mau.",
    bagian: [
      {
        judul: "Kenapa Rental Mobil di Cipondoh Lewat 287 Trans",
        isi: "Untuk penyewa di Cipondoh, keuntungannya ada pada jarak dan prosesnya.",
        poin: [
          "Antar gratis untuk alamat terdekat. Alamat yang dekat dengan garasi kami bebas ongkos antar, dan sebagian alamat di Cipondoh — terutama yang lebih dekat ke arah Ciledug — masuk hitungan itu. Kirim alamat atau share location, kami pastikan sebelum Anda memesan.",
          "Proses tidak ribet. Pilih unit, chat WhatsApp, kirim alamat; tim kami yang mengonfirmasi ketersediaan dan total biayanya.",
          "Syarat lepas kunci ringkas: KTP yang masih berlaku dan SIM aktif, tanpa kartu kredit dan tanpa jaminan BPKB.",
          "Armada premium matic, diperiksa sebelum diserahkan, dengan harga di halaman ini yang sama dengan yang disebutkan tim kami.",
        ],
      },
      {
        judul: "Sewa Mobil Lepas Kunci Cipondoh",
        isi: "Mencari rental mobil Tangerang lepas kunci di Cipondoh? Sewa mobil lepas kunci Cipondoh pas untuk keluarga yang ingin jalan-jalan akhir pekan, mudik, atau sekadar butuh mobil kedua selama beberapa hari. Anda yang menyetir, Anda yang mengatur jadwal. Tarif unit dihitung per 24 jam dari waktu pengambilan, sedangkan bahan bakar dan tol selama pemakaian ditanggung penyewa. Kalau ingin lebih santai — misalnya untuk hajatan atau menjemput keluarga dari bandara — unit yang sama bisa disewa dengan supir.",
        tautan: { to: "/artikel/syarat-sewa-mobil-lepas-kunci-tangerang", label: "Baca syarat lengkap sewa lepas kunci" },
      },
      {
        judul: "Memilih Unit untuk Kebutuhan Anda",
        isi: "Untuk rombongan keluarga sampai tujuh orang, MPV seperti Innova Reborn dan Innova Zenix paling mudah dikendalikan sekaligus lega. SUV seperti Fortuner dan Pajero Sport memberi posisi duduk lebih tinggi untuk perjalanan jauh. Untuk pernikahan atau tamu penting, tersedia Alphard serta sedan Mercedes-Benz dan BMW. Klik kategori di atas untuk melihat unit beserta harga per harinya.",
      },
      {
        judul: "Area Layanan Rental Mobil di Cipondoh",
        isi: "Kami melayani rental mobil di Cipondoh untuk seluruh kelurahannya, termasuk Petir, Gondrong, Kenanga, kawasan Poris, dan permukiman di sekitar Situ Cipondoh. Siapa pun yang mencari rental mobil daerah Cipondoh Tangerang — dari kompleks perumahan sampai alamat di pinggir jalan raya — bisa memilih ambil sendiri di garasi Ciledug atau diantar. Untuk alamat yang lebih jauh dari garasi, ongkos antar dihitung sesuai jarak dan disebutkan sebelum pemesanan dikunci.",
      },
      {
        judul: "Cara Sewa Mobil Cipondoh Tangerang",
        isi: "Rental mobil Tangerang di Cipondoh lewat kami cukup empat langkah, semuanya bisa lewat WhatsApp.",
        poin: [
          "Pilih kategori di halaman ini dan cek harganya.",
          "Chat WhatsApp dengan menyebutkan unit, tanggal mulai, lama sewa, serta lepas kunci atau dengan supir.",
          "Kirim alamat Anda di Cipondoh atau share location, supaya kami bisa memastikan ongkos antarnya — gratis atau tidak.",
          "Setelah ketersediaan dan total biaya dikonfirmasi, tanggal Anda kami kunci dan unit diantar sesuai jadwal.",
        ],
      },
    ],
    faq: [
      {
        tanya: "Apakah antar unit ke Cipondoh gratis?",
        jawab: "Gratis untuk alamat yang dekat dengan garasi kami di Ciledug, dan sebagian alamat di Cipondoh masuk hitungan itu. Untuk alamat yang lebih jauh, ongkos antar dihitung sesuai jarak. Kirim alamat lengkap atau share location lewat WhatsApp, dan kami pastikan sebelum Anda memesan.",
      },
      {
        tanya: "Apa syarat rental mobil Cipondoh lepas kunci?",
        jawab: "KTP yang masih berlaku dan SIM aktif sesuai golongan kendaraan. Tidak ada syarat kartu kredit, jaminan BPKB, atau pendaftaran akun.",
      },
      {
        tanya: "Boleh mengambil unit sendiri di garasi?",
        jawab: "Boleh, tanpa biaya antar. Garasi kami ada di Jl. Lembang Baru II, Ciledug. Kabari kami lewat WhatsApp sebelum datang supaya unitnya sudah disiapkan.",
      },
      {
        tanya: "Bisa sewa mobil dengan supir dari Cipondoh?",
        jawab: "Bisa. Seluruh unit tersedia dengan supir untuk hajatan, penjemputan bandara, maupun agenda seharian. Biaya supir dihitung terpisah dari tarif unit dan disebutkan sejak awal.",
      },
      {
        tanya: "Berapa lama minimal sewa?",
        jawab: "Mulai dari satu hari, dihitung 24 jam dari waktu pengambilan.",
      },
      {
        tanya: "Ada sewa mingguan atau bulanan?",
        jawab: "Ada, untuk seluruh unit, dengan tarif per hari yang lebih hemat dibanding harian. Sebutkan lama sewa Anda saat chat supaya kami bisa langsung memberi angkanya.",
      },
    ],
  },

  // Tangerang Selatan: halaman payung. Menaut ke halaman Bintaro dan BSD
  // supaya ketiganya tidak saling berebut kata kunci. Ciputat dan Pamulang
  // sengaja tidak disebut: area itu tidak dilayani.
  "rental-mobil-tangerang-selatan": {
    intro:
      "Tangerang Selatan bukan satu kawasan, melainkan beberapa kota kecil dengan karakter masing-masing: perkantoran dan perumahan besar di Serpong dan BSD, permukiman mapan di Bintaro dan Pondok Aren, sampai Setu dan Serpong Utara yang terus tumbuh. Ciledug, tempat garasi kami, berbatasan langsung dengan Pondok Aren, sehingga sewa mobil Tangerang Selatan bisa dilayani tanpa unit harus didatangkan dari jauh. Halaman ini merangkum layanan kami untuk seluruh Tangsel; dua kawasan dengan kebutuhan paling khas punya halamannya sendiri.",
    bagian: [
      {
        judul: "Kenapa Rental Mobil Tangsel di 287 Trans",
        isi: "Empat hal yang membuat sewa mobil Tangsel lewat kami lebih praktis.",
        poin: [
          "Dekat dengan Tangsel. Garasi kami di Ciledug bersebelahan dengan Pondok Aren, jadi serah terima di Tangsel tidak menunggu unit menempuh perjalanan panjang.",
          "Rental mobil Tangsel lepas kunci dengan syarat ringkas — KTP dan SIM aktif, tanpa kartu kredit dan tanpa jaminan BPKB — atau dengan supir untuk agenda yang padat.",
          "Harian, mingguan, sampai bulanan dari armada yang sama, jadi Anda tidak perlu mencari penyedia lain saat kebutuhan berubah.",
          "Harga tiap kategori di halaman ini diambil dari katalog, sama dengan angka yang disebutkan tim kami.",
        ],
      },
      {
        judul: "Bintaro dan Pondok Aren",
        isi: "Bintaro adalah kawasan hunian mapan tempat banyak profesional dan keluarga yang menginginkan unit rapi dan proses cepat. Pondok Aren, yang mengelilinginya, termasuk wilayah Tangsel yang paling dekat dengan garasi kami. Rental mobil Pondok Aren dan seluruh sektor Bintaro kami bahas lebih rinci — termasuk titik serah terima dan sewa bulanannya — di halaman khusus Bintaro.",
        tautan: { to: "/rental-mobil-bintaro", label: "Rental mobil Bintaro lepas kunci & dengan supir" },
      },
      {
        judul: "BSD, Gading Serpong, dan Alam Sutera",
        isi: "Di kawasan BSD, kebutuhan sewa banyak datang dari tamu kantor, keluarga muda, dan karyawan yang butuh mobil untuk beberapa bulan. Untuk BSD City, Gading Serpong, dan Alam Sutera kami menyiapkan halaman tersendiri yang membahas sewa harian untuk tamu, sewa bulanan untuk karyawan, serta serah terima di sekitar mal dan perkantoran.",
        tautan: { to: "/rental-mobil-bsd-serpong", label: "Rental mobil BSD & Gading Serpong" },
      },
      {
        judul: "Sewa Mobil Bulanan Tangerang Selatan",
        isi: "Untuk pemakaian jangka panjang — kendaraan operasional, mobil pengganti selama kendaraan Anda diperbaiki, atau karyawan yang ditempatkan beberapa bulan — sewa mobil bulanan Tangerang Selatan tersedia untuk seluruh unit dengan tarif per hari yang lebih hemat dibanding harian. Pilih sewa mobil Tangerang Selatan lepas kunci kalau Anda ingin menyetir sendiri setiap hari, atau dengan supir untuk kebutuhan kantor. Sebutkan lama sewa saat chat supaya kami bisa langsung memberi angkanya.",
      },
      {
        judul: "Area Layanan di Tangerang Selatan",
        isi: "Kami melayani rental mobil di Tangsel untuk Serpong, Serpong Utara, Setu, Pondok Aren, Bintaro, dan BSD, beserta permukiman di sekitarnya. Untuk sewa mobil di Tangsel, unit bisa diantar ke rumah, kantor, atau titik temu yang Anda pilih, atau diambil sendiri di garasi Ciledug tanpa biaya antar. Ongkos antar mengikuti jarak dari garasi, alamat yang dekat bahkan gratis, dan selalu disebutkan sebelum pemesanan dikunci.",
      },
      {
        judul: "Cara Sewa Mobil di Tangsel",
        isi: "Semua langkahnya bisa lewat WhatsApp.",
        poin: [
          "Pilih kategori dan cek harganya di halaman ini.",
          "Chat WhatsApp dengan menyebutkan unit, tanggal mulai, lama sewa, serta lepas kunci atau dengan supir.",
          "Kirim alamat serah terima di Tangerang Selatan, atau pilih ambil sendiri di garasi Ciledug.",
          "Kami konfirmasi ketersediaan dan total biayanya sebelum tanggal Anda dikunci.",
        ],
      },
    ],
    faq: [
      {
        tanya: "Wilayah Tangerang Selatan mana saja yang dilayani?",
        jawab: "Serpong, Serpong Utara, Setu, Pondok Aren, Bintaro, dan BSD, beserta permukiman di sekitarnya. Kalau alamat Anda tidak disebut di sini, kirim lokasinya lewat WhatsApp dan tim kami akan memastikannya.",
      },
      {
        tanya: "Apa syarat rental mobil Tangsel lepas kunci?",
        jawab: "KTP yang masih berlaku dan SIM aktif sesuai golongan kendaraan. Tidak ada syarat kartu kredit, jaminan BPKB, atau pendaftaran akun.",
      },
      {
        tanya: "Apakah ada sewa mobil bulanan di Tangerang Selatan?",
        jawab: "Ada. Sewa bulanan tersedia untuk seluruh unit dengan tarif per hari yang lebih hemat dibanding harian, lepas kunci maupun dengan supir.",
      },
      {
        tanya: "Bisa sewa dengan supir di Tangsel?",
        jawab: "Bisa. Seluruh unit tersedia dengan supir, baik untuk agenda kantor seharian, penjemputan bandara, maupun acara keluarga. Biaya supir disebutkan terpisah dari tarif unit sejak awal.",
      },
      {
        tanya: "Apakah bensin dan tol sudah termasuk harga sewa?",
        jawab: "Belum. Bahan bakar dan tol selama pemakaian ditanggung penyewa. Biaya di luar tarif unit — supir dan ongkos antar kalau ada — selalu kami sebutkan di awal.",
      },
      {
        tanya: "Berapa lama minimal sewa?",
        jawab: "Mulai dari satu hari, dihitung 24 jam dari waktu pengambilan sampai pengembalian.",
      },
    ],
  },
};
