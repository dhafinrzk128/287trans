import { buildUtmRefTag } from "./utm";

export function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

export function formatTanggal(value) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export function formatTanggalWaktu(value) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function toDateInputValue(value) {
  if (!value) return "";
  const d = new Date(value);
  const offset = d.getTimezoneOffset();
  const localDate = new Date(d.getTime() - offset * 60 * 1000);
  return localDate.toISOString().slice(0, 10);
}

export function buildWaLink(number, text) {
  const digits = (number || "").replace(/\D/g, "").replace(/^0/, "62");
  const refTag = buildUtmRefTag();
  const fullText = [text, refTag].filter(Boolean).join(" ");
  const query = fullText ? `?text=${encodeURIComponent(fullText)}` : "";
  return `https://wa.me/${digits}${query}`;
}

// Same-name .webp sibling for a local image path (server generates one
// alongside every mobil/profile upload — see server/src/utils/webp.js —
// and public/logo.webp is committed alongside logo.png). Only root-relative
// paths ("/uploads/...", "/logo.png") qualify — external URLs (e.g. the
// Home hero's picsum.photos fallback) and blob:/data: URLs (unsaved file
// previews in the admin forms) are returned unchanged.
export function toWebpUrl(url) {
  if (!url || !url.startsWith("/")) return url;
  return url.replace(/\.[^./]+$/, ".webp");
}

export function hitungJumlahHari(tglAmbil, tglKembali) {
  if (!tglAmbil || !tglKembali) return 0;
  const ambil = new Date(tglAmbil);
  const kembali = new Date(tglKembali);
  ambil.setHours(0, 0, 0, 0);
  kembali.setHours(0, 0, 0, 0);
  const diff = Math.round((kembali - ambil) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
}
