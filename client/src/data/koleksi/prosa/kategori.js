// Prosa panjang halaman kategori — pengantar, bagian artikel, dan tanya-jawab.
//
// Dipisahkan dari kategori.js, yang tinggal memuat metadata (slug, label,
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

export const PROSA_KATEGORI = {
  "sewa-mpv-tangerang": {
    intro: "MPV adalah kategori paling banyak disewa di 287 Trans, dan alasannya sederhana: tiga baris kursi menyelesaikan sebagian besar kebutuhan perjalanan di Jabodetabek tanpa harus naik ke kelas yang jauh lebih mahal. Satu MPV cukup untuk satu keluarga beserta bagasinya, cukup untuk rombongan kerja yang harus berpindah lokasi seharian, dan cukup untuk penjemputan tamu di Bandara Soekarno-Hatta. Seluruh tipe MPV kami keluaran 2024, bertransmisi matic, dan berkapasitas tujuh penumpang — yang membedakan hanya mesin dan tingkat kelengkapannya.",
    bagian: [
      {
        judul: "Tiga Keluarga MPV di Armada Kami",
        isi: "Innova Reborn bermesin diesel dengan sasis ladder frame, jadi tarif awal di kategori ini sekaligus paling kuat saat membawa beban penuh di rute luar kota. Innova Zenix adalah generasi terbarunya dengan basis monokok, kabinnya lebih senyap dan bantingannya lebih halus di jalan kota, tersedia dalam versi bensin maupun hybrid. Innova Venturer berada di antara keduanya: masih bermesin diesel seperti Reborn, tapi dengan trim eksterior dan interior yang lebih berkelas. Ketiganya sama-sama tujuh penumpang, jadi keputusannya lebih ke karakter mesin dan bujet, bukan kapasitas."
      },
      {
        judul: "Diesel atau Hybrid untuk Rute Anda",
        isi: "Kalau perjalanan Anda didominasi tol jarak jauh dengan kecepatan stabil, mesin diesel Reborn dan Venturer paling efisien dan paling santai membawa beban. Kalau rutenya berhenti-jalan di dalam kota Tangerang dan Jakarta, varian hybrid Zenix bekerja paling sering dan konsumsi bahan bakarnya jauh lebih hemat, sehingga selisih tarif sewanya biasanya tertutup dalam beberapa hari pemakaian. Untuk pemakaian campuran, Zenix Type-G bensin adalah titik tengah yang aman. Sebutkan rencana rute Anda saat chat kalau ingin dibantu memilih."
      },
      {
        judul: "Semua Bisa Lepas Kunci atau Plus Sopir",
        isi: "Seluruh tipe MPV tersedia untuk kedua skema. Lepas kunci syaratnya cukup KTP yang masih berlaku dan nomor HP aktif, tanpa kartu kredit dan tanpa jaminan BPKB. Dengan sopir, biayanya dihitung terpisah dari tarif unit dan selalu kami sebutkan di muka. Durasi sewa mulai dari satu hari tanpa minimum, dan tarif per hari turun untuk pemakaian mingguan maupun bulanan — banyak pelanggan perusahaan kami menyewa MPV secara bulanan sebagai kendaraan operasional."
      }
    ],
    faq: [
      {
        tanya: "MPV mana yang tarifnya paling rendah?",
        jawab: "Innova Reborn, baik Type-V maupun Type-G. Keduanya diesel, matic, tujuh penumpang, keluaran 2024, dan kami patok di harga yang sama — angkanya tertera di tabel perbandingan di atas, selalu mengikuti katalog."
      },
      {
        tanya: "Apakah MPV muat 7 orang sekaligus koper?",
        jawab: "Dengan baris ketiga terpakai penuh, ruang bagasi tersisa untuk sekitar dua koper kabin. Kalau Anda butuh tujuh kursi sekaligus bagasi besar, kami sarankan melipat sebagian baris ketiga atau menambah unit."
      },
      {
        tanya: "Bisa dibawa keluar kota?",
        jawab: "Bisa, dan itu salah satu penggunaan tersering unit MPV kami. Sebutkan tujuan serta lama perjalanan saat pemesanan supaya kami bisa menyiapkan unit dan menjelaskan ketentuan untuk rute jarak jauh."
      },
      {
        tanya: "Apakah MPV-nya bisa diantar ke BSD, Gading Serpong, atau Alam Sutera?",
        jawab: "Bisa. Ketiganya berada di Tangerang Selatan dan rutin kami layani dari kantor kami di Ciledug. Antar-jemput unit dikenakan biaya yang dihitung sesuai jarak, dan angkanya kami sebutkan di awal sebelum pemesanan dikunci. Kalau ingin tanpa biaya antar, unit bisa Anda ambil sendiri di kantor kami."
      },
      {
        tanya: "Ada sewa MPV bulanan untuk kendaraan operasional?",
        jawab: "Ada, dan MPV adalah kategori yang paling banyak diambil untuk skema ini. Tarif per harinya lebih hemat dibanding sewa harian, tersedia mingguan sampai tahunan, dan bisa lepas kunci maupun plus sopir. Sebutkan varian yang Anda incar beserta lama pemakaiannya saat chat supaya kami bisa langsung memberi angkanya."
      }
    ]
  },
  "sewa-suv-tangerang": {
    intro: "SUV dipilih orang bukan hanya karena tampilannya. Ground clearance yang tinggi membuatnya tenang melewati genangan dan jalan rusak yang memaksa mobil rendah memutar, sementara posisi duduk yang tinggi memberi pandangan jauh lebih lega di jalan padat seperti Tangerang dan Jakarta. Armada SUV kami sengaja diisi merek dan karakter yang berbeda-beda, dari SUV ladder frame bermesin diesel yang kuat menanjak sampai crossover bensin yang halus untuk pemakaian harian, supaya Anda bisa memilih berdasarkan rute, bukan sekadar berdasarkan yang tersedia.",
    bagian: [
      {
        judul: "Ladder Frame atau Crossover",
        isi: "Toyota Fortuner dan Mitsubishi Pajero Sport Dakar dibangun di atas sasis ladder frame — konstruksi yang sama dengan kendaraan niaga ringan. Keduanya paling kuat saat kabin terisi penuh, paling percaya diri di jalan rusak, dan tersedia dengan mesin diesel bertorsi besar. Honda CRV Turbo dan Mitsubishi Destinator memakai konstruksi monokok, sehingga terasa lebih halus dan lebih mudah dikendalikan untuk pemakaian harian di dalam kota, dengan konsumsi bahan bakar yang lebih ringan. Hyundai Palisade Signature berada di kelas tersendiri: SUV besar bermesin diesel dengan kabin paling lapang di armada kami. Di ujung lainnya ada Honda HR-V SE, crossover paling ringkas di kategori ini — bodinya pendek sehingga mudah diselipkan ke parkiran sempit, posisi duduknya tetap tinggi, dan mesin bensinnya irit untuk rute berhenti-jalan di dalam kota."
      },
      {
        judul: "Kapasitas Penumpang Tidak Sama",
        isi: "Ini yang paling sering keliru diasumsikan. Fortuner, Pajero Sport, Destinator, dan Palisade berkapasitas tujuh penumpang, sedangkan Honda CRV Turbo dan Honda HR-V SE berkapasitas lima. Kalau rombongan Anda lebih dari lima orang, pastikan memilih unit tujuh kursi sejak awal supaya tidak perlu mengubah rencana di hari keberangkatan. Untuk tujuh orang beserta koper besar, ruang bagasi paling lapang ada di Hyundai Palisade — dan kalau bagasinya masih kurang, kami akan menyarankan penambahan unit alih-alih memaksakan satu mobil."
      },
      {
        judul: "Untuk Kerja, Keluarga, atau Acara",
        isi: "SUV banyak disewa untuk tiga keperluan di kami. Pertama, kebutuhan perusahaan seperti menjemput tamu atau kunjungan ke lokasi proyek yang aksesnya belum mulus. Kedua, perjalanan keluarga jarak jauh yang mengutamakan ruang dan kenyamanan. Ketiga, acara yang butuh kesan formal seperti lamaran dan pernikahan. Untuk pemakaian mingguan dan bulanan, tarif per harinya turun dan penagihannya bisa disesuaikan dengan siklus administrasi perusahaan Anda."
      }
    ],
    faq: [
      {
        tanya: "SUV mana yang tarifnya paling rendah?",
        jawab: "Honda HR-V SE, crossover lima penumpang yang paling pas untuk dalam kota. Di antara SUV tujuh penumpang, tarif awalnya ada di Mitsubishi Destinator, Pajero Sport Dakar, dan Toyota Fortuner 2.8 GR yang dipatok sama. Angka per harinya tertera di tabel perbandingan di atas dan selalu mengikuti katalog."
      },
      {
        tanya: "Semua SUV muat 7 orang?",
        jawab: "Tidak semua. Honda CRV Turbo dan Honda HR-V SE berkapasitas lima penumpang. Fortuner, Pajero Sport, Destinator, dan Palisade berkapasitas tujuh. Kapasitas tiap unit tercantum di kartunya masing-masing di halaman ini."
      },
      {
        tanya: "Honda HR-V termasuk SUV atau hatchback?",
        jawab: "HR-V adalah SUV kompak (crossover): posisi duduk dan ground clearance-nya lebih tinggi dari hatchback, dengan pintu bagasi yang menyatu dengan kabin. Karena itu kami menempatkannya di kategori SUV, sebagai pilihan paling ringkas untuk pemakaian dalam kota."
      },
      {
        tanya: "Apakah SUV tersedia lepas kunci?",
        jawab: "Tersedia, seluruhnya. Syaratnya KTP yang masih berlaku dan SIM A aktif selama masa sewa. Opsi dengan sopir juga tersedia dengan biaya yang dihitung terpisah dan disebutkan di awal."
      },
      {
        tanya: "Untuk rute luar kota yang jauh, sebaiknya SUV diesel atau bensin?",
        jawab: "Untuk rute panjang dengan muatan penuh, unit diesel seperti Fortuner 2.8 GR dan Pajero Sport Dakar lebih menguntungkan: torsinya besar di putaran rendah sehingga tidak kewalahan di tanjakan, dan konsumsi solarnya lebih ekonomis pada jarak jauh. Untuk pemakaian yang didominasi jalan kota, unit bensin seperti CR-V Turbo dan Fortuner Legender terasa lebih halus dan lebih senyap."
      },
      {
        tanya: "Melayani penyewa di Bintaro dan Pondok Aren?",
        jawab: "Melayani. Keduanya relatif dekat dari kantor kami di Ciledug, sehingga proses serah terima unit biasanya bisa diatur cepat selama tanggalnya tersedia. Sebutkan alamat lengkap saat memesan supaya biaya antarnya bisa langsung kami hitung, atau ambil sendiri unitnya di kantor kami tanpa biaya tambahan."
      }
    ]
  },
  "sewa-alphard-tangerang": {
    intro: "Alphard sudah lama jadi tolok ukur MPV mewah di Indonesia, dan penyewanya biasanya datang dengan kebutuhan yang spesifik: penumpang di baris kedua harus merasa dijamu. Kursi kapten yang bisa direbahkan, pintu geser elektrik, kabin senyap, dan pijakan masuk yang rendah membuat unit ini terasa berbeda sejak penumpang membuka pintu. Kami menyediakan tiga pilihan sekaligus — Type-G generasi ketiga, Type-G generasi keempat, dan Alphard HEV hybrid — sehingga Anda bisa menyesuaikan dengan bujet acara tanpa harus turun kelas kendaraan.",
    bagian: [
      {
        judul: "Gen 3, Gen 4, dan Versi Hybrid",
        isi: "Alphard Type-G Gen 3 keluaran 2022 adalah pintu masuk ke kelas ini dan masih sangat layak untuk acara formal — desainnya yang ikonik justru masih paling dikenali orang. Type-G Gen 4 keluaran 2024 membawa desain terbaru dengan kabin yang lebih senyap dan fitur kenyamanan yang lebih lengkap. Alphard Gen 4 HEV adalah varian tertinggi kami, bermesin hybrid sehingga akselerasinya lebih halus dan kabinnya nyaris tanpa getaran mesin saat berjalan pelan — perbedaan yang paling terasa justru saat mobil merayap di kemacetan menuju lokasi acara."
      },
      {
        judul: "Paling Sering Disewa untuk Apa",
        isi: "Tiga keperluan mendominasi permintaan Alphard di kami: penjemputan tamu perusahaan dari bandara atau hotel, kendaraan pengantin dan rombongan keluarga inti di hari pernikahan, dan agenda kunjungan pejabat atau klien yang menuntut kesan formal. Untuk keperluan seperti ini, sebagian besar penyewa memilih paket dengan sopir agar penumpang tidak perlu memikirkan parkir dan rute. Biaya sopir dihitung terpisah dari tarif unit dan selalu kami sebutkan di awal, termasuk ketentuan untuk agenda yang berlangsung sampai larut malam.",
        tautan: { to: "/artikel/sewa-mobil-antar-jemput-bandara-soekarno-hatta", label: "Panduan sewa mobil antar jemput Bandara Soekarno-Hatta" },
      },
      {
        judul: "Kapasitas dan Ketersediaan Tanggal",
        isi: "Seluruh tipe Alphard kami berkapasitas enam penumpang dengan konfigurasi kursi kapten di baris kedua — bukan tujuh — karena kenyamanan baris kedua justru datang dari konfigurasi itu. Untuk rombongan lebih besar, biasanya kami sarankan kombinasi Alphard untuk tamu utama dan MPV atau SUV untuk pengiring. Karena jumlah tipenya terbatas dan tanggal pernikahan cenderung menumpuk di akhir pekan tertentu, sebaiknya kunci tanggal Anda jauh hari lewat WhatsApp sebelum menetapkan susunan acara.",
        tautan: { to: "/artikel/sewa-mobil-pengantin-tangerang", label: "Panduan memilih mobil pengantin di Tangerang" },
      }
    ],
    faq: [
      {
        tanya: "Bisa sewa Alphard di Jakarta?",
        jawab: "Bisa. Selain Tangerang, Jakarta juga area layanan kami — garasi kami di Ciledug berbatasan langsung dengan Jakarta Selatan. Alphard bisa menjemput tamu di hotel, kantor, atau lokasi acara Anda di Jakarta, dengan biaya antar sesuai jarak yang disebutkan sebelum pemesanan dikunci."
      },
      {
        tanya: "Alphard muat berapa orang?",
        jawab: "Enam penumpang, dengan kursi kapten di baris kedua. Konfigurasi ini yang membuat baris kedua terasa lapang dan nyaman, dan itulah alasan utama orang menyewa Alphard."
      },
      {
        tanya: "Apakah bisa sewa Alphard tanpa sopir?",
        jawab: "Bisa, tapi sebagian besar penyewa memilih dengan sopir karena unit ini umumnya dipakai untuk acara. Untuk lepas kunci, syaratnya sama seperti unit lain: KTP yang masih berlaku dan SIM A aktif."
      },
      {
        tanya: "Apakah ada paket untuk pernikahan?",
        jawab: "Ada, dan biasanya disusun per acara karena durasi serta titik jemputnya berbeda-beda. Sebutkan tanggal, jam mulai, dan titik penjemputan saat chat supaya kami bisa langsung memberikan angka totalnya."
      },
      {
        tanya: "Alphard generasi berapa saja yang tersedia di sini?",
        jawab: "Tiga pilihan. Generasi ketiga Type-G keluaran 2022 adalah yang tarifnya paling ringan. Generasi keempat Type-G keluaran 2024 membawa peredaman kabin dan material interior yang jelas lebih baik. Generasi keempat versi hybrid adalah yang paling lengkap, dengan perpindahan tenaga paling halus dan kabin paling senyap pada kecepatan rendah."
      },
      {
        tanya: "Bisa dipakai menjemput tamu di Bandara Soekarno-Hatta?",
        jawab: "Bisa, dan itu salah satu pemakaian Alphard yang paling sering kami tangani — baik lepas kunci maupun dengan sopir. Untuk penjemputan, sebutkan nomor penerbangan dan jam tiba saat memesan supaya penyesuaian bisa dilakukan kalau jadwalnya bergeser. Biaya sopir dihitung terpisah dan kami sampaikan di awal."
      }
    ]
  },
  "sewa-mobil-mewah-tangerang": {
    intro: "Kategori ini berisi sedan Eropa premium, dan penyewanya biasanya datang dengan kebutuhan yang tidak bisa diselesaikan MPV atau SUV mana pun: kesan yang terbangun sejak mobil berhenti di depan pintu. Kami menyediakan Mercedes-Benz — yang lebih akrab disebut Mercy — C300 dan E300 untuk kebutuhan formal yang elegan, BMW 330i M-Sport Pro untuk karakter berkendara yang lebih sporty, serta BMW M4 Competition Cabriolet sebagai unit paling istimewa di armada kami. Seluruh tipe di kategori ini keluaran 2024 ke atas dan foto yang ditampilkan adalah foto unit sebenarnya.",
    bagian: [
      {
        judul: "Mercedes-Benz C300 dan E300",
        isi: "Keduanya kami patok di tarif yang sama, jadi pilihannya murni soal ukuran dan kesan. C300 lebih ringkas sehingga lebih mudah bermanuver dan parkir di kawasan padat, cocok untuk agenda kerja di dalam kota. E300 satu kelas di atasnya dengan ruang kaki baris kedua yang jauh lebih lega — pilihan yang lebih tepat kalau penumpang di belakang adalah tamu yang perlu dijamu, atau kalau perjalanannya berlangsung lama. Keduanya bermesin bensin, matic, dan berkapasitas lima penumpang.",
        tautan: [
          { to: "/sewa-mercy-c300-tangerang", label: "Sewa Mercy C300" },
          { to: "/sewa-mercy-e300-tangerang", label: "Sewa Mercy E300" },
        ],
      },
      {
        judul: "BMW 330i dan M4 Competition Cabriolet",
        isi: "BMW 330i G20 M-Sport Pro adalah sedan sport yang tetap nyaman dipakai harian, dengan karakter kemudi yang jauh lebih terasa dibanding sedan mewah pada umumnya. BMW M4 Competition Cabriolet berada di kelas yang berbeda sama sekali: mobil atap terbuka berkapasitas dua penumpang, dan ini unit paling mahal sekaligus paling jarang tersedia di armada kami. Unit seperti ini biasanya disewa untuk sesi foto, video, acara khusus, atau hadiah — bukan untuk perjalanan sehari-hari.",
        tautan: [
          { to: "/sewa-bmw-330i-tangerang", label: "Sewa BMW 330i" },
          { to: "/sewa-bmw-m4-competition-tangerang", label: "Sewa BMW M4 Competition" },
        ],
      },
      {
        judul: "Ketentuan Khusus Kategori Ini",
        isi: "Karena nilai unitnya jauh di atas rata-rata armada, proses sewa di kategori ini melibatkan konfirmasi yang lebih rinci di awal: tujuan pemakaian, rute, dan apakah akan menggunakan sopir kami. Ini bukan birokrasi tambahan, melainkan cara kami memastikan unit yang Anda terima benar-benar sesuai dengan rencana acara Anda. Sebagian besar penyewa di kategori ini memilih paket dengan sopir. Silakan hubungi tim kami lebih awal untuk unit tertentu, karena ketersediaannya paling cepat habis."
      }
    ],
    faq: [
      {
        tanya: "Mulai berapa harga sewa mobil mewah di sini?",
        jawab: "Tarif awal kategori ini ada di Mercedes-Benz C300 dan E300, disusul BMW 330i M-Sport Pro, lalu BMW M4 Competition Cabriolet di posisi tertinggi. Angka per harinya tertera di tabel perbandingan di atas dan selalu mengikuti katalog."
      },
      {
        tanya: "Apakah bisa lepas kunci?",
        jawab: "Untuk kategori ini kami mengonfirmasi lebih rinci di awal, dan sebagian besar penyewa memilih dengan sopir. Silakan sampaikan rencana pemakaian Anda saat chat supaya kami bisa menjelaskan opsi yang tersedia untuk unit yang Anda incar."
      },
      {
        tanya: "Bisa disewa untuk sesi foto atau video?",
        jawab: "Bisa, dan itu salah satu permintaan tersering untuk BMW M4 Cabriolet. Sebutkan durasi serta lokasi pengambilan gambar saat chat supaya kami bisa menyesuaikan penawarannya."
      },
      {
        tanya: "Mobil mewah apa saja yang bisa disewa di sini?",
        jawab: "Untuk sedan mewah tersedia Mercedes-Benz C300 dan E300, BMW 330i G20 M-Sport Pro, serta BMW M4 Competition Cabriolet yang beratap terbuka. Kalau Anda butuh posisi duduk tinggi, ada Mercedes-Benz GLC300 di kategori SUV mewah. Seluruhnya matic dan berkapasitas lima penumpang, kecuali M4 Cabriolet yang memang bukan untuk membawa rombongan."
      },
      {
        tanya: "Melayani sewa mobil mewah di Jakarta?",
        jawab: "Melayani, bukan hanya Tangerang. Permintaan kategori mewah dari Jakarta — terutama Jakarta Selatan seperti Kebayoran dan Pondok Indah — memang cukup rutin. Unit bisa diantar ke alamat Anda dengan biaya sesuai jarak dari Ciledug, atau diambil sendiri di kantor kami. Kategori ini punya ketentuan sewa tersendiri yang kami jelaskan lebih dulu, sebelum Anda memutuskan."
      }
    ]
  },
  "sewa-suv-mewah-tangerang": {
    intro: "SUV mewah menempati posisi yang tidak bisa diisi kategori lain: Anda mendapat posisi duduk tinggi dan ground clearance sebuah SUV, tapi dengan kualitas kabin, peredaman, dan material yang setara sedan premium. Untuk agenda yang berpindah antara kawasan bisnis dan lokasi yang jalannya belum tentu mulus, kombinasi ini sangat masuk akal. Mercedes-Benz GLC300 (Mercy GLC) keluaran 2025 adalah satu-satunya unit kami di kategori ini, dan tarifnya kami samakan dengan sedan mewah C300 dan E300.",
    bagian: [
      {
        judul: "Kapan GLC300 Lebih Tepat daripada Sedan Mewah",
        isi: "Kalau agenda Anda seluruhnya berlangsung di kawasan perkantoran dan hotel dengan akses mulus, C300 atau E300 sudah lebih dari cukup. GLC300 mulai unggul begitu rutenya melibatkan hal-hal yang tidak bisa diprediksi: jalan menuju lokasi acara di luar kota, area yang rawan genangan saat hujan, atau akses proyek yang belum sepenuhnya diaspal. Posisi duduk yang lebih tinggi juga membuat penumpang lebih mudah naik dan turun, hal kecil yang terasa besar kalau tamu Anda berusia lanjut atau mengenakan busana formal."
      },
      {
        judul: "Kapasitas dan Karakter",
        isi: "GLC300 berkapasitas lima penumpang dengan transmisi matic dan mesin bensin. Ruang bagasinya jauh lebih fleksibel dibanding sedan di tarif yang sama, sehingga cocok untuk perjalanan beberapa hari dengan koper besar atau untuk membawa perlengkapan acara. Kabinnya senyap dan suspensinya menyerap jalan rusak dengan halus, jadi pengalaman penumpang di belakang tetap setara sedan premium meskipun rutenya tidak sempurna."
      },
      {
        judul: "Satu Unit, Tanggal Perlu Dikunci Lebih Awal",
        isi: "Kategori ini hanya berisi satu tipe, sehingga tanggal ramai seperti musim pernikahan dan akhir pekan panjang cenderung terisi lebih dulu. Kalau tanggal Anda sudah pasti, konfirmasikan ketersediaan lewat WhatsApp sebelum mengunci susunan acara. Kalau unitnya sudah terpakai, tim kami akan langsung menawarkan alternatif terdekat — biasanya E300 untuk kebutuhan formal, atau Hyundai Palisade kalau yang Anda butuhkan terutama adalah postur SUV dan ruang kabin."
      }
    ],
    faq: [
      {
        tanya: "Bisa sewa Mercy GLC300 di Jakarta?",
        jawab: "Bisa. Jakarta dan Tangerang sama-sama area layanan kami. GLC300 diantar ke alamat Anda dengan biaya sesuai jarak dari garasi kami di Ciledug, yang berbatasan langsung dengan Jakarta Selatan, atau diambil sendiri di garasi tanpa biaya antar."
      },
      {
        tanya: "GLC300 muat berapa orang?",
        jawab: "Lima penumpang, dengan ruang bagasi yang jauh lebih lapang dibanding sedan di tarif yang sama. Untuk rombongan lebih besar, kami sarankan Alphard atau menambah unit pengiring."
      },
      {
        tanya: "Kenapa harganya sama dengan C300 dan E300?",
        jawab: "Nilai unit dan biaya perawatan ketiganya berada di kisaran yang sama, jadi kami menyamakan tarifnya. Pilihannya murni soal bentuk kendaraan dan jenis rute yang akan Anda lalui, bukan soal kelas."
      },
      {
        tanya: "Tersedia dengan sopir?",
        jawab: "Tersedia, dan sebagian besar penyewa di kategori ini memilih opsi tersebut. Biaya sopir dihitung terpisah dari tarif unit dan kami sebutkan di awal, sebelum Anda memutuskan."
      },
      {
        tanya: "Kapan sebaiknya memilih GLC300 dibanding sedan mewah?",
        jawab: "Ketika rute Anda tidak seluruhnya mulus. Posisi duduk yang tinggi dan jarak ke tanah yang lebih aman membuat GLC300 lebih tenang melewati polisi tidur, jalan perumahan yang sempit, atau rute luar kota yang permukaannya tidak rata. Kalau agenda Anda seluruhnya di kawasan perkantoran dan hotel berakses mulus, C300 atau E300 sudah cukup."
      },
      {
        tanya: "Hanya ada satu unit — bagaimana memastikan tanggalnya?",
        jawab: "Kalender ketersediaan di halaman unit menandai tanggal yang sudah dipesan pelanggan lain, jadi Anda bisa mengeceknya sendiri sebelum menghubungi kami. Karena unitnya tunggal, tanggal di musim ramai cepat terisi — kalau agenda Anda sudah pasti, mengunci tanggalnya lebih awal jauh lebih aman daripada menunggu mendekati hari."
      }
    ]
  },
  "sewa-mobil-listrik-tangerang": {
    intro: "Sewa mobil listrik di 287 Trans sekarang punya dua pilihan Hyundai: Ioniq 5 dan Kona Electric N-Line. Keduanya matic, lima penumpang, dan bisa disewa lepas kunci maupun dengan sopir di Jakarta dan Tangerang. Mobil listrik mengubah hitungan biaya sewa dengan cara yang tidak langsung terlihat dari tarif hariannya: pada unit bensin Anda membayar tarif sewa ditambah bahan bakar, sedangkan di sini komponen itu berganti menjadi biaya pengisian daya yang jauh lebih rendah per kilometernya. Untuk pemakaian dalam kota Jabodetabek yang jaraknya panjang tapi kecepatannya rendah, selisih ini terasa nyata — dan itu justru kondisi di mana mobil listrik bekerja paling efisien.",
    bagian: [
      {
        judul: "Ioniq 5 atau Kona N-Line: Pilih yang Mana",
        isi: "Hyundai Kona Electric N-Line keluaran 2026 adalah SUV listrik ringkas dengan tampilan sporty: bumper hitam yang tegas di luar, aksen dan jahitan merah di kabin. Baterainya 66 kWh dengan jarak tempuh yang diklaim hingga 549 km (NEDC) sekali isi, dan sudah dibekali paket bantuan berkendara Hyundai SmartSense. Dimensinya yang lebih ringkas membuatnya lebih mudah diparkir dan dibawa di jalan sempit, dan tarif hariannya yang lebih rendah menjadikannya pintu masuk paling masuk akal untuk mencoba mobil listrik. Hyundai Ioniq 5 keluaran 2024 lebih besar dan lebih lapang: jarak antar-rodanya panjang dan lantainya rata, sehingga ruang kaki penumpang belakang terasa lega. Pilih Kona kalau Anda lebih sering berkendara sendiri atau berdua dan mengutamakan jarak tempuh; pilih Ioniq 5 kalau kursi belakang sering terisi atau Anda menjemput tamu."
      },
      {
        judul: "Yang Perlu Anda Tahu Sebelum Sewa Mobil Listrik",
        isi: "Ada satu hal yang jujur perlu Anda pertimbangkan: pengisian daya butuh perencanaan yang tidak diperlukan pada mobil bensin. Untuk pemakaian harian dalam kota, pengisian semalam sudah lebih dari cukup untuk kebutuhan sehari penuh. Untuk perjalanan luar kota jarak jauh, Anda perlu merencanakan titik pengisian cepat di sepanjang rute. Kami akan menjelaskan kondisi daya unit saat serah terima dan menunjukkan lokasi pengisian terdekat dari tempat Anda. Kalau rencana perjalanan Anda padat dan lintas kota tanpa jeda, tim kami akan terus terang menyarankan unit berbahan bakar bensin atau diesel."
      },
      {
        judul: "Cara Mengisi Daya Selama Masa Sewa",
        isi: "Ada dua cara yang paling umum dipakai penyewa. Yang pertama stasiun pengisian kendaraan listrik umum (SPKLU), yang sekarang sudah banyak tersebar di Jabodetabek — di pusat perbelanjaan, rest area tol, dan beberapa kantor PLN. Yang kedua pengisian di rumah atau kantor, kalau Anda punya akses daya yang memadai. Sebelum berangkat, sebutkan rute dan lama sewa Anda saat chat: tim kami akan memberi tahu kondisi daya unit saat diserahkan, perlengkapan pengisian yang ikut, dan titik pengisian yang paling masuk akal untuk rute itu."
      },
      {
        judul: "Hitungan Biaya: Mobil Listrik vs Mobil Bensin",
        isi: "Tarif harian mobil listrik bukan yang paling rendah di katalog, tapi tarif harian baru separuh cerita. Biaya pengisian daya per kilometer jauh di bawah biaya bensin untuk jarak yang sama, dan mobil listrik tidak membuang energi saat merayap di kemacetan seperti mesin bensin. Semakin banyak kilometer yang Anda tempuh selama masa sewa, semakin besar selisihnya. Itu sebabnya untuk pemakaian padat dalam kota — antar-jemput harian, operasional kantor, keliling Jakarta seharian — total biaya perjalanannya sering lebih hemat daripada yang terlihat dari tarifnya."
      },
      {
        judul: "Kenapa Mobil Listrik Terasa Berbeda di Jalan",
        isi: "Dua hal yang paling langsung terasa, baik di Ioniq 5 maupun Kona. Pertama, kabinnya senyap total saat berjalan pelan karena tidak ada mesin yang bekerja — perbedaan yang paling terasa justru di kemacetan, kondisi yang biasanya paling melelahkan. Kedua, tenaganya keluar seketika tanpa jeda perpindahan gigi, sehingga menyalip dan masuk ke jalur tol terasa jauh lebih ringan. Di Ioniq 5, ruang kabinnya juga lebih lapang dari yang diduga orang dari luar, karena tidak ada terowongan transmisi yang memakan ruang kaki di tengah."
      },
      {
        judul: "Sewa Mobil Listrik Harian, Mingguan, dan Bulanan",
        isi: "Sewa harian dihitung 24 jam dari waktu pengambilan, cocok untuk acara, agenda kerja, atau sekadar ingin merasakan mobil listrik. Skema mingguan pas untuk mencoba hidup dengan mobil listrik sebelum memutuskan membeli. Rental mobil listrik bulanan paling masuk akal secara hitungan: selisih biaya per kilometer menumpuk dari hari ke hari, dan perusahaan yang ingin menampilkan komitmen terhadap kendaraan rendah emisi bisa memakainya sebagai kendaraan operasional. Syaratnya satu — Anda punya akses pengisian yang rutin, di rumah, di kantor, atau di SPKLU dekat Anda."
      },
      {
        judul: "Cocok untuk Siapa",
        isi: "Mobil listrik paling masuk akal untuk tiga hal: pemakaian harian dalam kota selama beberapa hari sampai beberapa minggu, keperluan perusahaan yang ingin tampil dengan kendaraan rendah emisi, dan orang yang ingin mencoba mobil listrik lebih dulu sebelum benar-benar membelinya. Cukup banyak penyewa kami datang dengan alasan ketiga, dan kami menganggap itu penggunaan yang sangat wajar — beberapa hari berkendara sungguhan jauh lebih menjelaskan daripada test drive setengah jam."
      }
    ],
    faq: [
      {
        tanya: "Mobil listrik apa saja yang bisa disewa di 287 Trans?",
        jawab: "Dua unit Hyundai: Ioniq 5 keluaran 2024 dan Kona Electric N-Line keluaran 2026. Keduanya matic, lima penumpang, dan tersedia lepas kunci maupun dengan sopir. Harga dan kalender ketersediaannya ada di daftar unit pada halaman ini."
      },
      {
        tanya: "Bisa sewa mobil listrik di Jakarta?",
        jawab: "Bisa. Jakarta dan Tangerang sama-sama area layanan kami. Unit diantar ke alamat Anda dengan biaya sesuai jarak dari garasi kami di Ciledug, yang berbatasan langsung dengan Jakarta Selatan, atau diambil sendiri di garasi tanpa biaya antar."
      },
      {
        tanya: "Bagaimana cara mengisi dayanya selama masa sewa?",
        jawab: "Bisa lewat stasiun pengisian umum (SPKLU) yang jumlahnya sudah banyak di Jabodetabek, atau pengisian di rumah kalau Anda punya akses daya yang memadai. Kami jelaskan kondisi daya dan lokasi pengisian terdekat saat serah terima."
      },
      {
        tanya: "Berapa jarak tempuh sekali pengisian penuh?",
        jawab: "Kona Electric N-Line diklaim pabrikan hingga 549 km (NEDC) dengan baterai 66 kWh. Untuk kedua unit, pada pemakaian dalam kota satu kali pengisian penuh umumnya cukup untuk kebutuhan sehari penuh dengan margin yang aman. Jarak sebenarnya dipengaruhi gaya berkendara, beban, dan penggunaan AC — kami akan menjelaskan perkiraannya sesuai rencana rute Anda."
      },
      {
        tanya: "Apakah biaya listriknya ditanggung penyewa?",
        jawab: "Ya, sama seperti bahan bakar pada unit lain. Bedanya, biaya pengisian daya per kilometer jauh lebih rendah dibanding bensin, dan itu yang membuat total biaya perjalanan sering lebih hemat meskipun tarif hariannya bukan yang paling rendah."
      },
      {
        tanya: "Apa syarat sewa mobil listrik lepas kunci?",
        jawab: "Sama dengan unit lain: KTP yang masih berlaku dan SIM aktif sesuai golongan kendaraan, tanpa kartu kredit dan tanpa jaminan BPKB. Kalau ini pertama kalinya Anda menyetir mobil listrik, tim kami menjelaskan cara pakai dan pengisian dayanya saat serah terima."
      },
      {
        tanya: "Mobil listrik boleh dibawa ke luar kota?",
        jawab: "Boleh, hanya saja perjalanannya perlu direncanakan berbeda dari mobil bensin: titik pengisian di rute Anda sebaiknya dipastikan sebelum berangkat. Untuk rute tol utama di Jawa hal ini sudah jauh lebih mudah dibanding beberapa tahun lalu. Sebutkan kota tujuan saat memesan — kalau rutenya kami nilai menyulitkan, kami akan terus terang menyarankan unit lain."
      },
      {
        tanya: "Mobil listrik cocok untuk sewa jangka panjang?",
        jawab: "Cocok, dan justru di situ hitungannya paling masuk akal. Biaya per kilometer mobil listrik jauh lebih rendah daripada mobil bensin, sehingga pada pemakaian bulanan selisihnya menumpuk dan bisa menutup tarif hariannya yang terlihat lebih tinggi. Syaratnya satu: Anda punya akses pengisian yang rutin, entah di rumah atau di stasiun pengisian umum dekat Anda."
      }
    ]
  },
  "sewa-sedan-tangerang": {
    intro: "Sedan sering dilewatkan orang yang sedang mencari mobil sewaan, padahal untuk sebagian kebutuhan justru inilah pilihan paling tepat. Titik berat yang rendah membuat sedan terasa jauh lebih stabil di kecepatan tol dibanding MPV atau SUV, kabinnya lebih senyap karena bagasi terpisah dari ruang penumpang, dan konsumsi bahan bakarnya lebih ringan. Honda Accord Turbo keluaran 2025 mengisi posisi ini di armada kami: sedan berukuran eksekutif dengan ruang kaki baris kedua yang lapang, di tarif yang jauh di bawah sedan Eropa sekelasnya.",
    bagian: [
      {
        judul: "Kapan Sedan Lebih Baik daripada MPV",
        isi: "Kalau penumpang Anda maksimal empat orang dan perjalanannya banyak melewati tol, sedan hampir selalu pilihan yang lebih nyaman. Kestabilan di kecepatan tinggi jauh lebih baik karena titik beratnya rendah, dan penumpang belakang tidak terpapar suara jalan sebanyak di MPV. Untuk penjemputan tamu perusahaan, sedan juga membawa kesan yang lebih formal dan rapi dibanding MPV. Sedan mulai kalah begitu jumlah penumpang lebih dari lima, bagasinya berukuran besar dan banyak, atau rutenya melibatkan jalan rusak dan genangan."
      },
      {
        judul: "Accord Turbo: Mesin Kecil, Tenaga Besar",
        isi: "Accord Turbo memakai mesin berkapasitas kecil dengan turbo, sebuah kombinasi yang memberi tenaga setara mesin jauh lebih besar tanpa konsumsi bahan bakar yang setinggi itu. Dalam pemakaian nyata, artinya Anda tetap punya cadangan tenaga yang cukup saat menyalip di tol dengan mobil terisi penuh, tapi biaya bahan bakar hariannya tetap masuk akal. Transmisinya matic, kapasitasnya lima penumpang, dan unitnya keluaran 2025 — salah satu unit termuda di armada kami."
      },
      {
        judul: "Satu Unit, Sering Dipesan untuk Agenda Kerja",
        isi: "Kategori sedan di armada kami saat ini berisi satu tipe, dan permintaannya paling banyak datang dari kebutuhan kerja: kendaraan operasional untuk beberapa hari kunjungan, penjemputan tamu dari luar kota, dan agenda rapat yang berpindah antar kawasan bisnis. Karena tipenya tunggal, sebaiknya konfirmasi tanggal Anda lebih awal. Untuk pemakaian mingguan dan bulanan, tarif per harinya turun — cukup sebutkan durasi saat chat dan kami hitungkan."
      }
    ],
    faq: [
      {
        tanya: "Honda Accord muat berapa orang dan berapa koper?",
        jawab: "Lima penumpang, dengan bagasi yang cukup untuk dua sampai tiga koper besar. Untuk empat penumpang beserta bagasi masing-masing, unit ini sangat nyaman."
      },
      {
        tanya: "Apakah sedan ini nyaman untuk perjalanan luar kota?",
        jawab: "Sangat nyaman untuk rute tol, karena kestabilan di kecepatan tinggi justru kekuatan sedan. Yang perlu dihindari adalah rute dengan jalan rusak parah atau genangan tinggi, karena jarak ke tanahnya lebih rendah dari MPV dan SUV."
      },
      {
        tanya: "Bisa disewa lepas kunci?",
        jawab: "Bisa. Syaratnya KTP yang masih berlaku dan SIM A aktif selama masa sewa. Opsi dengan sopir juga tersedia dengan biaya yang dihitung terpisah dan disebutkan di awal."
      },
      {
        tanya: "Kenapa sedan sering dipilih untuk kebutuhan kerja?",
        jawab: "Tiga alasan yang selalu sama. Titik beratnya rendah sehingga paling stabil saat melaju di tol, kabinnya lebih senyap karena bodinya tidak setinggi MPV atau SUV, dan tingginya masuk ke basement gedung yang membatasi tinggi kendaraan — hal terakhir ini sering baru disadari setelah terlanjur membawa SUV."
      },
      {
        tanya: "Bisa disewa bulanan untuk operasional perusahaan?",
        jawab: "Bisa. Sedan termasuk yang paling sering diambil dengan skema bulanan untuk kendaraan operasional dan antar-jemput relasi, dengan tarif per hari yang lebih hemat dibanding harian. Untuk kebutuhan beberapa unit sekaligus atau kontrak yang lebih panjang, hubungi tim kami supaya penawarannya bisa disusun sesuai kebutuhan."
      }
    ]
  }
};
