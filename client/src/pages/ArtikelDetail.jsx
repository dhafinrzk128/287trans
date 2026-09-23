import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, ArrowRight } from "lucide-react";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import { articleSchema, breadcrumbSchema } from "../utils/schema";
import { useCompanyProfile } from "../context/CompanyProfileContext";
import { buildWaLink, pesanSewa } from "../utils/format";
import { trackWhatsAppClick } from "../utils/tracking";
import { getPrerenderedData, setPrerenderedData } from "../utils/prerenderData";
import { ARTIKEL, cariArtikel, muatIsiArtikel, kunciIsiArtikel } from "../data/artikel";

/**
 * Satu template untuk seluruh artikel panduan.
 *
 * Pola pemuatan isinya sama persis dengan prosa di KoleksiArmada.jsx: keadaan
 * awal dibaca dari __PRERENDER_DATA__ supaya hydration cocok dengan HTML
 * statis, dan chunk isi.js baru diunduh pada perpindahan halaman di dalam
 * situs (atau saat prerender, yang justru perlu mengunduhnya supaya hasilnya
 * terpanggang ke HTML). Slug ikut disimpan karena React Router memakai ulang
 * komponen ini saat berpindah dari satu artikel ke artikel lain.
 */
export default function ArtikelDetail({ slug }) {
  const artikel = cariArtikel(slug);
  const { profile } = useCompanyProfile();
  const [isi, setIsi] = useState(() => ({ slug, data: getPrerenderedData(kunciIsiArtikel(slug)) ?? null }));

  useEffect(() => {
    if (isi.slug === slug && isi.data) return;

    const dariHtml = getPrerenderedData(kunciIsiArtikel(slug));
    if (dariHtml) {
      setIsi({ slug, data: dariHtml });
      return;
    }

    let hidup = true;
    muatIsiArtikel(slug)
      .then((data) => {
        if (!hidup || !data) return;
        setIsi({ slug, data });
        setPrerenderedData(kunciIsiArtikel(slug), data);
      })
      // Lihat catatan yang sama di KoleksiArmada.jsx: kegagalan chunk sudah
      // ditangani main.jsx lewat vite:preloadError. Yang lolos ke sini
      // dibiarkan diam; judul, ringkasan, dan tombol WhatsApp tetap tampil.
      .catch(() => {});
    return () => {
      hidup = false;
    };
  }, [slug, isi]);

  if (!artikel) return null;

  const teks = isi.slug === slug ? isi.data : null;
  const lainnya = ARTIKEL.filter((a) => a.slug !== slug);
  const pesanWa = pesanSewa("Halo, saya baca panduan di website 287 Trans dan mau tanya soal sewa mobil.");

  return (
    <div>
      <Seo
        title={artikel.judul}
        description={artikel.deskripsi}
        path={`/artikel/${artikel.slug}`}
        jsonLd={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Artikel", path: "/artikel" },
            { name: artikel.judul, path: `/artikel/${artikel.slug}` },
          ]),
          articleSchema(artikel),
        ]}
      />

      <PageHero title={artikel.h1} subtitle={artikel.ringkasan} />

      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
          <Link to="/" className="hover:text-blue-600 hover:underline">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/artikel" className="hover:text-blue-600 hover:underline">Artikel</Link>
        </nav>

        {teks && (
          <>
            <Reveal className="mt-6">
              <p className="text-lg leading-relaxed text-slate-700">{teks.intro}</p>
            </Reveal>

            {teks.bagian.map((b, i) => (
              <Reveal key={b.judul} delay={Math.min((i + 1) * 40, 160)} className="mt-10">
                <h2 className="text-2xl font-bold text-slate-900">{b.judul}</h2>
                {b.paragraf.map((p) => (
                  <p key={p.slice(0, 40)} className="mt-3 leading-relaxed text-slate-700">{p}</p>
                ))}
                {b.poin && (
                  <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-slate-700 marker:text-accent-600">
                    {b.poin.map((p) => (
                      <li key={p.slice(0, 40)}>{p}</li>
                    ))}
                  </ul>
                )}
                {b.tautan && (
                  <Link
                    to={b.tautan.to}
                    className="mt-4 inline-flex items-center gap-1.5 font-semibold text-blue-600 hover:underline"
                  >
                    {b.tautan.label}
                    <ArrowRight size={16} />
                  </Link>
                )}
              </Reveal>
            ))}

            {teks.terkait?.length > 0 && (
              <Reveal className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-lg font-bold text-slate-900">Armada yang Relevan</h2>
                <ul className="mt-3 space-y-2">
                  {teks.terkait.map((t) => (
                    <li key={t.to}>
                      <Link to={t.to} className="inline-flex items-center gap-1.5 font-medium text-blue-600 hover:underline">
                        {t.label}
                        <ArrowRight size={14} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </>
        )}

        <Reveal className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-[var(--shadow-soft)] sm:p-8">
          <h2 className="text-lg font-bold text-slate-900">Mau Cek Unit dan Harganya?</h2>
          <p className="mt-2 leading-relaxed text-slate-600">
            Sebutkan tanggal dan lama sewa, tim kami langsung mengonfirmasi unit yang tersedia beserta total biayanya.
          </p>
          {profile?.whatsapp && (
            <a
              href={buildWaLink(profile.whatsapp, pesanWa)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick(`artikel_${artikel.slug}`)}
              className="btn-glow-whatsapp mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-800"
            >
              <MessageCircle size={16} />
              Chat via WhatsApp
            </a>
          )}
        </Reveal>

        <section className="mt-14">
          <h2 className="text-lg font-bold text-slate-900">Panduan Lainnya</h2>
          <ul className="mt-3 space-y-2">
            {lainnya.map((a) => (
              <li key={a.slug}>
                <Link to={`/artikel/${a.slug}`} className="font-medium text-blue-600 hover:underline">
                  {a.h1}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </div>
  );
}
