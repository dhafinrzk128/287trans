import { lazy, Suspense, useEffect, useState } from "react";

const Kalender = lazy(() => import("./Kalender"));

/**
 * <DayPicker>, tapi kodenya baru diunduh setelah halaman selesai dimuat.
 *
 * Kenapa bukan sekadar React.lazy: halaman ini diprerender, dan lazy
 * component yang ikut hydration selalu suspend di render pertamanya — persis
 * masalah error #418 yang membuat route publik tidak di-lazy (lihat komentar
 * di App.jsx). Jadi render pertama, baik saat prerender maupun saat
 * hydration, sama-sama hanya placeholder berukuran tetap. Kalender baru
 * dipasang di effect, setelah hydration selesai, sehingga Suspense-nya
 * berjalan sebagai render klien biasa.
 *
 * Menunggu event `load` supaya unduhan chunk ini tidak berebut bandwidth
 * dengan gambar yang menentukan LCP (foto mobil di halaman detail).
 *
 * Tinggi placeholder = tinggi kalender untuk bulan 5 minggu (300px, diukur
 * di 375/412/1280px). Bulan 6 minggu sedikit lebih tinggi, tapi di ponsel
 * kalender ada jauh di bawah layar pertama, jadi pergeserannya tidak
 * terlihat maupun terhitung CLS.
 */
export default function KalenderTertunda(props) {
  const [siap, setSiap] = useState(false);

  useEffect(() => {
    // Saat prerender, placeholder-lah yang harus terpotret ke HTML statis
    // (lihat window.__PRERENDERING__ di scripts/prerender.js).
    if (window.__PRERENDERING__) return;
    if (document.readyState === "complete") {
      setSiap(true);
      return;
    }
    const pasang = () => setSiap(true);
    window.addEventListener("load", pasang, { once: true });
    return () => window.removeEventListener("load", pasang);
  }, []);

  const placeholder = <div className="h-[300px]" aria-hidden="true" />;

  if (!siap) return placeholder;
  return (
    <Suspense fallback={placeholder}>
      <Kalender {...props} />
    </Suspense>
  );
}
