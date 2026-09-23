import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import SmartImage from "../SmartImage";
import { useCompanyProfile } from "../../context/CompanyProfileContext";
import { buildWaLink } from "../../utils/format";
import { trackWhatsAppClick } from "../../utils/tracking";
import { KOLEKSI_KATEGORI } from "../../data/koleksi/kategori";
import useReveal from "../../hooks/useReveal";

function telHref(number) {
  const digits = (number || "").replace(/\D/g, "").replace(/^0/, "62");
  return digits ? `tel:+${digits}` : undefined;
}

export default function Footer() {
  const { profile } = useCompanyProfile();
  const year = new Date().getFullYear();
  // Peta baru dipasang ke DOM saat digulir mendekat. `loading="lazy"` saja
  // tidak cukup: diukur di produksi, iframe-nya tetap ikut terunduh pada
  // ~1,6 detik dan baru selesai pada ~4,2 detik — dia yang menahan event
  // load seluruh halaman, di setiap halaman, demi peta yang mayoritas
  // pengunjung tidak pernah gulir sampai ke sana.
  //
  // Aman terhadap hidrasi: nilai awalnya false, sama seperti saat prerender
  // (IntersectionObserver dimatikan di sana), jadi HTML statis dan render
  // pertama di klien sama-sama belum memuat iframe-nya.
  const [refPeta, petaTampak] = useReveal({ rootMargin: "300px 0px" });

  return (
    <footer className="border-t border-neutral-800 bg-neutral-900 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div>
          <SmartImage src="/logo-nav.png" alt={profile?.namaPerusahaan || "287 Trans"} width="148" height="120" className="h-14 w-auto" />
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
          {/* Kolom ini dulu berisi lima halaman artikel yang kini sudah tidak
              ada; penggantinya adalah kategori armada, digenerate dari daftar
              yang sama dengan navbar supaya setiap halaman kategori selalu
              tertaut dari seluruh halaman situs. */}
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Kategori Armada</h3>
          <span className="mt-2 block h-0.5 w-6 rounded-full bg-blue-500" />
          <ul className="mt-4 space-y-2 text-sm">
            {KOLEKSI_KATEGORI.map((k) => (
              <li key={k.slug}>
                <Link to={`/${k.slug}`} className="transition-colors hover:text-white">{k.label}</Link>
              </li>
            ))}
            <li><Link to="/katalog" className="transition-colors hover:text-white">Katalog Lengkap</Link></li>
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
        <div ref={refPeta} className="min-h-[220px] border-t border-neutral-800">
          {petaTampak && (
            <iframe
              src={profile.mapsEmbedUrl}
              title={`Lokasi ${profile?.namaPerusahaan || "287 Trans"}`}
              width="100%"
              height="220"
              className="block border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          )}
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
