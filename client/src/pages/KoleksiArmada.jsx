import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, ArrowRight, ChevronDown, BadgeCheck, CarFront } from "lucide-react";
import api from "../api/client";
import CarCard from "../components/CarCard";
import SmartImage from "../components/SmartImage";
import Reveal from "../components/Reveal";
import KayonWayang from "../components/KayonWayang";
import Seo from "../components/Seo";
import Spinner from "../components/ui/Spinner";
import { breadcrumbSchema, faqPageSchema, productSchema } from "../utils/schema";
import { useCompanyProfile } from "../context/CompanyProfileContext";
import { formatRupiah, buildWaLink, pesanSewa } from "../utils/format";
import { trackWhatsAppClick } from "../utils/tracking";
import { getPrerenderedData, setPrerenderedData } from "../utils/prerenderData";
import { cariKoleksi, unitKoleksi, hargaTermurah, muatProsa, kunciProsa } from "../data/koleksiArmada";

// Semua halaman koleksi menarik daftar mobil yang sama persis, jadi kuncinya
// dibuat satu. Tiap halaman diprerender terpisah, sehingga tidak ada risiko
// satu halaman membaca daftar milik halaman lain.
const PRERENDER_KEY = "koleksi_mobils";

/**
 * Satu template untuk seluruh halaman kategori dan model armada.
 *
 * Bentuknya sengaja katalog, bukan artikel: yang pertama terlihat setelah
 * hero adalah daftar unit beserta harganya, karena pengunjung halaman ini
 * mayoritas datang dari iklan berbayar dengan satu pertanyaan di kepala —
 * unitnya apa saja dan berapa harganya. Teks penjelasnya tetap ada, tapi
 * diletakkan di bawah daftar unit, bukan menggantikannya.
 */
export default function KoleksiArmada({ slug }) {
  const koleksi = cariKoleksi(slug);
  const { profile } = useCompanyProfile();
  const [mobils, setMobils] = useState(() => getPrerenderedData(PRERENDER_KEY) ?? []);
  const [loading, setLoading] = useState(() => getPrerenderedData(PRERENDER_KEY) === undefined);
  const [faqTerbuka, setFaqTerbuka] = useState(null);

  // Prosa halaman ini (pengantar, bagian artikel, tanya-jawab) tidak ikut
  // bundel utama — lihat muatProsa() di data/koleksiArmada.js untuk alasannya.
  //
  // Keadaan awalnya dibaca dari HTML, bukan dari hasil unduhan, dan itulah
  // yang membuat hydration tetap cocok: kunjungan dari nol selalu mendarat di
  // halaman prerender yang prosanya sudah terpanggang, jadi render pertama
  // klien sudah menampilkan teks yang sama persis dengan yang ada di layar.
  //
  // Slug ikut disimpan karena React Router memakai ulang komponen ini saat
  // berpindah antar halaman koleksi: tanpa penanda itu, prosa halaman
  // sebelumnya akan tertinggal di layar halaman berikutnya.
  const [prosa, setProsa] = useState(() => ({ slug, isi: getPrerenderedData(kunciProsa(slug)) ?? null }));

  useEffect(() => {
    if (prosa.slug === slug && prosa.isi) return;

    const dariHtml = getPrerenderedData(kunciProsa(slug));
    if (dariHtml) {
      setProsa({ slug, isi: dariHtml });
      return;
    }

    // Hanya sampai sini pada perpindahan halaman di dalam situs — dan saat
    // prerender, yang justru perlu mengunduhnya supaya hasilnya bisa
    // dipanggang ke HTML untuk pengunjung sungguhan.
    let hidup = true;
    muatProsa(slug).then((isi) => {
      if (!hidup || !isi) return;
      setProsa({ slug, isi });
      setPrerenderedData(kunciProsa(slug), isi);
    });
    return () => {
      hidup = false;
    };
  }, [slug, prosa]);

  const teks = prosa.slug === slug ? prosa.isi : null;

  useEffect(() => {
    // Senyap kalau datanya sudah ikut terprerender — sama seperti di Home dan
    // Catalog, menghidupkan loading di sini akan membuang konten statis yang
    // sebenarnya sudah benar (lihat src/utils/prerenderData.js).
    const senyap = getPrerenderedData(PRERENDER_KEY) !== undefined;
    if (!senyap) setLoading(true);
    api
      // Satu-satunya halaman yang meminta bentuk lengkap. productSchema() di
      // bawah menaruh deskripsi unit dan seluruh fotonya ke dalam JSON-LD,
      // dan itu justru inti halaman ini sebagai tujuan iklan — jadi di sini
      // byte tambahannya dibelanjakan untuk sesuatu, bukan diangkut percuma
      // seperti di beranda dan katalog.
      .get("/mobil", { params: { lengkap: 1 } })
      .then(({ data }) => {
        setMobils(data);
        setPrerenderedData(PRERENDER_KEY, data);
      })
      .finally(() => setLoading(false));
  }, []);

  const units = useMemo(() => unitKoleksi(koleksi, mobils), [koleksi, mobils]);
  const termurah = hargaTermurah(units);
  const tersedia = units.filter((m) => m.status === "tersedia").length;

  if (!koleksi) return null;

  const pesanWa = pesanSewa(`Halo, saya mau sewa ${koleksi.label} di Tangerang.`, [
    "Tanggal mulai",
    "Lama sewa",
    "Unit yang diminati",
    "Dengan supir / lepas kunci",
  ]);

  // Halaman model membidik satu keluarga mobil, jadi car_name-nya bermakna
  // dan bisa dipakai membandingkan model mana yang paling banyak memicu chat.
  // Halaman kategori memuat banyak model sekaligus — diisi di sana, angkanya
  // justru menyesatkan (lihat TRACKING.md).
  const namaMobilTracking = koleksi.grup === "model" ? koleksi.label : undefined;

  const jsonLd = [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Pilihan Armada", path: "/katalog" },
      { name: koleksi.h1, path: `/${koleksi.slug}` },
    ]),
    faqPageSchema((teks?.faq || []).map((f) => ({ pertanyaan: f.tanya, jawaban: f.jawab }))),
    ...units.map(productSchema),
  ].filter(Boolean);

  return (
    <div>
      <Seo
        title={koleksi.judul}
        description={koleksi.deskripsi}
        path={`/${koleksi.slug}`}
        jsonLd={jsonLd}
      />

      {/* Hero — harga "mulai dari" sengaja berada di dalam hero, bukan di
          bagian terpisah jauh di bawah. Halaman ini tujuan iklan berbayar:
          angka terendah harus terbaca sebelum pengunjung memutuskan untuk
          menggulir atau menutup tab. */}
      <section className="relative overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-800 to-accent-900 text-white">
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent-500/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 -translate-x-1/2 rounded-full bg-accent-300/10 blur-3xl" />

        {/* Ornamen kayon dari logo 287 Trans, dipusatkan seperti gunungan
            berdiri di tengah kelir. Opasitasnya rendah karena teks hero
            harus tetap terbaca di atasnya. */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="flex h-full items-center justify-center">
            <KayonWayang varian="hero" prioritas className="kayon-melayang opacity-[0.26]" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-950/45 to-neutral-950/10" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-20">
          {/* langsung: dua kolom ini ada di layar pertama, dan kolom kanan
              memuat gambar LCP halaman. Menganimasikannya masuk hanya menunda
              yang sudah terlihat sejak awal. */}
          <Reveal langsung>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-400/30 bg-accent-500/15 px-4 py-1.5 text-sm font-medium text-accent-200">
              <CarFront size={14} />
              {units.length > 0 ? `${units.length} tipe tersedia di katalog` : "Armada 287 Trans"}
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">{koleksi.h1}</h1>
            <p className="mt-5 max-w-xl text-lg text-blue-100">{koleksi.subjudul}</p>

            {termurah !== null && (
              <div className="mt-7 inline-block rounded-2xl border border-white/15 bg-white/10 px-6 py-4 backdrop-blur-sm">
                <p className="text-sm text-blue-100">Mulai dari</p>
                <p className="mt-0.5 text-3xl font-extrabold">
                  {formatRupiah(termurah)}
                  <span className="text-base font-semibold text-blue-200">{" / hari"}</span>
                </p>
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {profile?.whatsapp && (
                <a
                  href={buildWaLink(profile.whatsapp, pesanWa)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick(`koleksi_${koleksi.slug}`, namaMobilTracking)}
                  className="btn-glow-whatsapp inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-500"
                >
                  <MessageCircle size={18} />
                  Tanya Ketersediaan via WA
                </a>
              )}
              <a
                href="#unit"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20"
              >
                Lihat Unit &amp; Harga
                <ArrowRight size={18} />
              </a>
            </div>
          </Reveal>

          <Reveal langsung className="relative hidden lg:block">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-2xl">
              {/* Sama seperti di Home: kolom ini `hidden lg:block`, dan
                  tanpa minLebar fotonya tetap terunduh di ponsel. */}
              {units[0]?.fotoUtama && (
                <SmartImage
                  minLebar={1024}
                  ukuran="(min-width: 1280px) 600px, 46vw"
                  src={units[0].fotoUtama}
                  alt={`${units[0].namaMobil} - ${koleksi.h1}`}
                  className="h-full w-full object-cover"
                  fetchPriority="high"
                />
              )}
            </div>
            {tersedia > 0 && (
              <div className="absolute -bottom-6 -left-6 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-5 py-4 text-slate-900 shadow-[var(--shadow-soft-lg)]">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <BadgeCheck size={22} />
                </span>
                <div>
                  <p className="text-sm font-bold leading-tight">{`${tersedia} tipe siap disewa`}</p>
                  <p className="text-xs text-slate-500">Diperiksa rutin sebelum diserahkan</p>
                </div>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* Daftar tipe — bagian utama halaman ini, bukan pelengkap. */}
      <section id="unit" className="scroll-mt-20 bg-slate-50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">{`Pilihan Tipe ${koleksi.label}`}</h2>
              <p className="mt-2 text-slate-600">
                Harga dan ketersediaan di bawah ini mengikuti katalog, jadi selalu sama dengan yang tim kami sebutkan saat Anda chat.
              </p>
            </div>
            <Link to="/katalog" className="group flex shrink-0 items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700">
              Lihat Semua Armada
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>

          {loading ? (
            <Spinner />
          ) : units.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white py-14 text-center text-slate-500">
              Belum ada tipe di kategori ini. Hubungi kami via WhatsApp untuk alternatif terdekat.
            </div>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {units.map((mobil, i) => (
                <Reveal key={mobil.idMobil} delay={(i % 4) * 80} className="h-full [&>*]:h-full">
                  <CarCard mobil={mobil} priority={i === 0} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Tabel perbandingan varian — hanya berguna kalau memang ada yang
          dibandingkan, jadi disembunyikan untuk koleksi berisi satu tipe. */}
      {units.length > 1 && (
        <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl font-bold text-slate-900">{`Perbandingan Varian ${koleksi.label}`}</h2>
            <p className="mt-2 text-slate-600">Spesifikasi tiap tipe berdampingan, supaya lebih mudah dibandingkan sebelum memilih.</p>
          </Reveal>
          <Reveal delay={60} className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 shadow-[var(--shadow-soft)]">
            <table className="w-full min-w-[38rem] text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Tipe</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Tahun</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Transmisi</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Bahan Bakar</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Kapasitas</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Harga / Hari</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {units.map((m) => (
                  <tr key={m.idMobil}>
                    <td className="px-4 py-3 font-medium text-slate-900">
                      <Link to={`/katalog/${m.idMobil}`} className="hover:text-blue-600 hover:underline">
                        {m.namaMobil}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{m.tahun}</td>
                    <td className="px-4 py-3 text-slate-600">{m.transmisi}</td>
                    <td className="px-4 py-3 text-slate-600">{m.bahanBakar}</td>
                    <td className="px-4 py-3 text-slate-600">{`${m.kapasitas} orang`}</td>
                    <td className="px-4 py-3 font-semibold text-slate-900">{formatRupiah(m.hargaPerHari)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </section>
      )}

      {/* Penjelasan — di bawah daftar tipe, bukan menggantikannya.
          Seluruh blok dilewati selama prosanya belum ada, bukan dirender
          sebagai kerangka kosong: pengunjung dari nol tidak akan pernah
          melihat keadaan ini (prosanya sudah ada di HTML statis), dan pada
          perpindahan halaman di dalam situs sebuah bagian kosong yang
          melompat isinya lebih mengganggu daripada bagian yang menyusul. */}
      {teks && (
        <section className="mx-auto max-w-3xl px-4 pb-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="leading-relaxed text-slate-700">{teks.intro}</p>
          </Reveal>
          {teks.bagian.map((b, i) => (
            <Reveal key={b.judul} delay={Math.min((i + 1) * 40, 160)} className="mt-9">
              <h2 className="text-2xl font-bold text-slate-900">{b.judul}</h2>
              <p className="mt-3 leading-relaxed text-slate-700">{b.isi}</p>
            </Reveal>
          ))}
        </section>
      )}

      {/* FAQ */}
      {teks && (
        <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
          <Reveal as="h2" className="text-2xl font-bold text-slate-900">
            {`Pertanyaan Seputar Sewa ${koleksi.label}`}
          </Reveal>
          <div className="mt-6 space-y-3">
            {teks.faq.map((item, idx) => {
              const terbuka = faqTerbuka === idx;
              return (
                <Reveal key={item.tanya} delay={Math.min(idx * 60, 180)}>
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[var(--shadow-soft)] transition-shadow duration-200 hover:shadow-[var(--shadow-soft-lg)]">
                    <button
                      type="button"
                      onClick={() => setFaqTerbuka(terbuka ? null : idx)}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left"
                      aria-expanded={terbuka}
                    >
                      <span className="font-semibold text-slate-900">{item.tanya}</span>
                      <ChevronDown
                        size={20}
                        className={`shrink-0 text-blue-600 transition-transform duration-200 ${terbuka ? "rotate-180" : ""}`}
                      />
                    </button>
                    {/* Jawaban selalu dirender; yang diciutkan hanya tingginya.
                        Sebelumnya jawaban baru masuk DOM setelah diklik, jadi tak
                        satu pun jawaban FAQ di halaman ini pernah ada di HTML yang
                        dibaca mesin pencari — padahal skema FAQPage di <head> tetap
                        memuat jawabannya. Dua hal yang seharusnya cocok, dan ini
                        halaman tujuan iklan berbayar.

                        Pembungkus grid dipakai supaya tingginya bisa dianimasikan
                        dari 0fr ke 1fr tanpa perlu mengukur tinggi isinya; anak di
                        dalamnya yang memotong, sehingga garis dan padding paragraf
                        ikut tersembunyi saat tertutup. */}
                    <div
                      className={`grid transition-[grid-template-rows] duration-200 ${
                        terbuka ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="border-t border-slate-100 px-5 pb-4 pt-3 text-sm leading-relaxed text-slate-600">
                          {item.jawab}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>
      )}

      {/* CTA bawah */}
      <section className="relative overflow-hidden bg-gradient-to-br from-neutral-800 to-neutral-950">
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-accent-500/10 blur-3xl" />
        <Reveal className="relative mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">{`Cek Ketersediaan ${koleksi.label} untuk Tanggal Anda`}</h2>
          <p className="mt-3 text-blue-100">
            Sebutkan tanggal dan lama sewa, tim kami langsung mengonfirmasi unit yang kosong beserta total biayanya.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            {profile?.whatsapp && (
              <a
                href={buildWaLink(profile.whatsapp, pesanWa)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick(`koleksi_${koleksi.slug}_bawah`, namaMobilTracking)}
                className="btn-glow-whatsapp inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-500"
              >
                <MessageCircle size={18} />
                Chat via WhatsApp
              </a>
            )}
            <Link
              to="/katalog"
              className="btn-glow-accent inline-flex items-center justify-center gap-2 rounded-xl bg-accent-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-500"
            >
              Lihat Semua Armada
              <ArrowRight size={18} />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
