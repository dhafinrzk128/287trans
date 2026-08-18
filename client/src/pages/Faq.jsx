import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import { breadcrumbSchema, faqPageSchema } from "../utils/schema";
import { useCompanyProfile } from "../context/CompanyProfileContext";
import { buildWaLink } from "../utils/format";
import { trackWhatsAppClick } from "../utils/tracking";

const FAQ_LIST = [
  {
    pertanyaan: "Apa saja syarat sewa mobil lepas kunci di 287 Trans?",
    jawaban:
      "Anda hanya perlu menyiapkan KTP yang masih berlaku dan mengisi form permintaan booking online. Tidak ada syarat kartu kredit atau jaminan tambahan, dan Anda tidak perlu membuat akun terlebih dahulu.",
  },
  {
    pertanyaan: "Berapa harga rental mobil harian di Tangerang?",
    jawaban:
      "Harga bervariasi tergantung kategori unit, mulai dari hatchback yang paling terjangkau hingga kategori premium dan luxury. Rentang harga per kategori bisa dilihat di halaman Armada, atau cek langsung setiap unit di Katalog untuk harga pastinya.",
  },
  {
    pertanyaan: "Apakah bisa sewa mobil dengan supir?",
    jawaban:
      "Bisa. Seluruh unit di katalog kami tersedia untuk sewa plus driver selain opsi lepas kunci. Pilih opsi \"Dengan Sopir\" saat mengisi form booking, dan tim kami akan mengonfirmasi ketersediaan sopir untuk tanggal yang Anda butuhkan.",
  },
  {
    pertanyaan: "Area mana saja yang dilayani 287 Trans?",
    jawaban:
      "Kami melayani Tangerang, Tangerang Selatan, Jakarta, Bekasi, Depok, dan Bogor (Jabodetabek).",
  },
  {
    pertanyaan: "Bagaimana cara booking mobil di 287 Trans?",
    jawaban:
      "Pilih mobil di halaman Katalog, isi form permintaan booking dengan nama, nomor HP, dan tanggal sewa, lalu tim kami akan menghubungi Anda melalui telepon atau WhatsApp untuk konfirmasi ketersediaan dan detail serah terima unit.",
  },
  {
    pertanyaan: "Apakah ada minimum durasi sewa?",
    jawaban:
      "Tidak ada minimum durasi khusus — sewa bisa dimulai dari 1 hari. Untuk kebutuhan jangka panjang, tersedia skema bulanan hingga tahunan yang lebih hemat.",
  },
  {
    pertanyaan: "Apakah bensin dan tol sudah termasuk harga sewa?",
    jawaban:
      "Untuk unit lepas kunci, harga sewa belum termasuk bahan bakar dan tol — biaya ini ditanggung penyewa selama masa pemakaian. Detail biaya akan diinformasikan tim kami saat konfirmasi booking.",
  },
];

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
          faqPageSchema(FAQ_LIST),
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
          {FAQ_LIST.map((item) => (
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
            Tim kami siap membantu menjawab langsung via WhatsApp, atau kunjungi{" "}
            <Link to="/kontak" className="font-semibold text-blue-600 hover:underline">halaman kontak</Link> untuk
            informasi lengkap.
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
