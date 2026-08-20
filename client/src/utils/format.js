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

// The prefilled text lands in the customer's own WhatsApp compose box, so it
// has to read like something a person would actually send. It deliberately
// carries no campaign/gclid tag: that used to be appended here, which meant
// visitors arriving from an ad — the exact traffic we pay for and measure —
// saw a technical "[ref: gclid-...]" string in their draft and had to decide
// whether to delete it before sending. Attribution never depended on it
// anyway; trackWhatsAppClick (src/utils/tracking.js) already sends the UTM
// and gclid values to GTM, so Google Ads still credits the right campaign.
export function buildWaLink(number, text) {
  const digits = (number || "").replace(/\D/g, "").replace(/^0/, "62");
  const query = text ? `?text=${encodeURIComponent(text)}` : "";
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
