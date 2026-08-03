const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma");
const { requireAdminAuth } = require("../middleware/auth");

const router = express.Router();

router.post("/login", async (req, res) => {
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

module.exports = router;
