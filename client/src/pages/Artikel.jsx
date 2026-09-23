import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import { breadcrumbSchema } from "../utils/schema";
import { ARTIKEL } from "../data/artikel";

// Indeks artikel panduan. Hanya memakai metadata dari data/artikel.js, jadi
// halaman ini tidak ikut mengunduh isi artikel mana pun.
export default function Artikel() {
  return (
    <div>
      <Seo
        title="Panduan Sewa Mobil di Tangerang"
        description="Panduan sewa mobil di Tangerang dari 287 Trans: syarat lepas kunci, mobil pengantin, mudik, antar jemput bandara, dan sewa bulanan."
        path="/artikel"
        jsonLd={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Artikel", path: "/artikel" },
        ])}
      />

      <PageHero
        title="Panduan Sewa Mobil di Tangerang"
        subtitle="Jawaban lengkap untuk pertanyaan yang biasanya muncul sebelum menyewa: syarat, memilih unit, sampai menghitung biaya."
      />

      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <ul className="space-y-4">
          {ARTIKEL.map((a, i) => (
            <Reveal as="li" key={a.slug} delay={Math.min(i * 40, 160)}>
              <Link
                to={`/artikel/${a.slug}`}
                className="group block rounded-2xl border border-slate-200 bg-white p-6 shadow-[var(--shadow-soft)] transition-shadow duration-200 hover:shadow-[var(--shadow-soft-lg)]"
              >
                <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600">{a.h1}</h2>
                <p className="mt-2 leading-relaxed text-slate-600">{a.ringkasan}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600">
                  Baca panduan
                  <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>
    </div>
  );
}
