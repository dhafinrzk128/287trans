const express = require("express");
const prisma = require("../utils/prisma");
const { requireAdminAuth } = require("../middleware/auth");

const router = express.Router();

// GET /api/testimoni - publik, tampil di Home
router.get("/", async (req, res) => {
  const testimoni = await prisma.testimoni.findMany({
    orderBy: [{ urutan: "asc" }, { createdAt: "desc" }],
  });
  res.json(testimoni);
});

// ------- ADMIN ROUTES -------

router.get("/admin/all", requireAdminAuth, async (req, res) => {
  const testimoni = await prisma.testimoni.findMany({
    orderBy: [{ urutan: "asc" }, { createdAt: "desc" }],
  });
  res.json(testimoni);
});

router.post("/admin", requireAdminAuth, async (req, res) => {
  const { nama, kota, pesan, rating, urutan } = req.body;
  if (!nama || !kota || !pesan) {
    return res.status(400).json({ message: "Nama, kota, dan pesan wajib diisi." });
  }
  const created = await prisma.testimoni.create({
    data: {
      nama,
      kota,
      pesan,
      rating: rating ? Number(rating) : 5,
      urutan: urutan ? Number(urutan) : 0,
    },
  });
  res.status(201).json(created);
});

router.put("/admin/:id", requireAdminAuth, async (req, res) => {
  const id = Number(req.params.id);
  const existing = await prisma.testimoni.findUnique({ where: { id } });
  if (!existing) return res.status(404).json({ message: "Testimoni tidak ditemukan." });

  const { nama, kota, pesan, rating, urutan } = req.body;
  const updated = await prisma.testimoni.update({
    where: { id },
    data: {
      ...(nama !== undefined && { nama }),
      ...(kota !== undefined && { kota }),
      ...(pesan !== undefined && { pesan }),
      ...(rating !== undefined && { rating: Number(rating) }),
      ...(urutan !== undefined && { urutan: Number(urutan) }),
    },
  });
  res.json(updated);
});

router.delete("/admin/:id", requireAdminAuth, async (req, res) => {
  const id = Number(req.params.id);
  const existing = await prisma.testimoni.findUnique({ where: { id } });
  if (!existing) return res.status(404).json({ message: "Testimoni tidak ditemukan." });

  await prisma.testimoni.delete({ where: { id } });
  res.json({ message: "Testimoni berhasil dihapus." });
});

module.exports = router;
