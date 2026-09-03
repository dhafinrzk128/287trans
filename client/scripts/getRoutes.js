// Single source of truth for "which public URLs exist" — used by both the
// prerender script and the sitemap generator so they can never drift apart.
//
// Static routes are listed by hand (cheap, rarely changes). Dynamic routes
// (one per car) are pulled from the live API at build time, since the
// Railway build step has no direct database access (see the note in
// prerender.js for why).

// Halaman kategori & model armada tidak ditulis di sini: daftarnya dipakai
// bersama dengan route React dan menu navbar, jadi satu-satunya sumbernya
// adalah src/data/koleksiArmada.js. Menambah tujuan iklan di sana otomatis
// membuatnya ikut diprerender dan masuk sitemap.
import { KOLEKSI_PATHS } from "../src/data/koleksiArmada.js";

export const STATIC_ROUTES = [
  "/",
  "/tentang-kami",
  "/katalog",
  "/kontak",
  "/armada",
  "/faq",
  "/status",
  ...KOLEKSI_PATHS,
];

const API_BASE = process.env.PRERENDER_API_BASE || "https://287trans.id";

export async function getCarRoutes() {
  try {
    const res = await fetch(`${API_BASE}/api/mobil`);
    if (!res.ok) throw new Error(`GET /api/mobil -> ${res.status}`);
    const mobils = await res.json();
    return mobils.map((m) => `/katalog/${m.idMobil}`);
  } catch (err) {
    console.warn(
      `[getRoutes] Gagal ambil daftar mobil dari ${API_BASE}/api/mobil (${err.message}). ` +
        `Lanjut tanpa halaman /katalog/:id — cek koneksi atau set PRERENDER_API_BASE.`
    );
    return [];
  }
}

export async function getAllRoutes() {
  const carRoutes = await getCarRoutes();
  return [...STATIC_ROUTES, ...carRoutes];
}
