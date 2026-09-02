import { Link } from "react-router-dom";
import { MessageCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import PageHero from "../../components/PageHero";
import Reveal from "../../components/Reveal";
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
  "Tersedia mesin bensin maupun hybrid (HEV)",
  "Seluruh unit keluaran 2024",
];

const VARIAN = [
  { nama: "Innova Zenix Type-G", tahun: 2024, bahanBakar: "Bensin", harga: "Rp849.000" },
  { nama: "Innova Zenix Type-G HEV", tahun: 2024, bahanBakar: "Hybrid", harga: "Rp949.000" },
  { nama: "Innova Zenix Type-V HEV", tahun: 2024, bahanBakar: "Hybrid", harga: "Rp1.049.000" },
  { nama: "Innova Zenix Type-Q HEV", tahun: 2024, bahanBakar: "Hybrid", harga: "Rp1.349.000" },
];

const FAQ_LIST = [
  {
    pertanyaan: "Berapa harga sewa Innova Zenix per hari di Tangerang?",
    jawaban:
      "Zenix Type-G bermesin bensin tersedia mulai Rp849.000 per hari. Varian hybrid dimulai dari Type-G HEV Rp949.000, Type-V HEV Rp1.049.000, hingga Type-Q HEV Rp1.349.000 per hari. Tarif tersebut untuk sewa lepas kunci; biaya sopir dihitung terpisah.",
  },
  {
    pertanyaan: "Apa keuntungan varian hybrid dibanding bensin biasa?",
    jawaban:
      "Pada lalu lintas berhenti-jalan, sistem hybrid membuat mobil dapat bergerak dengan tenaga listrik pada kecepatan rendah sehingga kabin lebih hening dan konsumsi bahan bakar lebih terkendali. Bedanya paling terasa di dalam kota; untuk rute tol jarak jauh, selisihnya tidak sebesar itu.",
  },
  {
    pertanyaan: "Apa bedanya Type-G, Type-V, dan Type-Q HEV?",
    jawaban:
      "Ketiganya berbagi sistem hybrid yang sama, jadi karakter mesinnya serupa. Perbedaannya ada pada kelengkapan fitur dan interior, di mana Type-Q merupakan trim tertinggi. Untuk perjalanan biasa, Type-G sudah lebih dari cukup.",
  },
  {
    pertanyaan: "Innova Zenix atau Innova Reborn untuk perjalanan luar kota?",
    jawaban:
      "Untuk rute tol jarak jauh dengan kecepatan konstan, mesin diesel pada Innova Reborn terasa lebih pas dan tarif hariannya lebih rendah. Zenix lebih unggul pada kenyamanan kabin dan efisiensi di lalu lintas padat, sehingga sering dipilih untuk penggunaan dalam kota atau menjemput tamu.",
  },
];

export default function SewaInnovaZenixTangerang() {
  const { profile } = useCompanyProfile();

  return (
    <div>
      <Seo
        title="Sewa Innova Zenix Tangerang - Hybrid & Bensin, Matic 7 Kursi"
        description="Sewa Toyota Innova Zenix di Tangerang mulai Rp849.000/hari. Varian bensin dan hybrid (HEV) Type-G, V, hingga Q. Semua 2024, matic, 7 penumpang."
        path="/sewa-innova-zenix-tangerang"
        jsonLd={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Sewa Innova Zenix Tangerang", path: "/sewa-innova-zenix-tangerang" },
          ]),
          faqPageSchema(FAQ_LIST),
        ]}
      />

      <PageHero
        title="Sewa Innova Zenix Tangerang"
        subtitle="Generasi terbaru Innova dengan pilihan hybrid — kabin yang lebih senyap dan karakter berkendara yang jauh lebih halus di lalu lintas padat."
      />

      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <Reveal>
          <p className="leading-relaxed text-slate-700">
            Toyota Innova Zenix adalah penerus Innova yang mengubah cukup banyak hal dibanding generasi sebelumnya,
            terutama pada pilihan mesin dan kenyamanan kabin. Yang paling terasa bagi penumpang adalah tingkat
            kesenyapan di dalam mobil, khususnya pada varian hybrid yang mampu berjalan tanpa suara mesin pada
            kecepatan rendah. 287 Trans menyediakan empat varian Zenix keluaran 2024 dengan kapasitas tujuh
            penumpang dan transmisi matic, mulai dari Rp849.000 per hari.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Empat Varian, Dua Jenis Mesin</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            Pilihan paling terjangkau adalah Zenix Type-G bermesin bensin mulai Rp849.000 per hari. Di atasnya ada
            tiga varian hybrid: Type-G HEV mulai Rp949.000, Type-V HEV mulai Rp1.049.000, dan Type-Q HEV yang
            merupakan trim tertinggi mulai Rp1.349.000 per hari. Perbedaan antar varian hybrid terletak pada
            kelengkapan fitur dan interior, sementara karakter mesinnya serupa.
          </p>
          <p className="mt-3 leading-relaxed text-slate-700">
            Untuk perjalanan biasa yang tidak menuntut kelengkapan khusus, Type-G sudah lebih dari cukup. Type-Q HEV
            biasanya dipilih ketika penyewa ingin memberi kesan tertentu — misalnya menjemput tamu perusahaan atau
            keperluan acara yang menuntut tampilan lebih rapi. Tim kami bisa membantu menentukan varian yang sesuai
            bila Anda ragu.
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
            Kalau Innova Zenix belum pas dengan kebutuhan atau anggaran Anda, berikut tarif harian untuk
            kelas lain yang tersedia di armada kami.
          </p>
          <div className="mt-5">
            <HargaMulai tampilkanSorotan={false} />
          </div>
        </Reveal>

        <Reveal delay={120} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Kenapa Hybrid Menarik untuk Rute Dalam Kota</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            Pada kondisi lalu lintas berhenti-jalan yang jadi keseharian di Tangerang dan Jakarta, sistem hybrid
            bekerja paling sering — mobil dapat bergerak menggunakan tenaga listrik pada kecepatan rendah, dan mesin
            bensin baru ikut bekerja ketika dibutuhkan. Efeknya terasa pada dua hal: kabin yang lebih hening saat
            merayap di kemacetan, dan konsumsi bahan bakar yang lebih terkendali dibanding mesin konvensional pada
            kondisi serupa.
          </p>
          <p className="mt-3 leading-relaxed text-slate-700">
            {"Kalau rute Anda justru didominasi jalan tol jarak jauh dengan kecepatan konstan, karakter mesin diesel pada "}
            <Link to="/sewa-innova-reborn-tangerang" className="font-semibold text-blue-600 hover:underline">
              Innova Reborn
            </Link>
            {" mungkin lebih sesuai — dan tarif hariannya juga lebih rendah."}
          </p>
        </Reveal>

        <Reveal delay={160} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Cocok untuk Perjalanan Seperti Apa</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            Zenix banyak dipilih untuk penggunaan yang menempatkan kenyamanan penumpang sebagai prioritas: menjemput
            klien atau tamu dari luar kota, perjalanan keluarga yang melibatkan anak kecil atau orang tua, serta
            keperluan acara seperti pernikahan dan pertemuan resmi. Karena usianya masih 2024 dan kabinnya terasa
            baru, unit ini juga sering diambil untuk keperluan yang menuntut kesan rapi tanpa harus menyewa mobil
            kelas luxury.
          </p>
        </Reveal>

        <Reveal delay={200} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Lepas Kunci atau dengan Sopir</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            {"Seluruh varian Zenix bisa disewa "}
            <Link to="/sewa-mobil-lepas-kunci-tangerang" className="font-semibold text-blue-600 hover:underline">
              lepas kunci
            </Link>
            {" maupun "}
            <Link to="/rental-mobil-plus-driver" className="font-semibold text-blue-600 hover:underline">
              plus driver
            </Link>
            {". Untuk keperluan menjemput tamu, opsi dengan sopir umumnya lebih dipilih karena Anda tidak perlu memikirkan parkir maupun rute. Biaya sopir dihitung terpisah dari tarif unit dan dikonfirmasi tim kami sebelum pemesanan diproses."}
          </p>
          <p className="mt-3 leading-relaxed text-slate-700">
            {"Syaratnya cukup KTP yang masih berlaku dan nomor HP aktif. Ketersediaan tiap varian bergantung pada jadwal sewa yang sedang berjalan, jadi sebaiknya tanggal dikonfirmasi lebih awal. Pilihan unit lain bisa dilihat di "}
            <Link to="/katalog" className="font-semibold text-blue-600 hover:underline">katalog mobil</Link>
            {" kami."}
          </p>
        </Reveal>

        <Reveal delay={220} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Pertanyaan Seputar Sewa Innova Zenix</h2>
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
          <h2 className="text-xl font-bold text-slate-900">Cek Ketersediaan Innova Zenix</h2>
          <p className="mt-2 leading-relaxed text-slate-600">
            Sebutkan tanggal pemakaian dan varian yang diminati — bensin atau hybrid — dan tim kami akan
            mengonfirmasi ketersediaan beserta estimasi biayanya.
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
                href={buildWaLink(profile.whatsapp, pesanSewa("Halo, saya mau sewa Toyota Innova Zenix di Tangerang."))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("landing_innova_zenix")}
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
