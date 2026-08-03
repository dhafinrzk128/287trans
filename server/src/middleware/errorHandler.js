const multer = require("multer");

function errorHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  }
  if (err) {
    return res.status(400).json({ message: err.message || "Terjadi kesalahan." });
  }
  next();
}

module.exports = { errorHandler };
