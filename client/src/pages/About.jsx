import { MapPin, Phone, Mail, MessageCircle, CheckCircle2 } from "lucide-react";
import { useCompanyProfile } from "../context/CompanyProfileContext";
import Seo from "../components/Seo";
import { breadcrumbSchema } from "../utils/schema";
import Reveal from "../components/Reveal";
import Spinner from "../components/ui/Spinner";
import SmartImage from "../components/SmartImage";
import { buildWaLink } from "../utils/format";
import { trackWhatsAppClick } from "../utils/tracking";

export default function About() {
  const { profile, loading } = useCompanyProfile();

  if (loading) return <Spinner />;

  const keunggulan = profile?.keunggulan || [];

  return (
    <div>
      <Seo
        title="Tentang 287 Trans - Rental Mobil Terpercaya Tangerang"
        description="Kenali 287 Trans, penyedia rental mobil Tangerang & Jabodetabek terpercaya. Armada premium terawat, proses booking mudah, tim siap bantu."
        path="/tentang-kami"
        jsonLd={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Tentang Kami", path: "/tentang-kami" },
        ])}
      />
      <section className="relative overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-800 to-accent-900 py-14 text-white">
        <div className="pointer-events-none absolute -top-16 right-0 h-64 w-64 rounded-full bg-accent-500/15 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold sm:text-4xl">Tentang Kami</h1>
          <p className="mt-3 max-w-2xl text-blue-100">Mengenal lebih dekat {profile?.namaPerusahaan || "287 Trans"}.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid lg:grid-cols-2 lg:items-center lg:px-8">
        <Reveal className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100 shadow-[var(--shadow-soft-lg)]">
          {profile?.fotoUrl && (
            <SmartImage src={profile.fotoUrl} alt={profile?.namaPerusahaan} className="h-full w-full object-cover" />
          )}
        </Reveal>
        <Reveal className="mt-8 lg:mt-0" delay={150}>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Profil Perusahaan</p>
          <h2 className="mt-1 text-2xl font-bold text-slate-900">{profile?.namaPerusahaan}</h2>
          <p className="mt-4 leading-relaxed text-slate-600">{profile?.deskripsi}</p>
        </Reveal>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal as="h2" className="text-center text-2xl font-bold text-slate-900">Keunggulan Kami</Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {keunggulan.map((item, idx) => (
              <Reveal key={idx} delay={(idx % 4) * 80} className="h-full [&>*]:h-full">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft-lg)]">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <CheckCircle2 size={20} />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-slate-900">{item.judul}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.deskripsi}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-2xl font-bold text-slate-900">Lokasi Kami</h2>
            {profile?.mapsEmbedUrl ? (
              <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 shadow-[var(--shadow-soft)]">
                <iframe
                  src={profile.mapsEmbedUrl}
                  title="Lokasi 287 Trans"
                  width="100%"
                  height="320"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ) : (
              <p className="mt-4 text-slate-600">Peta lokasi belum tersedia.</p>
            )}
          </Reveal>
          <Reveal delay={150}>
            <h2 className="text-2xl font-bold text-slate-900">Informasi Kontak</h2>
            <ul className="mt-5 space-y-4 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <MapPin size={18} />
                </span>
                <span className="pt-2">{profile?.alamat}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Phone size={18} />
                </span>
                <span>{profile?.telepon}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Mail size={18} />
                </span>
                <span>{profile?.email}</span>
              </li>
              {profile?.whatsapp && (
                <li className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <MessageCircle size={18} />
                  </span>
                  <a href={buildWaLink(profile.whatsapp)} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("about_page")} className="font-medium text-blue-600 hover:underline">
                    Chat via WhatsApp
                  </a>
                </li>
              )}
            </ul>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
