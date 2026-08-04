const express = require("express");
const prisma = require("../utils/prisma");
const { requireAdminAuth } = require("../middleware/auth");
const { uploadProfileFoto, publicUrl } = require("../utils/upload");

const router = express.Router();

function serializeProfile(profile) {
  if (!profile) return null;
  return {
    namaPerusahaan: profile.namaPerusahaan,
    deskripsi: profile.deskripsi,
    keunggulan: JSON.parse(profile.keunggulan || "[]"),
    alamat: profile.alamat,
    mapsEmbedUrl: profile.mapsEmbedUrl,
    telepon: profile.telepon,
    whatsapp: profile.whatsapp,
    email: profile.email,
    fotoUrl: profile.fotoUrl,
    heroFotoUrl: profile.heroFotoUrl,
  };
}

// GET /api/profile - publik
router.get("/", async (req, res) => {
  const profile = await prisma.companyProfile.findUnique({ where: { id: 1 } });
  res.json(serializeProfile(profile));
});

// PUT /api/profile/admin - update company profile
router.put(
  "/admin",
  requireAdminAuth,
  uploadProfileFoto.fields([
    { name: "foto", maxCount: 1 },
    { name: "heroFoto", maxCount: 1 },
  ]),
  async (req, res) => {
    const { namaPerusahaan, deskripsi, keunggulan, alamat, mapsEmbedUrl, telepon, whatsapp, email } = req.body;

    let keunggulanJson;
    if (keunggulan !== undefined) {
      try {
        const parsed = typeof keunggulan === "string" ? JSON.parse(keunggulan) : keunggulan;
        keunggulanJson = JSON.stringify(parsed);
      } catch {
        return res.status(400).json({ message: "Format keunggulan tidak valid (harus JSON array)." });
      }
    }

    const fotoFile = req.files?.foto?.[0];
    const heroFotoFile = req.files?.heroFoto?.[0];

    const profile = await prisma.companyProfile.update({
      where: { id: 1 },
      data: {
        ...(namaPerusahaan !== undefined && { namaPerusahaan }),
        ...(deskripsi !== undefined && { deskripsi }),
        ...(keunggulanJson !== undefined && { keunggulan: keunggulanJson }),
        ...(alamat !== undefined && { alamat }),
        ...(mapsEmbedUrl !== undefined && { mapsEmbedUrl }),
        ...(telepon !== undefined && { telepon }),
        ...(whatsapp !== undefined && { whatsapp }),
        ...(email !== undefined && { email }),
        ...(fotoFile && { fotoUrl: publicUrl("profile", fotoFile.filename) }),
        ...(heroFotoFile && { heroFotoUrl: publicUrl("profile", heroFotoFile.filename) }),
      },
    });

    res.json(serializeProfile(profile));
  }
);

module.exports = router;
