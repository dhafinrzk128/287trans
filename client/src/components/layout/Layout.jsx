import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";
import { trackPageView } from "../../utils/tracking";

export default function Layout() {
  const location = useLocation();
  // Animasi masuk hanya untuk perpindahan halaman di dalam situs, bukan
  // pemuatan pertama. Di pemuatan pertama isinya sudah ada di HTML hasil
  // prerender; memudarkannya dari opacity 0 cuma menunda tampilnya konten,
  // dan karena fade itu dikerjakan compositor tanpa paint ulang, Chrome baru
  // mencatat LCP setelah JS selesai jalan. Kunci lokasi awal selalu sama di
  // prerender dan di render pertama browser, jadi hydration tetap cocok.
  const kunciAwal = useRef(location.key);
  const animasi = location.key !== kunciAwal.current;

  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView(location.pathname, document.title);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main key={location.pathname} className={animasi ? "page-transition flex-1" : "flex-1"}>
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
