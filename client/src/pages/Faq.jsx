import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import { breadcrumbSchema, faqPageSchema } from "../utils/schema";
import { useCompanyProfile } from "../context/CompanyProfileContext";
import { buildWaLink } from "../utils/format";
import { trackWhatsAppClick } from "../utils/tracking";
import { FAQ_UMUM } from "../data/faqUmum";


export default function Faq() {
  const { profile } = useCompanyProfile();

  return (
    <div>
      <Seo
        title="FAQ - Pertanyaan Seputar Rental Mobil di 287 Trans"
        description="Pertanyaan yang sering ditanyakan seputar sewa mobil di 287 Trans: syarat, harga, area layanan, cara booking, hingga durasi sewa minimum."
        path="/faq"
        jsonLd={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/faq" },
          ]),
          faqPageSchema(FAQ_UMUM),
        ]}
      />

      <PageHero
        title="Pertanyaan Seputar Rental Mobil"
        subtitle="Jawaban singkat untuk pertanyaan yang paling sering ditanyakan sebelum booking. Belum ketemu jawabannya? Langsung hubungi tim kami."
      />

      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <Reveal>
          <p className="leading-relaxed text-slate-700">
            Sebelum memutuskan untuk booking, wajar kalau ada beberapa hal yang ingin dipastikan dulu — mulai dari
            syarat sewa, kisaran harga, sampai apa saja yang termasuk dalam biaya sewa. Halaman ini merangkum
            pertanyaan yang paling sering ditanyakan calon penyewa ke tim 287 Trans, supaya Anda bisa mengambil
            keputusan tanpa perlu menghubungi kami dulu untuk hal-hal dasar. Kalau pertanyaan Anda lebih spesifik
            dari daftar di bawah — misalnya soal ketersediaan unit tertentu di tanggal tertentu — tim kami tetap
            siap membantu langsung via WhatsApp.
          </p>
        </Reveal>

        <Reveal delay={40} className="mt-8 space-y-3">
          {FAQ_UMUM.map((item) => (
            <details
              key={item.pertanyaan}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[var(--shadow-soft)] transition-shadow duration-200 hover:shadow-[var(--shadow-soft-lg)]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-slate-900 marker:content-none">
                {item.pertanyaan}
                <span className="shrink-0 text-blue-600 transition-transform duration-200 group-open:rotate-180">
                  &#9660;
                </span>
              </summary>
              <p className="border-t border-slate-100 px-5 pb-4 pt-3 text-sm leading-relaxed text-slate-600">
                {item.jawaban}
              </p>
            </details>
          ))}
        </Reveal>

        <Reveal delay={80} className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center sm:p-8">
          <h2 className="text-lg font-bold text-slate-900">Masih Ada Pertanyaan Lain?</h2>
          <p className="mt-2 leading-relaxed text-slate-600">
            {"Tim kami siap membantu menjawab langsung via WhatsApp, atau kunjungi "}
            <Link to="/kontak" className="font-semibold text-blue-600 hover:underline">halaman kontak</Link>
            {" untuk informasi lengkap."}
          </p>
          {profile?.whatsapp && (
            <a
              href={buildWaLink(profile.whatsapp, "Halo, saya ada pertanyaan seputar rental mobil di 287 Trans.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("faq_page")}
              className="btn-glow-whatsapp mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-700"
            >
              <MessageCircle size={16} />
              Chat via WhatsApp
            </a>
          )}
        </Reveal>
      </section>
    </div>
  );
}
