const express = require("express");
const path = require("path");
const fs = require("fs");
const prisma = require("../utils/prisma");
const { requireAdminAuth } = require("../middleware/auth");
const { uploadGaleriFoto, publicUrl } = require("../utils/upload");
const { generateWebpForFiles } = require("../utils/webp");

const router = express.Router();

function unlinkWithWebp(urlFoto) {
  const filePath = path.join(__dirname, "..", "..", urlFoto.replace("/uploads", "uploads"));
  fs.unlink(filePath, () => {});
  fs.unlink(filePath.replace(/\.[^.]+$/, ".webp"), () => {});
}

// GET /api/galeri - publik, dipakai carousel di halaman landing iklan.
// Hanya foto aktif; yang dinonaktifkan admin tetap tersimpan tapi tidak tampil.
router.get("/", async (req, res) => {
  const galeri = await prisma.galeriArmada.findMany({
    where: { aktif: true },
    orderBy: [{ urutan: "asc" }, { createdAt: "desc" }],
  });
  res.json(galeri);
});

// ------- ADMIN ROUTES -------

router.get("/admin/all", requireAdminAuth, async (req, res) => {
  const galeri = await prisma.galeriArmada.findMany({
    orderBy: [{ urutan: "asc" }, { createdAt: "desc" }],
  });
  res.json(galeri);
});

router.post("/admin", requireAdminAuth, uploadGaleriFoto.array("fotos", 15), async (req, res) => {
  const files = req.files || [];
  if (files.length === 0) {
    return res.status(400).json({ message: "Minimal satu foto wajib diupload." });
  }

  await generateWebpForFiles(files);

  // Foto baru masuk di urutan paling belakang supaya susunan yang sudah diatur
  // admin tidak bergeser setiap kali menambah foto.
  const last = await prisma.galeriArmada.findFirst({ orderBy: { urutan: "desc" } });
  let urutan = last ? last.urutan + 1 : 0;

  const created = [];
  for (const file of files) {
    const row = await prisma.galeriArmada.create({
      data: {
        urlFoto: publicUrl("galeri", file.filename),
        judul: req.body.judul || null,
        urutan: urutan++,
      },
    });
    created.push(row);
  }

  res.status(201).json(created);
});

router.put("/admin/:id", requireAdminAuth, async (req, res) => {
  const id = Number(req.params.id);
  const existing = await prisma.galeriArmada.findUnique({ where: { id } });
  if (!existing) return res.status(404).json({ message: "Foto tidak ditemukan." });

  const { judul, urutan, aktif, posisiFokus } = req.body;

  // posisiFokus masuk langsung ke atribut style di halaman publik, jadi hanya
  // bentuk "<angka>% <angka>%" yang diterima — apa pun selain itu ditolak
  // ketimbang diteruskan mentah ke CSS.
  if (posisiFokus !== undefined && !/^\d{1,3}% \d{1,3}%$/.test(posisiFokus)) {
    return res.status(400).json({ message: "Format posisi fokus tidak valid." });
  }

  const updated = await prisma.galeriArmada.update({
    where: { id },
    data: {
      ...(judul !== undefined && { judul: judul || null }),
      ...(urutan !== undefined && { urutan: Number(urutan) }),
      ...(aktif !== undefined && { aktif: Boolean(aktif) }),
      ...(posisiFokus !== undefined && { posisiFokus }),
    },
  });
  res.json(updated);
});

router.delete("/admin/:id", requireAdminAuth, async (req, res) => {
  const id = Number(req.params.id);
  const existing = await prisma.galeriArmada.findUnique({ where: { id } });
  if (!existing) return res.status(404).json({ message: "Foto tidak ditemukan." });

  unlinkWithWebp(existing.urlFoto);
  await prisma.galeriArmada.delete({ where: { id } });
  res.json({ message: "Foto berhasil dihapus." });
});

module.exports = router;
