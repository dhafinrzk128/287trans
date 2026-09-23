import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Wallet, Zap, Headset, Star, ArrowRight, ChevronDown, Sparkles, BadgeCheck, MessageCircle } from "lucide-react";
import api from "../api/client";
import Seo from "../components/Seo";
import { AUTORENTAL_SCHEMA, WEBSITE_SCHEMA } from "../utils/schema";
import CarCard from "../components/CarCard";
import KategoriArmadaGrid from "../components/KategoriArmadaGrid";
import KayonWayang from "../components/KayonWayang";
import SmartImage from "../components/SmartImage";
import Reveal from "../components/Reveal";
import Spinner from "../components/ui/Spinner";
import { useCompanyProfile } from "../context/CompanyProfileContext";
import { formatRupiah, buildWaLink, pesanSewa } from "../utils/format";
import { trackWhatsAppClick } from "../utils/tracking";
import { getPrerenderedData, setPrerenderedData } from "../utils/prerenderData";

const KEUNGGULAN = [
  { icon: ShieldCheck, title: "Armada Premium", desc: "Unit-unit terbaru dari MPV, SUV, hingga sedan dan luxury MPV kelas premium, siap untuk berbagai kebutuhan.", accent: false },
  { icon: Wallet, title: "Harga Bersaing", desc: "Tarif transparan dan kompetitif tanpa biaya tersembunyi.", accent: false },
  { icon: Zap, title: "Proses Mudah", desc: "Booking online 24 jam, tanpa perlu membuat akun. Cukup isi form dan konfirmasi.", accent: true },
  { icon: Headset, title: "Layanan Responsif", desc: "Tim customer service siap membantu Anda via telepon maupun WhatsApp.", accent: false },
];

export default function Home() {
  const { profile } = useCompanyProfile();
  const [mobils, setMobils] = useState(() => getPrerenderedData("home_mobils") ?? []);
  const [loading, setLoading] = useState(() => getPrerenderedData("home_mobils") === undefined);
  const [testimoni, setTestimoni] = useState(() => getPrerenderedData("home_testimoni") ?? []);
  const [faq, setFaq] = useState(() => getPrerenderedData("home_faq") ?? []);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  // Kuncinya sama dengan yang dipakai KategoriArmadaGrid, karena daftar yang
  // ditarik memang sama persis dan halaman ini yang mengopernya ke bawah.
  const [semuaMobil, setSemuaMobil] = useState(() => getPrerenderedData("kategori_ringkas") ?? []);

  useEffect(() => {
    // Silent on the very first run when prerendered data already matches
    // what's on screen — avoids the loading=true flash that discards and
    // re-renders the mismatched, already-correct prerendered content (see
    // src/utils/prerenderData.js).
    const silent = getPrerenderedData("home_mobils") !== undefined;
    if (!silent) setLoading(true);
    api
      .get("/mobil/populer", { params: { status: "tersedia", limit: 4 } })
      .then(({ data }) => {
        setMobils(data);
        setPrerenderedData("home_mobils", data);
      })
      .finally(() => setLoading(false));
    api.get("/testimoni").then(({ data }) => {
      setTestimoni(data);
      setPrerenderedData("home_testimoni", data);
    });
    api.get("/faq").then(({ data }) => {
      setFaq(data);
      setPrerenderedData("home_faq", data);
    });
    api
      .get("/mobil")
      .then(({ data }) => {
        setSemuaMobil(data);
        setPrerenderedData("kategori_ringkas", data);
      })
      .catch(() => {
        /* harga "mulai dari" dan petak kategori sekadar tidak tampil */
      });
  }, []);

  // Angka terendah dari katalog, bukan angka yang ditulis mati: harga yang
  // diubah dari panel admin tapi tidak ikut berubah di hero akan membuat
  // halaman ini berbohong tepat di tempat yang paling banyak dibaca.
  const termurah = semuaMobil.length ? Math.min(...semuaMobil.map((m) => m.hargaPerHari)) : null;

  return (
    <div>
      <Seo
        title="Rental Mobil Tangerang - Lepas Kunci & Driver"
        description="Rental mobil Tangerang & Jabodetabek. Armada terawat, lepas kunci atau plus driver, harian sampai bulanan. Booking cepat via WA 0811-144-287."
        path="/"
        // Tanpa FAQPage, walau tanya-jawabnya tampil di bawah. Skema itu
        // sudah disandang /faq (lihat Faq.jsx), dan Google hanya memilih satu
        // FAQPage per situs — yang kedua tidak menambah apa pun, tapi tetap
        // menambah ~4 KB ke <head> halaman yang paling banyak dibuka dari
        // iklan. Teks jawabannya sendiri tetap ada di markup, terbaca perayap
        // maupun orang; yang hilang cuma salinan ketiganya.
        jsonLd={[AUTORENTAL_SCHEMA, WEBSITE_SCHEMA]}
      />
      {/* Hero */}
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

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
          {/* langsung: lihat catatan yang sama di KoleksiArmada.jsx — hero
              adalah elemen LCP, menganimasikannya masuk cuma menundanya. */}
          <Reveal langsung>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-400/30 bg-accent-500/15 px-4 py-1.5 text-sm font-medium text-accent-200">
              <Sparkles size={14} />
              Rental Mobil Premium dan Terpercaya
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Rental Mobil Tangerang, <span className="text-accent-400">Perjalanan Mudah dan Nyaman</span>
            </h1>
            {/* "seluruhnya" sengaja menempel pada terawat, bukan pada
                terbaru: 20 dari 24 unit keluaran 2024 ke atas, tapi Alphard
                Gen 3 keluaran 2022 — jadi "semua unit terbaru" tidak benar.
                Perawatan rutin berlaku untuk semuanya dan bisa dipertanggung-
                jawabkan. Ini pelajaran dari iklan lama yang menjanjikan city
                car padahal armadanya tidak punya. */}
            <p className="mt-5 max-w-xl text-lg text-blue-100">
              Ajukan langsung lewat WhatsApp, tanpa perlu membuat akun. Armada premium hingga luxury
              dengan unit-unit keluaran terbaru — seluruhnya terawat dan diperiksa sebelum diserahkan.
            </p>
            {/* Harga diletakkan sebelum tombol, bukan di bagian terpisah jauh
                di bawah. Halaman ini tujuan iklan berbayar untuk kata kunci
                umum: angka terendah perlu terbaca calon penyewa sebelum ia
                memutuskan membuka percakapan, bukan sesudahnya. */}
            {termurah !== null && (
              <div className="mt-7 inline-block rounded-2xl border border-white/15 bg-white/10 px-6 py-4 backdrop-blur-sm">
                <p className="text-sm text-blue-100">Sewa harian mulai dari</p>
                <p className="mt-0.5 text-3xl font-extrabold">
                  {formatRupiah(termurah)}
                  <span className="text-base font-semibold text-blue-200">{" / hari"}</span>
                </p>
              </div>
            )}

            {/* WhatsApp didahulukan dari tombol katalog: mayoritas pemesanan
                masuk lewat percakapan, dan tombol katalog menambah satu klik
                sebelum calon penyewa bisa bertanya. */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {profile?.whatsapp && (
                <a
                  href={buildWaLink(profile.whatsapp, pesanSewa("Halo, saya mau sewa mobil di 287 Trans."))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("hero_button")}
                  className="btn-glow-whatsapp inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-500"
                >
                  <MessageCircle size={18} />
                  Chat via WhatsApp
                </a>
              )}
              <Link
                to="/katalog"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20"
              >
                Lihat Semua Armada
                <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>
          <Reveal langsung className="relative hidden lg:block">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              {/* Kolomnya `hidden lg:block`, dan CSS tidak menghentikan
                  unduhan — diukur di produksi, foto 162 KB ini tetap ditarik
                  di ponsel dengan prioritas tinggi meski lebar tampilnya nol.
                  minLebar membuat browser melewatinya sebelum mengambil. */}
              <SmartImage
                minLebar={1024}
                ukuran="(min-width: 1280px) 600px, 46vw"
                src={profile?.heroFotoUrl || "https://picsum.photos/seed/hero-rental/900/700"}
                alt="Mobil rental 287 Trans di Tangerang"
                className="h-full w-full object-cover"
                fetchPriority="high"
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

      {/* Kategori armada — pintu masuk ke seluruh katalog, ditaruh persis
          setelah hero karena inilah yang dicari pengunjung dari iklan:
          mobilnya apa saja dan mulai berapa. */}
      <section className="render-saat-terlihat mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Pilih Rental Mobil Sesuai Kebutuhan</h2>
            <p className="mt-2 text-slate-600">
              Seluruh armada kami dikelompokkan per kategori — klik salah satu untuk melihat unit dan harganya.
            </p>
          </div>
          <Link to="/katalog" className="group flex shrink-0 items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700">
            Lihat Katalog Lengkap
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
        <div className="mt-8">
          <KategoriArmadaGrid mobils={semuaMobil} />
        </div>
      </section>

      {/* Keunggulan */}
      <section className="render-saat-terlihat mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-slate-900">Kenapa Pilih 287 Trans?</h2>
          <p className="mt-3 text-slate-600">
            {"Kami berkomitmen memberikan pengalaman "}
            <Link to="/katalog" className="font-semibold text-blue-600 hover:underline">
              rental mobil Tangerang
            </Link>
            {" terbaik untuk Anda."}
          </p>
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

      {/* Tiga hal yang selalu ditanyakan lewat chat sebelum orang memesan:
          lepas kunci atau pakai sopir, berapa lama bisa disewa, dan apa saja
          yang masuk ke dalam tarif. Halaman ini tujuan iklan untuk kata kunci
          umum — pengunjungnya sering belum pernah menyewa di sini sama sekali,
          dan sebelumnya tidak ada satu pun jawaban di halaman depan.

          Sengaja tidak mengulang seksi Area Layanan di /tentang-kami maupun
          persiapan menghubungi di /kontak: halaman yang memuat paragraf sama
          saling menggerus. */}
      <section className="render-saat-terlihat mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal as="h2" className="text-2xl font-bold text-slate-900">
          Sebelum Menyewa di Tangerang, Tiga Hal Ini Biasanya Ditanyakan
        </Reveal>
        <div className="mt-6 grid gap-8 lg:grid-cols-3">
          <Reveal className="space-y-3 leading-relaxed text-slate-600">
            <h3 className="text-base font-bold text-slate-900">Lepas kunci atau plus sopir?</h3>
            <p>
              Seluruh unit kami tersedia untuk keduanya. Untuk lepas kunci, syaratnya cukup KTP yang
              masih berlaku — tanpa kartu kredit, tanpa jaminan BPKB, dan tanpa perlu membuat akun.
            </p>
            <p>
              Sewa dengan sopir banyak dipilih untuk agenda kerja yang berpindah lokasi seharian dan
              penjemputan tamu, karena Anda tidak perlu memikirkan rute maupun parkir. Biaya sopir
              dihitung terpisah dari tarif unit dan kami sebutkan di awal.
            </p>
          </Reveal>
          <Reveal delay={100} className="space-y-3 leading-relaxed text-slate-600">
            <h3 className="text-base font-bold text-slate-900">Berapa lama bisa disewa?</h3>
            <p>
              Mulai dari satu hari, tanpa durasi minimum. Satu hari dihitung 24 jam, terhitung dari
              tanggal pengambilan sampai tanggal pengembalian.
            </p>
            <p>
              Untuk kebutuhan yang lebih panjang tersedia skema mingguan, bulanan, hingga tahunan
              dengan tarif per hari yang lebih hemat — paling sering diambil untuk kendaraan
              operasional perusahaan dan pemakaian pribadi jangka panjang.
            </p>
          </Reveal>
          <Reveal delay={200} className="space-y-3 leading-relaxed text-slate-600">
            <h3 className="text-base font-bold text-slate-900">Apa yang termasuk tarif?</h3>
            <p>
              Tarif yang tertera adalah tarif unit per hari. Bahan bakar dan tol selama masa sewa
              ditanggung penyewa, sehingga Anda bisa menghitung sendiri total perjalanan sesuai rute.
            </p>
            <p>
              Di luar itu hanya ada dua kemungkinan tambahan, dan keduanya kami sebutkan sebelum
              pemesanan dikunci: biaya sopir kalau Anda memilih opsi itu, dan biaya antar kalau unit
              ingin diantar ke alamat Anda. Mengambil sendiri unit di kantor kami tidak dikenakan
              biaya tambahan.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Preview mobil populer */}
      <section className="render-saat-terlihat bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Mobil Populer di Tangerang</h2>
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
        <section className="render-saat-terlihat mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
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
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{`“${t.pesan}”`}</p>
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
        <section className="render-saat-terlihat bg-slate-50 py-16">
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
                          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="border-t border-slate-100 px-5 pb-4 pt-3 text-sm leading-relaxed text-slate-600">
                            {item.jawaban}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Bawah */}
      <section className="render-saat-terlihat relative overflow-hidden bg-gradient-to-br from-neutral-800 to-neutral-950">
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
