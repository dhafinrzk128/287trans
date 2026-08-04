require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

function placeholderImg(seed, w = 800, h = 600) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

const mobilData = [
  {
    namaMobil: "Toyota Avanza",
    tipe: "MPV",
    tahun: 2023,
    transmisi: "Manual",
    bahanBakar: "Bensin",
    kapasitas: 7,
    hargaPerHari: 350000,
    deskripsi:
      "Toyota Avanza adalah MPV keluarga yang irit bahan bakar dan lapang, cocok untuk perjalanan luar kota bersama keluarga.",
    status: "tersedia",
    fotoSeed: "avanza",
  },
  {
    namaMobil: "Daihatsu Xenia",
    tipe: "MPV",
    tahun: 2022,
    transmisi: "Manual",
    bahanBakar: "Bensin",
    kapasitas: 7,
    hargaPerHari: 330000,
    deskripsi:
      "Daihatsu Xenia menawarkan kenyamanan berkendara dengan kabin luas dan konsumsi BBM yang efisien.",
    status: "tersedia",
    fotoSeed: "xenia",
  },
  {
    namaMobil: "Toyota Innova Reborn",
    tipe: "MPV Premium",
    tahun: 2024,
    transmisi: "Matic",
    bahanBakar: "Diesel",
    kapasitas: 7,
    hargaPerHari: 550000,
    deskripsi:
      "Innova Reborn dengan mesin diesel bertenaga, kabin senyap, dan kenyamanan kelas atas untuk perjalanan jauh.",
    status: "tersedia",
    fotoSeed: "innova",
  },
  {
    namaMobil: "Honda Brio",
    tipe: "City Car",
    tahun: 2023,
    transmisi: "Matic",
    bahanBakar: "Bensin",
    kapasitas: 5,
    hargaPerHari: 275000,
    deskripsi:
      "Honda Brio cocok untuk mobilitas perkotaan, lincah dan mudah diparkir di area sempit.",
    status: "tersedia",
    fotoSeed: "brio",
  },
  {
    namaMobil: "Mitsubishi Pajero Sport",
    tipe: "SUV",
    tahun: 2024,
    transmisi: "Matic",
    bahanBakar: "Diesel",
    kapasitas: 7,
    hargaPerHari: 850000,
    deskripsi:
      "SUV tangguh dengan performa tinggi, cocok untuk perjalanan keluarga maupun medan menantang.",
    status: "tersedia",
    fotoSeed: "pajero",
  },
  {
    namaMobil: "Toyota Alphard",
    tipe: "Luxury MPV",
    tahun: 2024,
    transmisi: "Matic",
    bahanBakar: "Bensin",
    kapasitas: 6,
    hargaPerHari: 1800000,
    deskripsi:
      "Alphard menghadirkan kemewahan dan kenyamanan premium, ideal untuk acara VIP atau perjalanan eksekutif.",
    status: "tersedia",
    fotoSeed: "alphard",
  },
  {
    namaMobil: "Suzuki Ertiga",
    tipe: "MPV",
    tahun: 2022,
    transmisi: "Manual",
    bahanBakar: "Bensin",
    kapasitas: 7,
    hargaPerHari: 300000,
    deskripsi:
      "Ertiga adalah pilihan ekonomis dengan ruang kabin lapang dan perawatan yang terjangkau.",
    status: "disewa",
    fotoSeed: "ertiga",
  },
  {
    namaMobil: "Toyota Fortuner",
    tipe: "SUV",
    tahun: 2023,
    transmisi: "Matic",
    bahanBakar: "Diesel",
    kapasitas: 7,
    hargaPerHari: 900000,
    deskripsi:
      "Fortuner memberikan kombinasi gagah, tangguh, dan nyaman untuk perjalanan keluarga maupun bisnis.",
    status: "maintenance",
    fotoSeed: "fortuner",
  },
];

const testimoniData = [
  { nama: "Budi Santoso", kota: "Jakarta", pesan: "Prosesnya cepat, mobil bersih dan terawat. Sangat direkomendasikan untuk perjalanan keluarga!", rating: 5, urutan: 1 },
  { nama: "Rina Wijaya", kota: "Bandung", pesan: "Ajukan booking online tanpa ribet, tidak perlu daftar akun. Admin juga responsif saat dihubungi via WhatsApp.", rating: 5, urutan: 2 },
  { nama: "Ahmad Fauzi", kota: "Surabaya", pesan: "Harga bersaing dibanding tempat lain, unit yang saya sewa juga sesuai dengan foto di website.", rating: 4, urutan: 3 },
];

const faqData = [
  {
    pertanyaan: "Apa saja syarat menyewa mobil di 287 Trans?",
    jawaban: "Anda cukup menyiapkan KTP yang masih berlaku dan mengisi form booking online. Tidak perlu membuat akun terlebih dahulu.",
    urutan: 1,
  },
  {
    pertanyaan: "Apakah bisa sewa lepas kunci?",
    jawaban: "Ya, seluruh unit kami tersedia untuk sewa lepas kunci (tanpa sopir). Sewa dengan sopir juga bisa diatur, silakan hubungi tim kami.",
    urutan: 2,
  },
  {
    pertanyaan: "Bagaimana sistem hitungan sewanya?",
    jawaban: "Harga sewa dihitung per hari (24 jam) dikalikan jumlah hari sewa, dimulai dari tanggal ambil hingga tanggal kembali.",
    urutan: 3,
  },
];

async function main() {
  const adminUsername = process.env.ADMIN_DEFAULT_USERNAME || "admin";
  const adminPassword = process.env.ADMIN_DEFAULT_PASSWORD || "admin123";
  const hashed = await bcrypt.hash(adminPassword, 10);

  await prisma.admin.upsert({
    where: { username: adminUsername },
    update: {},
    create: { username: adminUsername, password: hashed },
  });
  console.log(`Admin default siap -> username: ${adminUsername} / password: ${adminPassword}`);

  await prisma.companyProfile.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      namaPerusahaan: "287 Trans",
      deskripsi:
        "287 Trans adalah perusahaan penyedia jasa rental mobil premium terpercaya yang telah melayani ribuan pelanggan di seluruh Indonesia. Kami menghadirkan armada unit-unit terbaru dengan kondisi prima, harga bersaing, dan proses booking yang mudah secara online tanpa perlu membuat akun.",
      keunggulan: JSON.stringify([
        { judul: "Armada Premium", deskripsi: "Unit-unit terbaru dari city car hingga SUV dan luxury MPV kelas premium." },
        { judul: "Harga Bersaing", deskripsi: "Tarif transparan tanpa biaya tersembunyi." },
        { judul: "Proses Mudah", deskripsi: "Booking online 24 jam tanpa perlu registrasi akun." },
        { judul: "Unit Terawat", deskripsi: "Seluruh armada rutin diservis dan dibersihkan sebelum disewakan." },
      ]),
      alamat: "Jl. Lembang Baru II, RT.003/RW.009, Sudimara Bar., Kec. Ciledug, Kota Tangerang, Banten 15151",
      mapsEmbedUrl: "https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s-6.2364238,106.7043074!6i17",
      telepon: "021-5550287",
      whatsapp: "62811144287",
      email: "info@287trans.co.id",
      fotoUrl: placeholderImg("kantor-287trans", 1200, 700),
    },
  });
  console.log("Company profile default siap.");

  for (const item of mobilData) {
    const { fotoSeed, ...mobilFields } = item;
    const existing = await prisma.mobil.findFirst({ where: { namaMobil: item.namaMobil } });
    if (existing) {
      await prisma.mobil.update({
        where: { idMobil: existing.idMobil },
        data: { bahanBakar: mobilFields.bahanBakar, tahun: mobilFields.tahun },
      });
      continue;
    }
    await prisma.mobil.create({
      data: {
        ...mobilFields,
        fotos: {
          create: [1, 2, 3].map((n) => ({
            urlFoto: placeholderImg(`${fotoSeed}-${n}`),
            urutan: n,
          })),
        },
      },
    });
  }
  console.log(`${mobilData.length} data mobil contoh siap.`);

  const testimoniCount = await prisma.testimoni.count();
  if (testimoniCount === 0) {
    await prisma.testimoni.createMany({ data: testimoniData });
    console.log(`${testimoniData.length} data testimoni contoh siap.`);
  }

  const faqCount = await prisma.faq.count();
  if (faqCount === 0) {
    await prisma.faq.createMany({ data: faqData });
    console.log(`${faqData.length} data FAQ contoh siap.`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
