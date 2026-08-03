const express = require("express");
const prisma = require("../utils/prisma");
const { requireAdminAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/", requireAdminAuth, async (req, res) => {
  const [totalBooking, mobilTersedia, mobilDisewa, mobilMaintenance, bookingMenunggu, bookingDikonfirmasi, totalMobil] =
    await Promise.all([
      prisma.booking.count(),
      prisma.mobil.count({ where: { status: "tersedia" } }),
      prisma.mobil.count({ where: { status: "disewa" } }),
      prisma.mobil.count({ where: { status: "maintenance" } }),
      prisma.booking.count({ where: { statusBooking: "menunggu_konfirmasi" } }),
      prisma.booking.count({ where: { statusBooking: "dikonfirmasi" } }),
      prisma.mobil.count(),
    ]);

  const bookingTerbaru = await prisma.booking.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { mobil: true },
  });

  res.json({
    totalBooking,
    totalMobil,
    mobilTersedia,
    mobilDisewa,
    mobilMaintenance,
    bookingMenunggu,
    bookingDikonfirmasi,
    bookingTerbaru: bookingTerbaru.map((b) => ({
      idBooking: b.idBooking,
      kodeBooking: b.kodeBooking,
      namaCustomer: b.namaCustomer,
      namaMobil: b.mobil.namaMobil,
      statusBooking: b.statusBooking,
      createdAt: b.createdAt,
    })),
  });
});

module.exports = router;
