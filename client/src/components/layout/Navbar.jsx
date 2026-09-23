import { useEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import SmartImage from "../SmartImage";
import { MENU_ARMADA, KOLEKSI_PATHS } from "../../data/koleksiArmada";

// "Pilihan Armada" tidak ada di daftar ini karena dia bukan tautan tunggal
// lagi, melainkan menu yang membuka daftar kategori dan model — lihat
// <MenuArmada> di bawah. Sisipannya berada di antara "Cek Booking" dan
// "FAQ", posisi yang sama seperti sebelumnya.
const NAV_KIRI = [
  { to: "/", label: "Home", end: true },
  { to: "/tentang-kami", label: "Tentang Kami" },
  { to: "/status", label: "Cek Booking" },
];

const NAV_KANAN = [
  { to: "/faq", label: "FAQ" },
  { to: "/kontak", label: "Kontak" },
];

const linkClass = ({ isActive }) =>
  `relative py-1 text-sm font-medium transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:rounded-full after:bg-blue-600 after:transition-all ${
    isActive ? "text-blue-600 after:w-full" : "text-slate-600 hover:text-blue-600 after:w-0"
  }`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [armadaOpen, setArmadaOpen] = useState(false);
  const [armadaOpenMobile, setArmadaOpenMobile] = useState(false);
  const armadaRef = useRef(null);
  const { pathname } = useLocation();

  // Menu armada dianggap aktif di /katalog maupun di halaman kategori/model,
  // supaya penanda posisi tetap benar untuk pengunjung yang mendarat langsung
  // dari iklan ke salah satu halaman koleksi.
  const armadaAktif = pathname === "/katalog" || KOLEKSI_PATHS.includes(pathname);

  // Tutup semua menu setiap kali pindah halaman — tanpa ini, panel dropdown
  // tetap menggantung menutupi konten halaman tujuan.
  useEffect(() => {
    setOpen(false);
    setArmadaOpen(false);
    setArmadaOpenMobile(false);
  }, [pathname]);

  useEffect(() => {
    if (!armadaOpen) return;
    function onPointerDown(e) {
      if (armadaRef.current && !armadaRef.current.contains(e.target)) setArmadaOpen(false);
    }
    function onKeyDown(e) {
      if (e.key === "Escape") setArmadaOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [armadaOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
          {/* Logo ini elemen LCP di ponsel (PageSpeed, Sep 2026), jadi dimuat
              dengan prioritas tinggi. Pasangannya ada di index.html: <link
              rel="preload"> ke logo-nav.webp supaya unduhan mulai bahkan
              sebelum parser sampai ke <header>. */}
          <SmartImage src="/logo-nav.png" alt="287 Trans" width="148" height="120" fetchPriority="high" className="h-10 w-auto sm:h-12" />
        </Link>

        {/* Enam menu plus logo dan tombol CTA hanya muat pas di 768px: teks
            keenam label butuh 389px dari 500px yang tersisa, jadi jarak 32px
            (5 x 32 = 160px) meluber dan labelnya pecah dua baris. Jarak 16px
            menyisakan 16px — cukup aman terhadap perbedaan render font. Mulai
            1024px ruangnya berlimpah, jadi kembali ke jarak semula. */}
        <div className="hidden items-center gap-4 md:flex lg:gap-8">
          {NAV_KIRI.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={linkClass}>
              {link.label}
            </NavLink>
          ))}

          <div className="relative" ref={armadaRef}>
            <button
              type="button"
              onClick={() => setArmadaOpen((v) => !v)}
              aria-expanded={armadaOpen}
              aria-haspopup="true"
              className={`relative flex cursor-pointer items-center gap-1 py-1 text-sm font-medium transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:rounded-full after:bg-blue-600 after:transition-all ${
                armadaAktif ? "text-blue-600 after:w-full" : "text-slate-600 hover:text-blue-600 after:w-0"
              }`}
            >
              Pilihan Armada
              <ChevronDown size={15} className={`transition-transform duration-200 ${armadaOpen ? "rotate-180" : ""}`} />
            </button>

            {armadaOpen && (
              <div className="absolute left-1/2 top-full z-50 mt-4 w-[34rem] -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-5 shadow-[var(--shadow-soft-lg)]">
                <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                  {MENU_ARMADA.map((grup) => (
                    <div key={grup.judul}>
                      <p className="px-3 pb-1 text-xs font-bold uppercase tracking-wide text-slate-400">{grup.judul}</p>
                      {grup.items.map((k) => (
                        <NavLink
                          key={k.slug}
                          to={`/${k.slug}`}
                          className={({ isActive }) =>
                            `block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                              isActive ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                            }`
                          }
                        >
                          {k.label}
                        </NavLink>
                      ))}
                    </div>
                  ))}
                </div>
                <Link
                  to="/katalog"
                  className="mt-3 block rounded-xl bg-slate-50 px-3 py-2.5 text-center text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-50"
                >
                  Lihat Semua Armada
                </Link>
              </div>
            )}
          </div>

          {NAV_KANAN.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:block">
          <Link
            to="/katalog"
            className="btn-glow-accent inline-flex items-center justify-center rounded-xl bg-accent-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-700"
          >
            Booking Sekarang
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Buka menu"
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_KIRI.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {/* Di layar kecil daftarnya dibuat melipat, bukan panel melayang:
                dua belas tautan yang langsung terbuka akan mendorong menu
                lainnya jauh keluar layar. */}
            <button
              type="button"
              onClick={() => setArmadaOpenMobile((v) => !v)}
              aria-expanded={armadaOpenMobile}
              className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                armadaAktif ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              Pilihan Armada
              <ChevronDown
                size={18}
                className={`transition-transform duration-200 ${armadaOpenMobile ? "rotate-180" : ""}`}
              />
            </button>

            {armadaOpenMobile && (
              <div className="ml-3 border-l border-slate-200 pl-3">
                {MENU_ARMADA.map((grup) => (
                  <div key={grup.judul} className="pb-1">
                    <p className="px-3 pb-0.5 pt-2 text-xs font-bold uppercase tracking-wide text-slate-400">
                      {grup.judul}
                    </p>
                    {grup.items.map((k) => (
                      <NavLink
                        key={k.slug}
                        to={`/${k.slug}`}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          `block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                            isActive ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"
                          }`
                        }
                      >
                        {k.label}
                      </NavLink>
                    ))}
                  </div>
                ))}
                <Link
                  to="/katalog"
                  onClick={() => setOpen(false)}
                  className="mt-1 block rounded-lg px-3 py-2 text-sm font-semibold text-blue-600 hover:bg-slate-50"
                >
                  Lihat Semua Armada
                </Link>
              </div>
            )}

            {NAV_KANAN.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <Link
              to="/katalog"
              onClick={() => setOpen(false)}
              className="btn-glow-accent mt-2 inline-flex items-center justify-center rounded-xl bg-accent-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-700"
            >
              Booking Sekarang
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
