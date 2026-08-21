import { Link } from "react-router-dom";
import { MessageCircle, ArrowRight } from "lucide-react";
import PageHero from "../../components/PageHero";
import Reveal from "../../components/Reveal";
import ArmadaCarousel from "../../components/ArmadaCarousel";
import Seo from "../../components/Seo";
import { breadcrumbSchema } from "../../utils/schema";
import { useCompanyProfile } from "../../context/CompanyProfileContext";
import { buildWaLink } from "../../utils/format";
import { trackWhatsAppClick } from "../../utils/tracking";

export default function SewaInnovaZenixTangerang() {
  const { profile } = useCompanyProfile();

  return (
    <div>
      <Seo
        title="Sewa Innova Zenix Tangerang - Hybrid & Bensin, Matic 7 Kursi"
        description="Sewa Toyota Innova Zenix di Tangerang mulai Rp849.000/hari. Varian bensin dan hybrid (HEV) Type-G, V, hingga Q. Semua 2024, matic, 7 penumpang."
        path="/sewa-innova-zenix-tangerang"
        jsonLd={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Sewa Innova Zenix Tangerang", path: "/sewa-innova-zenix-tangerang" },
        ])}
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

        <ArmadaCarousel />

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
                href={buildWaLink(profile.whatsapp, "Halo, saya ingin tanya soal sewa Toyota Innova Zenix di Tangerang.")}
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
