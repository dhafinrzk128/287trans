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
  // Halaman paling "lokal": garasi kami memang di Ciledug. H2 mengikuti
  // kata kunci dan judul iklan ad group "Rental Mobil Ciledug" (terdekat,
  // lepas kunci, harian/mingguan/bulanan, Karang Tengah, "Dari Ciledug ke
  // Mana Saja"). Jangkauan antar gratis sengaja tidak disebut angkanya;
  // penyewa diminta mengirim alamat supaya tim yang memastikan.
  "rental-mobil-ciledug": {
    intro:
      "Rental mobil Ciledug terdekat adalah yang garasinya memang di Ciledug. Garasi dan kantor 287 Trans ada di Jl. Lembang Baru II, Ciledug, dan dari sinilah seluruh armada kami berangkat. Untuk Anda yang mencari sewa mobil Ciledug — juga di Karang Tengah dan Larangan — kami tetangga sendiri: mau lihat unitnya dulu, tinggal mampir; mau langsung pakai, unit tinggal ambil atau kami antar tanpa menunggu mobil menembus macet dari kota lain.",
    bagian: [
      {
        judul: "Rental Mobil Ciledug Terdekat: Garasi Kami di Ciledug",
        isi: "Kedekatan bukan sekadar soal jarak di peta. Untuk penyewa di Ciledug, kedekatan mengubah cara Anda menyewa.",
        poin: [
          "Cek unit langsung di garasi. Datang, periksa kabin dan kondisi unit dengan mata sendiri, lalu putuskan. Kabari kami lewat WhatsApp sebelum datang supaya unitnya sudah disiapkan.",
          "Mobil siap tinggal ambil. Mengambil dan mengembalikan unit di garasi tidak dikenakan biaya antar sama sekali.",
          "Pilih unit, kami antar. Alamat yang dekat dengan garasi — banyak di antaranya di Ciledug sendiri dan wilayah yang bersebelahan — diantar tanpa ongkos kirim. Kirim alamat Anda, kami pastikan sebelum Anda memesan.",
          "Tetangga sendiri, harga jujur. Harga di halaman ini diambil dari katalog, dan biaya di luar tarif unit selalu kami sebutkan di awal.",
        ],
      },
      {
        judul: "Sewa Mobil Ciledug Lepas Kunci atau Dengan Supir",
        isi: "Sewa mobil lepas kunci Ciledug cukup dengan KTP yang masih berlaku dan SIM aktif — tanpa kartu kredit, tanpa jaminan BPKB, tanpa membuat akun. Pilihan ini paling pas untuk mudik, liburan keluarga, atau keperluan harian yang jadwalnya berubah-ubah. Kalau Anda butuh mobil untuk hajatan, menjemput keluarga dari bandara, atau agenda kerja ke Jakarta, unit yang sama bisa disewa dengan supir; biaya supir dihitung terpisah dari tarif unit dan disebutkan sejak awal.",
        tautan: { to: "/artikel/syarat-sewa-mobil-lepas-kunci-tangerang", label: "Baca syarat lengkap sewa lepas kunci" },
      },
      {
        judul: "Sewa Mobil Ciledug Harian, Mingguan, dan Bulanan",
        isi: "Sewa mobil Ciledug harian dihitung 24 jam dari waktu pengambilan, cocok untuk kondangan, antar-jemput keluarga, atau perjalanan sehari ke luar kota. Untuk liburan panjang, ambil skema mingguan. Rental mobil Ciledug bulanan tersedia untuk kendaraan kerja, mobil pengganti selama kendaraan Anda di bengkel, atau kebutuhan keluarga yang lebih panjang — tarif per harinya lebih hemat dibanding sewa harian. Karena unitnya berangkat dari garasi di Ciledug, kebutuhan mendadak di hari yang sama umumnya bisa disiapkan selama tanggalnya masih kosong.",
      },
      {
        judul: "Dari Ciledug ke Mana Saja",
        isi: "Ciledug berbatasan langsung dengan Jakarta Selatan, jadi rute ke Petukangan, Kebayoran, dan pusat kota terasa dekat, sementara arah Tangerang dan Tangerang Selatan juga mudah dijangkau. Karena itu mobil sewaan dari Ciledug dipakai untuk banyak keperluan: MPV tujuh penumpang seperti Innova Reborn dan Innova Zenix untuk mudik dan liburan, SUV seperti Fortuner untuk perjalanan luar kota, serta Alphard dan sedan Mercedes-Benz atau BMW untuk pernikahan dan acara keluarga. Semua kategori itu keluar dari garasi yang sama, dan harganya tercantum di halaman ini.",
      },
      {
        judul: "Rental Mobil Karang Tengah, Larangan, dan Sekitar Ciledug",
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
        tanya: "Di mana alamat garasi rental mobil Ciledug 287 Trans?",
        jawab: "Garasi dan kantor kami ada di Jl. Lembang Baru II, RT003/RW009, Ciledug, Kota Tangerang. Kabari kami lewat WhatsApp sebelum datang supaya unit yang ingin Anda lihat sudah disiapkan.",
      },
      {
        tanya: "Boleh melihat unit langsung sebelum sewa mobil di Ciledug?",
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
        tanya: "Ada rental mobil Ciledug harian, mingguan, dan bulanan?",
        jawab: "Ada. Sewa mulai dari satu hari (24 jam dari waktu pengambilan), dengan skema mingguan, bulanan, sampai tahunan untuk pemakaian lebih panjang. Sebutkan lama sewa Anda saat chat supaya kami bisa langsung memberi angkanya.",
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
  // Judul bagian (H2) sengaja memakai frasa kata kunci dan judul iklan ad
  // group masing-masing, dan kalimat pertama intro dibuka dengan kata kunci
  // utamanya. Isinya tetap ditulis per daerah, bukan satu teks yang diganti
  // nama tempatnya. Ongkos antar gratis hanya berlaku untuk alamat yang
  // dekat dengan garasi; jangkauannya sengaja tidak disebut angkanya.

  "sewa-mobil-bintaro": {
    intro:
      "Sewa mobil Bintaro di 287 Trans bisa lepas kunci atau dengan supir, dengan unit yang kami antar sampai ke rumah Anda. Bintaro adalah kawasan hunian yang tertata, dan penyewanya terbiasa dengan layanan yang tertata pula: profesional yang butuh mobil untuk agenda kantor, keluarga yang berangkat liburan atau pulang kampung, sampai tamu perusahaan yang lebih nyaman diantar supir. Kebutuhan mereka mirip — unit bersih, harga jelas dari awal, dan proses yang tidak memakan setengah hari.",
    bagian: [
      {
        judul: "Kenapa Sewa Mobil di Bintaro Lewat 287 Trans",
        isi: "Beberapa hal yang membuat sewa mobil di Bintaro lewat kami terasa ringkas, dan semuanya bisa Anda cek sendiri sebelum memesan.",
        poin: [
          "Unit kami antar ke sektor Bintaro mana pun. Garasi kami di Ciledug tidak jauh dari Bintaro, jadi unit tidak perlu menempuh perjalanan panjang sebelum sampai ke rumah Anda.",
          "Unit premium keluaran terbaru, seluruhnya matic, dibersihkan dan diperiksa sebelum diserahkan.",
          "Syarat mudah: rental mobil Bintaro lepas kunci cukup dengan KTP yang masih berlaku dan SIM aktif — tanpa kartu kredit, tanpa jaminan BPKB, tanpa membuat akun.",
          "Harga jelas dari awal. Angka di halaman ini ditarik langsung dari katalog, sama dengan yang disebutkan tim kami di WhatsApp.",
        ],
      },
      {
        judul: "Sewa Mobil Bintaro Lepas Kunci atau Dengan Supir",
        isi: "Sewa mobil lepas kunci Bintaro paling cocok kalau Anda terbiasa menyetir sendiri dan jadwalnya berubah-ubah: mengantar anak sekolah pagi, rapat di Sudirman siang, lalu makan malam di Bintaro Jaya Xchange. Kalau agenda Anda padat dengan pertemuan di beberapa lokasi, atau Anda menyambut tamu yang belum mengenal jalanan Jakarta, opsi dengan supir biasanya lebih menenangkan. Keduanya tersedia untuk unit yang sama. Biaya supir dihitung terpisah dari tarif unit dan disebutkan sejak awal, sedangkan bahan bakar dan tol selama pemakaian ditanggung penyewa.",
        tautan: { to: "/artikel/syarat-sewa-mobil-lepas-kunci-tangerang", label: "Baca syarat lengkap sewa lepas kunci" },
      },
      {
        judul: "Mobil Keluarga 7 Kursi untuk Liburan dan Mudik",
        isi: "Untuk liburan keluarga atau pulang kampung dari Bintaro, MPV tujuh kursi seperti Innova Reborn dan Innova Zenix jadi pilihan paling aman: kabin lega, bagasi luas untuk koper, dan AC yang tetap dingin sampai baris belakang. Kalau rutenya menanjak atau barang bawaan lebih banyak, Fortuner dan Pajero Sport memberi posisi duduk lebih tinggi. Akhir pekan dan musim liburan adalah tanggal yang paling cepat penuh, jadi sebaiknya pesan untuk weekend lebih awal.",
      },
      {
        judul: "Sewa Mobil Bintaro Harian, Mingguan, dan Bulanan",
        isi: "Sewa mobil Bintaro harian dihitung 24 jam dari waktu pengambilan. Untuk liburan panjang ada skema mingguan, dan untuk kebutuhan yang lebih lama — mobil pengganti selama kendaraan Anda di bengkel, kendaraan untuk karyawan yang baru ditempatkan, atau tamu yang menetap beberapa bulan — tersedia sewa mobil bulanan Bintaro dengan tarif per hari yang lebih hemat dibanding harian. Sebutkan unit dan lama sewa saat chat, dan tim kami langsung memberi angkanya.",
      },
      {
        judul: "Sewa Mobil Bintaro Sektor 9, Graha Raya, dan Sektor Lainnya",
        isi: "Kami melayani sewa mobil di Bintaro untuk seluruh sektor, dari Bintaro Sektor 1 sampai Sektor 9, termasuk klaster-klaster di sekitarnya. Rental mobil Graha Raya Bintaro, Pondok Aren, dan kawasan Emerald juga termasuk area antar kami. Unit bisa diserahkan di rumah, di lobi kantor, atau di titik yang mudah dijangkau seperti Bintaro Jaya Xchange — jadi untuk sewa mobil daerah Bintaro mana pun, Anda tidak perlu keluar rumah untuk mengambilnya. Ongkos antar mengikuti jarak dari garasi kami, alamat yang dekat bahkan gratis, dan angkanya disebutkan sebelum pemesanan dikunci. Tamu yang mencari rent car Bintaro untuk beberapa hari pun bisa kami antar langsung ke penginapannya.",
      },
      {
        judul: "Cara Sewa Mobil di Bintaro",
        isi: "Seluruh prosesnya bisa diselesaikan lewat WhatsApp.",
        poin: [
          "Cek unit yang ready di halaman ini, lalu pilih sesuai jumlah penumpang dan keperluan Anda.",
          "Chat WhatsApp dengan menyebutkan unit, tanggal mulai, lama sewa, serta lepas kunci atau dengan supir.",
          "Kirim alamat serah terima di Bintaro, atau beri tahu kami kalau Anda ingin mengambil sendiri di garasi Ciledug.",
          "Tim kami mengonfirmasi ketersediaan dan total biaya — termasuk ongkos antar kalau ada — sebelum tanggal Anda dikunci.",
        ],
      },
    ],
    faq: [
      {
        tanya: "Apakah sewa mobil Bintaro bisa diantar ke Sektor 9 atau Graha Raya?",
        jawab: "Bisa. Seluruh sektor Bintaro, Graha Raya, dan Pondok Aren termasuk area antar kami. Ongkos antar mengikuti jarak dari garasi di Ciledug dan kami sebutkan sebelum pemesanan dikunci; kalau ingin tanpa ongkos, unit bisa diambil sendiri di garasi.",
      },
      {
        tanya: "Apa syarat sewa mobil Bintaro lepas kunci?",
        jawab: "KTP yang masih berlaku dan SIM aktif sesuai golongan kendaraan. Tidak ada syarat kartu kredit, jaminan BPKB, maupun pendaftaran akun.",
      },
      {
        tanya: "Mobil keluarga 7 kursi apa saja yang bisa disewa di Bintaro?",
        jawab: "Innova Reborn dan Innova Zenix untuk keluarga sampai tujuh orang, serta Fortuner dan Pajero Sport kalau Anda butuh SUV. Harga dan ketersediaannya bisa dicek di kategori MPV dan SUV pada halaman ini.",
      },
      {
        tanya: "Apakah ada sewa mobil bulanan di Bintaro?",
        jawab: "Ada. Sewa bulanan tersedia untuk seluruh unit dengan tarif per hari yang lebih hemat dibanding harian, lepas kunci maupun dengan supir. Skema mingguan dan tahunan juga bisa.",
      },
      {
        tanya: "Bisa sewa mobil dengan supir di Bintaro?",
        jawab: "Bisa. Seluruh unit tersedia dengan supir, termasuk Alphard dan sedan Mercedes-Benz atau BMW untuk tamu penting. Sebutkan jam jemput dan rutenya saat chat; biaya supir disebutkan terpisah dari tarif unit.",
      },
      {
        tanya: "Apakah bensin dan tol sudah termasuk?",
        jawab: "Belum. Bahan bakar dan tol selama pemakaian ditanggung penyewa, jadi biayanya mengikuti rute Anda sendiri. Biaya di luar tarif unit selalu kami sebutkan di awal.",
      },
    ],
  },

  "sewa-mobil-bsd-serpong": {
    intro:
      "Sewa mobil BSD di 287 Trans bisa lepas kunci atau dengan supir, dan unitnya kami antar sampai depan cluster Anda. Serpong punya ritme sendiri: di jam kerja, perkantoran BSD City dan Alam Sutera dipenuhi meeting dan tamu dari luar kota; di akhir pekan, keluarga muda memadati The Breeze, AEON, dan Summarecon Serpong. Kebutuhan mobilnya pun berbeda-beda — ada yang hanya perlu sehari untuk menjemput klien, ada yang butuh kendaraan sebulan penuh untuk karyawan yang baru pindah tugas.",
    bagian: [
      {
        judul: "Kenapa Sewa Mobil BSD di 287 Trans",
        isi: "Yang biasanya dicari penyewa di BSD dan Serpong adalah kepastian: unitnya sesuai, harganya jelas, dan serah terimanya tepat waktu.",
        poin: [
          "Antar ke cluster Anda. Unit diserahkan di depan rumah, lobi kantor, atau lokasi acara, jadi Anda tidak perlu menyisihkan waktu untuk mengambilnya.",
          "Unit bersih, siap pakai. Seluruh unit matic keluaran terbaru, dibersihkan dan diperiksa sebelum diserahkan.",
          "Syarat mudah: rental mobil BSD lepas kunci cukup dengan KTP dan SIM aktif, tanpa kartu kredit dan tanpa jaminan BPKB.",
          "Harga per hari tercantum di halaman ini dan diambil dari katalog — angkanya tidak berubah setelah Anda chat.",
        ],
      },
      {
        judul: "Sewa Mobil Harian BSD untuk Tamu Kantor dan Meeting",
        isi: "Sewa mobil harian BSD banyak dipakai untuk menjemput tamu dari bandara, mengantar klien antargedung, atau agenda perusahaan yang berpindah lokasi seharian. Untuk kebutuhan seperti ini, sedan Mercedes-Benz atau Alphard dengan supir biasanya paling praktis: Anda fokus pada tamu, sementara rute dan parkir menjadi urusan supir. Satu hari dihitung 24 jam dari waktu pengambilan, dan biaya supir disebutkan terpisah dari tarif unit sejak awal. Untuk acara di BSD — pernikahan, gathering, atau peluncuran produk — unit bisa kami antar langsung ke lokasi acara.",
      },
      {
        judul: "Sewa Mobil BSD Lepas Kunci, Antar ke Cluster Anda",
        isi: "Sewa mobil lepas kunci BSD cocok untuk Anda yang ingin menyetir sendiri: belanja di AEON, makan di The Breeze, lalu lanjut ke luar kota tanpa memikirkan jam istirahat supir. Pilih MPV seperti Innova Reborn atau Innova Zenix kalau rombongan Anda sampai tujuh orang, atau SUV seperti Fortuner dan Pajero Sport untuk perjalanan dengan barang bawaan lebih banyak. Unit kami antar ke cluster Anda dan dijemput lagi di akhir masa sewa. Bahan bakar dan tol ditanggung penyewa, jadi biayanya mengikuti rute Anda sendiri.",
        tautan: { to: "/artikel/syarat-sewa-mobil-lepas-kunci-tangerang", label: "Baca syarat lengkap sewa lepas kunci" },
      },
      {
        judul: "Sewa Mobil BSD Mingguan dan Bulanan",
        isi: "Perusahaan di BSD dan Alam Sutera kadang butuh kendaraan untuk karyawan yang baru ditempatkan, tim proyek dengan kontrak beberapa bulan, atau pengganti mobil operasional yang sedang diperbaiki. Untuk itu tersedia sewa mobil BSD mingguan dan rental mobil BSD bulanan dengan tarif per hari yang lebih hemat dibanding harian, lepas kunci maupun dengan supir. Kebutuhan beberapa unit sekaligus juga bisa dibicarakan lewat WhatsApp supaya penawarannya disusun sesuai kebutuhan Anda.",
      },
      {
        judul: "Rental Mobil di BSD, Serpong, Gading Serpong, dan Alam Sutera",
        isi: "Kami melayani rental mobil di BSD City, dari kawasan perumahan sampai perkantorannya, rental mobil Gading Serpong termasuk sekitar Summarecon Serpong, serta sewa mobil Alam Sutera. Wilayah Serpong lainnya juga termasuk, jadi sewa mobil Serpong harian maupun rental mobil Serpong jangka panjang untuk alamat di luar ketiga kawasan itu tetap bisa kami layani. Unit bisa diserahkan di rumah, di kantor, atau di titik yang mudah dijangkau seperti The Breeze dan AEON. Ongkos antar dihitung dari jarak garasi kami di Ciledug dan disebutkan sebelum pemesanan dikunci.",
      },
      {
        judul: "Cara Sewa Mobil di BSD",
        isi: "Pilih unit di katalog, tentukan tanggal, sisanya kami urus — semuanya lewat WhatsApp.",
        poin: [
          "Cek unit BSD yang ready di halaman ini, sesuai jumlah penumpang dan keperluan — tamu kantor, keluarga, atau operasional.",
          "Chat WhatsApp dengan menyebutkan unit, tanggal mulai, lama sewa (harian, mingguan, atau bulanan), serta lepas kunci atau dengan supir.",
          "Kirim alamat serah terima di BSD, Serpong, Gading Serpong, atau Alam Sutera.",
          "Kami konfirmasi ketersediaan dan total biayanya sebelum tanggal Anda dikunci.",
        ],
      },
    ],
    faq: [
      {
        tanya: "Apakah sewa mobil BSD bisa diantar ke cluster atau kantor saya?",
        jawab: "Bisa. Unit diantar ke depan cluster, lobi kantor, atau lokasi acara Anda di BSD, Serpong, Gading Serpong, maupun Alam Sutera. Ongkos antar dihitung dari jarak garasi kami di Ciledug dan disebutkan sebelum pemesanan dikunci.",
      },
      {
        tanya: "Apa syarat sewa mobil BSD lepas kunci?",
        jawab: "KTP yang masih berlaku dan SIM aktif sesuai golongan kendaraan. Tidak ada syarat kartu kredit, jaminan BPKB, atau pendaftaran akun.",
      },
      {
        tanya: "Mobil apa yang cocok untuk tamu kantor dan meeting di BSD?",
        jawab: "Sedan Mercedes-Benz dan BMW, atau Alphard untuk rombongan, biasanya dipilih untuk tamu penting. Semuanya bisa disewa dengan supir; sebutkan jam jemput, lokasi, dan rencana rutenya saat chat.",
      },
      {
        tanya: "Ada sewa mobil BSD mingguan dan bulanan?",
        jawab: "Ada. Skema mingguan dan bulanan tersedia untuk seluruh unit dengan tarif per hari yang lebih hemat dibanding harian. Untuk beberapa unit sekaligus atau kontrak lebih panjang, hubungi kami lewat WhatsApp agar penawarannya disusun sesuai kebutuhan.",
      },
      {
        tanya: "Berapa lama minimal sewa mobil harian di BSD?",
        jawab: "Mulai dari satu hari, dihitung 24 jam dari waktu pengambilan.",
      },
      {
        tanya: "Boleh dibawa ke luar kota dari Serpong?",
        jawab: "Boleh. Sebutkan kota tujuan dan lama perjalanan saat memesan, supaya kami bisa menyiapkan unit yang paling sesuai dan menjelaskan ketentuannya lebih dulu.",
      },
    ],
  },

  "rental-mobil-cipondoh": {
    intro:
      "Rental mobil Cipondoh terdekat dari 287 Trans berangkat dari garasi kami di Ciledug — gak perlu jauh, kami dekat. Cipondoh dan Ciledug sama-sama berada di Kota Tangerang dan letaknya berdekatan, sehingga unit yang Anda pesan cepat sampai ke lokasi Anda, bukan didatangkan dari pusat kota. Syaratnya ringkas, dan sebagian besar urusannya selesai lewat chat — tanpa formulir panjang, dan tanpa harus datang ke kantor kalau Anda tidak mau. Singkatnya: rental mobil Tangerang, Cipondoh dan sekitarnya, dari garasi yang dekat — termasuk rental mobil Tangerang lepas kunci, Cipondoh pun kami antar.",
    bagian: [
      {
        judul: "Rental Mobil Cipondoh Terdekat dari Garasi Ciledug",
        isi: "Untuk penyewa di Cipondoh, keuntungannya ada pada jarak dan prosesnya.",
        poin: [
          "Antar gratis untuk alamat terdekat. Alamat yang dekat dengan garasi kami bebas ongkos antar, dan sebagian alamat di Cipondoh — terutama yang lebih dekat ke arah Ciledug — masuk hitungan itu. Kirim alamat atau share location, kami pastikan sebelum Anda memesan.",
          "Proses tidak ribet. Pilih unit, chat admin lewat WhatsApp, kirim alamat; tim kami yang mengonfirmasi ketersediaan dan total biayanya.",
          "Syarat lepas kunci ringkas: KTP yang masih berlaku dan SIM aktif, tanpa kartu kredit dan tanpa jaminan BPKB.",
          "Harga jelas dari awal. Angka di halaman ini sama dengan yang disebutkan tim kami saat chat.",
        ],
      },
      {
        judul: "Sewa Mobil Lepas Kunci Cipondoh",
        isi: "Mencari rental mobil Tangerang lepas kunci di Cipondoh? Sewa mobil lepas kunci Cipondoh pas untuk keluarga yang ingin jalan-jalan akhir pekan, mudik, atau sekadar butuh mobil kedua selama beberapa hari. Anda yang menyetir, Anda yang mengatur jadwal. Tarif unit dihitung per 24 jam dari waktu pengambilan, sedangkan bahan bakar dan tol selama pemakaian ditanggung penyewa. Kalau ingin lebih santai — misalnya untuk hajatan atau menjemput keluarga dari bandara — unit yang sama bisa disewa dengan supir.",
        tautan: { to: "/artikel/syarat-sewa-mobil-lepas-kunci-tangerang", label: "Baca syarat lengkap sewa lepas kunci" },
      },
      {
        judul: "Sewa Mobil Cipondoh Harian, Mingguan, dan Bulanan",
        isi: "Sewa mobil Cipondoh harian cocok untuk kebutuhan mendadak: karena unit berangkat dari garasi yang dekat, pesanan di pagi hari umumnya bisa siap dipakai di hari yang sama, selama unitnya masih kosong. Untuk liburan beberapa hari ada skema mingguan, dan rental mobil Cipondoh bulanan tersedia untuk kendaraan kerja atau kebutuhan keluarga yang lebih panjang, dengan tarif per hari yang lebih hemat. Untuk rombongan sampai tujuh orang, Innova Reborn dan Innova Zenix paling mudah dikendalikan sekaligus lega; Fortuner dan Pajero Sport untuk perjalanan jauh; Alphard serta sedan Mercedes-Benz dan BMW untuk pernikahan atau tamu penting.",
      },
      {
        judul: "Rental Mobil di Cipondoh: Poris, Petir, Situ Cipondoh, dan Sekitarnya",
        isi: "Kami melayani rental mobil di Cipondoh untuk seluruh kelurahannya, termasuk sewa mobil Poris Cipondoh, Petir, Gondrong, Kenanga, dan permukiman di sekitar Situ Cipondoh. Siapa pun yang mencari rental mobil daerah Cipondoh Tangerang — dari kompleks perumahan sampai alamat di pinggir jalan raya — bisa memilih ambil sendiri di garasi Ciledug atau diantar. Untuk alamat yang lebih jauh dari garasi, ongkos antar dihitung sesuai jarak dan disebutkan sebelum pemesanan dikunci.",
      },
      {
        judul: "Cara Sewa Mobil Cipondoh Tangerang",
        isi: "Rental mobil Tangerang di Cipondoh lewat kami cukup empat langkah, semuanya bisa lewat WhatsApp.",
        poin: [
          "Cek unit yang ready di halaman ini beserta harganya.",
          "Chat admin di WhatsApp dengan menyebutkan unit, tanggal mulai, lama sewa, serta lepas kunci atau dengan supir.",
          "Kirim alamat Anda di Cipondoh atau share location, supaya kami bisa memastikan ongkos antarnya — gratis atau tidak.",
          "Setelah ketersediaan dan total biaya dikonfirmasi, tanggal Anda kami kunci dan unit diantar sesuai jadwal.",
        ],
      },
    ],
    faq: [
      {
        tanya: "Apakah antar unit rental mobil ke Cipondoh gratis?",
        jawab: "Gratis untuk alamat yang dekat dengan garasi kami di Ciledug, dan sebagian alamat di Cipondoh masuk hitungan itu. Untuk alamat yang lebih jauh, ongkos antar dihitung sesuai jarak. Kirim alamat lengkap atau share location lewat WhatsApp, dan kami pastikan sebelum Anda memesan.",
      },
      {
        tanya: "Butuh mobil hari ini di Cipondoh, bisa?",
        jawab: "Umumnya bisa, selama unit yang Anda pilih masih kosong di tanggal itu. Karena garasi kami dekat, unit tidak perlu didatangkan dari jauh. Chat admin lewat WhatsApp untuk cek unit yang ready sekarang.",
      },
      {
        tanya: "Apa syarat sewa mobil lepas kunci Cipondoh?",
        jawab: "KTP yang masih berlaku dan SIM aktif sesuai golongan kendaraan. Tidak ada syarat kartu kredit, jaminan BPKB, atau pendaftaran akun.",
      },
      {
        tanya: "Boleh mengambil unit sendiri di garasi?",
        jawab: "Boleh, tanpa biaya antar. Garasi kami ada di Jl. Lembang Baru II, Ciledug. Kabari kami lewat WhatsApp sebelum datang supaya unitnya sudah disiapkan.",
      },
      {
        tanya: "Ada sewa mobil Cipondoh mingguan atau bulanan?",
        jawab: "Ada, untuk seluruh unit, dengan tarif per hari yang lebih hemat dibanding harian. Sebutkan lama sewa Anda saat chat supaya kami bisa langsung memberi angkanya.",
      },
      {
        tanya: "Bisa sewa mobil dengan supir dari Cipondoh?",
        jawab: "Bisa. Seluruh unit tersedia dengan supir untuk hajatan, penjemputan bandara, maupun agenda seharian. Biaya supir dihitung terpisah dari tarif unit dan disebutkan sejak awal.",
      },
    ],
  },

  // Halaman payung Tangsel. Menaut ke halaman Bintaro dan BSD supaya
  // ketiganya tidak saling berebut kata kunci. Ciputat dan Pamulang sengaja
  // tidak disebut: area itu tidak dilayani.
  "rental-mobil-tangerang-selatan": {
    intro:
      "Rental mobil Tangerang Selatan di 287 Trans tersedia harian, mingguan, sampai bulanan — lepas kunci atau dengan supir. Tangsel bukan satu kawasan, melainkan beberapa kota kecil dengan karakter masing-masing: perkantoran dan perumahan besar di Serpong dan BSD, permukiman mapan di Bintaro dan Pondok Aren, sampai Setu dan Serpong Utara yang terus tumbuh. Ciledug, tempat garasi kami, berbatasan langsung dengan Pondok Aren, sehingga sewa mobil Tangerang Selatan bisa dilayani tanpa unit harus didatangkan dari jauh.",
    bagian: [
      {
        judul: "Kenapa Rental Mobil Tangsel di 287 Trans",
        isi: "Empat hal yang membuat sewa mobil Tangsel lewat kami lebih praktis.",
        poin: [
          "Dekat dengan Tangsel. Garasi kami di Ciledug bersebelahan dengan Pondok Aren, jadi serah terima di Tangsel tidak menunggu unit menempuh perjalanan panjang.",
          "Unit rapi, interior bersih. Seluruh unit matic keluaran terbaru, dirawat dan diservis rutin, dan diperiksa sebelum diserahkan.",
          "Harian, mingguan, sampai bulanan dari armada yang sama, jadi Anda tidak perlu mencari penyedia lain saat kebutuhan berubah.",
          "Harga jelas dari awal. Minta penawaran dulu; angka yang kami sebutkan mengikuti katalog di halaman ini.",
        ],
      },
      {
        judul: "Sewa Mobil Tangsel Bulanan untuk Operasional Kantor",
        isi: "Butuh mobil sebulan? Sewa mobil bulanan Tangerang Selatan tersedia untuk seluruh unit, dengan tarif per hari yang lebih hemat dibanding harian. Skema ini paling banyak dipakai untuk mobil operasional kantor, kendaraan karyawan yang ditempatkan beberapa bulan, atau mobil pengganti selama kendaraan Anda diperbaiki. Sewa jangka panjang sampai tahunan juga bisa, lepas kunci maupun dengan supir. Untuk beberapa unit sekaligus, minta penawaran lewat WhatsApp supaya angkanya disusun sesuai kebutuhan perusahaan Anda.",
      },
      {
        judul: "Rental Mobil Tangsel Harian dan Mingguan",
        isi: "Rental mobil Tangsel harian dihitung 24 jam dari waktu pengambilan — cocok untuk menjemput tamu, kondangan, atau perjalanan sehari ke luar kota. Sewa mobil Tangsel mingguan pas untuk liburan keluarga atau proyek singkat, dan sewa mobil lepas kunci Tangsel secara mingguan juga bisa. Untuk bawa klien, pilih sedan Mercedes-Benz, BMW, atau Alphard yang interiornya bersih dan rapi, jadi Anda tidak perlu khawatir soal kesan pertama. Untuk keluarga, MPV tujuh penumpang seperti Innova Reborn dan Innova Zenix paling sering dipilih.",
      },
      {
        judul: "Sewa Mobil Tangsel Lepas Kunci atau Dengan Supir",
        isi: "Rental mobil Tangsel lepas kunci cukup dengan KTP yang masih berlaku dan SIM aktif — tanpa kartu kredit dan tanpa jaminan BPKB, jadi syaratnya jelas sejak awal. Pilih sewa mobil Tangerang Selatan lepas kunci kalau Anda ingin menyetir sendiri setiap hari, atau dengan supir untuk agenda kantor yang berpindah lokasi. Biaya supir dihitung terpisah dari tarif unit, sedangkan bahan bakar dan tol ditanggung penyewa.",
        tautan: { to: "/artikel/syarat-sewa-mobil-lepas-kunci-tangerang", label: "Baca syarat lengkap sewa lepas kunci" },
      },
      {
        judul: "Rental Mobil Pondok Aren dan Bintaro",
        isi: "Pondok Aren termasuk wilayah Tangsel yang paling dekat dengan garasi kami, dan Bintaro adalah kawasan hunian mapan tempat banyak profesional dan keluarga yang menginginkan unit rapi dan proses cepat. Rental mobil Pondok Aren dan sewa mobil di seluruh sektor Bintaro kami bahas lebih rinci — termasuk antar ke Sektor 9 dan Graha Raya — di halaman khusus Bintaro.",
        tautan: { to: "/sewa-mobil-bintaro", label: "Sewa mobil Bintaro lepas kunci" },
      },
      {
        judul: "Sewa Mobil BSD, Serpong, dan Alam Sutera",
        isi: "Di kawasan BSD, kebutuhan sewa banyak datang dari tamu kantor, meeting, keluarga muda, dan karyawan yang butuh mobil untuk beberapa bulan. Untuk BSD City, Gading Serpong, dan Alam Sutera kami menyiapkan halaman tersendiri yang membahas sewa harian untuk tamu kantor, sewa bulanan untuk karyawan, serta antar sampai depan cluster.",
        tautan: { to: "/sewa-mobil-bsd-serpong", label: "Sewa mobil BSD lepas kunci" },
      },
      {
        judul: "Area Rental Mobil di Tangsel",
        isi: "Kami melayani rental mobil di Tangsel untuk Serpong, Serpong Utara, Setu, Pondok Aren, Bintaro, dan BSD, beserta permukiman di sekitarnya. Untuk sewa mobil di Tangsel, unit bisa diantar ke rumah, kantor, atau titik temu yang Anda pilih, atau diambil sendiri di garasi Ciledug tanpa biaya antar. Ongkos antar mengikuti jarak dari garasi, alamat yang dekat bahkan gratis, dan selalu disebutkan sebelum pemesanan dikunci.",
      },
      {
        judul: "Cara Sewa Mobil di Tangerang Selatan",
        isi: "Minta penawaran sekarang, semua langkahnya lewat WhatsApp.",
        poin: [
          "Cek kategori dan harganya di halaman ini.",
          "Chat WhatsApp dengan menyebutkan unit, tanggal mulai, lama sewa (harian, mingguan, atau bulanan), serta lepas kunci atau dengan supir.",
          "Kirim alamat serah terima di Tangerang Selatan, atau pilih ambil sendiri di garasi Ciledug.",
          "Kami kirim penawaran dan konfirmasi ketersediaan sebelum tanggal Anda dikunci.",
        ],
      },
    ],
    faq: [
      {
        tanya: "Wilayah mana saja yang dilayani rental mobil Tangerang Selatan 287 Trans?",
        jawab: "Serpong, Serpong Utara, Setu, Pondok Aren, Bintaro, dan BSD, beserta permukiman di sekitarnya. Kalau alamat Anda tidak disebut di sini, kirim lokasinya lewat WhatsApp dan tim kami akan memastikannya.",
      },
      {
        tanya: "Ada sewa mobil bulanan di Tangerang Selatan untuk operasional kantor?",
        jawab: "Ada. Sewa bulanan tersedia untuk seluruh unit dengan tarif per hari yang lebih hemat dibanding harian, lepas kunci maupun dengan supir. Untuk beberapa unit atau kontrak jangka panjang, minta penawaran lewat WhatsApp.",
      },
      {
        tanya: "Apa syarat sewa mobil lepas kunci Tangerang Selatan?",
        jawab: "KTP yang masih berlaku dan SIM aktif sesuai golongan kendaraan. Tidak ada syarat kartu kredit, jaminan BPKB, atau pendaftaran akun.",
      },
      {
        tanya: "Bisa sewa mobil Tangsel harian atau mingguan?",
        jawab: "Bisa. Sewa harian dihitung 24 jam dari waktu pengambilan, dan skema mingguan tersedia untuk liburan atau proyek singkat.",
      },
      {
        tanya: "Bisa sewa mobil dengan supir di Tangsel?",
        jawab: "Bisa. Seluruh unit tersedia dengan supir, baik untuk agenda kantor seharian, bawa klien, penjemputan bandara, maupun acara keluarga. Biaya supir disebutkan terpisah dari tarif unit sejak awal.",
      },
      {
        tanya: "Apakah bensin dan tol sudah termasuk harga sewa?",
        jawab: "Belum. Bahan bakar dan tol selama pemakaian ditanggung penyewa. Biaya di luar tarif unit — supir dan ongkos antar kalau ada — selalu kami sebutkan di awal.",
      },
    ],
  },

  // Tujuan iklan ad group "Tangerang Kota" dan penerus beranda untuk kata
  // kunci "rental mobil tangerang" (lihat komentar entrinya di ../daerah.js).
  // Menaut ke halaman Ciledug dan Cipondoh, dua kecamatan Kota Tangerang
  // yang punya halaman sendiri, supaya tidak saling berebut kata kunci.
  "rental-mobil-tangerang": {
    intro: "Rental mobil Tangerang di 287 Trans berangkat dari garasi kami sendiri di Ciledug, Kota Tangerang — bukan unit titipan yang didatangkan dari kota lain. Armadanya premium dan terawat: MPV keluarga seperti Innova Reborn dan Innova Zenix, SUV seperti Fortuner dan Pajero Sport, sampai Alphard dan sedan Mercedes-Benz untuk acara penting. Semua bertransmisi matic, bisa disewa lepas kunci atau dengan supir, dan harganya tercantum di halaman ini supaya Anda tidak perlu menebak sebelum bertanya.",
    bagian: [
      {
        judul: "Kenapa Rental Mobil di Tangerang Lewat 287 Trans",
        isi: "Empat hal yang paling sering jadi alasan penyewa di Tangerang memilih kami.",
        poin: [
          "Garasi di Kota Tangerang. Unit berangkat dari Ciledug, jadi serah terima di Tangerang tidak menunggu mobil menembus macet dari kota lain, dan Anda bisa datang melihat unitnya lebih dulu.",
          "Unit terawat, interior bersih. Seluruh armada dirawat rutin dan diperiksa sebelum diserahkan, siap jalan begitu kunci diterima.",
          "Syarat lepas kunci ringkas: KTP yang masih berlaku dan SIM aktif, tanpa kartu kredit, tanpa jaminan BPKB, tanpa membuat akun.",
          "Harga jelas dari awal. Angka di halaman ini diambil dari katalog, dan biaya di luar tarif unit selalu disebutkan sebelum pemesanan dikunci.",
        ],
      },
      {
        judul: "Sewa Mobil Tangerang Lepas Kunci atau Dengan Supir",
        isi: "Sewa mobil Tangerang lepas kunci cocok kalau Anda terbiasa menyetir sendiri dan jadwalnya berubah-ubah: liburan keluarga, mudik, atau keperluan harian selama beberapa hari. Sewa mobil Tangerang dengan supir lebih pas untuk menjemput tamu, acara keluarga, atau agenda kerja yang berpindah lokasi seharian — Anda tinggal duduk, rute dan parkir jadi urusan supir. Keduanya tersedia untuk unit yang sama. Biaya supir dihitung terpisah dari tarif unit dan disebutkan sejak awal, sedangkan bahan bakar dan tol selama pemakaian ditanggung penyewa.",
        tautan: { to: "/sewa-mobil-lepas-kunci-tangerang", label: "Sewa mobil lepas kunci Tangerang" },
      },
      {
        judul: "Sewa Mobil Harian dan Bulanan di Tangerang",
        isi: "Sewa mobil harian Tangerang dihitung 24 jam dari waktu pengambilan, tanpa minimum hari. Untuk liburan panjang ada skema mingguan. Sewa mobil bulanan Tangerang tersedia untuk seluruh unit dengan tarif per hari yang lebih hemat dibanding harian, dan paling banyak diambil untuk kendaraan operasional perusahaan, mobil pengganti selama kendaraan Anda di bengkel, atau pemakaian pribadi jangka panjang. Sebutkan unit dan lama sewa saat chat supaya kami bisa langsung memberi angkanya.",
        tautan: { to: "/artikel/sewa-mobil-bulanan-tangerang", label: "Panduan sewa mobil bulanan Tangerang" },
      },
      {
        judul: "Pilihan Armada: dari Innova sampai Alphard",
        isi: "Untuk keluarga dan perjalanan luar kota, MPV tujuh penumpang seperti Innova Reborn diesel dan Innova Zenix hybrid jadi pilihan pertama. Fortuner dan Pajero Sport dipilih untuk rute yang menuntut postur lebih tinggi. Untuk pernikahan, tamu perusahaan, dan acara formal ada Alphard serta sedan Mercedes-Benz dan BMW, dan untuk yang ingin mencoba mobil listrik tersedia beberapa pilihan. Daftar lengkap beserta tarif per harinya ada di halaman harga.",
        tautan: { to: "/harga-sewa-mobil-tangerang", label: "Daftar harga sewa mobil Tangerang" },
      },
      {
        judul: "Rental Mobil Kota Tangerang: Area yang Kami Layani",
        isi: "Kami melayani rental mobil Kota Tangerang di seluruh kecamatannya: Ciledug, Karang Tengah, dan Larangan yang paling dekat dengan garasi, lalu Cipondoh, Pinang, Karawaci, Cikokol, dan kecamatan lainnya. Sewa mobil Tangerang Kota untuk penjemputan dan pengantaran ke Bandara Soekarno-Hatta juga rutin kami tangani. Unit bisa diantar ke rumah, kantor, atau hotel Anda, atau diambil sendiri di garasi Ciledug tanpa biaya antar. Alamat yang dekat dengan garasi diantar tanpa ongkos kirim; untuk alamat yang lebih jauh, ongkos antar dihitung sesuai jarak dan disebutkan sebelum pemesanan dikunci.",
        tautan: [{ to: "/rental-mobil-ciledug", label: "Rental mobil Ciledug" }, { to: "/rental-mobil-cipondoh", label: "Rental mobil Cipondoh" }],
      },
      {
        judul: "Cara Sewa Mobil di Tangerang",
        isi: "Empat langkah, semuanya bisa lewat WhatsApp.",
        poin: [
          "Lihat kategori dan harga di halaman ini, lalu pilih unit sesuai jumlah penumpang dan keperluan Anda.",
          "Chat WhatsApp dengan menyebutkan unit, tanggal mulai, lama sewa, serta lepas kunci atau dengan supir.",
          "Kirim alamat serah terima di Tangerang, atau beri tahu kami kalau Anda ingin mengambil sendiri di garasi Ciledug.",
          "Tim kami mengonfirmasi ketersediaan dan total biayanya sebelum tanggal Anda dikunci.",
        ],
      },
    ],
    faq: [
      {
        tanya: "Di mana lokasi rental mobil Tangerang 287 Trans?",
        jawab: "Garasi dan kantor kami ada di Jl. Lembang Baru II, Ciledug, Kota Tangerang. Unit bisa diambil di sana tanpa biaya antar, atau diantar ke alamat Anda. Kabari kami lewat WhatsApp sebelum datang supaya unitnya sudah disiapkan.",
      },
      {
        tanya: "Apa syarat sewa mobil di Tangerang lepas kunci?",
        jawab: "KTP yang masih berlaku dan SIM aktif sesuai golongan kendaraan. Tidak ada syarat kartu kredit, jaminan BPKB, atau pendaftaran akun.",
      },
      {
        tanya: "Bisa rental mobil di Tangerang dengan supir?",
        jawab: "Bisa. Seluruh unit tersedia dengan supir, untuk agenda kerja seharian, penjemputan tamu, maupun acara keluarga. Biaya supir dihitung terpisah dari tarif unit dan disebutkan sejak awal.",
      },
      {
        tanya: "Ada sewa mobil bulanan di Tangerang?",
        jawab: "Ada, untuk seluruh unit, dengan tarif per hari yang lebih hemat dibanding sewa harian. Skema mingguan dan tahunan juga tersedia. Sebutkan unit dan lama sewa saat chat supaya kami bisa langsung memberi angkanya.",
      },
      {
        tanya: "Bisa jemput atau antar ke Bandara Soekarno-Hatta?",
        jawab: "Bisa, lepas kunci maupun dengan supir. Untuk penjemputan, sebutkan nomor penerbangan dan jam tiba saat memesan supaya penyesuaian bisa dilakukan kalau jadwalnya berubah.",
      },
      {
        tanya: "Apakah antar unit di Tangerang gratis?",
        jawab: "Gratis untuk alamat yang dekat dengan garasi kami di Ciledug. Untuk alamat yang lebih jauh, ongkos antar dihitung sesuai jarak. Kirim alamat lengkap atau share location lewat WhatsApp, dan kami pastikan sebelum Anda memesan.",
      },
    ],
  },
};
