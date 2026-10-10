import { getKodeRef } from "./utm";
import { PESAN_WA } from "./format";

// Menambahkan kode referensi ke pesan WA pengunjung iklan, tepat saat
// tautannya diklik.
//
// Sengaja tidak dilakukan di buildWaLink (format.js): halaman publik
// di-prerender tanpa gclid, dan React tidak menambal atribut href yang
// berbeda saat hydration. Kalau kodenya dimasukkan saat render, pengunjung
// yang mendarat di halaman prerender tetap membuka WA tanpa kode. Mengubah
// href di event click (fase capture, sebelum browser mengikuti tautan)
// berlaku untuk semua tombol WA sekaligus, termasuk yang ditambah nanti.
//
// Hanya untuk pengunjung yang datang dari klik iklan (ada gclid/gbraid/
// wbraid). Pengunjung organik tetap melihat pesan persis seperti sebelumnya.
//
// Kodenya ditulis sebagai baris "Kode: 287-XXXXXX" di akhir pesan, bukan
// tag teknis seperti "[ref: gclid-...]" yang dulu sempat dipakai lalu dibuang
// karena terlihat aneh di kolom chat pelanggan. Admin cukup menyalin kode
// ini ke panel admin > Lead WA.
export const AWALAN_KODE = "287-";

function tambahkanKode(tautan) {
  const kode = getKodeRef();
  if (!kode) return;

  let url;
  try {
    url = new URL(tautan.href);
  } catch {
    return;
  }
  if (url.hostname !== "wa.me" && url.hostname !== "api.whatsapp.com") return;

  const baris = `Kode: ${AWALAN_KODE}${kode}`;
  const teks = url.searchParams.get("text") || PESAN_WA;
  if (teks.includes(kode)) return;
  // Disusun manual dengan encodeURIComponent, bukan searchParams.set:
  // URLSearchParams menulis spasi sebagai "+", dan pesan harus tetap sama
  // persis seperti yang dihasilkan buildWaLink (%20).
  url.search = `?text=${encodeURIComponent(`${teks.trimEnd()}\n\n${baris}`)}`;
  tautan.href = url.toString();
}

export function pasangKodeRefWa() {
  const tangani = (ev) => {
    if (window.location.pathname.startsWith("/admin")) return;
    const tautan = ev.target instanceof Element ? ev.target.closest("a[href]") : null;
    if (tautan) tambahkanKode(tautan);
  };
  document.addEventListener("click", tangani, true);
  document.addEventListener("auxclick", tangani, true);
}
