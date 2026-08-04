const express = require("express");
const prisma = require("../utils/prisma");
const { publicWriteLimiter } = require("../middleware/rateLimiters");

const router = express.Router();
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post("/", publicWriteLimiter, async (req, res) => {
  const { nama, email, subjek, pesan } = req.body;

  if (typeof nama !== "string" || typeof email !== "string" || typeof pesan !== "string") {
    return res.status(400).json({ message: "Nama, email, dan pesan wajib diisi." });
  }

  const trimmedNama = nama.trim();
  const trimmedEmail = email.trim();
  const trimmedSubjek = typeof subjek === "string" ? subjek.trim() : "";
  const trimmedPesan = pesan.trim();

  if (!trimmedNama || !trimmedEmail || !trimmedPesan) {
    return res.status(400).json({ message: "Nama, email, dan pesan wajib diisi." });
  }
  if (!EMAIL_REGEX.test(trimmedEmail)) {
    return res.status(400).json({ message: "Format email tidak valid." });
  }
  if (trimmedNama.length > 100 || trimmedEmail.length > 150 || trimmedSubjek.length > 150) {
    return res.status(400).json({ message: "Nama, email, atau subjek terlalu panjang." });
  }
  if (trimmedPesan.length > 2000) {
    return res.status(400).json({ message: "Pesan maksimal 2000 karakter." });
  }

  await prisma.contactMessage.create({
    data: { nama: trimmedNama, email: trimmedEmail, subjek: trimmedSubjek, pesan: trimmedPesan },
  });
  res.status(201).json({ message: "Pesan Anda berhasil terkirim. Kami akan segera menghubungi Anda." });
});

module.exports = router;
