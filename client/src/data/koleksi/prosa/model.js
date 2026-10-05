// Prosa panjang halaman model — pengantar, bagian artikel, dan tanya-jawab.
//
// Dipisahkan dari model.js, yang tinggal memuat metadata (slug, label,
// judul, pencocokan unit). Alasannya berat, bukan rapi: teks di berkas ini
// 88% dari seluruh data koleksi, dan karena metadata-nya dibutuhkan navbar,
// footer, dan daftar route, SELURUHNYA ikut masuk bundel utama — terkirim ke
// pembaca beranda dan katalog yang tidak akan pernah membukanya. Terukur
// 45 KB mentah (~7 KB terkompresi) untuk dua belas halaman yang dibaca satu
// per kunjungan.
//
// Berkas ini SENGAJA hanya diimpor secara dinamis (lihat muatProsa() di
// koleksiArmada.js), supaya Vite memisahkannya jadi chunk tersendiri dan
// bundel utama tidak lagi membawanya. Jangan mengimpornya secara statis dari
// mana pun — satu import statis saja akan menariknya kembali ke bundel utama
// dan diam-diam membatalkan seluruh pemisahan ini.
//
// Pengunjung dari iklan tidak menunggu chunk ini: halaman koleksi sudah
// diprerender, jadi prosanya ikut terpanggang ke HTML statis sekaligus ke
// <script id="__PRERENDER_DATA__"> — KoleksiArmada.jsx membacanya dari sana
// dan melewati unduhan ini sepenuhnya. Yang mengunduhnya hanya perpindahan
// halaman di dalam situs, yang memang tidak punya HTML statis untuk dibaca.

export const PROSA_MODEL = {
  "sewa-innova-zenix-tangerang": {
    intro: "Toyota Innova Zenix adalah generasi terbaru Innova yang pindah ke basis monokok, dan perbedaannya paling terasa di kabin: peredaman lebih rapat dan bantingan lebih halus dibanding generasi sebelumnya, terutama di jalan kota yang tambalannya banyak. Untuk perjalanan keluarga atau antar-jemput tamu perusahaan di Tangerang dan Jabodetabek, Zenix jadi titik tengah yang masuk akal — ruang tiga barisnya tetap Innova, tapi kenyamanannya sudah mendekati kelas di atasnya. Kami menyediakan empat varian sekaligus, jadi Anda tidak perlu berkompromi antara harga dan fitur.",
    bagian: [
      {
        judul: "Beda Varian Zenix: Type-G, Type-V, dan Type-Q",
        isi: "Type-G adalah varian awal dan tersedia dalam dua pilihan: bensin biasa dan hybrid. Keduanya sudah matic dengan kapasitas 7 penumpang, bedanya ada di konsumsi bahan bakar — versi hybrid jauh lebih irit kalau rute Anda banyak berhenti-jalan di dalam kota. Type-V HEV menambah kelengkapan interior dan fitur berkendara, cocok kalau penumpang belakang adalah tamu yang perlu dijamu. Type-Q HEV adalah varian tertinggi dengan kursi kapten di baris kedua, pilihan yang paling sering diambil untuk penjemputan tamu penting atau perjalanan luar kota yang panjang."
      },
      {
        judul: "Hybrid: Kapan Selisih Harganya Terbayar",
        isi: "Varian hybrid dipatok sedikit lebih tinggi per harinya dibanding versi bensin, dan itu wajar ditanyakan. Patokan sederhananya begini: kalau perjalanan Anda didominasi macet dan rute dalam kota, sistem hybrid bekerja paling sering dan selisih harga sewanya biasanya tertutup oleh hemat bahan bakar dalam beberapa hari pemakaian. Kalau rutenya tol jarak jauh dengan kecepatan stabil, bedanya jadi lebih tipis dan varian bensin sudah cukup. Kalau ragu, sebutkan saja rencana rute Anda saat chat — tim kami biasa membantu hitungan kasarnya sebelum Anda memutuskan.",
        tautan: { to: "/artikel/sewa-mobil-mudik-dari-tangerang", label: "Panduan sewa mobil untuk mudik dari Tangerang" },
      },
      {
        judul: "Lepas Kunci atau Plus Sopir",
        isi: "Semua tipe Zenix bisa disewa lepas kunci maupun dengan sopir. Untuk lepas kunci syaratnya cukup KTP yang masih berlaku dan nomor HP aktif — tanpa kartu kredit, tanpa jaminan BPKB, tanpa perlu membuat akun. Kalau Anda memilih plus sopir, biayanya dihitung terpisah dari tarif unit dan akan kami sebutkan di awal, bukan di akhir. Opsi sopir banyak dipilih untuk penjemputan bandara dan agenda kerja yang lokasinya berpindah seharian, karena Anda tidak perlu memikirkan parkir dan rute."
      }
    ],
    faq: [
      {
        tanya: "Innova Zenix muat berapa orang dan berapa koper?",
        jawab: "Seluruh tipe Zenix kami berkapasitas 7 penumpang. Dengan baris ketiga terpakai penuh, ruang bagasi cukup untuk sekitar dua koper kabin. Kalau Anda butuh 7 kursi sekaligus bagasi besar, baris ketiga bisa dilipat sebagian atau kami sarankan menambah unit."
      },
      {
        tanya: "Bisa sewa Zenix harian saja atau harus mingguan?",
        jawab: "Bisa harian, tanpa minimum durasi. Sewa mingguan dan bulanan juga tersedia dengan tarif yang lebih hemat per harinya — sebutkan lama sewa Anda saat chat supaya kami bisa langsung memberi angkanya."
      },
      {
        tanya: "Apakah harga sudah termasuk bensin dan tol?",
        jawab: "Belum. Tarif yang tertera adalah tarif unit per hari. Bahan bakar dan tol selama masa sewa ditanggung penyewa, sehingga Anda bisa menghitung sendiri total perjalanan sesuai rute. Biaya sopir juga dihitung terpisah."
      },
      {
        tanya: "Varian Zenix mana yang kursi baris keduanya terpisah?",
        jawab: "Type-Q HEV. Varian ini memakai kursi kapten terpisah dengan sandaran yang bisa direbahkan, sementara varian di bawahnya memakai bangku menyatu. Untuk penjemputan tamu penting atau perjalanan luar kota yang panjang, perbedaan itu terasa sepanjang jalan — bukan sekadar tambahan di daftar fitur."
      },
      {
        tanya: "Zenix bisa dipakai antar-jemput bandara?",
        jawab: "Bisa, dan ini salah satu pemakaian Zenix yang paling sering. Kabin monokoknya lebih senyap dibanding Innova generasi sebelumnya, jadi penumpang yang baru turun dari penerbangan panjang lebih nyaman. Untuk penjemputan, sebutkan nomor penerbangan dan jam tiba saat memesan supaya jadwalnya bisa disesuaikan kalau pesawat bergeser."
      }
    ]
  },
  "sewa-innova-reborn-tangerang": {
    intro: "Innova Reborn adalah generasi Innova bermesin diesel dengan sasis ladder frame, dan sampai sekarang masih jadi pilihan paling banyak dicari untuk perjalanan jarak jauh. Alasannya praktis: mesin dieselnya irit di kecepatan tol yang stabil, dayanya kuat saat mobil terisi penuh penumpang dan barang, dan bengkelnya ada di mana-mana kalau terjadi apa-apa di tengah rute luar kota. Di 287 Trans, Reborn juga jadi titik masuk ke armada kami — dua tipe Type-V dan Type-G keluaran 2024, keduanya matic, dipatok di harga yang sama.",
    bagian: [
      {
        judul: "Kenapa Reborn Masih Banyak Dipilih Dibanding Zenix",
        isi: "Zenix lebih halus di jalan kota, itu tidak terbantahkan. Tapi Reborn punya dua hal yang membuatnya tetap relevan: mesin diesel yang torsinya besar di putaran rendah, dan ground clearance yang lebih tinggi. Kalau perjalanan Anda melibatkan rute luar kota dengan jalan yang tidak selalu mulus, mobil terisi tujuh orang plus bagasi penuh, atau tanjakan panjang, Reborn terasa lebih santai membawanya. Ditambah tarifnya yang paling rendah di armada kami, ini jadi pilihan yang sulit dikalahkan untuk perjalanan rombongan yang mengejar nilai."
      },
      {
        judul: "Type-V dan Type-G: Bedanya Apa",
        isi: "Kedua tipe kami sama-sama diesel, matic, 7 penumpang, dan keluaran 2024 — dan kami patok di harga yang sama persis. Bedanya ada di kelengkapan interior: Type-V berada satu tingkat di atas Type-G dalam hal fitur kenyamanan dan trim kabin. Karena tarifnya sama, biasanya kami tawarkan Type-V lebih dulu selama unitnya kosong di tanggal yang Anda minta. Sebutkan tanggal Anda saat chat dan kami cek ketersediaan keduanya sekaligus."
      },
      {
        judul: "Cocok untuk Perjalanan Seperti Apa",
        isi: "Reborn paling sering disewa untuk mudik dan perjalanan antarkota, liburan keluarga besar, serta antar-jemput rombongan ke Bandara Soekarno-Hatta. Untuk keperluan kerja harian di dalam kota Tangerang, Reborn juga masuk akal kalau Anda mengutamakan biaya operasional yang rendah dan tidak keberatan dengan karakter mesin diesel yang sedikit lebih terdengar dibanding mesin bensin. Kalau prioritas Anda adalah kabin sesenyap mungkin untuk menjamu tamu, Zenix hybrid atau kelas di atasnya lebih pas.",
        tautan: { to: "/artikel/sewa-mobil-mudik-dari-tangerang", label: "Panduan sewa mobil untuk mudik dari Tangerang" },
      }
    ],
    faq: [
      {
        tanya: "Innova Reborn pakai solar biasa atau Dexlite?",
        jawab: "Kami menyarankan Dexlite atau setara untuk menjaga performa mesin diesel modern. Tim kami akan menyebutkan kondisi bahan bakar saat serah terima, dan unit dikembalikan pada level yang sama seperti saat diterima."
      },
      {
        tanya: "Apakah Reborn boleh dibawa keluar kota?",
        jawab: "Boleh. Perjalanan luar kota justru salah satu kekuatan unit ini. Sebutkan tujuan dan lama perjalanan saat pemesanan supaya kami bisa menyiapkan unit dan menginformasikan ketentuan yang berlaku untuk rute jarak jauh."
      },
      {
        tanya: "Kenapa tarif Reborn di bawah Zenix?",
        jawab: "Zenix adalah generasi yang lebih baru dengan basis monokok dan pilihan hybrid, sehingga nilai unitnya lebih tinggi. Selisih tarif itu murni mengikuti nilai unit, bukan karena kondisi Reborn kami kurang terawat — seluruh armada melewati pemeriksaan rutin yang sama sebelum disewakan."
      },
      {
        tanya: "Reborn cocok untuk mudik dan perjalanan Lebaran?",
        jawab: "Sangat cocok, dan memang itu periode tersibuk unit ini. Mesin diesel dengan sasis ladder frame membuatnya kuat membawa tujuh penumpang beserta bagasi penuh di rute panjang, sementara konsumsi solarnya lebih ekonomis dibanding MPV bensin sekelas. Karena permintaannya menumpuk di tanggal yang sama, kunci tanggal Anda jauh sebelum musimnya tiba."
      },
      {
        tanya: "Ada berapa varian Reborn yang tersedia?",
        jawab: "Dua, keduanya keluaran 2024, matic, dan berkapasitas tujuh penumpang. Type-G adalah varian dasar dengan kelengkapan secukupnya. Type-V menambah kualitas pelapis jok, kelengkapan dasbor, dan peredaman kabin yang lebih rapat. Mesin dan sasisnya sama persis, jadi pilihannya murni soal kenyamanan penumpang, bukan kemampuan jalan."
      }
    ]
  },
  "sewa-fortuner-tangerang": {
    intro: "Toyota Fortuner adalah SUV ladder frame yang postur dan ground clearance-nya langsung terasa begitu Anda duduk di belakang kemudi. Untuk kebutuhan di Tangerang dan sekitarnya, dua hal yang membuatnya banyak dicari: pandangan ke depan yang tinggi sehingga lebih nyaman di jalan padat, dan kemampuannya melewati genangan atau jalan rusak yang bikin sedan dan MPV rendah harus memutar. Ditambah kesan tegas yang cocok untuk keperluan formal, Fortuner sering dipilih baik untuk perjalanan keluarga maupun keperluan perusahaan.",
    bagian: [
      {
        judul: "2.8 GR atau Legender: Mana yang Sesuai",
        isi: "Fortuner 2.8 GR kami bermesin diesel dengan tampilan bergaya GR Sport yang lebih sporty dan agresif. Karakter dieselnya membuat unit ini terasa paling bertenaga saat membawa beban penuh dan menghadapi tanjakan panjang, dan lebih hemat untuk rute tol jarak jauh. Fortuner Legender adalah keluaran 2025 dengan tampilan depan yang lebih mewah dan halus, pilihan yang lebih pas kalau unit dipakai untuk menjemput tamu atau menghadiri acara resmi. Selisih tarif keduanya tipis, jadi biasanya keputusannya jatuh ke selera tampilan dan jenis rute.",
        tautan: { to: "/artikel/sewa-mobil-mudik-dari-tangerang", label: "Panduan sewa mobil untuk mudik dari Tangerang" },
      },
      {
        judul: "Fortuner untuk Keperluan Perusahaan",
        isi: "Sebagian besar permintaan Fortuner yang masuk ke kami datang dari kebutuhan kerja: menjemput tamu dari luar kota, kunjungan ke lokasi proyek yang aksesnya belum mulus, atau kendaraan operasional selama beberapa minggu. Untuk kebutuhan seperti ini, sewa mingguan dan bulanan tersedia dengan tarif harian yang lebih rendah, dan penagihan bisa disesuaikan dengan siklus administrasi Anda. Sebutkan durasi dan pola pemakaian saat chat, supaya kami bisa memberi angka yang tepat sejak awal alih-alih perkiraan kasar."
      },
      {
        judul: "Syarat dan Proses Sewa",
        isi: "Untuk lepas kunci, syaratnya cukup KTP yang masih berlaku atas nama pemesan dan nomor HP aktif untuk konfirmasi. Tidak ada kartu kredit, tidak ada jaminan BPKB, dan tidak perlu membuat akun. Kalau Anda memilih dengan sopir, biaya sopir dihitung terpisah dan kami sebutkan di muka. Saat serah terima, kondisi unit diperiksa bersama — bahan bakar, ban, kaca, dan kelengkapan surat — supaya tidak ada perbedaan pemahaman saat pengembalian."
      }
    ],
    faq: [
      {
        tanya: "Fortuner muat berapa orang?",
        jawab: "Tujuh penumpang, dengan baris ketiga yang bisa dilipat kalau Anda butuh ruang bagasi lebih besar. Untuk rombongan tujuh orang dengan koper besar, kami biasanya menyarankan mempertimbangkan penambahan unit."
      },
      {
        tanya: "Apakah Fortuner tersedia lepas kunci?",
        jawab: "Tersedia. Fortuner bisa disewa lepas kunci maupun dengan sopir. Untuk lepas kunci, pastikan SIM A Anda masih berlaku selama masa sewa karena akan dicek saat serah terima."
      },
      {
        tanya: "Berapa lama minimal sewa Fortuner?",
        jawab: "Satu hari, tanpa minimum durasi khusus. Untuk pemakaian mingguan dan bulanan, tarif per harinya turun — sebutkan lama sewa saat chat supaya kami bisa langsung menghitungnya."
      },
      {
        tanya: "Untuk pemakaian harian di dalam kota, 2.8 GR atau Legender?",
        jawab: "Legender, karena unit kami bermesin bensin — lebih halus dan lebih senyap saat merayap di kemacetan dibanding varian diesel. Pilih 2.8 GR kalau rute Anda lebih banyak di luar kota atau kerap membawa muatan penuh, karena di situ torsi diesel di putaran rendah yang bekerja."
      },
      {
        tanya: "Bisa disewa bulanan untuk kebutuhan perusahaan?",
        jawab: "Bisa, dan sebagian besar permintaan Fortuner yang masuk ke kami memang datang dari kebutuhan kerja: menjemput tamu, kunjungan ke lokasi proyek, dan kendaraan operasional. Tersedia skema mingguan sampai tahunan, lepas kunci maupun plus sopir. Sebutkan lama pemakaian dan jumlah unit saat menghubungi kami."
      }
    ]
  },
  "sewa-pajero-sport-tangerang": {
    intro: "Pajero Sport Dakar adalah lawan langsung Fortuner di kelas SUV ladder frame, dan pemiliknya biasanya memilih berdasarkan karakter yang cukup berbeda. Pajero dikenal dengan peredaman kabin yang lebih rapat dan suspensi yang terasa lebih lembut menyerap jalan rusak, sementara tampilan depannya yang besar dan tegas membuatnya menonjol di jalan. Untuk perjalanan panjang bersama keluarga di mana kenyamanan penumpang lebih diutamakan daripada karakter berkendara yang sporty, unit ini sering jadi jawaban.",
    bagian: [
      {
        judul: "Pajero Sport atau Fortuner",
        isi: "Keduanya kami patok di tarif yang sama persis, jadi harga bukan pembedanya. Yang membedakan adalah rasa berkendara. Pajero Sport cenderung lebih lembut dan senyap, membuat penumpang baris kedua dan ketiga lebih betah di perjalanan berjam-jam. Fortuner terasa lebih padat dan tegas, yang oleh sebagian pengemudi dianggap lebih mantap dikendalikan di kecepatan tinggi. Kalau Anda menyewa untuk membawa keluarga jarak jauh, Pajero biasanya lebih disukai penumpang. Kalau Anda sendiri yang akan menyetir sebagian besar waktu dan menyukai bobot kemudi yang lebih terasa, Fortuner lebih pas."
      },
      {
        judul: "Mesin Diesel untuk Rute Jauh",
        isi: "Unit ini bermesin diesel dengan transmisi matic. Torsi besar di putaran rendah membuatnya tidak kewalahan saat kabin terisi tujuh orang dan bagasi penuh, termasuk di tanjakan panjang menuju kawasan pegunungan. Untuk rute tol jarak jauh, konsumsi bahan bakarnya juga lebih bersahabat dibanding SUV bensin di kelas yang sama. Kami sarankan mengisi dengan Dexlite atau setara untuk menjaga performa mesin.",
        tautan: { to: "/artikel/sewa-mobil-mudik-dari-tangerang", label: "Panduan sewa mobil untuk mudik dari Tangerang" },
      },
      {
        judul: "Ketersediaan Tipe Ini",
        isi: "Pajero Sport Dakar di armada kami saat ini hanya tersedia dalam satu tipe, sehingga tanggal ramai seperti akhir pekan panjang dan musim liburan biasanya terisi lebih awal. Kalau Anda sudah punya tanggal pasti, sebaiknya konfirmasi ketersediaannya lebih dulu lewat WhatsApp sebelum mengunci rencana perjalanan. Kalau unitnya sudah terpakai di tanggal Anda, tim kami akan langsung menawarkan alternatif terdekat dari kelas SUV yang sama."
      }
    ],
    faq: [
      {
        tanya: "Pajero Sport ini varian apa?",
        jawab: "Varian Dakar keluaran 2024, bermesin diesel dengan transmisi matic dan kapasitas 7 penumpang. Foto yang ditampilkan di halaman ini adalah foto unit sebenarnya, bukan foto ilustrasi."
      },
      {
        tanya: "Bisa disewa tanpa sopir?",
        jawab: "Bisa. Syaratnya KTP yang masih berlaku dan SIM A aktif selama masa sewa. Kalau Anda lebih memilih dengan sopir, biayanya dihitung terpisah dari tarif unit dan kami sebutkan di awal."
      },
      {
        tanya: "Apakah tarifnya berubah untuk sewa lebih dari seminggu?",
        jawab: "Ya, tarif per hari turun untuk sewa mingguan dan bulanan. Sebutkan tanggal mulai dan lama sewa saat chat supaya kami bisa langsung memberikan angka totalnya."
      },
      {
        tanya: "Kuat untuk jalan yang permukaannya belum mulus?",
        jawab: "Kuat. Sasis ladder frame dan jarak ke tanah yang tinggi memang dirancang untuk itu, jadi akses ke lokasi proyek, jalan desa, atau rute daerah yang aspalnya rusak bukan masalah. Peredamannya juga terasa lebih lembut untuk penumpang belakang dibanding sebagian SUV sekelas, yang membuat rute panjang lebih tidak melelahkan."
      },
      {
        tanya: "Bagaimana memastikan ketersediaan untuk tanggal tertentu?",
        jawab: "Kalender di halaman unit menandai merah tanggal yang sudah dipesan pelanggan lain, jadi Anda bisa memeriksanya sendiri lebih dulu. Untuk libur panjang dan musim mudik, unit diesel tujuh penumpang seperti ini termasuk yang paling cepat penuh — mengunci tanggal lebih awal jauh lebih aman daripada menunggu."
      }
    ]
  },

  // --- Sedan mewah -------------------------------------------------------
  // Aturan yang sama dengan detailMobil.js: klaim layanan hanya yang sudah
  // berlaku di situs (kelas mewah punya ketentuan sewa tersendiri yang
  // dijelaskan di awal), tanpa angka spesifikasi atau angka harga.

  "sewa-mercy-e300-tangerang": {
    intro: "Mercy E300 — Mercedes-Benz E-Class, kelas sedan eksekutif yang sejak lama jadi pilihan direksi dan tamu kehormatan — adalah unit yang paling sering kami siapkan untuk penumpang yang duduk di kursi belakang. Unit E300 kami keluaran 2024, bensin, matic, dan berkapasitas lima penumpang. Dibanding C300, bodinya lebih panjang dan ruang kaki baris keduanya terasa jauh lebih lega, sehingga tamu bisa duduk santai sepanjang perjalanan dari bandara, hotel, atau lokasi acara di Tangerang dan Jakarta.",
    bagian: [
      {
        judul: "Paling Pas untuk Penumpang di Kursi Belakang",
        isi: "Sedan eksekutif dirancang dari sudut pandang penumpang belakang: kabin yang senyap, bantingan yang tenang, dan ruang yang cukup untuk bekerja atau beristirahat. Karena itu E300 paling sering disewa dengan sopir — untuk menjemput relasi bisnis, mengantar direksi di antara beberapa agenda dalam sehari, atau menyambut tamu dari luar kota. Sopir yang mengurus rute dan parkir, Anda dan tamu tinggal fokus pada pertemuan.",
        tautan: { to: "/artikel/sewa-mobil-antar-jemput-bandara-soekarno-hatta", label: "Panduan antar jemput Bandara Soekarno-Hatta" }
      },
      {
        judul: "Mercy untuk Pernikahan",
        isi: "Sedan Mercedes-Benz hitam sudah lama jadi gambaran mobil pengantin yang elegan, dan E300 menambah kenyamanan untuk pengantin yang memakai gaun atau kain panjang karena pintu dan kabin belakangnya lega. Untuk hari H, tanggal pernikahan populer biasanya menumpuk di akhir pekan yang sama, jadi sebaiknya unit dikonfirmasi begitu tanggal acara pasti. Sampaikan juga rencana dekorasi bunga atau pita supaya bisa dipastikan lebih dulu.",
        tautan: { to: "/artikel/sewa-mobil-pengantin-tangerang", label: "Panduan memilih mobil pengantin di Tangerang" }
      },
      {
        judul: "E300 atau C300",
        isi: "Keduanya kami patok di tarif yang sama, jadi pilihannya soal ukuran dan siapa yang duduk di mana. Kalau penumpang utamanya duduk di belakang dengan sopir, E300 lebih tepat. Kalau Anda menyetir sendiri dan banyak keluar-masuk basement gedung di pusat kota, C300 yang lebih ringkas biasanya lebih praktis.",
        tautan: { to: "/sewa-mercy-c300-tangerang", label: "Lihat Mercy C300" }
      },
      {
        judul: "Ketentuan Sewa Kelas Mewah",
        isi: "Karena nilai unitnya di atas rata-rata armada, kami mengonfirmasi lebih rinci di awal: tujuan pemakaian, rute, dan apakah memakai sopir kami. Biaya sopir dan biaya antar (kalau unit diminta datang ke alamat Anda) disebutkan sebelum pemesanan dikunci. Mengambil unit sendiri di kantor kami di Ciledug tidak dikenakan biaya."
      }
    ],
    faq: [
      {
        tanya: "Mercy E300 ini keluaran tahun berapa?",
        jawab: "Keluaran 2024, bensin, matic, lima penumpang. Tahun dan foto unit tercantum di kartu unit di atas, dan halaman unitnya memuat kalender ketersediaan."
      },
      {
        tanya: "Apakah bisa sewa Mercy E300 dengan sopir?",
        jawab: "Bisa, dan untuk E300 justru paling sering dengan sopir. Biaya sopir dihitung terpisah dari tarif unit dan kami sebutkan di awal."
      },
      {
        tanya: "Bisa disewa untuk penjemputan tamu dari Jakarta?",
        jawab: "Bisa. Jakarta termasuk area layanan kami. Sebutkan titik penjemputan dan jadwalnya saat chat supaya biaya antar dan waktu serah terimanya bisa langsung dihitung."
      },
      {
        tanya: "Bisa sewa bulanan untuk kendaraan direksi?",
        jawab: "Bisa. Durasi sewa tersedia dari harian sampai bulanan; skema dan ketentuannya dijelaskan tim sesuai kebutuhan perusahaan."
      }
    ]
  },

  "sewa-mercy-c300-tangerang": {
    intro: "Mercy C300 adalah sedan Mercedes-Benz C-Class, dan di armada kami ini sedan mewah yang paling lincah. Unit C300 kami keluaran 2025, bensin, matic, lima penumpang. Dimensinya lebih ringkas dari E300 sehingga lebih mudah bermanuver di jalan padat Tangerang dan Jakarta serta keluar-masuk basement gedung, tanpa kehilangan kesenyapan kabin dan kesan elegan yang membuat orang mencari Mercy sejak awal.",
    bagian: [
      {
        judul: "Sedan Mewah untuk Agenda di Pusat Kota",
        isi: "C300 paling sering dipakai untuk agenda kerja yang berpindah-pindah di dalam kota: rapat di beberapa gedung, menjemput relasi bisnis, atau menghadiri acara yang butuh kesan profesional. Ukurannya membuat parkir di area perkantoran dan pusat perbelanjaan jauh lebih mudah dibanding sedan eksekutif yang lebih panjang, dan unit ini tetap nyaman disetir sendiri."
      },
      {
        judul: "C300 atau BMW 330i",
        isi: "Keduanya sedan mewah seukuran, tapi karakternya berbeda. C300 lebih menonjolkan kesenyapan dan kenyamanan kabin, sedangkan BMW 330i M-Sport lebih terasa sporty saat dikemudikan sendiri. Kalau kesan tenang dan elegan yang dicari, C300 biasanya lebih pas; kalau Anda menikmati menyetir, 330i patut dibandingkan.",
        tautan: { to: "/sewa-bmw-330i-tangerang", label: "Lihat BMW 330i" }
      },
      {
        judul: "C300 atau E300",
        isi: "Tarif keduanya sama di armada kami. Pilih E300 kalau penumpang utama duduk di belakang dengan sopir dan butuh ruang kaki yang lebih lega, misalnya untuk tamu VIP atau penjemputan dari bandara. Pilih C300 kalau Anda sendiri yang menyetir dan rutenya banyak di dalam kota.",
        tautan: { to: "/sewa-mercy-e300-tangerang", label: "Lihat Mercy E300" }
      },
      {
        judul: "Untuk Acara dan Pernikahan",
        isi: "Sedan Mercy tetap jadi pilihan klasik untuk mobil pengantin dan tamu keluarga. Karena unit kelas mewah jumlahnya terbatas dan tanggal populer cepat terisi, konfirmasikan unitnya begitu tanggal acara sudah pasti. Kelas ini punya ketentuan sewa tersendiri yang kami jelaskan di awal, termasuk biaya sopir dan biaya antar bila dipilih.",
        tautan: { to: "/sewa-mobil-mewah-tangerang", label: "Lihat semua sedan mewah" }
      }
    ],
    faq: [
      {
        tanya: "Mercy C300 ini keluaran tahun berapa?",
        jawab: "Keluaran 2025, bensin, matic, lima penumpang. Foto dan kalender ketersediaannya ada di halaman unit."
      },
      {
        tanya: "Bisa disewa lepas kunci?",
        jawab: "Bisa, dengan ketentuan kelas mewah yang dijelaskan sebelum pemesanan dikunci. Kalau tidak ingin menyetir sendiri, unit ini juga tersedia plus sopir."
      },
      {
        tanya: "Apakah tarifnya sudah termasuk sopir?",
        jawab: "Belum. Tarif yang tertera adalah sewa unit. Kalau butuh sopir, sebutkan saat menghubungi kami dan tim akan memberi hitungannya di awal."
      },
      {
        tanya: "Bisa diantar ke alamat saya?",
        jawab: "Bisa. Biaya antar dihitung dari jarak kantor kami di Ciledug dan disebutkan sebelum pemesanan dikunci. Mengambil sendiri di kantor tidak dikenakan biaya."
      },
      {
        tanya: "Bisa sewa Mercy C300 bulanan?",
        jawab: "Bisa. Durasi sewa tersedia dari harian sampai bulanan, dengan tarif per hari yang lebih rendah untuk pemakaian panjang. Sebutkan lama sewa saat chat supaya kami bisa langsung memberi angkanya."
      }
    ]
  },

  "sewa-bmw-m4-competition-tangerang": {
    intro: "BMW M4 Competition Cabriolet adalah unit paling istimewa di armada 287 Trans: sport coupe dari divisi M BMW dengan atap kain yang bisa dibuka, keluaran 2024, bensin, matic, dan berkapasitas dua penumpang. Penyewanya hampir selalu datang dengan satu tujuan yang jelas — momen yang ingin diingat, difoto, atau direkam.",
    bagian: [
      {
        judul: "Untuk Pengantin dan Prewedding",
        isi: "Dengan atap terbuka, M4 Cabriolet memberi bingkai foto yang tidak bisa diberikan sedan biasa: pasangan terlihat jelas dari luar mobil, dan latar langit ikut masuk ke foto. Karena itu unit ini paling sering diminta untuk sesi prewedding dan foto pasangan setelah akad. Untuk rombongan keluarga, pasangkan dengan unit kedua seperti Alphard atau sedan Mercy dari armada kami.",
        tautan: { to: "/artikel/sewa-mobil-pengantin-tangerang", label: "Panduan memilih mobil pengantin di Tangerang" }
      },
      {
        judul: "Konten, Peluncuran Produk, dan Acara Brand",
        isi: "M4 Competition juga sering dipakai sebagai pusat perhatian: pembuatan konten video, peluncuran produk, atau acara brand yang butuh mobil yang langsung dikenali. Sebutkan durasi, lokasi pengambilan gambar, dan apakah unit akan banyak dikendarai atau lebih banyak diam di lokasi, supaya penawaran yang kami berikan sesuai kebutuhan produksi Anda."
      },
      {
        judul: "Yang Perlu Diketahui Sebelum Menyewa",
        isi: "Kapasitasnya dua penumpang, jadi unit ini bukan untuk membawa rombongan. Saat atap dibuka, ruang bagasi berkurang karena atap tersimpan di bagian belakang. Unit ini termasuk kelas mewah dengan ketentuan sewa tersendiri yang dijelaskan di awal, dan karena unitnya terbatas, tanggal akhir pekan dan musim pernikahan sebaiknya dikunci jauh hari.",
        tautan: { to: "/sewa-mobil-mewah-tangerang", label: "Bandingkan dengan sedan mewah lain" }
      },
      {
        judul: "Mengatur Jadwal di Hari H",
        isi: "Untuk pernikahan, jadwal M4 biasanya dibagi antara sesi foto pasangan dan perjalanan pendek antarlokasi, sementara keluarga diangkut unit lain. Sebutkan urutan acara, jam mulai dan selesai, serta lokasi akad, resepsi, dan titik penjemputan saat chat. Dengan sopir kami, Anda tidak perlu memikirkan parkir dan waktu tempuh di sela acara; kalau lebih suka menyetir sendiri untuk sesi foto yang santai, opsi lepas kunci bisa dibahas sesuai ketentuan kelas mewah."
      }
    ],
    faq: [
      {
        tanya: "BMW M4 Competition ini tipe apa?",
        jawab: "BMW M4 Competition Cabriolet keluaran 2024: atap kain yang bisa dibuka, bensin, matic, dua penumpang. Foto dan kalender ketersediaannya ada di halaman unit."
      },
      {
        tanya: "Bisa untuk mobil pengantin?",
        jawab: "Bisa, dan itu salah satu pemakaian yang paling sering. Sebutkan tanggal, lokasi akad atau resepsi, dan apakah butuh sopir, supaya tim bisa mengatur jadwal serah terimanya."
      },
      {
        tanya: "Bisa disewa lepas kunci?",
        jawab: "Bisa, dengan ketentuan kelas mewah yang dijelaskan sebelum pemesanan dikunci. Kalau tidak ingin menyetir sendiri, unit ini juga tersedia plus sopir."
      },
      {
        tanya: "Kenapa tarifnya paling tinggi di armada?",
        jawab: "Karena nilai unitnya memang paling tinggi: sport coupe divisi M dengan atap yang bisa dibuka, dan unitnya terbatas. Tarif per harinya tertera di kartu unit di atas, selalu mengikuti katalog."
      },
      {
        tanya: "Bisa disewa beberapa jam untuk sesi foto?",
        jawab: "Sampaikan durasi dan lokasi sesi fotonya saat chat. Tarif dasarnya per hari, dan tim akan menjelaskan opsi yang tersedia untuk kebutuhan Anda sebelum pemesanan dikunci."
      }
    ]
  },

  "sewa-bmw-330i-tangerang": {
    intro: "BMW 330i G20 M-Sport Pro adalah sedan mewah untuk orang yang menikmati menyetir. Unit kami keluaran 2025, bensin, matic, lima penumpang, dengan paket M-Sport Pro yang membuat tampilannya lebih tegas dan karakter kemudinya terasa lebih sporty dibanding sedan mewah pada umumnya. Tetap nyaman untuk harian, tapi terasa berbeda begitu Anda sendiri yang memegang setir.",
    bagian: [
      {
        judul: "Untuk yang Menyetir Sendiri",
        isi: "330i paling sering dipilih untuk agenda bisnis yang dikemudikan sendiri dan perjalanan tol antarkota, misalnya Jabodetabek ke Bandung, oleh pengemudi yang ingin perjalanannya terasa menyenangkan, bukan sekadar sampai. Unit ini juga pilihan yang wajar kalau tamu atau relasi Anda terbiasa dengan BMW.",
        tautan: { to: "/sewa-mobil-lepas-kunci-tangerang", label: "Ketentuan sewa mobil lepas kunci" }
      },
      {
        judul: "330i atau Mercy C300",
        isi: "Keduanya sedan mewah seukuran. 330i M-Sport lebih terasa sporty saat dikemudikan, C300 lebih menonjolkan kesenyapan dan kenyamanan kabin. Kalau Anda lebih sering duduk di belakang dengan sopir, C300 atau E300 biasanya lebih pas; kalau Anda sendiri yang menyetir, 330i yang paling menyenangkan.",
        tautan: { to: "/sewa-mercy-c300-tangerang", label: "Lihat Mercy C300" }
      },
      {
        judul: "Ketentuan Sewa Kelas Mewah",
        isi: "Unit ini termasuk kelas mewah dengan ketentuan sewa tersendiri yang dijelaskan sebelum pemesanan dikunci. Boleh dibawa ke luar kota asal kota tujuannya disebutkan saat memesan. Biaya sopir dan biaya antar, kalau dipilih, disebutkan di awal; mengambil unit sendiri di kantor kami di Ciledug tidak dikenakan biaya.",
        tautan: { to: "/sewa-bmw-m4-competition-tangerang", label: "Lihat BMW M4 Competition" }
      },
      {
        judul: "Untuk Acara dan Pernikahan",
        isi: "Selain disetir sendiri, 330i juga tampil pas di acara formal dan pernikahan bagi yang menginginkan sedan BMW dengan kesan lebih muda dan dinamis dibanding sedan eksekutif klasik. Untuk hari H, kebanyakan penyewa memilih plus sopir supaya pengantin dan keluarga bisa fokus pada acara. Karena tanggal populer cepat terisi, konfirmasikan unitnya begitu tanggal acara pasti, beserta rencana dekorasi di mobil bila ada."
      }
    ],
    faq: [
      {
        tanya: "BMW 330i ini keluaran tahun berapa?",
        jawab: "Keluaran 2025, varian G20 M-Sport Pro, bensin, matic, lima penumpang. Foto dan kalender ketersediaannya ada di halaman unit."
      },
      {
        tanya: "Bisa disewa lepas kunci?",
        jawab: "Bisa, dengan ketentuan kelas mewah yang dijelaskan sebelum pemesanan dikunci. Unit ini juga tersedia plus sopir."
      },
      {
        tanya: "Boleh dibawa ke luar kota?",
        jawab: "Boleh. Sebutkan kota tujuan saat pemesanan supaya tim bisa menyiapkan unit dan menjelaskan ketentuannya."
      },
      {
        tanya: "Apakah bensin dan tol termasuk tarif?",
        jawab: "Belum. Tarif yang tertera adalah sewa unit per hari; bahan bakar dan tol selama pemakaian ditanggung penyewa."
      },
      {
        tanya: "Melayani penyewa di Jakarta Selatan dan BSD?",
        jawab: "Melayani. Unit bisa diantar ke alamat Anda dengan biaya sesuai jarak dari kantor kami di Ciledug, atau diambil sendiri di kantor tanpa biaya tambahan."
      }
    ]
  }
};
