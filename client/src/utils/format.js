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
  const query = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${digits}${query}`;
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
