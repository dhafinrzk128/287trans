const express = require("express");
const fs = require("fs");
const path = require("path");
const prisma = require("../utils/prisma");
const { requireAdminAuth } = require("../middleware/auth");
const { uploadMobilFoto, publicUrl } = require("../utils/upload");

const router = express.Router();

function serializeMobil(mobil) {
  const fotosSorted = [...(mobil.fotos || [])].sort((a, b) => a.urutan - b.urutan);
  return {
    idMobil: mobil.idMobil,
    namaMobil: mobil.namaMobil,
    tipe: mobil.tipe,
    transmisi: mobil.transmisi,
    bahanBakar: mobil.bahanBakar,
    kapasitas: mobil.kapasitas,
    hargaPerHari: mobil.hargaPerHari,
    deskripsi: mobil.deskripsi,
    status: mobil.status,
    fotoUtama: fotosSorted[0]?.urlFoto || null,
    fotos: fotosSorted,
    jumlahFoto: fotosSorted.length,
  };
}

// GET /api/mobil - katalog publik dengan filter
router.get("/", async (req, res) => {
  const { tipe, transmisi, kapasitas, minHarga, maxHarga, status } = req.query;

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

  res.json(mobils.map(serializeMobil));
});

// GET /api/mobil/tipe-list - daftar tipe unik untuk filter dropdown
router.get("/meta/tipe-list", async (req, res) => {
  const rows = await prisma.mobil.findMany({ select: { tipe: true }, distinct: ["tipe"] });
  res.json(rows.map((r) => r.tipe));
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
  const { namaMobil, tipe, transmisi, bahanBakar, kapasitas, hargaPerHari, deskripsi, status } = req.body;

  if (!namaMobil || !tipe || !transmisi || !kapasitas || !hargaPerHari) {
    return res.status(400).json({ message: "Field wajib: namaMobil, tipe, transmisi, kapasitas, hargaPerHari." });
  }

  const files = req.files || [];
  const mobil = await prisma.mobil.create({
    data: {
      namaMobil,
      tipe,
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

  const { namaMobil, tipe, transmisi, bahanBakar, kapasitas, hargaPerHari, deskripsi, status } = req.body;
  const files = req.files || [];
  const maxUrutan = existing.fotos.reduce((m, f) => Math.max(m, f.urutan), -1);

  const mobil = await prisma.mobil.update({
    where: { idMobil: id },
    data: {
      ...(namaMobil !== undefined && { namaMobil }),
      ...(tipe !== undefined && { tipe }),
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
    const filePath = path.join(__dirname, "..", "..", foto.urlFoto.replace("/uploads", "uploads"));
    fs.unlink(filePath, () => {});
  }

  await prisma.mobil.delete({ where: { idMobil: id } });
  res.json({ message: "Mobil berhasil dihapus." });
});

router.delete("/admin/foto/:idFoto", requireAdminAuth, async (req, res) => {
  const idFoto = Number(req.params.idFoto);
  const foto = await prisma.fotoMobil.findUnique({ where: { idFoto } });
  if (!foto) return res.status(404).json({ message: "Foto tidak ditemukan." });

  const filePath = path.join(__dirname, "..", "..", foto.urlFoto.replace("/uploads", "uploads"));
  fs.unlink(filePath, () => {});

  await prisma.fotoMobil.delete({ where: { idFoto } });
  res.json({ message: "Foto berhasil dihapus." });
});

module.exports = router;
