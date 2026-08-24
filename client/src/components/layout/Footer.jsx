import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import SmartImage from "../SmartImage";
import { useCompanyProfile } from "../../context/CompanyProfileContext";
import { buildWaLink } from "../../utils/format";
import { trackWhatsAppClick } from "../../utils/tracking";

function telHref(number) {
  const digits = (number || "").replace(/\D/g, "").replace(/^0/, "62");
  return digits ? `tel:+${digits}` : undefined;
}

export default function Footer() {
  const { profile } = useCompanyProfile();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-800 bg-neutral-900 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div>
          <SmartImage src="/logo.png" alt={profile?.namaPerusahaan || "287 Trans"} width="700" height="569" className="h-14 w-auto" />
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            Solusi rental mobil premium terpercaya dengan armada unit-unit terbaru, harga bersaing, dan proses
            booking online yang mudah tanpa perlu membuat akun.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Navigasi</h3>
          <span className="mt-2 block h-0.5 w-6 rounded-full bg-blue-500" />
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/" className="transition-colors hover:text-white">Home</Link></li>
            <li><Link to="/tentang-kami" className="transition-colors hover:text-white">Tentang Kami</Link></li>
            <li><Link to="/katalog" className="transition-colors hover:text-white">Pilihan Armada</Link></li>
            <li><Link to="/faq" className="transition-colors hover:text-white">FAQ</Link></li>
            <li><Link to="/kontak" className="transition-colors hover:text-white">Kontak</Link></li>
            <li><Link to="/status" className="transition-colors hover:text-white">Cek Status Booking</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Layanan</h3>
          <span className="mt-2 block h-0.5 w-6 rounded-full bg-blue-500" />
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/rental-mobil-tangerang" className="transition-colors hover:text-white">Rental Mobil Tangerang</Link></li>
            <li><Link to="/sewa-mobil-lepas-kunci-tangerang" className="transition-colors hover:text-white">Sewa Lepas Kunci</Link></li>
            <li><Link to="/rental-mobil-plus-driver" className="transition-colors hover:text-white">Rental Plus Driver</Link></li>
            <li><Link to="/rental-mobil-bulanan-tangerang" className="transition-colors hover:text-white">Sewa Bulanan</Link></li>
            <li><Link to="/sewa-mobil-bandara-soekarno-hatta" className="transition-colors hover:text-white">Antar-Jemput Bandara</Link></li>
            <li><Link to="/armada" className="transition-colors hover:text-white">Daftar Armada</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Kontak Kami</h3>
          <span className="mt-2 block h-0.5 w-6 rounded-full bg-blue-500" />
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-blue-400" />
              <span>{profile?.alamat || "Jl. Raya Rental No. 287, Jakarta"}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0 text-blue-400" />
              <a href={telHref(profile?.telepon)} className="transition-colors hover:text-white">
                {profile?.telepon || "021-5550287"}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="shrink-0 text-blue-400" />
              <span>{profile?.email || "info@287trans.co.id"}</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Hubungi via WhatsApp</h3>
          <span className="mt-2 block h-0.5 w-6 rounded-full bg-accent-500" />
          <p className="mt-4 text-sm text-slate-400">
            Butuh bantuan cepat? Tim kami siap membantu Anda melalui WhatsApp setiap hari.
          </p>
          {profile?.whatsapp && (
            <a
              href={buildWaLink(profile.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("footer")}
              className="btn-glow-whatsapp mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-700"
            >
              <MessageCircle size={16} />
              Chat WhatsApp
            </a>
          )}
        </div>
      </div>

      {profile?.mapsEmbedUrl && (
        <div className="border-t border-neutral-800">
          <iframe
            src={profile.mapsEmbedUrl}
            title={`Lokasi ${profile?.namaPerusahaan || "287 Trans"}`}
            width="100%"
            height="220"
            style={{ border: 0, display: "block" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      )}

      {/* Tidak ada tautan ke /admin/login di sini: panel admin dibuka dengan
          mengetik URL-nya langsung. Ini hanya menghilangkan penunjuk yang
          terlihat pengunjung — halamannya sendiri tetap dijaga oleh login. */}
      <div className="border-t border-neutral-800 py-5 text-center text-xs text-slate-500">
        {`© ${year} ${profile?.namaPerusahaan || "287 Trans"}. Seluruh hak cipta dilindungi.`}
      </div>
    </footer>
  );
}
