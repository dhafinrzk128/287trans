const path = require("path");
const fs = require("fs");
const multer = require("multer");

const UPLOAD_ROOT = process.env.UPLOAD_DIR || path.join(__dirname, "..", "..", "uploads");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function safeFilename(originalname) {
  const ext = path.extname(originalname).toLowerCase();
  const base = Date.now() + "-" + Math.round(Math.random() * 1e9);
  return base + ext;
}

function makeStorage(subfolder) {
  const dir = path.join(UPLOAD_ROOT, subfolder);
  ensureDir(dir);
  return multer.diskStorage({
    destination: (req, file, cb) => cb(null, dir),
    filename: (req, file, cb) => cb(null, safeFilename(file.originalname)),
  });
}

const imageFileFilter = (req, file, cb) => {
  const allowed = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.includes(ext)) cb(null, true);
  else cb(new Error("Format file harus gambar (jpg, jpeg, png, webp, gif)"));
};

const uploadMobilFoto = multer({
  storage: makeStorage("mobil"),
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

const uploadProfileFoto = multer({
  storage: makeStorage("profile"),
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

const uploadBuktiTransfer = multer({
  storage: makeStorage("bukti-transfer"),
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

const uploadGaleriFoto = multer({
  storage: makeStorage("galeri"),
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

function publicUrl(subfolder, filename) {
  return `/uploads/${subfolder}/${filename}`;
}

module.exports = {
  UPLOAD_ROOT,
  uploadMobilFoto,
  uploadProfileFoto,
  uploadBuktiTransfer,
  uploadGaleriFoto,
  publicUrl,
};
