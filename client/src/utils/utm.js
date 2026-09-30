// Menangkap asal kunjungan dari URL saat halaman pertama dimuat.
//
// Disimpan in-memory (variabel level-modul), bukan sessionStorage/
// localStorage, sesuai aturan project "no Web Storage untuk tracking".
// Satu-satunya cadangan yang dipakai adalah cookie first-party `_gcl_aw`
// yang ditulis tag Conversion Linker di GTM: kalau pengunjung iklan
// hard-refresh atau pindah halaman lewat reload, gclid dari URL hilang,
// tapi cookie itu masih ada (90 hari).
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "gclid", "gbraid", "wbraid"];

const params = new URLSearchParams(window.location.search);
const utmData = {};
UTM_KEYS.forEach((key) => {
  const value = params.get(key);
  if (value) utmData[key] = value;
});

// Format cookie Conversion Linker: "GCL.<timestamp>.<gclid>".
function gclidDariCookie() {
  if (typeof document === "undefined") return null;
  const cocok = document.cookie.match(/(?:^|;\s*)_gcl_aw=([^;]+)/);
  if (!cocok) return null;
  const bagian = decodeURIComponent(cocok[1]).split(".");
  return bagian.length >= 3 ? bagian.slice(2).join(".") : null;
}

export function getUtmParams() {
  if (utmData.gclid) return utmData;
  // Dibaca setiap kali, bukan sekali saat modul dimuat: GTM dimuat tertunda,
  // jadi cookie-nya bisa baru muncul setelah modul ini berjalan.
  const gclid = gclidDariCookie();
  return gclid ? { ...utmData, gclid } : utmData;
}

export function dariKlikIklan() {
  const p = getUtmParams();
  return Boolean(p.gclid || p.gbraid || p.wbraid);
}

// Kode referensi pendek untuk pengunjung iklan. Satu kode per kunjungan
// (dibuat sekali, lalu dipakai ulang semua tombol WA di kunjungan itu), dan
// ikut tertulis di pesan WA supaya chat yang masuk bisa dicocokkan balik ke
// klik iklannya di panel admin. Alfabetnya sama dengan kode booking: tanpa
// 0/O/1/I yang mudah tertukar saat dibaca dari layar chat.
const ALFABET_KODE = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
let kodeRef = null;

export function getKodeRef() {
  if (!dariKlikIklan()) return null;
  if (!kodeRef) {
    const acak = new Uint8Array(6);
    crypto.getRandomValues(acak);
    kodeRef = Array.from(acak, (n) => ALFABET_KODE[n % ALFABET_KODE.length]).join("");
  }
  return kodeRef;
}
