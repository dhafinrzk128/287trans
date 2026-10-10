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
//
// Ad visitors now do get one short, human-readable line ("Kode: 287-XXXXXX")
// so a chat can be matched back to its ad click for offline conversion
// import. That line is added at click time by src/utils/kodeRefWa.js, not
// here — see the note there on why it can't happen during render.
export function buildWaLink(number, text) {
  const digits = (number || "").replace(/\D/g, "").replace(/^0/, "62");
  const query = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${digits}${query}`;
}

// Pesan siap-kirim di semua tombol WhatsApp untuk calon penyewa.
//
// Sengaja satu kalimat yang sama di seluruh situs, atas permintaan pemilik
// (Okt 2026). Versi sebelumnya (pesanSewa) membawa pembuka yang berbeda per
// halaman ditambah kolom kosong — "Tanggal mulai:", "Lama sewa:", dan
// seterusnya — supaya balasan pertama admin bisa langsung berupa harga.
// Kolom itu kini ditanyakan admin di chat.
//
// Yang tetap berbeda: pesan soal pesanan yang sudah ada (lupa kode booking,
// menanyakan status booking) di BookingLookup dan BookingStatus. Itu bukan
// permintaan sewa, jadi tidak memakai konstanta ini.
//
// Baris "Kode: 287-XXXXXX" untuk pengunjung iklan tetap ditambahkan saat klik
// oleh src/utils/kodeRefWa.js.
export const PESAN_WA = "Halo 287Trans, saya ingin sewa mobil.";

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

// Varian berukuran lebih kecil dari sebuah foto unggahan, untuk srcset di
// kartu katalog. Daftarnya harus sama dengan VARIAN di
// server/src/utils/webp.js.
//
// Hanya untuk /uploads: berkasnya dibuat sesuai permintaan oleh penangan di
// server/src/index.js, dan berkas lain (logo, favicon) tidak punya padanan
// itu. Server menjamin URL ini tidak pernah 404 — kalau variannya gagal
// dibuat, yang dikirim gambar ukuran penuh dengan nama yang sama.
export function varianWebpUrl(url) {
  if (!url || !url.startsWith("/uploads/")) return null;
  return {
    kecil: url.replace(/\.[^./]+$/, "-kecil.webp"),
    sedang: url.replace(/\.[^./]+$/, "-sedang.webp"),
  };
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
