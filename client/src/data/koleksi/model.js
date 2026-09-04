// Halaman per keluarga model — tujuan iklan untuk kata kunci yang menyebut
// nama mobil ("sewa innova zenix", "rental fortuner tangerang").
//
// Dicocokkan lewat `namaCocok` (substring nama unit), bukan `tipe`: satu
// keluarga model tersebar di beberapa varian yang semuanya bertipe sama —
// halaman Zenix harus memuat empat varian Zenix saja, bukan seluruh MPV.
//
// Slug-nya sengaja dipertahankan persis seperti halaman artikel yang
// digantikannya, supaya URL akhir iklan yang sudah berjalan tidak perlu
// diubah dan peringkat organik yang sudah terbentuk tidak dibuang.

export const KOLEKSI_MODEL = [
  {
    slug: "sewa-innova-zenix-tangerang",
    grup: "model",
    label: "Innova Zenix",
    namaCocok: "zenix",
    judul: "Sewa Innova Zenix Tangerang - Hybrid, Matic, 7 Kursi",
    deskripsi:
      "Sewa Toyota Innova Zenix di Tangerang mulai Rp849.000/hari. Empat varian termasuk hybrid, matic, 7 penumpang, unit 2024. Lepas kunci atau plus sopir.",
    h1: "Sewa Innova Zenix Tangerang",
    subjudul:
      "Empat varian Zenix keluaran 2024, semuanya matic dan berkapasitas 7 penumpang — tinggal pilih yang sesuai bujet dan kebutuhan perjalanan Anda.",
    intro:
      "Toyota Innova Zenix adalah generasi terbaru Innova yang pindah ke basis monokok, dan perbedaannya paling terasa di kabin: peredaman lebih rapat dan bantingan lebih halus dibanding generasi sebelumnya, terutama di jalan kota yang tambalannya banyak. Untuk perjalanan keluarga atau antar-jemput tamu perusahaan di Tangerang dan Jabodetabek, Zenix jadi titik tengah yang masuk akal — ruang tiga barisnya tetap Innova, tapi kenyamanannya sudah mendekati kelas di atasnya. Kami menyediakan empat varian sekaligus, jadi Anda tidak perlu berkompromi antara harga dan fitur.",
    bagian: [
      {
        judul: "Beda Varian Zenix: Type-G, Type-V, dan Type-Q",
        isi: "Type-G adalah pintu masuk paling terjangkau dan tersedia dalam dua pilihan: bensin biasa dan hybrid. Keduanya sudah matic dengan kapasitas 7 penumpang, bedanya ada di konsumsi bahan bakar — versi hybrid jauh lebih irit kalau rute Anda banyak berhenti-jalan di dalam kota. Type-V HEV menambah kelengkapan interior dan fitur berkendara, cocok kalau penumpang belakang adalah tamu yang perlu dijamu. Type-Q HEV adalah varian tertinggi dengan kursi kapten di baris kedua, pilihan yang paling sering diambil untuk penjemputan tamu penting atau perjalanan luar kota yang panjang.",
      },
      {
        judul: "Hybrid: Kapan Selisih Harganya Terbayar",
        isi: "Varian hybrid dipatok sedikit lebih tinggi per harinya dibanding versi bensin, dan itu wajar ditanyakan. Patokan sederhananya begini: kalau perjalanan Anda didominasi macet dan rute dalam kota, sistem hybrid bekerja paling sering dan selisih harga sewanya biasanya tertutup oleh hemat bahan bakar dalam beberapa hari pemakaian. Kalau rutenya tol jarak jauh dengan kecepatan stabil, bedanya jadi lebih tipis dan varian bensin sudah cukup. Kalau ragu, sebutkan saja rencana rute Anda saat chat — tim kami biasa membantu hitungan kasarnya sebelum Anda memutuskan.",
      },
      {
        judul: "Lepas Kunci atau Plus Sopir",
        isi: "Semua tipe Zenix bisa disewa lepas kunci maupun dengan sopir. Untuk lepas kunci syaratnya cukup KTP yang masih berlaku dan nomor HP aktif — tanpa kartu kredit, tanpa jaminan BPKB, tanpa perlu membuat akun. Kalau Anda memilih plus sopir, biayanya dihitung terpisah dari tarif unit dan akan kami sebutkan di awal, bukan di akhir. Opsi sopir banyak dipilih untuk penjemputan bandara dan agenda kerja yang lokasinya berpindah seharian, karena Anda tidak perlu memikirkan parkir dan rute.",
      },
    ],
    faq: [
      {
        tanya: "Innova Zenix muat berapa orang dan berapa koper?",
        jawab: "Seluruh tipe Zenix kami berkapasitas 7 penumpang. Dengan baris ketiga terpakai penuh, ruang bagasi cukup untuk sekitar dua koper kabin. Kalau Anda butuh 7 kursi sekaligus bagasi besar, baris ketiga bisa dilipat sebagian atau kami sarankan menambah unit.",
      },
      {
        tanya: "Bisa sewa Zenix harian saja atau harus mingguan?",
        jawab: "Bisa harian, tanpa minimum durasi. Sewa mingguan dan bulanan juga tersedia dengan tarif yang lebih hemat per harinya — sebutkan lama sewa Anda saat chat supaya kami bisa langsung memberi angkanya.",
      },
      {
        tanya: "Apakah harga sudah termasuk bensin dan tol?",
        jawab: "Belum. Tarif yang tertera adalah tarif unit per hari. Bahan bakar dan tol selama masa sewa ditanggung penyewa, sehingga Anda bisa menghitung sendiri total perjalanan sesuai rute. Biaya sopir juga dihitung terpisah.",
      },
    ],
  },

  {
    slug: "sewa-innova-reborn-tangerang",
    grup: "model",
    label: "Innova Reborn",
    namaCocok: "reborn",
    judul: "Sewa Innova Reborn Tangerang - Diesel, Matic, 7 Kursi",
    deskripsi:
      "Sewa Toyota Innova Reborn di Tangerang mulai Rp799.000/hari. Diesel, matic, 7 penumpang, unit 2024. Tarif termurah di armada kami, lepas kunci atau plus sopir.",
    h1: "Sewa Innova Reborn Tangerang",
    subjudul:
      "Tarif termurah di seluruh armada kami: Rp799.000 per hari untuk MPV diesel 7 penumpang keluaran 2024.",
    intro:
      "Innova Reborn adalah generasi Innova bermesin diesel dengan sasis ladder frame, dan sampai sekarang masih jadi pilihan paling banyak dicari untuk perjalanan jarak jauh. Alasannya praktis: mesin dieselnya irit di kecepatan tol yang stabil, dayanya kuat saat mobil terisi penuh penumpang dan barang, dan bengkelnya ada di mana-mana kalau terjadi apa-apa di tengah rute luar kota. Di 287 Trans, Reborn juga jadi titik masuk termurah ke armada kami — dua tipe Type-V dan Type-G keluaran 2024, keduanya matic, dipatok di harga yang sama.",
    bagian: [
      {
        judul: "Kenapa Reborn Masih Banyak Dipilih Dibanding Zenix",
        isi: "Zenix lebih halus di jalan kota, itu tidak terbantahkan. Tapi Reborn punya dua hal yang membuatnya tetap relevan: mesin diesel yang torsinya besar di putaran rendah, dan ground clearance yang lebih tinggi. Kalau perjalanan Anda melibatkan rute luar kota dengan jalan yang tidak selalu mulus, mobil terisi tujuh orang plus bagasi penuh, atau tanjakan panjang, Reborn terasa lebih santai membawanya. Ditambah tarifnya yang paling rendah di armada kami, ini jadi pilihan yang sulit dikalahkan untuk perjalanan rombongan yang mengejar nilai.",
      },
      {
        judul: "Type-V dan Type-G: Bedanya Apa",
        isi: "Kedua tipe kami sama-sama diesel, matic, 7 penumpang, dan keluaran 2024 — dan kami patok di harga yang sama persis. Bedanya ada di kelengkapan interior: Type-V berada satu tingkat di atas Type-G dalam hal fitur kenyamanan dan trim kabin. Karena tarifnya sama, biasanya kami tawarkan Type-V lebih dulu selama unitnya kosong di tanggal yang Anda minta. Sebutkan tanggal Anda saat chat dan kami cek ketersediaan keduanya sekaligus.",
      },
      {
        judul: "Cocok untuk Perjalanan Seperti Apa",
        isi: "Reborn paling sering disewa untuk mudik dan perjalanan antarkota, liburan keluarga besar, serta antar-jemput rombongan ke Bandara Soekarno-Hatta. Untuk keperluan kerja harian di dalam kota Tangerang, Reborn juga masuk akal kalau Anda mengutamakan biaya operasional yang rendah dan tidak keberatan dengan karakter mesin diesel yang sedikit lebih terdengar dibanding mesin bensin. Kalau prioritas Anda adalah kabin sesenyap mungkin untuk menjamu tamu, Zenix hybrid atau kelas di atasnya lebih pas.",
      },
    ],
    faq: [
      {
        tanya: "Innova Reborn pakai solar biasa atau Dexlite?",
        jawab: "Kami menyarankan Dexlite atau setara untuk menjaga performa mesin diesel modern. Tim kami akan menyebutkan kondisi bahan bakar saat serah terima, dan unit dikembalikan pada level yang sama seperti saat diterima.",
      },
      {
        tanya: "Apakah Reborn boleh dibawa keluar kota?",
        jawab: "Boleh. Perjalanan luar kota justru salah satu kekuatan unit ini. Sebutkan tujuan dan lama perjalanan saat pemesanan supaya kami bisa menyiapkan unit dan menginformasikan ketentuan yang berlaku untuk rute jarak jauh.",
      },
      {
        tanya: "Kenapa Reborn lebih murah daripada Zenix?",
        jawab: "Zenix adalah generasi yang lebih baru dengan basis monokok dan pilihan hybrid, sehingga nilai unitnya lebih tinggi. Selisih tarif itu murni mengikuti nilai unit, bukan karena kondisi Reborn kami kurang terawat — seluruh armada melewati pemeriksaan rutin yang sama sebelum disewakan.",
      },
    ],
  },

  {
    slug: "sewa-fortuner-tangerang",
    grup: "model",
    label: "Toyota Fortuner",
    namaCocok: "fortuner",
    judul: "Sewa Fortuner Tangerang - 2.8 GR & Legender, Lepas Kunci",
    deskripsi:
      "Sewa Toyota Fortuner di Tangerang mulai Rp1.399.000/hari. Pilihan 2.8 GR diesel dan Legender, matic, 7 penumpang. Lepas kunci atau dengan sopir, unit terawat.",
    h1: "Sewa Fortuner Tangerang",
    subjudul:
      "Dua pilihan Fortuner — 2.8 GR bermesin diesel dan Legender — sama-sama matic, 7 penumpang, dan siap untuk rute kota maupun luar kota.",
    intro:
      "Toyota Fortuner adalah SUV ladder frame yang postur dan ground clearance-nya langsung terasa begitu Anda duduk di belakang kemudi. Untuk kebutuhan di Tangerang dan sekitarnya, dua hal yang membuatnya banyak dicari: pandangan ke depan yang tinggi sehingga lebih nyaman di jalan padat, dan kemampuannya melewati genangan atau jalan rusak yang bikin sedan dan MPV rendah harus memutar. Ditambah kesan tegas yang cocok untuk keperluan formal, Fortuner sering dipilih baik untuk perjalanan keluarga maupun keperluan perusahaan.",
    bagian: [
      {
        judul: "2.8 GR atau Legender: Mana yang Sesuai",
        isi: "Fortuner 2.8 GR kami bermesin diesel dengan tampilan bergaya GR Sport yang lebih sporty dan agresif. Karakter dieselnya membuat unit ini terasa paling bertenaga saat membawa beban penuh dan menghadapi tanjakan panjang, dan lebih hemat untuk rute tol jarak jauh. Fortuner Legender adalah keluaran 2025 dengan tampilan depan yang lebih mewah dan halus, pilihan yang lebih pas kalau unit dipakai untuk menjemput tamu atau menghadiri acara resmi. Selisih tarif keduanya tipis, jadi biasanya keputusannya jatuh ke selera tampilan dan jenis rute.",
      },
      {
        judul: "Fortuner untuk Keperluan Perusahaan",
        isi: "Sebagian besar permintaan Fortuner yang masuk ke kami datang dari kebutuhan kerja: menjemput tamu dari luar kota, kunjungan ke lokasi proyek yang aksesnya belum mulus, atau kendaraan operasional selama beberapa minggu. Untuk kebutuhan seperti ini, sewa mingguan dan bulanan tersedia dengan tarif harian yang lebih rendah, dan penagihan bisa disesuaikan dengan siklus administrasi Anda. Sebutkan durasi dan pola pemakaian saat chat, supaya kami bisa memberi angka yang tepat sejak awal alih-alih perkiraan kasar.",
      },
      {
        judul: "Syarat dan Proses Sewa",
        isi: "Untuk lepas kunci, syaratnya cukup KTP yang masih berlaku atas nama pemesan dan nomor HP aktif untuk konfirmasi. Tidak ada kartu kredit, tidak ada jaminan BPKB, dan tidak perlu membuat akun. Kalau Anda memilih dengan sopir, biaya sopir dihitung terpisah dan kami sebutkan di muka. Saat serah terima, kondisi unit diperiksa bersama — bahan bakar, ban, kaca, dan kelengkapan surat — supaya tidak ada perbedaan pemahaman saat pengembalian.",
      },
    ],
    faq: [
      {
        tanya: "Fortuner muat berapa orang?",
        jawab: "Tujuh penumpang, dengan baris ketiga yang bisa dilipat kalau Anda butuh ruang bagasi lebih besar. Untuk rombongan tujuh orang dengan koper besar, kami biasanya menyarankan mempertimbangkan penambahan unit.",
      },
      {
        tanya: "Apakah Fortuner tersedia lepas kunci?",
        jawab: "Tersedia. Fortuner bisa disewa lepas kunci maupun dengan sopir. Untuk lepas kunci, pastikan SIM A Anda masih berlaku selama masa sewa karena akan dicek saat serah terima.",
      },
      {
        tanya: "Berapa lama minimal sewa Fortuner?",
        jawab: "Satu hari, tanpa minimum durasi khusus. Untuk pemakaian mingguan dan bulanan, tarif per harinya turun — sebutkan lama sewa saat chat supaya kami bisa langsung menghitungnya.",
      },
    ],
  },

  {
    slug: "sewa-pajero-sport-tangerang",
    grup: "model",
    label: "Pajero Sport",
    namaCocok: "pajero",
    judul: "Sewa Pajero Sport Tangerang - Dakar Diesel, 7 Penumpang",
    deskripsi:
      "Sewa Mitsubishi Pajero Sport Dakar di Tangerang Rp1.399.000/hari. Diesel, matic, 7 penumpang, unit 2024. Lepas kunci atau dengan sopir, syarat cukup KTP.",
    h1: "Sewa Pajero Sport Tangerang",
    subjudul:
      "Mitsubishi Pajero Sport Dakar keluaran 2024 — SUV diesel bertubuh besar dengan kabin senyap dan bantingan yang lebih lembut dari rata-rata kelasnya.",
    intro:
      "Pajero Sport Dakar adalah lawan langsung Fortuner di kelas SUV ladder frame, dan pemiliknya biasanya memilih berdasarkan karakter yang cukup berbeda. Pajero dikenal dengan peredaman kabin yang lebih rapat dan suspensi yang terasa lebih lembut menyerap jalan rusak, sementara tampilan depannya yang besar dan tegas membuatnya menonjol di jalan. Untuk perjalanan panjang bersama keluarga di mana kenyamanan penumpang lebih diutamakan daripada karakter berkendara yang sporty, unit ini sering jadi jawaban.",
    bagian: [
      {
        judul: "Pajero Sport atau Fortuner",
        isi: "Keduanya kami patok di tarif yang sama persis, jadi harga bukan pembedanya. Yang membedakan adalah rasa berkendara. Pajero Sport cenderung lebih lembut dan senyap, membuat penumpang baris kedua dan ketiga lebih betah di perjalanan berjam-jam. Fortuner terasa lebih padat dan tegas, yang oleh sebagian pengemudi dianggap lebih mantap dikendalikan di kecepatan tinggi. Kalau Anda menyewa untuk membawa keluarga jarak jauh, Pajero biasanya lebih disukai penumpang. Kalau Anda sendiri yang akan menyetir sebagian besar waktu dan menyukai bobot kemudi yang lebih terasa, Fortuner lebih pas.",
      },
      {
        judul: "Mesin Diesel untuk Rute Jauh",
        isi: "Unit ini bermesin diesel dengan transmisi matic. Torsi besar di putaran rendah membuatnya tidak kewalahan saat kabin terisi tujuh orang dan bagasi penuh, termasuk di tanjakan panjang menuju kawasan pegunungan. Untuk rute tol jarak jauh, konsumsi bahan bakarnya juga lebih bersahabat dibanding SUV bensin di kelas yang sama. Kami sarankan mengisi dengan Dexlite atau setara untuk menjaga performa mesin.",
      },
      {
        judul: "Ketersediaan Tipe Ini",
        isi: "Pajero Sport Dakar di armada kami saat ini hanya tersedia dalam satu tipe, sehingga tanggal ramai seperti akhir pekan panjang dan musim liburan biasanya terisi lebih awal. Kalau Anda sudah punya tanggal pasti, sebaiknya konfirmasi ketersediaannya lebih dulu lewat WhatsApp sebelum mengunci rencana perjalanan. Kalau unitnya sudah terpakai di tanggal Anda, tim kami akan langsung menawarkan alternatif terdekat dari kelas SUV yang sama.",
      },
    ],
    faq: [
      {
        tanya: "Pajero Sport ini varian apa?",
        jawab: "Varian Dakar keluaran 2024, bermesin diesel dengan transmisi matic dan kapasitas 7 penumpang. Foto yang ditampilkan di halaman ini adalah foto unit sebenarnya, bukan foto ilustrasi.",
      },
      {
        tanya: "Bisa disewa tanpa sopir?",
        jawab: "Bisa. Syaratnya KTP yang masih berlaku dan SIM A aktif selama masa sewa. Kalau Anda lebih memilih dengan sopir, biayanya dihitung terpisah dari tarif unit dan kami sebutkan di awal.",
      },
      {
        tanya: "Apakah tarifnya berubah untuk sewa lebih dari seminggu?",
        jawab: "Ya, tarif per hari turun untuk sewa mingguan dan bulanan. Sebutkan tanggal mulai dan lama sewa saat chat supaya kami bisa langsung memberikan angka totalnya.",
      },
    ],
  },
];
