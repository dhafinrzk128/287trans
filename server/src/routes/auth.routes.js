const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma");
const { requireAdminAuth } = require("../middleware/auth");
const { loginLimiter } = require("../middleware/rateLimiters");

const router = express.Router();

router.post("/login", loginLimiter, async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username dan password wajib diisi." });
  }

  const admin = await prisma.admin.findUnique({ where: { username } });
  if (!admin) {
    return res.status(401).json({ message: "Username atau password salah." });
  }

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) {
    return res.status(401).json({ message: "Username atau password salah." });
  }

  const token = jwt.sign(
    { id: admin.idAdmin, username: admin.username },
    process.env.JWT_SECRET,
    { expiresIn: "12h" }
  );

  res.json({ token, admin: { username: admin.username } });
});

router.get("/me", requireAdminAuth, (req, res) => {
  res.json({ admin: req.admin });
});

router.put("/admin", requireAdminAuth, async (req, res) => {
  const { currentPassword, newUsername, newPassword } = req.body;

  if (typeof currentPassword !== "string" || !currentPassword) {
    return res.status(400).json({ message: "Password saat ini wajib diisi." });
  }

  const admin = await prisma.admin.findUnique({ where: { idAdmin: req.admin.id } });
  if (!admin) {
    return res.status(404).json({ message: "Admin tidak ditemukan." });
  }

  const valid = await bcrypt.compare(currentPassword, admin.password);
  if (!valid) {
    return res.status(401).json({ message: "Password saat ini salah." });
  }

  const data = {};

  if (typeof newUsername === "string" && newUsername.trim() && newUsername.trim() !== admin.username) {
    const trimmed = newUsername.trim();
    if (trimmed.length > 50) {
      return res.status(400).json({ message: "Username maksimal 50 karakter." });
    }
    data.username = trimmed;
  }

  if (typeof newPassword === "string" && newPassword) {
    if (newPassword.length < 6) {
      return res.status(400).json({ message: "Password baru minimal 6 karakter." });
    }
    data.password = await bcrypt.hash(newPassword, 10);
  }

  if (Object.keys(data).length === 0) {
    return res.status(400).json({ message: "Tidak ada perubahan yang diisi." });
  }

  const updated = await prisma.admin.update({ where: { idAdmin: admin.idAdmin }, data });
  res.json({ message: "Akun berhasil diubah. Silakan login ulang.", admin: { username: updated.username } });
});

module.exports = router;
