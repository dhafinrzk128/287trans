import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Wallet, Zap, Headset, Star, ArrowRight, ChevronDown, Sparkles, BadgeCheck, MessageCircle } from "lucide-react";
import api from "../api/client";
import Seo from "../components/Seo";
import CarCard from "../components/CarCard";
import Reveal from "../components/Reveal";
import Spinner from "../components/ui/Spinner";
import { useCompanyProfile } from "../context/CompanyProfileContext";
import { buildWaLink } from "../utils/format";
import { trackWhatsAppClick } from "../utils/tracking";

const KEUNGGULAN = [
  { icon: ShieldCheck, title: "Armada Premium", desc: "Unit-unit terbaru dari city car hingga SUV dan luxury MPV kelas premium, siap untuk berbagai kebutuhan.", accent: false },
  { icon: Wallet, title: "Harga Bersaing", desc: "Tarif transparan dan kompetitif tanpa biaya tersembunyi.", accent: false },
  { icon: Zap, title: "Proses Mudah", desc: "Booking online 24 jam, tanpa perlu membuat akun. Cukup isi form dan konfirmasi.", accent: true },
  { icon: Headset, title: "Layanan Responsif", desc: "Tim customer service siap membantu Anda via telepon maupun WhatsApp.", accent: false },
];

export default function Home() {
  const { profile } = useCompanyProfile();
  const [mobils, setMobils] = useState([]);
  const [loading, setLoading] = useState(true);
  const [testimoni, setTestimoni] = useState([]);
  const [faq, setFaq] = useState([]);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    api
      .get("/mobil/populer", { params: { status: "tersedia", limit: 4 } })
      .then(({ data }) => setMobils(data))
      .finally(() => setLoading(false));
    api.get("/testimoni").then(({ data }) => setTestimoni(data));
    api.get("/faq").then(({ data }) => setFaq(data));
  }, []);

  return (
    <div>
      <Seo
        title="Rental Mobil Tangerang - Lepas Kunci & Plus Driver"
        description="Rental mobil Tangerang & Jabodetabek. Armada terawat, lepas kunci atau plus driver, harian sampai bulanan. Booking cepat via WA 0811-144-287."
        path="/"
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-800 to-accent-900 text-white">
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent-500/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 -translate-x-1/2 rounded-full bg-accent-300/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-400/30 bg-accent-500/15 px-4 py-1.5 text-sm font-medium text-accent-200">
              <Sparkles size={14} />
              Rental Mobil Premium Jabodetabek
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Perjalanan Mudah dan Nyaman <span className="text-accent-400">bersama 287Trans</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-blue-100">
              Ajukan permintaan booking mobil rental secara online tanpa perlu membuat akun. Armada premium
              dan proses cepat untuk kebutuhan perjalanan Anda.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/katalog"
                className="btn-glow-accent inline-flex items-center justify-center gap-2 rounded-xl bg-accent-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-accent-900/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-500"
              >
                Booking Sekarang
                <ArrowRight size={18} />
              </Link>
              {profile?.whatsapp && (
                <a
                  href={buildWaLink(profile.whatsapp, "Halo, saya ingin bertanya tentang sewa mobil di 287 Trans.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("hero_button")}
                  className="btn-glow-whatsapp inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-500"
                >
                  <MessageCircle size={18} />
                  Chat via WhatsApp
                </a>
              )}
            </div>
          </Reveal>
          <Reveal className="relative hidden lg:block" delay={150}>
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <img
                src={profile?.heroFotoUrl || "https://picsum.photos/seed/hero-rental/900/700"}
                alt="Mobil rental 287 Trans"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-5 py-4 text-slate-900 shadow-[var(--shadow-soft-lg)]">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <BadgeCheck size={22} />
              </span>
              <div>
                <p className="text-sm font-bold leading-tight">Unit Terawat &amp; Siap Pakai</p>
                <p className="text-xs text-slate-500">Diperiksa rutin sebelum disewakan</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Keunggulan */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-slate-900">Kenapa Pilih 287 Trans?</h2>
          <p className="mt-3 text-slate-600">Kami berkomitmen memberikan pengalaman rental mobil terbaik untuk Anda.</p>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {KEUNGGULAN.map((item, i) => (
            <Reveal key={item.title} delay={(i % 4) * 80} className="h-full [&>*]:h-full">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft-lg)]">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                    item.accent ? "bg-accent-50 text-accent-600" : "bg-blue-50 text-blue-600"
                  }`}
                >
                  <item.icon size={24} />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Preview mobil populer */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Mobil Populer</h2>
              <p className="mt-2 text-slate-600">Pilihan armada terbaik yang paling banyak disewa pelanggan kami.</p>
            </div>
            <Link to="/katalog" className="group flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700">
              Lihat Semua Mobil
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>

          {loading ? (
            <Spinner />
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {mobils.map((mobil, i) => (
                <Reveal key={mobil.idMobil} delay={(i % 4) * 80} className="h-full [&>*]:h-full">
                  <CarCard mobil={mobil} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimoni */}
      {testimoni.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-slate-900">Apa Kata Pelanggan Kami</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimoni.map((t, i) => (
              <Reveal key={t.id} delay={(i % 3) * 90} className="h-full [&>*]:h-full">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft-lg)]">
                  <div className="flex gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} fill={i < t.rating ? "currentColor" : "none"} className={i < t.rating ? "" : "text-slate-300"} />
                    ))}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">&ldquo;{t.pesan}&rdquo;</p>
                  <p className="mt-4 text-sm font-bold text-slate-900">{t.nama}</p>
                  <p className="text-xs text-slate-500">{t.kota}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      {faq.length > 0 && (
        <section className="bg-slate-50 py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <Reveal as="h2" className="text-center text-3xl font-bold text-slate-900">Pertanyaan Seputar Rental</Reveal>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-blue-600" />
            <div className="mt-8 space-y-3">
              {faq.map((item, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <Reveal key={item.id} delay={Math.min(idx * 60, 240)}>
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[var(--shadow-soft)] transition-shadow duration-200 hover:shadow-[var(--shadow-soft-lg)]">
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left"
                        aria-expanded={isOpen}
                      >
                        <span className="font-semibold text-slate-900">{item.pertanyaan}</span>
                        <ChevronDown
                          size={20}
                          className={`shrink-0 text-blue-600 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {isOpen && (
                        <p className="border-t border-slate-100 px-5 pb-4 pt-3 text-sm leading-relaxed text-slate-600">
                          {item.jawaban}
                        </p>
                      )}
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Bawah */}
      <section className="relative overflow-hidden bg-gradient-to-br from-neutral-800 to-neutral-950">
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-accent-500/10 blur-3xl" />
        <Reveal className="relative mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Siap Memulai Perjalanan Anda?</h2>
          <p className="mt-3 text-blue-100">Ajukan permintaan booking mobil impian Anda sekarang, prosesnya cepat dan mudah.</p>
          <Link
            to="/katalog"
            className="btn-glow-accent mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-accent-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-500"
          >
            Booking Sekarang
            <ArrowRight size={18} />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
