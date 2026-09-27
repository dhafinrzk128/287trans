/**
 * Konten tambahan halaman detail mobil (/katalog/:id), per idMobil.
 *
 * Kenapa ada: deskripsi dari panel admin hanya satu paragraf, dan Search
 * Console (Sep 2026) sudah menganggap /katalog/34 duplikat halaman Mercedes
 * lain — isi halaman-halaman detail terlalu tipis dan terlalu mirip. Bagian
 * ini menambah hal yang memang berbeda per unit: untuk apa unit itu paling
 * pas, apa yang perlu diketahui sebelum menyewanya, dan pertanyaan yang
 * biasanya muncul khusus untuk unit itu.
 *
 * Aturan menulis:
 * - Klaim soal LAYANAN hanya yang sudah tertulis di situs: lepas kunci atau
 *   plus sopir, ambil gratis di Ciledug, biaya antar dihitung dari jarak,
 *   boleh ke luar kota asal disebutkan, kelas mewah punya ketentuan sendiri.
 *   Jangan menjanjikan hal lain (bensin penuh, gratis antar, diskon) di sini.
 * - Fakta kendaraan cukup yang pasti untuk tipenya; hindari angka spesifikasi
 *   yang bisa berbeda per unit (tenaga, jarak tempuh baterai, volume bagasi).
 * - Unit baru dari panel admin tanpa entri di sini tetap tampil normal,
 *   hanya tanpa bagian ini.
 *
 * File ini dimuat dinamis oleh CarDetail (bukan bagian bundel utama), dan
 * isinya untuk halaman yang diprerender ikut tertanam di HTML statisnya.
 */
export const DETAIL_MOBIL = {
  37: {
    cocokUntuk: [
      "Mobil pengantin dan sesi foto prewedding yang ingin tampil beda dari sedan hitam biasa",
      "Peluncuran produk, acara brand, atau pembuatan konten yang butuh mobil sebagai pusat perhatian",
      "Akhir pekan berdua dengan atap terbuka",
    ],
    perluDiketahui: [
      "Kapasitas 2 penumpang. Untuk rombongan, pasangkan dengan unit kedua dari armada kami.",
      "Atapnya kain yang bisa dibuka; saat atap terbuka, ruang bagasi berkurang karena atap tersimpan di belakang.",
      "Termasuk kelas mewah dengan ketentuan sewa tersendiri yang dijelaskan tim di awal.",
    ],
    faq: [
      { q: "Apakah BMW M4 Cabriolet bisa untuk mobil pengantin?", a: "Bisa, dan justru itu salah satu pemakaian yang paling sering. Sebutkan tanggal, lokasi akad atau resepsi, dan apakah butuh sopir, supaya tim bisa mengatur jadwal serah terimanya." },
      { q: "Bisa disewa lepas kunci?", a: "Bisa, dengan ketentuan kelas mewah yang dijelaskan sebelum pemesanan dikunci. Kalau Anda tidak ingin menyetir sendiri, unit ini juga tersedia plus sopir." },
    ],
  },
  36: {
    cocokUntuk: [
      "Agenda bisnis yang Anda setir sendiri dan ingin terasa sporty, bukan sekadar mewah",
      "Perjalanan tol antarkota Jabodetabek–Bandung dengan pengemudi yang menikmati berkendara",
      "Tamu atau relasi yang terbiasa dengan BMW",
    ],
    perluDiketahui: [
      "Sedan 5 penumpang dengan karakter berkendara sporty; bagasi cukup untuk koper kabin beberapa orang.",
      "Bensin, matic, keluaran 2025.",
      "Termasuk kelas mewah dengan ketentuan sewa tersendiri.",
    ],
    faq: [
      { q: "Apa beda BMW 330i dengan Mercedes C300 di armada kami?", a: "Keduanya sedan mewah seukuran. 330i M-Sport lebih terasa sporty saat dikemudikan sendiri, C300 lebih menonjolkan kesenyapan dan kenyamanan kabin. Kalau lebih sering duduk di belakang dengan sopir, C300 atau E300 biasanya lebih pas." },
      { q: "Boleh dibawa ke luar kota?", a: "Boleh. Sebutkan kota tujuan saat pemesanan supaya tim bisa menyiapkan unit dan menjelaskan ketentuannya." },
    ],
  },
  35: {
    cocokUntuk: [
      "Keluarga kecil yang ingin kenyamanan mobil mewah dengan posisi duduk tinggi",
      "Perjalanan ke Puncak, Bandung, atau jalur menanjak dengan kesan premium",
      "Penjemputan tamu yang lebih suka SUV daripada sedan",
    ],
    perluDiketahui: [
      "SUV mewah 5 penumpang; bagasi lebih lega daripada sedan C300 dan E300.",
      "Bensin, matic, keluaran 2025.",
      "Termasuk kelas mewah dengan ketentuan sewa tersendiri.",
    ],
    faq: [
      { q: "GLC300 atau Alphard untuk keluarga?", a: "GLC300 pas untuk keluarga sampai 5 orang yang ingin mobil mewah dan tetap enak disetir sendiri. Kalau penumpangnya 6 orang atau ingin kabin belakang yang sangat lega, Alphard lebih sesuai." },
      { q: "Bisa diantar ke rumah?", a: "Bisa. Biaya antar dihitung dari jarak kantor kami di Ciledug dan selalu disebutkan sebelum pemesanan dikunci. Mengambil sendiri di kantor tidak dikenakan biaya." },
    ],
  },
  34: {
    cocokUntuk: [
      "Agenda kerja di pusat kota yang sering keluar-masuk basement gedung",
      "Menjemput relasi bisnis dengan kesan profesional tanpa ukuran sebesar E300",
      "Pengguna yang menyetir sendiri dan mencari sedan mewah yang lincah",
    ],
    perluDiketahui: [
      "Dimensinya lebih ringkas dari E300, jadi lebih mudah diparkir dan bermanuver di jalan padat.",
      "Bensin, matic, 5 penumpang, keluaran 2025.",
      "Termasuk kelas mewah dengan ketentuan sewa tersendiri.",
    ],
    faq: [
      { q: "Pilih C300 atau E300?", a: "Kalau Anda yang menyetir dan banyak berkegiatan di dalam kota, C300 lebih praktis. Kalau penumpang utamanya duduk di belakang dengan sopir, E300 memberi ruang kaki belakang yang lebih lega." },
      { q: "Apakah tarifnya sudah termasuk sopir?", a: "Tarif yang tertera adalah sewa unit. Kalau butuh sopir, sebutkan saat menghubungi kami dan tim akan memberi hitungannya di awal." },
    ],
  },
  33: {
    cocokUntuk: [
      "Eksekutif yang duduk di kursi belakang dengan sopir",
      "Penjemputan tamu VIP dari bandara atau hotel",
      "Acara resmi perusahaan dan pernikahan yang butuh sedan klasik",
    ],
    perluDiketahui: [
      "Sedan eksekutif dengan ruang kaki belakang paling lega di antara sedan Mercedes kami.",
      "Bensin, matic, 5 penumpang, keluaran 2024.",
      "Termasuk kelas mewah dengan ketentuan sewa tersendiri.",
    ],
    faq: [
      { q: "E300 cocok untuk penjemputan di Bandara Soekarno-Hatta?", a: "Cocok, terutama untuk tamu dengan koper dan yang ingin duduk nyaman di belakang. Sebutkan jadwal penerbangan saat memesan supaya waktu jemput bisa diatur." },
      { q: "Bisa disewa bulanan untuk kendaraan direksi?", a: "Bisa. Durasi sewa tersedia dari harian sampai bulanan; skema dan ketentuannya dijelaskan tim sesuai kebutuhan perusahaan." },
    ],
  },
  32: {
    cocokUntuk: [
      "Perjalanan harian di Jabodetabek tanpa pusing biaya bensin",
      "Pengguna yang ingin mencoba mobil listrik sebelum membeli",
      "Acara atau kantor yang ingin tampil ramah lingkungan",
    ],
    perluDiketahui: [
      "Mobil listrik penuh: tidak memakai bensin sama sekali, jadi rencanakan titik pengisian daya (SPKLU) untuk perjalanan jauh.",
      "Lantai kabin datar sehingga kabin terasa lapang untuk 5 penumpang.",
      "Tanyakan ke tim kondisi daya baterai saat serah terima dan cara pengisian yang disarankan.",
    ],
    faq: [
      { q: "Ioniq 5 bisa dibawa ke luar kota?", a: "Bisa, asalkan rute Anda melewati stasiun pengisian daya. Sebutkan kota tujuan saat pemesanan supaya tim bisa membantu memperkirakan kebutuhan pengisian." },
      { q: "Apakah pernah menyetir mobil listrik diperlukan?", a: "Tidak. Mobil ini matic dan cara mengemudikannya mirip mobil biasa; perbedaan utamanya ada pada pengisian daya, yang akan dijelaskan saat serah terima." },
    ],
  },
  31: {
    cocokUntuk: [
      "Keluarga besar sampai 7 orang yang ingin kenyamanan SUV besar",
      "Perjalanan jauh ke luar kota dengan banyak barang bawaan",
      "Alternatif yang lebih lega dari SUV 7 penumpang biasa, tanpa masuk kelas MPV mewah",
    ],
    perluDiketahui: [
      "SUV besar tiga baris, diesel, 7 penumpang, keluaran 2023.",
      "Ukuran bodinya besar; pertimbangkan saat parkir di area sempit.",
    ],
    faq: [
      { q: "Palisade atau Fortuner untuk mudik keluarga?", a: "Keduanya 7 penumpang dan diesel. Palisade lebih menonjolkan kabin yang lega dan senyap, Fortuner lebih tangguh untuk jalan rusak. Untuk jalan tol dan kenyamanan penumpang, Palisade biasanya lebih dipilih." },
      { q: "Bisa sewa dengan sopir untuk perjalanan beberapa hari?", a: "Bisa. Sebutkan durasi dan kota tujuan, tim akan menjelaskan ketentuan sopir untuk perjalanan menginap." },
    ],
  },
  30: {
    cocokUntuk: [
      "Keluarga yang ingin SUV 7 penumpang terbaru dengan tarif terjangkau",
      "Perjalanan dalam kota dan wisata akhir pekan",
      "Pengguna yang penasaran mencoba model yang baru keluar",
    ],
    perluDiketahui: [
      "SUV 7 penumpang, bensin, keluaran 2026 — salah satu unit terbaru di armada kami.",
      "Matic, cocok untuk pengemudi yang terbiasa dengan MPV maupun SUV.",
    ],
    faq: [
      { q: "Destinator atau Pajero Sport?", a: "Destinator lebih cocok untuk pemakaian kota dan keluarga dengan tarif yang sama; Pajero Sport Dakar diesel dengan sasis lebih tangguh untuk rute luar kota yang berat." },
      { q: "Unitnya benar keluaran 2026?", a: "Ya, tahun unit tercantum di halaman ini sesuai unit yang disewakan." },
    ],
  },
  29: {
    cocokUntuk: [
      "Rute luar kota dengan tanjakan, jalan rusak, atau muatan penuh",
      "Keluarga 7 orang yang butuh SUV tangguh",
      "Kegiatan proyek atau survei lapangan",
    ],
    perluDiketahui: [
      "SUV diesel 7 penumpang dengan sasis tangguh, keluaran 2024.",
      "Isi dengan solar/diesel, bukan bensin.",
    ],
    faq: [
      { q: "Pajero Sport cocok untuk perjalanan ke daerah pegunungan?", a: "Cocok. Karakter diesel dan sasisnya memang dibuat untuk tanjakan dan jalan yang kurang mulus." },
      { q: "Bisa sewa beberapa hari untuk proyek di luar kota?", a: "Bisa. Sebutkan lokasi dan durasi supaya tim bisa menyiapkan unit dan menjelaskan ketentuannya." },
    ],
  },
  28: {
    cocokUntuk: [
      "Perjalanan bisnis semi-formal dengan sedan nyaman tanpa tarif kelas mewah",
      "Perjalanan tol jarak jauh yang mengutamakan kenyamanan kabin",
      "Keluarga kecil yang lebih suka sedan daripada SUV",
    ],
    perluDiketahui: [
      "Sedan menengah 5 penumpang, bensin turbo, keluaran 2025.",
      "Kabin belakang lega untuk kelas sedan non-mewah.",
    ],
    faq: [
      { q: "Accord cocok untuk antar-jemput tamu kantor?", a: "Cocok, terutama bila ingin kesan rapi dan nyaman tanpa masuk tarif sedan Eropa. Unit juga tersedia plus sopir." },
      { q: "Apa beda Accord dengan sedan Mercedes?", a: "Accord memberi kenyamanan sedan menengah dengan tarif lebih rendah; sedan Mercedes menawarkan merek dan kabin kelas mewah dengan ketentuan sewa tersendiri." },
    ],
  },
  27: {
    cocokUntuk: [
      "Keluarga kecil sampai 5 orang untuk perjalanan kota dan luar kota",
      "Pengguna yang ingin SUV nyaman dan mudah dikendarai",
      "Wisata akhir pekan dengan bagasi cukup lega",
    ],
    perluDiketahui: [
      "SUV 5 penumpang, bensin turbo, keluaran 2025.",
      "Posisi duduk lebih tinggi dari sedan, tetap mudah diparkir.",
    ],
    faq: [
      { q: "CR-V atau HR-V?", a: "CR-V lebih lega di kabin dan bagasi, lebih nyaman untuk perjalanan jauh. HR-V lebih ringkas dan lincah untuk dalam kota dengan tarif lebih rendah." },
      { q: "Muat berapa koper?", a: "Untuk 4–5 orang dengan koper sedang, umumnya cukup. Kalau barang bawaan banyak, sebutkan saat memesan supaya tim bisa menyarankan unit yang paling pas." },
    ],
  },
  25: {
    cocokUntuk: [
      "Mobilitas harian di dalam kota dengan salah satu tarif paling terjangkau di armada kami",
      "Pasangan atau keluarga kecil",
      "Pengguna yang sering parkir di mal, perumahan, atau jalan sempit",
    ],
    perluDiketahui: [
      "Crossover ringkas 5 penumpang, bensin, keluaran 2023.",
      "Bagasi pas untuk kebutuhan harian dan koper kabin; untuk rombongan dengan banyak barang pilih unit yang lebih besar.",
    ],
    faq: [
      { q: "HR-V cocok untuk sewa bulanan?", a: "Cocok untuk kebutuhan operasional harian di kota. Durasi bulanan tersedia; tim akan menjelaskan skemanya sesuai kebutuhan." },
      { q: "Apakah bisa dipakai ke luar kota?", a: "Bisa. Sebutkan kota tujuan saat pemesanan." },
    ],
  },
  24: {
    cocokUntuk: [
      "Penjemputan tamu perusahaan dan VIP dengan kabin paling senyap di kelas MPV kami",
      "Mobil pengantin dan keluarga inti di hari pernikahan",
      "Perjalanan panjang yang penumpang belakangnya bekerja atau beristirahat",
    ],
    perluDiketahui: [
      "Versi hybrid: kabin sangat senyap di kecepatan rendah dan konsumsi bahan bakar lebih efisien dari versi bensin.",
      "6 penumpang dengan kursi kapten baris kedua dan pintu geser elektrik.",
      "Termasuk kelas mewah dengan ketentuan sewa tersendiri.",
    ],
    faq: [
      { q: "Apa beda Alphard Gen 4 HEV dengan Type-G Gen 4?", a: "Keduanya generasi yang sama. HEV memakai sistem hybrid yang lebih senyap dan halus saat merayap; Type-G bensin dengan tarif sedikit lebih rendah." },
      { q: "Bisa dengan sopir berseragam untuk acara resmi?", a: "Unit tersedia plus sopir. Kebutuhan khusus seperti pakaian sopir atau protokol acara sebaiknya disebutkan di awal supaya tim bisa memastikan apa yang bisa disiapkan." },
    ],
  },
  23: {
    cocokUntuk: [
      "Penjemputan tamu dan acara keluarga dengan MPV mewah generasi terbaru",
      "Perjalanan eksekutif dalam kota maupun luar kota",
      "Pernikahan yang butuh Alphard terbaru dengan tarif di bawah versi hybrid",
    ],
    perluDiketahui: [
      "Generasi keempat, bensin, 6 penumpang dengan kursi kapten baris kedua.",
      "Termasuk kelas mewah dengan ketentuan sewa tersendiri.",
    ],
    faq: [
      { q: "Pilih Alphard Gen 4 atau Gen 3?", a: "Gen 4 menawarkan desain dan kabin generasi terbaru. Gen 3 tetap nyaman dengan tarif lebih terjangkau, pas bila yang dicari adalah kenyamanan Alphard tanpa harus unit terbaru." },
      { q: "Muat berapa orang dengan koper?", a: "6 penumpang. Kalau semua kursi terisi dan membawa koper besar, sebutkan jumlah barang saat memesan supaya tim bisa memberi saran." },
    ],
  },
  22: {
    cocokUntuk: [
      "Perjalanan luar kota dengan rute bervariasi dan muatan penuh",
      "Keluarga 7 orang yang ingin SUV bertenaga",
      "Pengemudi yang menyukai karakter diesel bertenaga besar",
    ],
    perluDiketahui: [
      "Varian GR dengan mesin diesel besar, 7 penumpang, keluaran 2023.",
      "Isi dengan solar/diesel, bukan bensin.",
    ],
    faq: [
      { q: "Fortuner GR atau Fortuner Legender?", a: "Fortuner 2.8 GR adalah diesel bertenaga besar untuk rute berat dan tarifnya lebih rendah. Legender keluaran 2025 dengan tampilan lebih mewah, tarifnya sedikit di atas." },
      { q: "Bisa untuk perjalanan mudik?", a: "Bisa, dan termasuk unit yang banyak dipilih untuk mudik keluarga. Pesan lebih awal karena tanggal musim mudik cepat terisi." },
    ],
  },
  21: {
    cocokUntuk: [
      "Keluarga yang ingin kenyamanan mendekati MPV mewah dengan tarif jauh di bawah Alphard",
      "Penjemputan tamu dengan kursi kapten di baris kedua",
      "Perjalanan panjang yang mengutamakan kesenyapan kabin",
    ],
    perluDiketahui: [
      "Varian tertinggi Innova Zenix: hybrid, 7 penumpang, kursi kapten baris kedua.",
      "Zenix memakai sasis monokok dan penggerak roda depan, jadi karakternya lebih halus dari Innova Reborn.",
    ],
    faq: [
      { q: "Apa beda Zenix Type-Q HEV dengan Type-V HEV?", a: "Keduanya hybrid. Type-Q adalah varian tertinggi dengan kelengkapan kabin paling banyak, terutama kursi kapten baris kedua yang lebih nyaman untuk penumpang belakang." },
      { q: "Zenix Q atau Alphard?", a: "Kalau yang dicari kenyamanan kursi kapten dan kabin senyap dengan anggaran lebih hemat, Zenix Q sudah sangat nyaman. Alphard dipilih bila kesan kelas mewah ikut penting." },
    ],
  },
  20: {
    cocokUntuk: [
      "Keluarga 7 orang yang ingin MPV hybrid irit dengan kelengkapan di atas Type-G",
      "Perjalanan jauh Jabodetabek–Jawa dengan kenyamanan kabin",
      "Antar-jemput karyawan atau tamu perusahaan",
    ],
    perluDiketahui: [
      "Innova Zenix hybrid, 7 penumpang, keluaran 2024.",
      "Hybrid membuat konsumsi bahan bakar lebih efisien, terutama di jalan macet.",
    ],
    faq: [
      { q: "Zenix V HEV atau G HEV?", a: "Keduanya hybrid 7 penumpang. Type-V punya kelengkapan kabin lebih banyak; Type-G HEV pilihan hybrid dengan tarif lebih rendah." },
      { q: "Apakah hybrid perlu dicas?", a: "Tidak. Baterainya terisi sendiri saat mobil berjalan; cukup isi bensin seperti biasa." },
    ],
  },
  19: {
    cocokUntuk: [
      "Keluarga yang ingin MPV hybrid irit dengan tarif paling terjangkau di antara Zenix hybrid",
      "Penggunaan harian di kota yang sering macet",
      "Sewa bulanan untuk operasional dengan biaya bahan bakar lebih rendah",
    ],
    perluDiketahui: [
      "Innova Zenix hybrid, 7 penumpang, keluaran 2024.",
      "Tidak perlu dicas: baterai hybrid terisi sendiri saat berkendara.",
    ],
    faq: [
      { q: "Zenix G HEV atau Zenix G bensin?", a: "Keduanya varian G. Versi HEV lebih irit terutama di jalan macet, versi bensin tarifnya sedikit lebih rendah." },
      { q: "Cocok untuk sewa bulanan kantor?", a: "Cocok, terutama untuk pemakaian dalam kota yang sering macet. Skema bulanan dijelaskan tim sesuai kebutuhan." },
    ],
  },
  18: {
    cocokUntuk: [
      "Keluarga 7 orang yang mencari Innova terbaru dengan tarif paling hemat di jajaran Zenix",
      "Perjalanan wisata dan acara keluarga",
      "Operasional kantor yang butuh MPV nyaman",
    ],
    perluDiketahui: [
      "Innova Zenix bensin (bukan hybrid), 7 penumpang, keluaran 2024.",
      "Sasis monokok dan penggerak roda depan membuat bantingannya lebih halus dari Innova Reborn.",
    ],
    faq: [
      { q: "Zenix G atau Innova Reborn?", a: "Zenix G generasi lebih baru dengan kabin lebih senyap dan bantingan lebih halus. Reborn diesel dengan sasis ladder frame, lebih kuat untuk muatan penuh dan rute berat." },
      { q: "Bisa untuk perjalanan ke luar kota?", a: "Bisa. Sebutkan kota tujuan saat pemesanan." },
    ],
  },
  17: {
    cocokUntuk: [
      "Acara keluarga, penjemputan tamu, atau kegiatan perusahaan yang ingin mobil terlihat lebih gagah",
      "Perjalanan luar kota dengan muatan penuh",
      "Pengguna yang suka Innova diesel dengan tampilan berbeda",
    ],
    perluDiketahui: [
      "Berbasis Innova Reborn: diesel, sasis ladder frame, 7 penumpang, keluaran 2024.",
      "Isi dengan solar/diesel, bukan bensin.",
    ],
    faq: [
      { q: "Apa beda Venturer dengan Reborn Type-V?", a: "Mesin dan sasisnya sama. Venturer punya tampilan bodi yang lebih agresif dan kelengkapan interior di atas Type-V." },
      { q: "Cocok untuk mudik?", a: "Cocok. Diesel dan sasisnya kuat untuk perjalanan jauh dengan 7 penumpang dan bagasi penuh." },
    ],
  },
  16: {
    cocokUntuk: [
      "Keluarga atau rombongan 7 orang yang mencari Innova diesel dengan kelengkapan lebih",
      "Perjalanan luar kota dengan muatan penuh",
      "Antar-jemput karyawan atau tamu",
    ],
    perluDiketahui: [
      "Innova Reborn Type-V: diesel, sasis ladder frame, 7 penumpang, keluaran 2024.",
      "Isi dengan solar/diesel, bukan bensin.",
    ],
    faq: [
      { q: "Reborn Type-V atau Type-G?", a: "Tarif keduanya sama di armada kami. Type-V punya kelengkapan kabin lebih banyak, jadi biasanya lebih dipilih bila tersedia di tanggal Anda." },
      { q: "Reborn atau Zenix untuk luar kota?", a: "Reborn diesel lebih kuat untuk muatan penuh dan rute berat; Zenix lebih halus dan senyap untuk jalan tol." },
    ],
  },
  12: {
    cocokUntuk: [
      "Keluarga 7 orang yang ingin Fortuner dengan tampilan paling mewah",
      "Perjalanan luar kota dengan gaya",
      "Acara yang butuh SUV besar untuk tamu",
    ],
    perluDiketahui: [
      "Fortuner Legender, 7 penumpang, bensin, keluaran 2025 — unit Fortuner terbaru kami.",
      "Ukuran bodi besar; perhatikan saat parkir di area sempit.",
    ],
    faq: [
      { q: "Legender atau Fortuner 2.8 GR?", a: "Legender keluaran lebih baru dengan tampilan lebih mewah. Fortuner 2.8 GR diesel bertenaga besar dengan tarif lebih rendah, cocok untuk rute berat." },
      { q: "Bisa dengan sopir?", a: "Bisa. Semua unit tersedia lepas kunci maupun plus sopir." },
    ],
  },
  6: {
    cocokUntuk: [
      "Merasakan kenyamanan Alphard dengan tarif paling terjangkau di kelas MPV mewah kami",
      "Pernikahan dan acara keluarga",
      "Penjemputan tamu dalam kota",
    ],
    perluDiketahui: [
      "Generasi ketiga, bensin, 6 penumpang, keluaran 2022 — unit tertua di armada, tetap dirawat dan diperiksa sebelum diserahkan.",
      "Termasuk kelas mewah dengan ketentuan sewa tersendiri.",
    ],
    faq: [
      { q: "Alphard Gen 3 masih nyaman?", a: "Masih. Kursi kapten dan kabin lega yang membuat Alphard dicari tetap ada; bedanya pada desain dan fitur generasi terbaru." },
      { q: "Kenapa lebih murah dari Gen 4?", a: "Karena generasinya lebih lama. Untuk acara yang terpenting kenyamanan penumpang, Gen 3 sering jadi pilihan paling hemat." },
    ],
  },
  3: {
    cocokUntuk: [
      "Keluarga atau rombongan 7 orang dengan tarif Innova diesel paling hemat (sama dengan Reborn Type-V)",
      "Perjalanan luar kota dengan muatan penuh",
      "Sewa bulanan untuk operasional",
    ],
    perluDiketahui: [
      "Innova Reborn Type-G: diesel, sasis ladder frame, 7 penumpang, keluaran 2024.",
      "Isi dengan solar/diesel, bukan bensin.",
    ],
    faq: [
      { q: "Apa beda Type-G dengan Type-V?", a: "Mesin, sasis, dan tarifnya sama di armada kami. Type-V punya kelengkapan kabin lebih banyak; Type-G pilihan yang sama andalnya bila Type-V sudah terisi." },
      { q: "Cocok untuk sewa bulanan?", a: "Cocok, Innova diesel memang banyak dipakai untuk operasional kantor. Skema bulanan dijelaskan tim sesuai kebutuhan." },
    ],
  },
};
