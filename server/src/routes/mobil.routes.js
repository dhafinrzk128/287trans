const express = require("express");
const fs = require("fs");
const path = require("path");
const prisma = require("../utils/prisma");
const { requireAdminAuth } = require("../middleware/auth");
const { uploadMobilFoto, publicUrl } = require("../utils/upload");
const { generateWebpForFiles } = require("../utils/webp");

const router = express.Router();

function unlinkWithWebp(urlFoto) {
  const filePath = path.join(__dirname, "..", "..", urlFoto.replace("/uploads", "uploads"));
  fs.unlink(filePath, () => {});
  fs.unlink(filePath.replace(/\.[^.]+$/, ".webp"), () => {});
}

function serializeMobil(mobil) {
  return {
    ...serializeMobilRingkas(mobil),
    deskripsi: mobil.deskripsi,
    fotos: urutkanFoto(mobil),
  };
}

function urutkanFoto(mobil) {
  return [...(mobil.fotos || [])].sort((a, b) => a.urutan - b.urutan);
}

// Bentuk ringkas: semua yang dibutuhkan sebuah KARTU mobil, tanpa dua field
// yang hanya berarti di halaman detail.
//
// Kenapa ini ada: respons daftar tidak berhenti di jaringan — Home, Katalog,
// Armada, dan halaman koleksi menyimpannya kembali ke <script
// id="__PRERENDER_DATA__"> (lihat client/src/utils/prerenderData.js), jadi
// setiap byte di sini ikut dipanggang ke dalam HTML statis dan dikirim ulang
// ke setiap pengunjung pertama.
//
// Terukur pada build beranda: `deskripsi` terisi prosa per unit (lihat
// utils/deskripsiMobil.js) membuat blob `kategori_ringkas` melar dari 9,9 KB
// jadi 26,0 KB, dan HTML beranda dari 21,4 KB jadi 30,3 KB terkompresi.
// Karena stylesheet-nya sudah disisipkan ke HTML (client/scripts/inlineCss.js),
// dokumen itu satu-satunya berkas yang menahan paint — jadi tambahan itu
// mendarat utuh di First Contentful Paint. Elemen LCP beranda (ornamen kayon)
// juga mundur dari byte ke-81.277 ke byte ke-106.037, artinya browser baru
// MENEMUKAN gambarnya setelah membaca 25 KB lebih banyak.
//
// Sementara itu tidak ada satu pun tampilan daftar yang membaca keduanya:
// CarCard hanya memakai `fotoUtama`, dan panel admin pun sama. Yang benar-
// benar memerlukannya cuma productSchema() di halaman koleksi — dan halaman
// itu memintanya secara eksplisit lewat ?lengkap=1.
function serializeMobilRingkas(mobil) {
  const fotosSorted = urutkanFoto(mobil);
  return {
    idMobil: mobil.idMobil,
    namaMobil: mobil.namaMobil,
    tipe: mobil.tipe,
    tahun: mobil.tahun,
    transmisi: mobil.transmisi,
    bahanBakar: mobil.bahanBakar,
    kapasitas: mobil.kapasitas,
    hargaPerHari: mobil.hargaPerHari,
    status: mobil.status,
    fotoUtama: fotosSorted[0]?.urlFoto || null,
    jumlahFoto: fotosSorted.length,
  };
}

// GET /api/mobil - katalog publik dengan filter
//
// Ringkas secara baku, lengkap kalau diminta. Arahnya sengaja begini dan
// bukan sebaliknya: yang memakai daftar ini hampir selalu hanya butuh kartu
// (harga terendah di hero, hitungan per kategori, petak katalog), sementara
// yang butuh prosa dan seluruh foto cuma satu halaman. Kalau yang mahal jadi
// bakunya, pemanggil berikutnya akan ikut membayarnya tanpa pernah tahu —
// persis yang terjadi pada beranda sampai diukur.
router.get("/", async (req, res) => {
  const { tipe, transmisi, kapasitas, minHarga, maxHarga, status, lengkap } = req.query;

  const where = {};
  if (tipe) where.tipe = tipe;
  if (transmisi) where.transmisi = transmisi;
  if (kapasitas) where.kapasitas = { gte: Number(kapasitas) };
  if (status) where.status = status;
  if (minHarga || maxHarga) {
    where.hargaPerHari = {};
    if (minHarga) where.hargaPerHari.gte = Number(minHarga);
    if (maxHarga) where.hargaPerHari.lte = Number(maxHarga);
  }

  const mobils = await prisma.mobil.findMany({
    where,
    include: { fotos: true },
    orderBy: { createdAt: "desc" },
  });

  const bentuk = lengkap ? serializeMobil : serializeMobilRingkas;
  res.json(mobils.map(bentuk));
});

// GET /api/mobil/tipe-list - daftar tipe unik untuk filter dropdown
router.get("/meta/tipe-list", async (req, res) => {
  const rows = await prisma.mobil.findMany({ select: { tipe: true }, distinct: ["tipe"] });
  res.json(rows.map((r) => r.tipe));
});

// GET /api/mobil/populer - mobil dengan booking terbanyak (bukan dibatalkan) dalam 3 bulan terakhir
router.get("/populer", async (req, res) => {
  const { status, limit } = req.query;
  const take = Math.min(Number(limit) || 8, 20);

  const sejak = new Date();
  sejak.setMonth(sejak.getMonth() - 3);

  const mobils = await prisma.mobil.findMany({
    where: status ? { status } : undefined,
    include: {
      fotos: true,
      _count: {
        select: {
          bookings: {
            where: { statusBooking: { not: "dibatalkan" }, createdAt: { gte: sejak } },
          },
        },
      },
    },
  });

  const sorted = mobils
    .sort((a, b) => b._count.bookings - a._count.bookings || b.createdAt - a.createdAt)
    .slice(0, take);

  // Selalu ringkas: satu-satunya pemanggilnya adalah deretan CarCard di
  // beranda, yang tidak pernah membaca deskripsi maupun daftar fotonya.
  res.json(sorted.map((m) => ({ ...serializeMobilRingkas(m), jumlahBooking: m._count.bookings })));
});

// GET /api/mobil/:id
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const mobil = await prisma.mobil.findUnique({ where: { idMobil: id }, include: { fotos: true } });
  if (!mobil) return res.status(404).json({ message: "Mobil tidak ditemukan." });
  res.json(serializeMobil(mobil));
});

// GET /api/mobil/:id/booked-ranges - tanggal yang sudah dibooking (untuk cek ketersediaan)
router.get("/:id/booked-ranges", async (req, res) => {
  const id = Number(req.params.id);
  const bookings = await prisma.booking.findMany({
    where: {
      idMobil: id,
      statusBooking: { in: ["menunggu_konfirmasi", "dikonfirmasi"] },
    },
    select: { tglAmbil: true, tglKembali: true },
  });
  res.json(bookings);
});

// ------- ADMIN ROUTES -------

router.get("/admin/all", requireAdminAuth, async (req, res) => {
  const mobils = await prisma.mobil.findMany({
    include: { fotos: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(mobils.map(serializeMobil));
});

router.post("/admin", requireAdminAuth, uploadMobilFoto.array("fotos", 10), async (req, res) => {
  const { namaMobil, tipe, tahun, transmisi, bahanBakar, kapasitas, hargaPerHari, deskripsi, status } = req.body;

  if (!namaMobil || !tipe || !tahun || !transmisi || !kapasitas || !hargaPerHari) {
    return res.status(400).json({ message: "Field wajib: namaMobil, tipe, tahun, transmisi, kapasitas, hargaPerHari." });
  }

  const files = req.files || [];
  await generateWebpForFiles(files);
  const mobil = await prisma.mobil.create({
    data: {
      namaMobil,
      tipe,
      tahun: Number(tahun),
      transmisi,
      bahanBakar: bahanBakar || "Bensin",
      kapasitas: Number(kapasitas),
      hargaPerHari: Number(hargaPerHari),
      deskripsi: deskripsi || "",
      status: status || "tersedia",
      fotos: {
        create: files.map((f, i) => ({ urlFoto: publicUrl("mobil", f.filename), urutan: i })),
      },
    },
    include: { fotos: true },
  });

  res.status(201).json(serializeMobil(mobil));
});

router.put("/admin/:id", requireAdminAuth, uploadMobilFoto.array("fotos", 10), async (req, res) => {
  const id = Number(req.params.id);
  const existing = await prisma.mobil.findUnique({ where: { idMobil: id }, include: { fotos: true } });
  if (!existing) return res.status(404).json({ message: "Mobil tidak ditemukan." });

  const { namaMobil, tipe, tahun, transmisi, bahanBakar, kapasitas, hargaPerHari, deskripsi, status } = req.body;
  const files = req.files || [];
  await generateWebpForFiles(files);
  const maxUrutan = existing.fotos.reduce((m, f) => Math.max(m, f.urutan), -1);

  const mobil = await prisma.mobil.update({
    where: { idMobil: id },
    data: {
      ...(namaMobil !== undefined && { namaMobil }),
      ...(tipe !== undefined && { tipe }),
      ...(tahun !== undefined && { tahun: Number(tahun) }),
      ...(transmisi !== undefined && { transmisi }),
      ...(bahanBakar !== undefined && { bahanBakar }),
      ...(kapasitas !== undefined && { kapasitas: Number(kapasitas) }),
      ...(hargaPerHari !== undefined && { hargaPerHari: Number(hargaPerHari) }),
      ...(deskripsi !== undefined && { deskripsi }),
      ...(status !== undefined && { status }),
      ...(files.length > 0 && {
        fotos: {
          create: files.map((f, i) => ({ urlFoto: publicUrl("mobil", f.filename), urutan: maxUrutan + 1 + i })),
        },
      }),
    },
    include: { fotos: true },
  });

  res.json(serializeMobil(mobil));
});

router.delete("/admin/:id", requireAdminAuth, async (req, res) => {
  const id = Number(req.params.id);
  const existing = await prisma.mobil.findUnique({ where: { idMobil: id }, include: { fotos: true } });
  if (!existing) return res.status(404).json({ message: "Mobil tidak ditemukan." });

  const bookingCount = await prisma.booking.count({ where: { idMobil: id } });
  if (bookingCount > 0) {
    return res.status(400).json({
      message: "Mobil tidak dapat dihapus karena memiliki riwayat booking. Ubah status menjadi 'maintenance' sebagai gantinya.",
    });
  }

  for (const foto of existing.fotos) {
    unlinkWithWebp(foto.urlFoto);
  }

  await prisma.mobil.delete({ where: { idMobil: id } });
  res.json({ message: "Mobil berhasil dihapus." });
});

router.delete("/admin/foto/:idFoto", requireAdminAuth, async (req, res) => {
  const idFoto = Number(req.params.idFoto);
  const foto = await prisma.fotoMobil.findUnique({ where: { idFoto } });
  if (!foto) return res.status(404).json({ message: "Foto tidak ditemukan." });

  unlinkWithWebp(foto.urlFoto);

  await prisma.fotoMobil.delete({ where: { idFoto } });
  res.json({ message: "Foto berhasil dihapus." });
});

module.exports = router;
