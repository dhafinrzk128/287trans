import { getUtmParams, getKodeRef } from "./utm";

export function trackWhatsAppClick(buttonLocation, carName) {
  const kodeRef = getKodeRef();
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "whatsapp_click",
    button_location: buttonLocation,
    ...(carName && { car_name: carName }),
    ...(kodeRef && { kode_ref: kodeRef }),
    ...getUtmParams(),
  });
  if (kodeRef) catatLeadWa(kodeRef, buttonLocation, carName);
}

// Mencatat klik WA pengunjung iklan ke server, supaya kode referensi di
// pesan WA bisa dicocokkan balik ke gclid-nya (lihat panel admin > Lead WA).
// sendBeacon dipakai karena klik tombol WA langsung memindahkan pengunjung
// ke aplikasi WhatsApp: fetch biasa bisa terputus di tengah jalan, beacon
// tetap dikirim browser walau halamannya ditinggalkan.
function catatLeadWa(kodeRef, lokasiTombol, namaMobil) {
  try {
    const muatan = JSON.stringify({
      kodeRef,
      lokasiTombol,
      namaMobil,
      halaman: window.location.pathname,
      ...getUtmParams(),
    });
    // text/plain, bukan application/json: sebagian browser menolak beacon
    // dengan tipe di luar daftar "CORS-safelisted". Server mengurai JSON-nya
    // sendiri (lihat server/src/routes/leadWa.routes.js).
    const blob = new Blob([muatan], { type: "text/plain" });
    if (navigator.sendBeacon && navigator.sendBeacon("/api/lead-wa", blob)) return;
    fetch("/api/lead-wa", { method: "POST", body: muatan, headers: { "Content-Type": "text/plain" }, keepalive: true }).catch(() => {});
  } catch {
    // Pencatatan lead tidak boleh pernah menghalangi pengunjung membuka WA.
  }
}

export function trackPageView(path, title) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "page_view",
    page_path: path,
    page_title: title,
  });
}

export function trackBookingSubmit(carName) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "booking_submit",
    ...(carName && { car_name: carName }),
    ...getUtmParams(),
  });
}
