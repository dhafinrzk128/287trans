require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const compression = require("compression");
const path = require("path");
const fs = require("fs/promises");

const { UPLOAD_ROOT } = require("./utils/upload");
const { backfillWebp } = require("./utils/backfillWebp");
const { bersihkanUploads } = require("./utils/bersihkanUploads");
const authRoutes = require("./routes/auth.routes");
const mobilRoutes = require("./routes/mobil.routes");
const bookingRoutes = require("./routes/booking.routes");
const profileRoutes = require("./routes/profile.routes");
const contactRoutes = require("./routes/contact.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const testimoniRoutes = require("./routes/testimoni.routes");
const faqRoutes = require("./routes/faq.routes");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

// Semua berkas sebelumnya keluar dengan max-age=0, jadi setiap kunjungan
// ulang memvalidasi ulang tiap berkas — satu perjalanan bolak-balik (~200 ms
// terukur) untuk berkas yang isinya tidak pernah berubah.
const DETIK = 1000;
const SETAHUN = 31536000 * DETIK;
const SEBULAN = 2592000 * DETIK;
const SEHARI = 86400 * DETIK;

app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Foto unggahan: nama berkasnya selalu baru tiap unggahan, jadi satu URL
// praktis tidak pernah berganti isi. Sengaja TIDAK "immutable" dan tidak
// setahun: pendamping .webp bisa dibuat ulang di tempat (seperti saat
// batas ukurannya diberlakukan), dan sebulan menjamin versi barunya tetap
// sampai ke pengunjung lama tanpa perlu mengganti nama berkas.
app.use("/uploads", express.static(UPLOAD_ROOT, { maxAge: SEBULAN }));

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/mobil", mobilRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/testimoni", testimoniRoutes);
app.use("/api/faq", faqRoutes);

const clientDist = path.join(__dirname, "..", "..", "client", "dist");

// Every public route the SPA actually handles (mirrors client/src/App.jsx).
// Anything that doesn't match one of these gets a real 404 instead of a
// silent 200 — see the catch-all below.
const KNOWN_SPA_ROUTES = [
  /^\/$/,
  /^\/tentang-kami\/?$/,
  /^\/katalog\/?$/,
  /^\/katalog\/[^/]+\/?$/,
  /^\/booking\/[^/]+\/?$/,
  /^\/status\/?$/,
  /^\/status\/[^/]+\/?$/,
  /^\/kontak\/?$/,
  /^\/armada\/?$/,
  /^\/faq\/?$/,
  /^\/rental-mobil-tangerang\/?$/,
  /^\/sewa-mobil-lepas-kunci-tangerang\/?$/,
  /^\/rental-mobil-plus-driver\/?$/,
  /^\/rental-mobil-bulanan-tangerang\/?$/,
  /^\/sewa-mobil-bandara-soekarno-hatta\/?$/,
  /^\/sewa-innova-reborn-tangerang\/?$/,
  /^\/sewa-innova-zenix-tangerang\/?$/,
  /^\/sewa-fortuner-tangerang\/?$/,
  /^\/sewa-pajero-sport-tangerang\/?$/,
  /^\/admin\/login\/?$/,
  /^\/admin\/dashboard\/?$/,
  /^\/admin\/mobil\/?$/,
  /^\/admin\/mobil\/baru\/?$/,
  /^\/admin\/mobil\/[^/]+\/edit\/?$/,
  /^\/admin\/booking\/?$/,
  /^\/admin\/booking\/baru\/?$/,
  /^\/admin\/booking\/[^/]+\/?$/,
  /^\/admin\/testimoni\/?$/,
  /^\/admin\/faq\/?$/,
  /^\/admin\/profile\/?$/,
  /^\/admin\/akun\/?$/,
];

// Vite menamai berkas di /assets menurut isinya (index-lNDQKLnl.css): isi
// berubah berarti namanya ikut berubah, jadi URL yang sama tidak akan pernah
// menunjuk isi yang berbeda. Itu justru syarat "immutable" — browser boleh
// memakainya tanpa bertanya lagi. Didaftarkan sebelum penangan di bawah
// supaya permintaan aset tidak ikut menjalani pencarian berkas prerender.
app.use(
  "/assets",
  express.static(path.join(clientDist, "assets"), { maxAge: SETAHUN, immutable: true })
);

// Prerendered pages live on disk as dist/<route>/index.html (dist/index.html
// for "/"). Handing a no-trailing-slash request for one of these straight to
// express.static() below would 301-redirect to the trailing-slash form
// before serving it — technically fine for crawlers, but it costs every
// prerendered page an extra round trip for no reason. Serve it directly.
app.get(/^(?!\/api|\/uploads).*/, async (req, res, next) => {
  const prerendered = path.join(clientDist, req.path, "index.html");
  if (!prerendered.startsWith(clientDist)) return next();
  try {
    await fs.access(prerendered);
    res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
    res.sendFile(prerendered);
  } catch {
    next();
  }
});

// Sisanya: logo, favicon, manifest, sitemap — jarang berubah tapi namanya
// tetap, jadi sehari saja. HTML dikecualikan dan harus selalu divalidasi:
// berkas itu yang menunjuk ke nama aset terbaru, jadi HTML yang tersimpan
// lama membuat deploy baru tidak pernah sampai ke pengunjung lama.
app.use(
  express.static(clientDist, {
    maxAge: SEHARI,
    setHeaders: (res, berkas) => {
      if (berkas.endsWith(".html")) res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
    },
  })
);

app.get(/^(?!\/api|\/uploads).*/, (req, res, next) => {
  const status = KNOWN_SPA_ROUTES.some((pattern) => pattern.test(req.path)) ? 200 : 404;
  res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
  res.status(status).sendFile(path.join(clientDist, "index.html"), (err) => {
    if (err) next();
  });
});

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint tidak ditemukan." });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server rental mobil berjalan di http://localhost:${PORT}`);

  // Dijalankan setelah server siap melayani, bukan sebelumnya: melengkapi
  // berkas .webp yang tertinggal tidak boleh menunda kesiapan layanan.
  // Kegagalannya juga tidak menjatuhkan server — tanpa .webp, foto tetap
  // tampil lewat berkas aslinya. Aman diulang, jadi boleh jalan tiap boot.
  backfillWebp()
    .then(async ({ diperiksa, dibuat, tidakTerbaca }) => {
      if (dibuat > 0 || tidakTerbaca.length > 0) {
        console.log(`[webp] ${diperiksa} gambar diperiksa, ${dibuat} dibuat, ${tidakTerbaca.length} gagal.`);
      }

      // Berkas yang tadi gagal dibaca ikut disodorkan ke pembersih: kalau
      // basis data juga tidak merujuknya, ia memang tidak dipakai siapa pun.
      // Kegagalan di sini tidak boleh menghentikan apa pun — tanpa
      // pembersihan, yang tersisa hanya sampah yang tidak mengganggu.
      const { dihapus } = await bersihkanUploads(tidakTerbaca);
      if (dihapus.length > 0) {
        dihapus.forEach((b) => console.log(`[bersih] dihapus: ${b}`));
        console.log(`[bersih] ${dihapus.length} berkas yatim dihapus.`);
      }
    })
    .catch((err) => console.error("[webp] Perapian dilewati:", err.message));
});
