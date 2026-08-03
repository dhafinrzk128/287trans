const express = require("express");
const prisma = require("../utils/prisma");
const { requireAdminAuth } = require("../middleware/auth");
const { generateKodeBooking } = require("../utils/kodeBooking");

const router = express.Router();

const HP_REGEX = /^(\+62|62|0)8[1-9][0-9]{6,10}$/;
const VALID_STATUS = ["menunggu_konfirmasi", "dikonfirmasi", "selesai", "dibatalkan"];
const VALID_ESTIMASI_HARI = [1, 2, 3, 4, 5, 6, 7, 14, 30];

function serializeBooking(booking) {
  return {
    idBooking: booking.idBooking,
    kodeBooking: booking.kodeBooking,
    namaCustomer: booking.namaCustomer,
    noHp: booking.noHp,
    tglAmbil: booking.tglAmbil,
    tglKembali: booking.tglKembali,
    estimasiHari: booking.estimasiHari,
    denganSopir: booking.denganSopir,
    catatan: booking.catatan,
    statusBooking: booking.statusBooking,
    createdAt: booking.createdAt,
    mobil: booking.mobil
      ? {
          idMobil: booking.mobil.idMobil,
          namaMobil: booking.mobil.namaMobil,
          tipe: booking.mobil.tipe,
          fotoUtama: booking.mobil.fotos?.[0]?.urlFoto || null,
        }
      : undefined,
  };
}

async function isRangeOverlapping(idMobil, tglAmbil, tglKembali, excludeBookingId) {
  const overlapping = await prisma.booking.findMany({
    where: {
      idMobil,
      statusBooking: { in: ["menunggu_konfirmasi", "dikonfirmasi"] },
      ...(excludeBookingId && { idBooking: { not: excludeBookingId } }),
      tglAmbil: { lt: new Date(tglKembali) },
      tglKembali: { gt: new Date(tglAmbil) },
    },
  });
  return overlapping.length > 0;
}

// POST /api/booking - kirim permintaan booking (guest, tanpa pembayaran)
router.post("/", async (req, res) => {
  const { idMobil, namaCustomer, noHp, tglAmbil, estimasiHari, denganSopir, catatan } = req.body;

  if (!idMobil || !namaCustomer || !noHp || !tglAmbil || !estimasiHari) {
    return res.status(400).json({ message: "Semua field wajib diisi." });
  }
  if (!HP_REGEX.test(noHp.replace(/[\s-]/g, ""))) {
    return res.status(400).json({ message: "Format nomor HP tidak valid." });
  }
  if (!VALID_ESTIMASI_HARI.includes(Number(estimasiHari))) {
    return res.status(400).json({ message: "Estimasi lama sewa tidak valid." });
  }

  const ambilDate = new Date(tglAmbil);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (isNaN(ambilDate)) {
    return res.status(400).json({ message: "Format tanggal tidak valid." });
  }
  if (ambilDate < today) {
    return res.status(400).json({ message: "Tanggal mulai sewa tidak boleh sebelum hari ini." });
  }

  const kembaliDate = new Date(ambilDate);
  kembaliDate.setDate(kembaliDate.getDate() + Number(estimasiHari));

  const mobil = await prisma.mobil.findUnique({ where: { idMobil: Number(idMobil) } });
  if (!mobil) return res.status(404).json({ message: "Mobil tidak ditemukan." });
  if (mobil.status === "maintenance") {
    return res.status(400).json({ message: "Mobil sedang dalam maintenance dan tidak dapat dibooking." });
  }

  const overlap = await isRangeOverlapping(mobil.idMobil, ambilDate, kembaliDate);
  if (overlap) {
    return res.status(409).json({ message: "Mobil sudah ada permintaan booking lain pada rentang tanggal tersebut." });
  }

  let kodeBooking;
  let created = null;
  for (let attempt = 0; attempt < 5 && !created; attempt++) {
    kodeBooking = generateKodeBooking();
    try {
      created = await prisma.booking.create({
        data: {
          kodeBooking,
          idMobil: mobil.idMobil,
          namaCustomer,
          noHp,
          tglAmbil: ambilDate,
          tglKembali: kembaliDate,
          estimasiHari: Number(estimasiHari),
          denganSopir: denganSopir === true || denganSopir === "true",
          catatan: catatan || null,
          statusBooking: "menunggu_konfirmasi",
        },
        include: { mobil: { include: { fotos: true } } },
      });
    } catch (err) {
      if (err.code !== "P2002") throw err;
    }
  }

  if (!created) {
    return res.status(500).json({ message: "Gagal membuat kode booking, silakan coba lagi." });
  }

  res.status(201).json(serializeBooking(created));
});

// GET /api/booking/status/:kodeBooking - cek status permintaan booking (publik, guest)
router.get("/status/:kodeBooking", async (req, res) => {
  const booking = await prisma.booking.findUnique({
    where: { kodeBooking: req.params.kodeBooking.toUpperCase() },
    include: { mobil: { include: { fotos: true } } },
  });
  if (!booking) return res.status(404).json({ message: "Booking tidak ditemukan. Periksa kembali kode booking Anda." });
  res.json(serializeBooking(booking));
});

// ------- ADMIN ROUTES -------

router.get("/admin/all", requireAdminAuth, async (req, res) => {
  const { status } = req.query;
  const bookings = await prisma.booking.findMany({
    where: status ? { statusBooking: status } : undefined,
    include: { mobil: { include: { fotos: true } } },
    orderBy: { createdAt: "desc" },
  });
  res.json(bookings.map(serializeBooking));
});

router.get("/admin/:id", requireAdminAuth, async (req, res) => {
  const booking = await prisma.booking.findUnique({
    where: { idBooking: Number(req.params.id) },
    include: { mobil: { include: { fotos: true } } },
  });
  if (!booking) return res.status(404).json({ message: "Booking tidak ditemukan." });
  res.json(serializeBooking(booking));
});

router.patch("/admin/:id/status", requireAdminAuth, async (req, res) => {
  const { status } = req.body;
  if (!VALID_STATUS.includes(status)) {
    return res.status(400).json({ message: "Status tidak valid." });
  }
  const existing = await prisma.booking.findUnique({ where: { idBooking: Number(req.params.id) } });
  if (!existing) return res.status(404).json({ message: "Booking tidak ditemukan." });

  const updated = await prisma.booking.update({
    where: { idBooking: Number(req.params.id) },
    data: { statusBooking: status },
    include: { mobil: { include: { fotos: true } } },
  });
  res.json(serializeBooking(updated));
});

module.exports = router;
