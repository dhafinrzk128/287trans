import { Link } from "react-router-dom";
import { MessageCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import PageHero from "../../components/PageHero";
import Reveal from "../../components/Reveal";
import Seo from "../../components/Seo";
import { breadcrumbSchema } from "../../utils/schema";
import { useCompanyProfile } from "../../context/CompanyProfileContext";
import { buildWaLink } from "../../utils/format";
import { trackWhatsAppClick } from "../../utils/tracking";

const SYARAT = [
  "KTP yang masih berlaku (sesuai nama pemesan)",
  "Mengisi form permintaan booking online — tanpa perlu membuat akun",
  "Nomor HP aktif untuk konfirmasi dari tim kami",
];

export default function SewaMobilLepasKunciTangerang() {
  const { profile } = useCompanyProfile();

  return (
    <div>
      <Seo
        title="Sewa Mobil Lepas Kunci Tangerang - Bebas Kemudi Sendiri"
        description="Sewa mobil lepas kunci di Tangerang, bebas kemudi sendiri sesuai jadwal Anda. Syarat cuma KTP, tanpa akun. Armada terawat, booking online via WA."
        path="/sewa-mobil-lepas-kunci-tangerang"
        jsonLd={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Sewa Mobil Lepas Kunci Tangerang", path: "/sewa-mobil-lepas-kunci-tangerang" },
        ])}
      />

      <PageHero
        title="Sewa Mobil Lepas Kunci Tangerang"
        subtitle="Kemudikan sendiri sesuai jadwal Anda — tanpa terikat jam kerja sopir, tanpa perlu berbagi ruang dengan orang lain di dalam mobil."
      />

      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <Reveal>
          <p className="leading-relaxed text-slate-700">
            Sewa mobil lepas kunci artinya Anda menyewa unit tanpa sopir dan mengemudikannya sendiri selama masa
            sewa. Di Tangerang, opsi ini paling banyak dicari oleh mereka yang butuh fleksibilitas penuh: berangkat
            pagi-pagi sekali, mampir ke beberapa tempat dalam satu perjalanan, atau pulang larut malam tanpa perlu
            menyesuaikan jadwal dengan siapa pun. 287 Trans menyediakan opsi lepas kunci untuk seluruh unit dalam
            katalog kami, dari city car hingga SUV dan MPV premium.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Kapan Sebaiknya Pilih Lepas Kunci?</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            Lepas kunci paling cocok kalau Anda sudah familiar dengan rute yang akan dilewati, punya SIM aktif dan
            terbiasa berkendara di area padat seperti Tangerang dan Jabodetabek, serta ingin mengatur sendiri waktu
            berhenti — misalnya untuk urusan kerja yang lokasinya berpindah-pindah dalam sehari, jalan-jalan
            bersama keluarga dengan itinerary sendiri, atau sekadar ingin privasi penuh selama di dalam mobil tanpa
            ada sopir yang menemani. Kalau Anda justru belum familiar dengan rute atau ingin fokus bekerja selama
            di perjalanan, opsi{" "}
            <Link to="/rental-mobil-plus-driver" className="font-semibold text-blue-600 hover:underline">
              rental mobil plus driver
            </Link>{" "}
            bisa jadi pilihan yang lebih pas.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Syarat Sewa Mobil Lepas Kunci</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            Kami sengaja membuat proses sewa lepas kunci sesederhana mungkin, karena kami tahu kebanyakan penyewa
            butuh mobil dengan cepat tanpa birokrasi panjang:
          </p>
          <ul className="mt-4 space-y-2.5">
            {SYARAT.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-slate-700">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 leading-relaxed text-slate-700">
            Tidak ada syarat kartu kredit, tidak perlu jaminan BPKB, dan tidak ada proses verifikasi berlapis yang
            memperlambat pemesanan. Setelah form booking terkirim, tim kami akan menghubungi Anda untuk konfirmasi
            unit, tanggal, dan estimasi biaya sebelum serah terima dilakukan.
          </p>
        </Reveal>

        <Reveal delay={160} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Yang Perlu Diperhatikan Saat Sewa Lepas Kunci</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            Karena Anda yang mengemudikan sendiri, ada beberapa hal praktis yang perlu disiapkan: pastikan SIM masih
            berlaku selama masa sewa, periksa kondisi unit bersama tim kami saat serah terima (bahan bakar, kaca,
            ban, dan kelengkapan surat), dan catat nomor kontak tim kami untuk keperluan darurat di jalan. Biaya
            bahan bakar dan tol selama masa sewa ditanggung penyewa, sehingga estimasi total perjalanan bisa Anda
            hitung sendiri sesuai kebutuhan. Kalau ada pertanyaan detail sebelum booking, jangan ragu untuk
            menghubungi tim kami via WhatsApp.
          </p>
        </Reveal>

        <Reveal delay={180} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Harga Transparan Tanpa Kejutan</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            Salah satu keluhan umum soal sewa mobil lepas kunci adalah biaya tambahan yang baru muncul di akhir.
            Di 287 Trans, harga per hari yang tertera di halaman setiap mobil adalah harga yang akan Anda bayar —
            bukan estimasi kasar yang berubah saat konfirmasi. Kalau ada kebutuhan tambahan seperti perpanjangan
            durasi sewa mendadak, tim kami akan mengonfirmasi biayanya terlebih dahulu sebelum diproses, jadi Anda
            selalu tahu persis apa yang dibayar.
          </p>
        </Reveal>

        <Reveal delay={200} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Durasi Sewa Fleksibel</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            Sewa lepas kunci bisa dimulai dari 1 hari saja hingga hitungan minggu dan bulan, tanpa minimum durasi
            khusus. Kalau kebutuhan Anda lebih dari sekadar perjalanan singkat, lihat juga opsi{" "}
            <Link to="/rental-mobil-bulanan-tangerang" className="font-semibold text-blue-600 hover:underline">
              sewa bulanan
            </Link>{" "}
            yang lebih hemat untuk pemakaian jangka panjang. Untuk pertanyaan umum lainnya, cek halaman{" "}
            <Link to="/faq" className="font-semibold text-blue-600 hover:underline">FAQ</Link> kami.
          </p>
        </Reveal>

        <Reveal delay={240} className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900">Booking Mobil Lepas Kunci Sekarang</h2>
          <p className="mt-2 leading-relaxed text-slate-600">
            Pilih unit yang sesuai kebutuhan Anda dan ajukan permintaan booking, atau tanyakan ketersediaan langsung
            via WhatsApp.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/katalog"
              className="btn-glow-accent inline-flex items-center justify-center gap-2 rounded-xl bg-accent-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-500"
            >
              Lihat Armada &amp; Booking
              <ArrowRight size={16} />
            </Link>
            {profile?.whatsapp && (
              <a
                href={buildWaLink(profile.whatsapp, "Halo, saya ingin tanya soal sewa mobil lepas kunci di Tangerang.")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("landing_lepas_kunci")}
                className="btn-glow-whatsapp inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-700"
              >
                <MessageCircle size={16} />
                Chat via WhatsApp
              </a>
            )}
          </div>
        </Reveal>
      </section>
    </div>
  );
}
