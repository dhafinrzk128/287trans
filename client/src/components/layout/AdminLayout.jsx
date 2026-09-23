import { Suspense, useState } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Car, ClipboardList, Building2, MessageSquareQuote, HelpCircle, KeyRound, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Seo from "../Seo";
import Spinner from "../ui/Spinner";
import SmartImage from "../SmartImage";

const NAV_ITEMS = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/mobil", label: "Kelola Mobil", icon: Car },
  { to: "/admin/booking", label: "Kelola Booking", icon: ClipboardList },
  { to: "/admin/testimoni", label: "Kelola Testimoni", icon: MessageSquareQuote },
  { to: "/admin/faq", label: "Kelola FAQ", icon: HelpCircle },
  { to: "/admin/profile", label: "Company Profile", icon: Building2 },
  { to: "/admin/akun", label: "Akun Saya", icon: KeyRound },
];

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate("/admin/login");
  }

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
      isActive ? "bg-blue-600 text-white shadow-[var(--shadow-brand)]" : "text-slate-300 hover:bg-neutral-800 hover:text-white"
    }`;

  const SidebarContent = (
    <>
      <div className="px-2 pb-6">
        <SmartImage src="/logo-nav.png" alt="287 Trans" width="148" height="120" className="h-10 w-auto" />
        <p className="mt-2 text-xs text-slate-400">Admin Panel</p>
      </div>
      <nav className="flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.to} to={item.to} className={linkClass} onClick={() => setOpen(false)}>
            <item.icon size={18} />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-6 border-t border-neutral-800 pt-4">
        <p className="px-2 text-xs text-slate-500">Masuk sebagai</p>
        <p className="px-2 text-sm font-semibold text-white">{admin?.username}</p>
        <button
          type="button"
          onClick={handleLogout}
          className="mt-3 flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-neutral-800"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Seo title="Admin Panel" description="Panel admin 287 Trans." path={pathname} noindex />
      <div className="hidden w-64 shrink-0 flex-col bg-neutral-900 p-4 md:fixed md:inset-y-0 md:flex">
        {SidebarContent}
      </div>

      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:hidden">
        <SmartImage src="/logo-nav.png" alt="287 Trans" width="148" height="120" className="h-9 w-auto" />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100"
          aria-label="Buka menu admin"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="flex flex-col bg-neutral-900 p-4 md:hidden">{SidebarContent}</div>
      )}

      <div className="md:pl-64">
        <main className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
          <Suspense fallback={<Spinner />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
