const express = require("express");
const prisma = require("../utils/prisma");

const router = express.Router();
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post("/", async (req, res) => {
  const { nama, email, subjek, pesan } = req.body;
  if (!nama || !email || !pesan) {
    return res.status(400).json({ message: "Nama, email, dan pesan wajib diisi." });
  }
  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ message: "Format email tidak valid." });
  }

  await prisma.contactMessage.create({ data: { nama, email, subjek, pesan } });
  res.status(201).json({ message: "Pesan Anda berhasil terkirim. Kami akan segera menghubungi Anda." });
});

module.exports = router;
