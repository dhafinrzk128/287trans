import { Link } from "react-router-dom";
import { MessageCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import PageHero from "../../components/PageHero";
import Reveal from "../../components/Reveal";
import ArmadaCarousel from "../../components/ArmadaCarousel";
import HargaMulai from "../../components/HargaMulai";
import Seo from "../../components/Seo";
import { breadcrumbSchema, faqPageSchema } from "../../utils/schema";
import { useCompanyProfile } from "../../context/CompanyProfileContext";
import { buildWaLink, pesanSewa } from "../../utils/format";
import { trackWhatsAppClick } from "../../utils/tracking";

// Angka di bawah mengikuti data unit di katalog, bukan spesifikasi pabrikan,
// supaya halaman ini tidak pernah menjanjikan sesuatu yang tidak kami punya.
const SPEK = [
  "Transmisi matic pada seluruh varian",
  "Kapasitas 7 penumpang dengan tiga baris kursi",
  "Mesin diesel dengan torsi besar sejak putaran rendah",
  "Seluruh unit keluaran 2024",
];

const VARIAN = [
  { nama: "Innova Reborn Type-G", tahun: 2024, bahanBakar: "Diesel", harga: "Rp799.000" },
  { nama: "Innova Reborn Type-V", tahun: 2024, bahanBakar: "Diesel", harga: "Rp799.000" },
  { nama: "Innova Venturer", tahun: 2024, bahanBakar: "Diesel", harga: "Rp999.000" },
];

const FAQ_LIST = [
  {
    pertanyaan: "Berapa harga sewa Innova Reborn per hari di Tangerang?",
    jawaban:
      "Innova Reborn Type-G dan Type-V tersedia mulai Rp799.000 per hari, sementara Innova Venturer mulai Rp999.000 per hari. Tarif tersebut untuk sewa lepas kunci; biaya sopir dihitung terpisah dan dikonfirmasi tim kami sebelum pemesanan diproses.",
  },
  {
    pertanyaan: "Apa bedanya Innova Reborn Type-G, Type-V, dan Venturer?",
    jawaban:
      "Ketiganya bermesin diesel, matic, berkapasitas tujuh penumpang, dan keluaran 2024. Type-V berada satu tingkat di atas Type-G dari sisi kelengkapan interior, sementara Venturer menawarkan tampilan lebih berkarakter dengan bodykit dan sentuhan eksterior yang lebih tegas.",
  },
  {
    pertanyaan: "Innova Reborn atau Innova Zenix, pilih yang mana?",
    jawaban:
      "Reborn bermesin diesel dan terasa paling nyaman pada kecepatan konstan di jalan tol, cocok untuk perjalanan luar kota. Zenix tersedia dalam varian hybrid yang lebih senyap dan efisien di lalu lintas padat dalam kota. Tarif harian Reborn juga lebih rendah dibanding Zenix.",
  },
  {
    pertanyaan: "Apakah Innova Reborn muat untuk tujuh orang beserta koper?",
    jawaban:
      "Muat. Konfigurasi tiga baris kursinya menampung tujuh penumpang, dan ruang di belakang baris ketiga masih menyisakan tempat untuk koper. Untuk rombongan dengan bawaan sangat banyak, tim kami bisa membantu menghitung apakah satu unit cukup atau perlu tambahan.",
  },
];

export default function SewaInnovaRebornTangerang() {
  const { profile } = useCompanyProfile();

  return (
    <div>
      <Seo
        title="Sewa Innova Reborn Tangerang - Diesel, Matic, 7 Penumpang"
        description="Sewa Toyota Innova Reborn di Tangerang mulai Rp799.000/hari. Tipe G, V, dan Venturer, semua diesel matic 7 penumpang. Lepas kunci atau plus driver."
        path="/sewa-innova-reborn-tangerang"
        jsonLd={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Sewa Innova Reborn Tangerang", path: "/sewa-innova-reborn-tangerang" },
          ]),
          faqPageSchema(FAQ_LIST),
        ]}
      />

      <PageHero
        title="Sewa Innova Reborn Tangerang"
        subtitle="MPV diesel yang sudah teruji untuk perjalanan jauh — kabin senyap, torsi besar, dan ruang yang benar-benar cukup untuk tujuh orang beserta bawaannya."
      />

      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <Reveal>
          <p className="leading-relaxed text-slate-700">
            Toyota Innova Reborn masih jadi pilihan pertama banyak penyewa di Tangerang ketika perjalanan yang
            direncanakan menuntut jarak tempuh panjang dan muatan penuh. Mesin dieselnya menghasilkan tarikan yang
            stabil saat mobil terisi tujuh penumpang sekaligus bagasi, sesuatu yang terasa jelas ketika melewati
            tanjakan tol atau jalur luar kota. 287 Trans menyediakan tiga varian Innova Reborn tahun 2024 —
            Type-G, Type-V, dan Venturer — seluruhnya bertransmisi matic dan berbahan bakar diesel.
          </p>
        </Reveal>

        <ArmadaCarousel />

        <Reveal delay={80} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Varian Innova Reborn yang Tersedia</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            Type-G dan Type-V sama-sama tersedia mulai Rp799.000 per hari. Keduanya berbagi mesin diesel dan
            kapasitas tujuh penumpang; perbedaannya ada pada kelengkapan interior, di mana Type-V berada satu tingkat
            di atas Type-G. Untuk penyewa yang menginginkan tampilan lebih berkarakter dengan bodykit dan sentuhan
            eksterior yang lebih tegas, tersedia Innova Venturer mulai Rp999.000 per hari. Ketiganya keluaran 2024,
            sehingga usia kendaraan masih muda dan kondisi kabin maupun mesin terjaga.
          </p>
          <p className="mt-3 leading-relaxed text-slate-700">
            Kalau Anda belum yakin varian mana yang paling sesuai, tim kami bisa membantu membandingkan berdasarkan
            kebutuhan perjalanan — berapa orang yang ikut, seberapa jauh rutenya, dan berapa lama unit akan dipakai.
            Ketersediaan tiap varian berubah mengikuti jadwal sewa, jadi sebaiknya tanggal pemakaian dikonfirmasi
            lebih dulu sebelum memutuskan.
          </p>

          <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200 shadow-[var(--shadow-soft)]">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Varian</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Tahun</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Bahan Bakar</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Harga per Hari</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {VARIAN.map((v) => (
                  <tr key={v.nama}>
                    <td className="px-4 py-3 font-medium text-slate-900">{v.nama}</td>
                    <td className="px-4 py-3 text-slate-600">{v.tahun}</td>
                    <td className="px-4 py-3 text-slate-600">{v.bahanBakar}</td>
                    <td className="px-4 py-3 text-slate-600">{v.harga}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-slate-500">
            Harga dapat berubah mengikuti ketersediaan unit dan durasi sewa. Tarif di atas berlaku untuk sewa lepas
            kunci; biaya sopir dihitung terpisah.
          </p>

          <ul className="mt-6 space-y-2.5">
            {SPEK.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-slate-700">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Halaman ini menjual satu model, jadi pengunjung yang merasa harganya
            tidak pas tidak punya tujuan lain selain menutup tab. Daftar kelas
            lain memberinya jalan — ke atas maupun ke bawah — tanpa harus
            menebaknya lewat WhatsApp lebih dulu. Sorotan harga dimatikan di
            sini karena tabel varian tepat di atas sudah menyebut angkanya. */}
        <Reveal delay={100} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Kelas Lain yang Tersedia</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            Kalau Innova Reborn belum pas dengan kebutuhan atau anggaran Anda, berikut tarif harian untuk
            kelas lain yang tersedia di armada kami.
          </p>
          <div className="mt-5">
            <HargaMulai tampilkanSorotan={false} />
          </div>
        </Reveal>

        <Reveal delay={120} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Kenapa Diesel Cocok untuk Perjalanan Jauh</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            Karakter mesin diesel pada Innova Reborn membuatnya nyaman dipakai pada kecepatan konstan di jalan tol,
            kondisi yang paling sering ditemui saat perjalanan keluar kota dari Tangerang menuju Bandung, Jawa
            Tengah, atau daerah lain di Pulau Jawa. Torsi yang tersedia sejak putaran rendah berarti mobil tidak
            perlu dipaksa berpindah gigi terus-menerus ketika membawa beban penuh. Untuk pemakaian dalam kota yang
            padat, karakter ini juga membuat perpindahan gigi terasa lebih halus.
          </p>
          <p className="mt-3 leading-relaxed text-slate-700">
            Kalau kebutuhan Anda lebih banyak berkutat di dalam kota dengan lalu lintas berhenti-jalan, varian
            hybrid pada{" "}
            <Link to="/sewa-innova-zenix-tangerang" className="font-semibold text-blue-600 hover:underline">
              Innova Zenix
            </Link>{" "}
            bisa jadi pertimbangan lain karena karakter konsumsi bahan bakarnya berbeda di kondisi macet.
          </p>
        </Reveal>

        <Reveal delay={160} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Cocok untuk Perjalanan Seperti Apa</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            Innova Reborn paling sering disewa untuk perjalanan keluarga besar yang menginap beberapa hari, mudik ke
            luar kota, antar-jemput rombongan dari dan menuju bandara, serta kunjungan kerja yang melibatkan beberapa
            orang sekaligus. Konfigurasi tujuh kursinya memungkinkan seluruh anggota rombongan berada dalam satu
            kendaraan tanpa harus memesan dua unit terpisah, dan ruang di belakang kursi baris ketiga masih
            menyisakan tempat untuk koper.
          </p>
        </Reveal>

        <Reveal delay={200} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Lepas Kunci atau dengan Sopir</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            {"Innova Reborn tersedia untuk disewa secara "}
            <Link to="/sewa-mobil-lepas-kunci-tangerang" className="font-semibold text-blue-600 hover:underline">
              lepas kunci
            </Link>
            {" bila Anda ingin mengemudikan sendiri, maupun "}
            <Link to="/rental-mobil-plus-driver" className="font-semibold text-blue-600 hover:underline">
              plus driver
            </Link>
            {" untuk perjalanan panjang yang menuntut konsentrasi penuh. Biaya sopir dihitung terpisah dari tarif harian unit dan akan diinformasikan tim kami saat konfirmasi. Untuk pemakaian yang berlangsung berminggu-minggu, tersedia juga skema "}
            <Link to="/rental-mobil-bulanan-tangerang" className="font-semibold text-blue-600 hover:underline">
              sewa bulanan
            </Link>
            {" yang tarif efektif hariannya lebih rendah."}
          </p>
          <p className="mt-3 leading-relaxed text-slate-700">
            {"Syarat sewanya sama seperti unit lain di 287 Trans: cukup KTP yang masih berlaku dan nomor HP aktif untuk konfirmasi. Detail unit lain beserta harganya bisa dilihat di "}
            <Link to="/katalog" className="font-semibold text-blue-600 hover:underline">katalog mobil</Link>
            {" kami."}
          </p>
        </Reveal>

        <Reveal delay={220} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Pertanyaan Seputar Sewa Innova Reborn</h2>
          <div className="mt-4 space-y-3">
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
          </div>
        </Reveal>

        <Reveal delay={240} className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900">Cek Ketersediaan Innova Reborn</h2>
          <p className="mt-2 leading-relaxed text-slate-600">
            Sampaikan tanggal pemakaian dan varian yang Anda inginkan, tim kami akan mengonfirmasi ketersediaan unit
            beserta estimasi biayanya.
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
                href={buildWaLink(profile.whatsapp, pesanSewa("Halo, saya mau sewa Toyota Innova Reborn di Tangerang."))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("landing_innova_reborn")}
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
