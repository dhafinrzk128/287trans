const multer = require("multer");

const PRISMA_STATUS = {
  P2002: [409, "Data sudah ada, tidak boleh duplikat."],
  P2025: [404, "Data tidak ditemukan."],
};

function errorHandler(err, req, res, next) {
  console.error(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ->`, err);

  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  }

  if (typeof err.statusCode === "number") {
    return res.status(err.statusCode).json({ message: err.message || "Terjadi kesalahan." });
  }

  if (err.code && PRISMA_STATUS[err.code]) {
    const [status, message] = PRISMA_STATUS[err.code];
    return res.status(status).json({ message });
  }

  res.status(500).json({ message: "Terjadi kesalahan pada server. Silakan coba lagi." });
}

module.exports = { errorHandler };
