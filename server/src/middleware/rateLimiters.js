const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Terlalu banyak percobaan login. Silakan coba lagi dalam 15 menit." },
});

const publicWriteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Terlalu banyak permintaan. Silakan coba lagi nanti." },
});

// Terpisah dari publicWriteLimiter: satu pengunjung bisa wajar menekan
// beberapa tombol WhatsApp dalam satu kunjungan, dan klik itu tidak boleh
// menghabiskan jatah yang dipakai form booking/kontak.
const leadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Terlalu banyak permintaan. Silakan coba lagi nanti." },
});

module.exports = { loginLimiter, publicWriteLimiter, leadLimiter };
