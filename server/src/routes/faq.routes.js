const express = require("express");
const prisma = require("../utils/prisma");
const { requireAdminAuth } = require("../middleware/auth");

const router = express.Router();

// GET /api/faq - publik, tampil di Home
router.get("/", async (req, res) => {
  const faq = await prisma.faq.findMany({
    orderBy: [{ urutan: "asc" }, { createdAt: "asc" }],
  });
  res.json(faq);
});

// ------- ADMIN ROUTES -------

router.get("/admin/all", requireAdminAuth, async (req, res) => {
  const faq = await prisma.faq.findMany({
    orderBy: [{ urutan: "asc" }, { createdAt: "asc" }],
  });
  res.json(faq);
});

router.post("/admin", requireAdminAuth, async (req, res) => {
  const { pertanyaan, jawaban, urutan } = req.body;
  if (!pertanyaan || !jawaban) {
    return res.status(400).json({ message: "Pertanyaan dan jawaban wajib diisi." });
  }
  const created = await prisma.faq.create({
    data: { pertanyaan, jawaban, urutan: urutan ? Number(urutan) : 0 },
  });
  res.status(201).json(created);
});

router.put("/admin/:id", requireAdminAuth, async (req, res) => {
  const id = Number(req.params.id);
  const existing = await prisma.faq.findUnique({ where: { id } });
  if (!existing) return res.status(404).json({ message: "FAQ tidak ditemukan." });

  const { pertanyaan, jawaban, urutan } = req.body;
  const updated = await prisma.faq.update({
    where: { id },
    data: {
      ...(pertanyaan !== undefined && { pertanyaan }),
      ...(jawaban !== undefined && { jawaban }),
      ...(urutan !== undefined && { urutan: Number(urutan) }),
    },
  });
  res.json(updated);
});

router.delete("/admin/:id", requireAdminAuth, async (req, res) => {
  const id = Number(req.params.id);
  const existing = await prisma.faq.findUnique({ where: { id } });
  if (!existing) return res.status(404).json({ message: "FAQ tidak ditemukan." });

  await prisma.faq.delete({ where: { id } });
  res.json({ message: "FAQ berhasil dihapus." });
});

module.exports = router;
