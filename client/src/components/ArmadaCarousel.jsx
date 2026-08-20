import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import api from "../api/client";
import SmartImage from "./SmartImage";
import { getPrerenderedData, setPrerenderedData } from "../utils/prerenderData";

const PRERENDER_KEY = "galeri_armada";
const AUTOPLAY_MS = 4500;

/**
 * Selipan foto armada di antara blok teks halaman landing — murni pemanis
 * visual, tanpa judul atau penjelasan, supaya halaman tidak terasa teks
 * semua.
 *
 * Posisi geser sengaja TIDAK disimpan sebagai state React: pergeseran memakai
 * scroll native (scroll-snap) dan tombol hanya memanggil scrollBy. Markup yang
 * dihasilkan jadi selalu sama persis berapa pun posisi scroll-nya, sehingga
 * hasil prerender tidak mungkin berbeda dari render pertama di browser
 * pengunjung — persoalan yang sempat merusak <Reveal> dan <TipeToggle>.
 * Bonusnya, geser jari di HP sudah jalan sendiri tanpa kode tambahan.
 */
export default function ArmadaCarousel() {
  const trackRef = useRef(null);
  const [fotos, setFotos] = useState(() => getPrerenderedData(PRERENDER_KEY) ?? []);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    api
      .get("/galeri")
      .then(({ data }) => {
        setFotos(data);
        setPrerenderedData(PRERENDER_KEY, data);
      })
      .catch(() => {
        // Galeri hanya pelengkap; kalau gagal dimuat halaman tetap utuh.
      });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || window.__PRERENDERING__) return;
    if (paused || fotos.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      const el = trackRef.current;
      if (!el) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
      el.scrollTo({ left: atEnd ? 0 : el.scrollLeft + el.clientWidth, behavior: "smooth" });
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, fotos.length]);

  function nudge(arah) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: arah * el.clientWidth, behavior: "smooth" });
  }

  if (fotos.length === 0) return null;

  return (
    <div className="mt-10">
    <div
      className="group relative overflow-hidden rounded-2xl border border-slate-200 shadow-[var(--shadow-soft)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      <div
        ref={trackRef}
        className="scrollbar-none flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
      >
        {fotos.map((foto) => (
          <div key={foto.id} className="aspect-[16/9] w-full shrink-0 snap-start bg-slate-100">
            <SmartImage
              src={foto.urlFoto}
              alt={foto.judul || "Armada rental mobil 287 Trans di Tangerang"}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {fotos.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => nudge(-1)}
            aria-label="Foto sebelumnya"
            className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white/85 p-2 text-slate-700 opacity-0 shadow-md transition-all duration-200 hover:bg-white focus-visible:opacity-100 group-hover:opacity-100"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => nudge(1)}
            aria-label="Foto berikutnya"
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white/85 p-2 text-slate-700 opacity-0 shadow-md transition-all duration-200 hover:bg-white focus-visible:opacity-100 group-hover:opacity-100"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}
    </div>

      <Link
        to="/katalog"
        className="group mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
      >
        Lihat semua armada &amp; harga
        <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
