import { Link } from "react-router-dom";
import { MessageCircle, ArrowRight, Briefcase, Plane, PartyPopper, MapPinned } from "lucide-react";
import PageHero from "../../components/PageHero";
import Reveal from "../../components/Reveal";
import Seo from "../../components/Seo";
import { breadcrumbSchema } from "../../utils/schema";
import { useCompanyProfile } from "../../context/CompanyProfileContext";
import { buildWaLink } from "../../utils/format";
import { trackWhatsAppClick } from "../../utils/tracking";

const SKENARIO = [
  { icon: Briefcase, title: "Perjalanan Bisnis", desc: "Fokus kerja atau meeting online di dalam mobil selagi sopir menangani jalanan dan parkir." },
  { icon: Plane, title: "Jemputan Bandara & Tamu", desc: "Sopir yang sudah familiar dengan jalur bandara, cocok untuk menjemput klien atau tamu perusahaan." },
  { icon: PartyPopper, title: "Acara & Rombongan Keluarga", desc: "Semua anggota keluarga bisa naik bersama tanpa ada yang perlu berkonsentrasi menyetir." },
  { icon: MapPinned, title: "Belum Familiar dengan Rute", desc: "Sopir kami paham jalur Tangerang dan Jabodetabek, termasuk rute alternatif saat macet." },
];

export default function RentalMobilPlusDriver() {
  const { profile } = useCompanyProfile();

  return (
    <div>
      <Seo
        title="Rental Mobil Plus Driver Tangerang - Sopir Berpengalaman"
        description="Rental mobil plus driver di Tangerang, sopir berpengalaman dan paham rute Jabodetabek. Cocok untuk bisnis, acara, atau jemputan bandara. Booking via WA."
        path="/rental-mobil-plus-driver"
        jsonLd={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Rental Mobil Plus Driver", path: "/rental-mobil-plus-driver" },
        ])}
      />

      <PageHero
        title="Rental Mobil Plus Driver Tangerang"
        subtitle="Duduk santai, biar sopir kami yang menangani jalanan — cocok untuk perjalanan bisnis, jemputan tamu, hingga acara keluarga."
      />

      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <Reveal>
          <p className="leading-relaxed text-slate-700">
            Tidak semua perjalanan cocok dikemudikan sendiri. Rental mobil plus driver dari 287 Trans menyediakan
            unit lengkap dengan sopir berpengalaman, sehingga Anda bisa fokus pada agenda perjalanan itu sendiri —
            baik untuk urusan pekerjaan, menjemput tamu penting, maupun acara keluarga di Tangerang dan sekitarnya.
            Sopir kami familiar dengan rute-rute utama Jabodetabek, termasuk jalur alternatif saat jam sibuk,
            sehingga perjalanan Anda tetap efisien meski kondisi jalan sedang padat.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Kapan Rental Plus Driver Paling Terasa Manfaatnya</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {SKENARIO.map((item) => (
              <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-4 shadow-[var(--shadow-soft)]">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <item.icon size={18} />
                </span>
                <h3 className="mt-3 text-sm font-bold text-slate-900">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Bagaimana Cara Kerjanya</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            Saat mengisi form permintaan booking, pilih opsi &ldquo;Dengan Sopir&rdquo; alih-alih lepas kunci. Tim
            kami akan mengonfirmasi ketersediaan sopir untuk tanggal yang Anda butuhkan, sekaligus menginformasikan
            estimasi biaya tambahan untuk layanan sopir — karena komponen biaya sopir dihitung terpisah dari sewa
            unit hariannya. Setelah dikonfirmasi, sopir akan tiba sesuai titik jemput dan waktu yang disepakati,
            lengkap dengan unit yang sudah diperiksa kondisinya.
          </p>
          <p className="mt-3 leading-relaxed text-slate-700">
            {"Untuk kebutuhan yang sifatnya rutin — misalnya jemputan kantor setiap hari kerja dalam sebulan — opsi "}
            <Link to="/rental-mobil-bulanan-tangerang" className="font-semibold text-blue-600 hover:underline">
              sewa bulanan plus driver
            </Link>
            {" biasanya jauh lebih hemat dibanding pemesanan harian yang berulang. Tim kami bisa membantu menghitungkan skema yang paling sesuai dengan pola pemakaian Anda."}
          </p>
        </Reveal>

        <Reveal delay={160} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Standar Sopir 287 Trans</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            Sopir yang bertugas adalah bagian dari tim operasional kami, bukan pihak ketiga lepas yang baru
            dihubungi saat ada pesanan. Ini penting supaya kualitas layanan tetap konsisten — mulai dari kerapihan
            berpakaian, kesopanan selama perjalanan, sampai pemahaman terhadap kondisi unit yang dikemudikan.
            Kalau ada permintaan khusus, misalnya rute yang harus melewati titik tertentu atau jadwal yang cukup
            ketat, sampaikan saat konfirmasi booking agar tim kami bisa menyiapkan sopir yang paling sesuai.
          </p>
        </Reveal>

        <Reveal delay={200} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Lepas Kunci atau Plus Driver?</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            {"Kalau Anda masih menimbang antara mengemudi sendiri atau memakai sopir, halaman "}
            <Link to="/sewa-mobil-lepas-kunci-tangerang" className="font-semibold text-blue-600 hover:underline">
              sewa mobil lepas kunci
            </Link>
            {" kami membahas kapan sebaiknya memilih opsi kemudi sendiri. Untuk pertanyaan umum lainnya seputar syarat dan proses sewa, cek halaman "}
            <Link to="/faq" className="font-semibold text-blue-600 hover:underline">FAQ</Link>
            {"."}
          </p>
        </Reveal>

        <Reveal delay={220} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Berapa Lama Sebelumnya Harus Booking?</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            Karena layanan plus driver melibatkan penjadwalan sopir, sebaiknya ajukan booking beberapa hari sebelum
            tanggal pemakaian, terutama untuk akhir pekan atau musim liburan saat permintaan biasanya lebih tinggi.
            Untuk kebutuhan mendadak, tetap hubungi tim kami via WhatsApp — kami akan cek ketersediaan sopir dan
            unit secepat mungkin, meski tidak selalu bisa dijamin untuk pemesanan di hari yang sama. Semakin awal
            Anda mengonfirmasi jadwal, semakin besar peluang mendapatkan unit dan sopir sesuai preferensi.
          </p>
        </Reveal>

        <Reveal delay={230} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Rute Luar Kota dengan Sopir</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            Selain penggunaan harian di dalam kota, plus driver juga jadi pilihan yang lebih tenang untuk perjalanan
            luar kota — misalnya ke luar Jabodetabek untuk urusan kerja atau liburan keluarga. Sopir yang menempuh
            rute panjang bisa bergantian istirahat tanpa mengganggu jadwal perjalanan Anda, dan Anda tidak perlu
            menanggung kelelahan menyetir jarak jauh sendirian. Kalau rencana perjalanan Anda melibatkan rute yang
            cukup jauh, sampaikan detailnya ke tim kami saat konfirmasi supaya estimasi waktu dan biaya bisa
            dihitung dengan lebih akurat.
          </p>
        </Reveal>

        <Reveal delay={240} className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900">Pesan Mobil Plus Driver Sekarang</h2>
          <p className="mt-2 leading-relaxed text-slate-600">
            Pilih unit di katalog, lalu tandai opsi dengan sopir saat booking — atau tanyakan langsung ke tim kami
            via WhatsApp untuk konsultasi kebutuhan perjalanan Anda.
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
                href={buildWaLink(profile.whatsapp, "Halo, saya ingin tanya soal rental mobil plus driver di Tangerang.")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("landing_plus_driver")}
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
