const express = require("express");
const prisma = require("../utils/prisma");
const { requireAdminAuth } = require("../middleware/auth");
const { leadLimiter } = require("../middleware/rateLimiters");
const { bersihkanIdKlik, bersihkanTeks, susunCsv } = require("../utils/konversiOffline");

const router = express.Router();

// Sama dengan alfabet kode booking (tanpa 0/O/1/I yang mudah tertukar saat
// dibaca dari layar chat). Dibuat di browser, lihat client/src/utils/utm.js.
const POLA_KODE_REF = /^[A-HJ-NP-Z2-9]{6}$/;
const VALID_STATUS = ["baru", "qualified", "closing", "tidak_jadi"];

// POST /api/lead-wa — dikirim browser (sendBeacon) saat pengunjung iklan
// menekan tombol WhatsApp. Selalu dijawab 204 supaya tidak ada yang bisa
// dipelajari dari responsnya, dan karena browser memang tidak membacanya.
router.post("/", leadLimiter, express.text({ type: "text/plain", limit: "4kb" }), async (req, res) => {
  let body = req.body || {};
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.sendStatus(204);
    }
  }
  if (typeof body !== "object" || body === null) return res.sendStatus(204);
  const kodeRef = typeof body.kodeRef === "string" ? body.kodeRef.toUpperCase() : "";
  const gclid = bersihkanIdKlik(body.gclid);
  const gbraid = bersihkanIdKlik(body.gbraid);
  const wbraid = bersihkanIdKlik(body.wbraid);

  // Tanpa id klik iklan, lead ini tidak bisa diunggah ke Google Ads, jadi
  // tidak ada gunanya disimpan di sini.
  if (!POLA_KODE_REF.test(kodeRef) || !(gclid || gbraid || wbraid)) return res.sendStatus(204);

  try {
    await prisma.leadWa.create({
      data: {
        kodeRef,
        gclid,
        gbraid,
        wbraid,
        utmSource: bersihkanTeks(body.utm_source, 100),
        utmMedium: bersihkanTeks(body.utm_medium, 100),
        utmCampaign: bersihkanTeks(body.utm_campaign, 150),
        lokasiTombol: bersihkanTeks(body.lokasiTombol, 100),
        namaMobil: bersihkanTeks(body.namaMobil, 100),
        halaman: bersihkanTeks(body.halaman, 200),
      },
    });
  } catch (err) {
    if (err.code !== "P2002") throw err;
    // Pengunjung yang sama menekan tombol WA lagi: kodenya sudah tercatat.
    await prisma.leadWa.update({ where: { kodeRef }, data: { jumlahKlik: { increment: 1 } } });
  }
  res.sendStatus(204);
});

// ------- ADMIN ROUTES -------

// GET /api/lead-wa/admin?status=&q=&hari=30
router.get("/admin", requireAdminAuth, async (req, res) => {
  const hari = Math.min(Math.max(Number(req.query.hari) || 30, 1), 365);
  const sejak = new Date(Date.now() - hari * 24 * 3600 * 1000);
  const q = typeof req.query.q === "string" ? req.query.q.trim().toUpperCase().replace(/^287-?/, "") : "";
  const status = VALID_STATUS.includes(req.query.status) ? req.query.status : null;

  const where = q
    ? { kodeRef: { contains: q } } // cari kode: abaikan filter tanggal
    : { createdAt: { gte: sejak }, ...(status && { status }) };

  const [leads, ringkasan] = await Promise.all([
    prisma.leadWa.findMany({ where, orderBy: { createdAt: "desc" }, take: 500 }),
    prisma.leadWa.groupBy({ by: ["status"], where: { createdAt: { gte: sejak } }, _count: true }),
  ]);

  const hitung = Object.fromEntries(VALID_STATUS.map((s) => [s, 0]));
  ringkasan.forEach((r) => (hitung[r.status] = r._count));
  const total = Object.values(hitung).reduce((a, b) => a + b, 0);

  res.json({
    leads,
    ringkasan: {
      hari,
      total,
      // "qualified" di sini berarti pernah mencapai tahap qualified: yang
      // sudah closing juga pasti sudah qualified.
      qualified: hitung.qualified + hitung.closing,
      closing: hitung.closing,
      tidakJadi: hitung.tidak_jadi,
    },
  });
});

// PATCH /api/lead-wa/admin/:id  { status?, nilaiClosing?, catatan? }
router.patch("/admin/:id", requireAdminAuth, async (req, res) => {
  const id = Number(req.params.id);
  const lead = await prisma.leadWa.findUnique({ where: { id } });
  if (!lead) return res.status(404).json({ message: "Lead tidak ditemukan." });

  const { status, nilaiClosing, catatan } = req.body || {};
  const data = {};

  if (status !== undefined) {
    if (!VALID_STATUS.includes(status)) return res.status(400).json({ message: "Status tidak valid." });
    data.status = status;
    const sekarang = new Date();
    // Waktu tahap diisi sekali saat pertama kali dicapai dan tidak ikut
    // bergeser kalau status diubah bolak-balik: Google Ads mengenali
    // duplikat dari (gclid, nama konversi, waktu konversi), jadi waktu yang
    // tetap membuat unggahan ulang aman.
    if (status === "baru") {
      data.qualifiedAt = null;
      data.closingAt = null;
    }
    if (status === "qualified" || status === "closing") data.qualifiedAt = lead.qualifiedAt || sekarang;
    if (status === "closing") data.closingAt = lead.closingAt || sekarang;
    if (status === "qualified" || status === "tidak_jadi") data.closingAt = null;
  }

  if (nilaiClosing !== undefined) {
    if (nilaiClosing === null || nilaiClosing === "") data.nilaiClosing = null;
    else {
      const n = Number(nilaiClosing);
      if (!Number.isInteger(n) || n < 0 || n > 1_000_000_000) {
        return res.status(400).json({ message: "Nilai closing tidak valid." });
      }
      data.nilaiClosing = n;
    }
  }

  if (catatan !== undefined) {
    if (catatan !== null && typeof catatan !== "string") return res.status(400).json({ message: "Catatan tidak valid." });
    if (typeof catatan === "string" && catatan.length > 500) {
      return res.status(400).json({ message: "Catatan maksimal 500 karakter." });
    }
    data.catatan = catatan ? catatan.trim() : null;
  }

  const updated = await prisma.leadWa.update({ where: { id }, data });
  res.json(updated);
});

// GET /api/lead-wa/admin/export/:jenis  (jenis: qualified | closing)
// Menghasilkan CSV siap unggah ke Google Ads > Konversi > Unggahan.
router.get("/admin/export/:jenis", requireAdminAuth, async (req, res) => {
  const { jenis } = req.params;
  if (jenis !== "qualified" && jenis !== "closing") {
    return res.status(400).json({ message: "Jenis ekspor tidak valid." });
  }

  const baris = [];

  if (jenis === "qualified") {
    const leads = await prisma.leadWa.findMany({ where: { qualifiedAt: { not: null } } });
    leads.forEach((l) => baris.push({ gclid: l.gclid, waktuKlik: l.createdAt, waktuKonversi: l.qualifiedAt }));
  } else {
    const [leads, bookings] = await Promise.all([
      prisma.leadWa.findMany({ where: { closingAt: { not: null } } }),
      // Booking lewat form yang datang dari iklan dan sudah dikonfirmasi.
      prisma.booking.findMany({
        where: { closingAt: { not: null }, gclid: { not: null } },
        include: { mobil: { select: { hargaPerHari: true } } },
      }),
    ]);
    leads.forEach((l) =>
      baris.push({ gclid: l.gclid, waktuKlik: l.createdAt, waktuKonversi: l.closingAt, nilai: l.nilaiClosing })
    );
    bookings.forEach((b) =>
      baris.push({
        gclid: b.gclid,
        waktuKlik: b.createdAt,
        waktuKonversi: b.closingAt,
        nilai: b.mobil ? b.mobil.hargaPerHari * b.estimasiHari : null,
      })
    );
  }

  const { csv, jumlah, dilewati } = susunCsv(jenis, baris);
  const tanggal = new Date().toISOString().slice(0, 10);
  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", `attachment; filename="google-ads-${jenis}-${tanggal}.csv"`);
  // Ringkasan dikirim lewat header supaya panel admin bisa menampilkan
  // "N baris, M dilewati" tanpa harus mengurai CSV-nya.
  res.setHeader("X-Jumlah-Baris", String(jumlah));
  res.setHeader("X-Dilewati", JSON.stringify(dilewati));
  res.setHeader("Access-Control-Expose-Headers", "X-Jumlah-Baris, X-Dilewati");
  res.send(csv);
});

module.exports = router;
