const prisma = require("./prisma");

// Deskripsi tiap unit, dipakai untuk mengisi kolom `deskripsi` yang masih
// kosong di basis data.
//
// Kenapa modul ini ada: seluruh 24 halaman /katalog/:id hanya berbagi 146 kata
// yang sama persis (navbar, footer, kalender) dengan 7-9 kata unik — nama
// mobil dan angka harga. Kolom deskripsinya terisi karakter tak terlihat
// (U+3164 HANGUL FILLER), yang tampak kosong di panel admin tapi lolos dari
// pemeriksaan "sudah diisi". Bagi mesin pencari halaman-halaman itu praktis
// kembar, dan halaman kembar tidak diberi peringkat sendiri-sendiri.
//
// Teks di bawah ditulis satu per satu, bukan dari template: yang membedakan
// adalah karakter mesin, alasan orang menyewa unit itu, dan posisinya
// dibanding unit lain di armada yang sama. Angka tarif sengaja TIDAK ditulis
// di sini — harga sudah tampil dari basis data di halaman yang sama, dan
// menyalinnya ke prosa berarti dua tempat yang harus diperbarui bersamaan.
//
// Kunci pencocokan adalah nama unit yang dinormalkan (huruf kecil, spasi
// dirapatkan), sebab nama di basis data tidak konsisten kapitalisasinya
// ("Toyota innova Reborn Type-V").

const DESKRIPSI = {
  "toyota innova reborn type-g":
    "Innova Reborn Type-G keluaran 2024 dengan mesin diesel dan sasis ladder frame — kombinasi yang membuatnya tetap jadi pilihan paling banyak dicari untuk perjalanan jauh meski generasi penggantinya sudah ada. Torsi diesel keluar di putaran rendah, jadi unit ini tidak kehabisan tenaga saat tiga baris kursinya terisi penuh beserta bagasi. Type-G adalah varian dasar Reborn: kelengkapan secukupnya, tapi mesin dan sasisnya sama dengan varian di atasnya. Matic, 7 penumpang. Di Tangerang unit ini paling sering disewa untuk mudik, liburan keluarga besar, dan antar-jemput rombongan ke Bandara Soekarno-Hatta. Tersedia lepas kunci dengan syarat KTP saja, atau plus sopir dengan biaya terpisah.",

  "toyota innova reborn type-v":
    "Innova Reborn Type-V adalah varian atas Reborn: mesin diesel dan sasis ladder frame yang sama dengan Type-G, tapi dengan interior yang lebih lengkap — pelapis jok lebih baik, kelengkapan dasbor lebih penuh, dan peredaman kabin terasa lebih rapat. Perbedaannya paling kentara kalau penumpang belakang adalah tamu yang perlu dijamu, bukan keluarga sendiri. Unit 2024, matic, 7 penumpang. Diesel membuatnya nyaman untuk rute tol jarak jauh dengan kecepatan stabil, dan konsumsi bahan bakarnya lebih hemat dibanding MPV bensin sekelas pada pemakaian luar kota. Banyak dipakai perusahaan di Tangerang untuk operasional harian dan penjemputan tamu. Bisa lepas kunci maupun dengan sopir.",

  "toyota innova venturer":
    "Innova Venturer adalah Reborn dengan paket tampilan yang dibedakan: bumper, gril, dan aksen bodi digarap lebih agresif, ditambah kelengkapan interior di atas Type-V. Mesinnya tetap diesel dengan sasis ladder frame, jadi karakter berkendaranya sama kuatnya untuk rute luar kota dan muatan penuh. Unit 2024, matic, 7 penumpang. Venturer banyak dipilih ketika kesan tampilan ikut dihitung — acara keluarga, penjemputan tamu, atau kegiatan perusahaan yang mobilnya terlihat orang banyak — tanpa harus naik ke kelas SUV yang tarifnya lebih tinggi. Di Tangerang unit ini juga sering disewa harian untuk perjalanan ke luar kota. Lepas kunci atau plus sopir, keduanya tersedia.",

  "toyota innova zenix type-g":
    "Innova Zenix Type-G adalah pintu masuk ke generasi terbaru Innova, yang pindah dari sasis ladder frame ke basis monokok. Perubahan itu paling terasa di jalan kota: bantingan lebih halus dan suara jalan lebih teredam dibanding Reborn. Varian ini bermesin bensin — pilihan yang masuk akal kalau pemakaian Anda tidak menempuh jarak sangat jauh setiap hari, karena selisih tarifnya dibanding versi hybrid tidak perlu dikejar. Unit 2024, matic, 7 penumpang. Cocok untuk keluarga yang mengutamakan kenyamanan kabin, antar-jemput harian di Tangerang dan Jabodetabek, serta perjalanan akhir pekan. Syarat sewa lepas kunci cukup KTP aktif, tanpa jaminan BPKB.",

  "toyota innova zenix type-g hev":
    "Zenix Type-G HEV adalah versi hybrid dari varian dasar Zenix. Kelengkapannya setara Type-G bensin, tapi sistem hybrid-nya mengubah hitungan biaya perjalanan: motor listrik mengambil alih saat kecepatan rendah dan berhenti-jalan, yang justru kondisi paling sering di jalan Tangerang dan Jakarta. Selisih tarif hariannya dibanding versi bensin biasanya tertutup oleh hemat bahan bakar dalam beberapa hari pemakaian dalam kota. Kalau rute Anda didominasi tol jarak jauh, bedanya lebih tipis. Unit 2024, matic, 7 penumpang, basis monokok dengan peredaman kabin yang lebih rapat dari generasi Reborn. Tersedia lepas kunci maupun dengan sopir, biaya sopir dihitung terpisah.",

  "toyota innova zenix type-v hev":
    "Zenix Type-V HEV menempati posisi tengah di jajaran Zenix: sistem hybrid yang sama dengan Type-G HEV, tapi dengan kelengkapan interior dan fitur berkendara yang lebih lengkap. Naik ke varian ini masuk akal kalau penumpang baris kedua adalah tamu perusahaan atau orang yang perlu dijamu — perbedaannya ada di detail yang mereka rasakan langsung. Unit 2024, matic, 7 penumpang. Basis monokok membuat kabinnya lebih senyap dibanding Innova generasi sebelumnya, dan sistem hybrid bekerja paling efisien pada rute dalam kota yang banyak berhenti. Sering disewa di Tangerang untuk agenda kerja berpindah lokasi dan penjemputan bandara. Lepas kunci atau plus sopir.",

  "toyota innova zenix type-q hev":
    "Zenix Type-Q HEV adalah varian tertinggi Innova Zenix, dan pembedanya yang paling nyata ada di baris kedua: kursi kapten terpisah dengan sandaran yang bisa direbahkan, bukan bangku menyatu seperti varian di bawahnya. Untuk penjemputan tamu penting atau perjalanan luar kota yang panjang, itu perbedaan yang terasa sepanjang perjalanan, bukan sekadar daftar fitur. Sistem hybrid-nya membuat konsumsi bahan bakar tetap terkendali meski unitnya paling lengkap. Unit 2024, matic, 7 penumpang. Di Tangerang, Type-Q paling sering dipesan perusahaan untuk menjemput tamu dari luar kota dan agenda yang mengutamakan kenyamanan penumpang belakang. Tersedia lepas kunci maupun dengan sopir.",

  "toyota fortuner 2.8 gr":
    "Fortuner 2.8 GR bermesin diesel dengan sasis ladder frame — SUV yang tenaganya keluar di putaran rendah, jadi tidak kewalahan saat membawa tujuh penumpang beserta bagasi di tanjakan atau rute luar kota. Paket GR membedakan tampilan luar dan sentuhan interiornya dari varian standar. Unit 2023, matic, 7 penumpang. Ground clearance tinggi membuatnya nyaman melewati jalan yang permukaannya tidak rata, akses ke lokasi proyek, atau rute daerah yang jalannya belum mulus. Di Tangerang unit ini banyak disewa perusahaan untuk kunjungan lapangan dan penjemputan tamu, serta keluarga untuk perjalanan antarkota. Lepas kunci dengan syarat KTP, atau plus sopir dengan biaya terpisah.",

  "toyota fortuner legender":
    "Fortuner Legender adalah varian tertinggi Fortuner dengan tampilan depan yang dibedakan dari versi GR, dan unit kami bermesin bensin — lebih halus serta lebih senyap untuk pemakaian dalam kota dibanding varian diesel. Sasis ladder frame-nya tetap, jadi ground clearance tinggi dan kemampuan melewati jalan rusak tidak berkurang. Unit 2025, matic, 7 penumpang. Legender paling sering dipilih ketika tampilan kendaraan ikut dihitung: menjemput tamu perusahaan, acara keluarga, atau kunjungan yang mobilnya terlihat banyak orang. Untuk rute campuran kota dan luar kota di Tangerang dan Jabodetabek, varian bensin ini terasa lebih nyaman sehari-hari. Tersedia lepas kunci maupun dengan sopir.",

  "toyota alphard type-g gen 3":
    "Alphard generasi ketiga Type-G keluaran 2022 — pilihan paling terjangkau untuk masuk ke kelas MPV mewah tanpa mengorbankan hal yang membuat Alphard dicari: pintu geser elektrik, kursi kapten baris kedua dengan sandaran kaki, dan kabin yang senyap. Kapasitas 6 penumpang, matic, bermesin bensin. Di Tangerang unit ini paling banyak disewa untuk acara pernikahan, penjemputan tamu perusahaan dari bandara, dan perjalanan keluarga yang mengutamakan kenyamanan penumpang belakang. Generasi ketiga punya karakter berkendara yang lebih tegas dibanding generasi terbaru, dengan tarif harian yang jauh lebih ringan. Tanggal ramai sebaiknya dikunci lebih awal. Tersedia lepas kunci maupun dengan sopir.",

  "toyota alphard type-g gen 4":
    "Alphard generasi keempat Type-G keluaran 2024 — generasi terbaru dengan perubahan paling terasa di peredaman kabin dan kualitas material interior. Suara jalan dan mesin jauh lebih tertahan dibanding generasi sebelumnya, yang membuat percakapan di dalam mobil tetap nyaman pada kecepatan tol. Kursi kapten baris kedua, pintu geser elektrik, kapasitas 6 penumpang, matic, bermesin bensin. Ini unit yang paling sering diminta untuk penjemputan tamu penting, acara pernikahan, dan agenda perusahaan di Tangerang dan Jakarta yang kesan kendaraannya ikut dinilai. Karena permintaannya tinggi, tanggal pemakaian sebaiknya dikonfirmasi jauh hari. Bisa disewa lepas kunci maupun dengan sopir.",

  "toyota alphard gen 4 hev":
    "Alphard generasi keempat versi hybrid — unit paling lengkap di kelas MPV mewah kami. Sistem hybrid-nya bukan sekadar soal irit: motor listrik membuat perpindahan tenaga jauh lebih halus dan kabin nyaris tanpa suara mesin pada kecepatan rendah, yang terasa persis ketika mobil merayap di kawasan acara atau menjemput tamu di lobi hotel. Unit 2024, matic, 6 penumpang, kursi kapten baris kedua dengan pintu geser elektrik. Di Tangerang dan Jakarta unit ini paling sering dipesan untuk penjemputan tamu perusahaan, pernikahan, dan perjalanan yang penumpang belakangnya bekerja selama di jalan. Tersedia lepas kunci maupun dengan sopir.",

  "honda hrv se":
    "Honda HR-V SE keluaran 2023 — unit paling ringkas di armada kami dan salah satu yang tarif hariannya paling hemat. Dimensinya kecil di luar tapi kabinnya fleksibel, dengan konfigurasi kursi belakang yang bisa dilipat untuk memuat barang tinggi. Kapasitas 5 penumpang, matic, bensin. Ini pilihan yang masuk akal untuk pemakaian dalam kota Tangerang dan Jakarta: lincah di jalan sempit, mudah diparkir di gedung bertingkat, dan konsumsi bahan bakarnya paling ringan di antara unit kami. Paling sering disewa untuk pemakaian harian jangka panjang, kebutuhan operasional perorangan, dan perjalanan berdua atau bertiga. Terjangkau juga untuk sewa mingguan dan bulanan.",

  "honda crv turbo":
    "Honda CR-V Turbo keluaran 2025 — SUV berbasis monokok, bukan ladder frame, dan perbedaannya langsung terasa: bantingannya jauh lebih halus dan setirnya lebih ringan dibanding SUV seperti Fortuner atau Pajero Sport. Mesin turbo bertenaga cukup untuk menyalip di tol tanpa harus menunggu putaran naik. Kapasitas 5 penumpang, matic, bensin. CR-V cocok kalau Anda ingin posisi duduk tinggi dan kesan SUV, tapi sebagian besar rute Anda ada di jalan aspal kota Tangerang dan Jabodetabek. Banyak dipilih untuk operasional perusahaan, perjalanan keluarga kecil, dan pemakaian harian jangka panjang. Tersedia lepas kunci maupun dengan sopir.",

  "honda accord turbo":
    "Honda Accord Turbo keluaran 2025 — sedan dengan mesin turbo berkapasitas kecil yang tenaganya setara mesin konvensional jauh lebih besar, sambil tetap hemat bahan bakar. Titik berat rendah membuat mobil ini paling stabil di antara unit kami saat melaju kencang di tol, dan kabinnya senyap karena permukaan bodinya tidak setinggi MPV atau SUV. Kapasitas 5 penumpang, matic, bensin. Permintaan Accord di Tangerang paling banyak datang dari kebutuhan kerja: kendaraan operasional harian, menjemput relasi bisnis, dan agenda yang berpindah antar kantor di Jakarta. Sedan juga lebih mudah masuk basement gedung dengan batas tinggi. Lepas kunci atau plus sopir.",

  "mitsubishi pajero sport dakar":
    "Pajero Sport Dakar keluaran 2024 dengan mesin diesel dan sasis ladder frame — pesaing langsung Fortuner, dengan karakter yang sedikit berbeda: peredaman Pajero terasa lebih lembut untuk penumpang belakang, sementara tampilannya lebih menonjol. Torsi diesel besar di putaran rendah, jadi kuat membawa tujuh penumpang penuh di tanjakan maupun rute luar kota yang panjang. Matic, 7 penumpang, ground clearance tinggi. Di Tangerang unit ini banyak disewa untuk perjalanan antarkota, kunjungan ke lokasi yang aksesnya belum mulus, dan kebutuhan keluarga besar. Konsumsi solarnya juga lebih ekonomis dibanding SUV bensin sekelas pada rute jauh. Tersedia lepas kunci maupun dengan sopir.",

  "mitsubishi destinator":
    "Mitsubishi Destinator keluaran 2026 — unit terbaru di armada kami dan salah satu SUV tujuh penumpang paling anyar yang bisa Anda sewa di Tangerang. Berbasis monokok dengan mesin bensin, jadi karakternya lebih dekat ke SUV perkotaan: bantingan halus, setir ringan, dan kabin senyap, sambil tetap menyediakan tiga baris kursi. Matic, 7 penumpang. Ini pilihan untuk Anda yang butuh kapasitas tujuh orang tapi rutenya didominasi jalan kota dan tol, bukan medan berat — di situ Destinator terasa lebih nyaman dibanding SUV bersasis ladder frame. Karena unitnya baru, ketersediaan tanggal sebaiknya dikonfirmasi lebih awal. Lepas kunci atau plus sopir.",

  "hyundai palisade signature":
    "Hyundai Palisade Signature keluaran 2023 — SUV besar bermesin diesel dengan kabin yang jauh lebih lapang dibanding SUV tujuh penumpang pada umumnya. Bedanya paling terasa di baris ketiga: orang dewasa bisa duduk di sana untuk perjalanan jauh tanpa merasa terjepit, sesuatu yang jarang berlaku di kelas ini. Matic, 7 penumpang. Varian Signature adalah versi paling lengkap, dengan kualitas material interior yang mendekati kelas mewah. Di Tangerang unit ini disewa untuk perjalanan keluarga besar antarkota, penjemputan rombongan, dan agenda perusahaan yang penumpangnya banyak tapi tetap menuntut kenyamanan. Mesin diesel membuatnya ekonomis untuk rute panjang. Tersedia lepas kunci maupun dengan sopir.",

  "hyundai ioniq 5":
    "Hyundai Ioniq 5 keluaran 2024 — satu-satunya mobil listrik di armada kami, dan pengalaman berkendaranya memang berbeda: tenaga keluar seketika tanpa jeda perpindahan gigi, dan kabinnya nyaris tanpa suara karena tidak ada mesin pembakaran. Jarak antar-roda yang panjang membuat ruang kaki belakang terasa lapang meski kapasitasnya 5 penumpang. Biaya per kilometernya jauh lebih rendah dibanding mobil bensin, jadi untuk pemakaian harian di Tangerang dan Jakarta hitungan totalnya bisa lebih hemat daripada yang terlihat dari tarif hariannya. Yang perlu Anda pertimbangkan: pengisian daya butuh perencanaan, meski stasiun pengisian umum di Jabodetabek sudah banyak. Tersedia lepas kunci maupun dengan sopir.",

  "mercedes-benz c300":
    "Mercedes-Benz C300 keluaran 2025 — sedan mewah dengan dimensi yang lebih ringkas dari E300, dan justru itu kelebihannya untuk pemakaian kota: lebih mudah bermanuver di jalan Tangerang dan Jakarta yang padat, serta lebih gampang masuk basement gedung. Kabinnya tetap membawa standar material dan peredaman Mercedes, dengan kualitas yang langsung terasa begitu pintu ditutup. Matic, bensin, 5 penumpang. Paling sering disewa untuk agenda kerja yang mengutamakan kesan profesional, menjemput relasi bisnis, dan acara yang berlangsung di kawasan perkantoran atau hotel. Kategori ini punya ketentuan sewa tersendiri — tim kami akan menjelaskannya di awal, sebelum Anda memutuskan.",

  "mercedes-benz e300":
    "Mercedes-Benz E300 keluaran 2024 — sedan mewah satu kelas di atas C300, dengan jarak antar-roda lebih panjang yang langsung terasa di ruang kaki penumpang belakang. Ini bedanya yang paling menentukan: kalau orang yang Anda jamu duduk di belakang, E300 memberi ruang dan ketenangan yang tidak bisa diberikan sedan yang lebih ringkas. Peredaman kabinnya membuat percakapan tetap nyaman pada kecepatan tol. Matic, bensin, 5 penumpang. Di Tangerang dan Jakarta unit ini paling banyak dipesan untuk penjemputan tamu perusahaan, acara resmi, dan agenda yang kesan kendaraannya ikut dinilai. Kategori mewah punya ketentuan sewa tersendiri yang kami sampaikan di awal.",

  "mercedes-benz glc300":
    "Mercedes-Benz GLC300 keluaran 2025 — SUV mewah yang mengisi posisi tidak tergantikan sedan: Anda mendapat posisi duduk tinggi dan ground clearance yang lebih aman untuk polisi tidur dan jalan bergelombang, tanpa turun kelas dari kualitas kabin Mercedes. Matic, bensin, 5 penumpang. GLC300 jadi pilihan tepat kalau agenda Anda tidak seluruhnya berlangsung di kawasan berakses mulus — kunjungan ke lokasi, perumahan dengan jalan sempit, atau rute luar kota yang permukaannya tidak selalu rata. Untuk agenda yang semuanya di perkantoran dan hotel, C300 atau E300 sudah cukup. Kategori mewah punya ketentuan sewa tersendiri yang dijelaskan di awal.",

  "bmw 330i g20 m-sport pro":
    "BMW 330i G20 dengan paket M-Sport Pro, keluaran 2025 — sedan yang karakter berkendaranya paling terasa sporty di antara unit mewah kami. Mesin turbo dan setelan sasis BMW membuat respons setir lebih tajam dan bodi lebih stabil di tikungan cepat dibanding sedan mewah sekelasnya. Paket M-Sport Pro menambah detail bodi, pelek, dan sentuhan interior yang membedakannya dari varian standar. Matic, bensin, 5 penumpang. Di Tangerang dan Jakarta unit ini disewa untuk acara yang tampilan kendaraannya jadi bagian dari kesan, sesi pemotretan, dan agenda pribadi. Kategori mewah punya ketentuan sewa tersendiri yang kami sampaikan sebelum pemesanan dikunci.",

  "bmw m4 competition cabriolet":
    "BMW M4 Competition Cabriolet keluaran 2024 — unit paling istimewa di armada kami, dan satu-satunya beratap terbuka. Mesin M Competition adalah versi paling bertenaga dari lini M4, dan atap lipatnya bisa dibuka-tutup untuk mengubah seluruh karakter perjalanan dalam hitungan detik. Matic, bensin. Unit ini disewa untuk keperluan yang sangat spesifik: sesi pemotretan dan pengambilan video, acara pernikahan, perayaan pribadi, dan kebutuhan tampilan yang tidak bisa digantikan mobil lain. Karena hanya ada satu unit dan permintaannya menumpuk di tanggal tertentu, konfirmasi tanggal jauh hari sangat menentukan. Ketentuan sewa kategori ini dijelaskan lengkap di awal, sebelum pemesanan.",
};

// Karakter yang tampak kosong tapi bukan spasi biasa. U+3164 (HANGUL FILLER)
// adalah yang sebenarnya terpakai di produksi; sisanya ikut didaftar karena
// sama-sama lolos dari trim() dan sama-sama tak terlihat di panel admin.
//
// Ditulis sebagai titik kode, bukan karakternya sendiri: karakter tak
// terlihat di dalam kode sumber tidak bisa dibaca, tidak bisa ditinjau, dan
// mudah hilang saat berkas ini disunting atau disalin.
const KODE_TAK_TERLIHAT = new Set([
  0x00a0, // NO-BREAK SPACE
  0x180e, // MONGOLIAN VOWEL SEPARATOR
  0x200b, 0x200c, 0x200d, // ZERO WIDTH SPACE / NON-JOINER / JOINER
  0x200e, 0x200f, // LEFT-TO-RIGHT & RIGHT-TO-LEFT MARK
  0x202f, 0x205f, 0x2060, // NARROW NBSP / MEDIUM MATH SPACE / WORD JOINER
  0x3000, // IDEOGRAPHIC SPACE
  0x3164, // HANGUL FILLER  <- yang dipakai di basis data produksi
  0xfeff, // ZERO WIDTH NO-BREAK SPACE (BOM)
]);

function kosong(teks) {
  if (!teks) return true;
  for (const huruf of teks) {
    if (/\s/.test(huruf)) continue;
    if (KODE_TAK_TERLIHAT.has(huruf.codePointAt(0))) continue;
    return false;
  }
  return true;
}

// Ambang "terlalu pendek untuk jadi isi halaman".
//
// Dua unit di produksi berisi coretan, bukan deskripsi: "mercy E300" dan
// "G HEV". Keduanya lolos dari kosong() karena memang ada hurufnya, padahal
// tidak menyelesaikan apa pun — halaman tetap kembar dan calon penyewa tetap
// tidak mendapat keterangan. Dua kata tidak mungkin merupakan isi halaman
// yang disengaja, sedangkan deskripsi terpendek yang ditulis tangan di modul
// ini panjangnya 92 kata. Delapan kata memberi jarak lebar ke keduanya.
const MINIMAL_KATA = 8;

function belumBerisi(teks) {
  if (kosong(teks)) return true;
  return teks.trim().split(/\s+/).length < MINIMAL_KATA;
}

function normalkan(nama) {
  return nama.trim().toLowerCase().replace(/\s+/g, " ");
}

/**
 * Mengisi deskripsi unit yang masih kosong, dan hanya yang masih kosong.
 *
 * Aman diulang tiap boot: unit yang deskripsinya sudah berisi teks sungguhan
 * — termasuk yang diketik sendiri lewat panel admin — tidak pernah disentuh,
 * sehingga suntingan manual tidak bisa tertimpa oleh modul ini.
 */
async function isiDeskripsiKosong() {
  const semua = await prisma.mobil.findMany({
    select: { idMobil: true, namaMobil: true, deskripsi: true },
  });

  const diisi = [];
  const tanpaTeks = [];

  for (const mobil of semua) {
    if (!belumBerisi(mobil.deskripsi)) continue;

    const teks = DESKRIPSI[normalkan(mobil.namaMobil)];
    if (!teks) {
      tanpaTeks.push(mobil.namaMobil);
      continue;
    }

    await prisma.mobil.update({
      where: { idMobil: mobil.idMobil },
      data: { deskripsi: teks },
    });
    diisi.push(mobil.namaMobil);
  }

  return { diperiksa: semua.length, diisi, tanpaTeks };
}

module.exports = { isiDeskripsiKosong, DESKRIPSI, kosong, belumBerisi, normalkan };
