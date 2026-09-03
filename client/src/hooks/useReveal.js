import { useEffect, useRef, useState } from "react";

/**
 * `langsung` melewati IntersectionObserver dan memulai elemen dalam keadaan
 * sudah terlihat. Dipakai untuk konten di layar pertama — terutama gambar
 * hero, yang merupakan elemen LCP halaman.
 *
 * Kenapa perlu: .reveal mulai dari opacity 0, dan LCP hanya menghitung yang
 * benar-benar tergambar. Tanpa ini, gambar hero yang selesai diunduh pada
 * ~2,0 detik baru dihitung sebagai LCP pada ~3,1 detik — menunggu React
 * selesai hidrasi, observer menyala, lalu transisi 0,7 detik berjalan.
 * Animasi masuk memang bagus untuk bagian yang digulir; untuk elemen yang
 * sudah terlihat sejak awal, dia murni menunda.
 *
 * Aman terhadap hidrasi: nilainya berasal dari state awal, bukan dari
 * observer — jadi prerender (yang mematikan IntersectionObserver, lihat
 * scripts/prerender.js) ikut memotret kelas "is-visible" yang sama dengan
 * render pertama di klien. Bonusnya, hero kini sudah terlihat di HTML statis
 * alih-alih transparan sampai JavaScript jalan.
 */
export default function useReveal({ threshold = 0.15, rootMargin = "0px 0px -10% 0px", langsung = false } = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(langsung);

  useEffect(() => {
    if (langsung) return;
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, langsung]);

  return [ref, visible];
}
