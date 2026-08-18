import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";
import { trackPageView } from "../../utils/tracking";

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView(location.pathname, document.title);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main key={location.pathname} className="page-transition flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
