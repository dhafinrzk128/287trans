import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/tentang-kami", label: "Tentang Kami" },
  { to: "/katalog", label: "Pilihan Armada" },
  { to: "/kontak", label: "Kontak" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `relative py-1 text-sm font-medium transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:rounded-full after:bg-blue-600 after:transition-all ${
      isActive ? "text-blue-600 after:w-full" : "text-slate-600 hover:text-blue-600 after:w-0"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
          <img src="/logo.png" alt="287 Trans" className="h-10 w-auto sm:h-12" />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={linkClass}>
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
            {NAV_LINKS.map((link) => (
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
