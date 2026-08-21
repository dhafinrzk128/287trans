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

export default function SewaFortunerTangerang() {
  const { profile } = useCompanyProfile();

  return (
    <div>
      <Seo
        title="Sewa Fortuner Tangerang - SUV Diesel 2.8 GR & Legender"
        description="Sewa Toyota Fortuner di Tangerang mulai Rp1.399.000/hari. Varian 2.8 GR dan Legender, diesel matic 7 penumpang. Lepas kunci atau plus driver."
        path="/sewa-fortuner-tangerang"
        jsonLd={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Sewa Fortuner Tangerang", path: "/sewa-fortuner-tangerang" },
        ])}
      />

      <PageHero
        title="Sewa Fortuner Tangerang"
        subtitle="SUV diesel bertubuh tinggi untuk medan yang tidak selalu mulus — dan untuk kesempatan yang menuntut kendaraan berpenampilan tegas."
      />

      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <Reveal>
          <p className="leading-relaxed text-slate-700">
            Toyota Fortuner disewa untuk dua alasan yang sering berbeda jauh: kemampuannya melewati jalan yang tidak
            rata, dan kesan berwibawa yang ditampilkannya. Sebagai SUV, jarak bebas ke tanah yang lebih tinggi
            membuatnya lebih tenang menghadapi jalan berlubang, genangan, atau akses menuju lokasi yang belum
            beraspal rapi — kondisi yang sulit dihindari saat perjalanan ke luar kota. 287 Trans menyediakan dua
            varian Fortuner, keduanya bermesin diesel, bertransmisi matic, dan berkapasitas tujuh penumpang.
          </p>
        </Reveal>

        <ArmadaCarousel />

        <Reveal delay={80} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Dua Varian Fortuner yang Tersedia</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            Fortuner 2.8 GR keluaran 2023 tersedia mulai Rp1.399.000 per hari, dengan sentuhan GR yang membuat
            tampilan luarnya lebih sporty dibanding versi standar. Di atasnya ada Fortuner Legender keluaran 2025
            mulai Rp1.499.000 per hari — unit termuda di kelas SUV kami, dengan gaya desain depan yang berbeda dan
            kelengkapan yang lebih tinggi.
          </p>
          <p className="mt-3 leading-relaxed text-slate-700">
            Selisih tarif antara keduanya tidak besar, sehingga pilihan biasanya jatuh pada preferensi tampilan dan
            ketersediaan unit pada tanggal yang Anda butuhkan. Karena permintaan untuk kelas SUV cenderung menumpuk
            di akhir pekan dan musim liburan, konfirmasi tanggal lebih awal akan memperbesar kemungkinan mendapat
            varian yang diinginkan.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Kapan Fortuner Jadi Pilihan yang Tepat</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            Fortuner masuk akal ketika rute perjalanan Anda tidak sepenuhnya bisa diprediksi — misalnya perjalanan
            dinas ke wilayah yang jalannya bervariasi, kunjungan ke lokasi proyek, atau liburan ke daerah pegunungan
            yang jalur menanjaknya panjang. Mesin diesel dengan torsi besar membantu di tanjakan, sementara postur
            tinggi memberi pandangan ke depan yang lebih luas di jalan yang ramai.
          </p>
          <p className="mt-3 leading-relaxed text-slate-700">
            Alasan kedua bersifat lebih praktis: untuk menjemput tamu penting, menghadiri acara resmi, atau keperluan
            yang menuntut kendaraan dengan kehadiran fisik yang kuat, Fortuner memberi kesan itu tanpa harus masuk ke
            kelas mobil mewah dengan tarif jauh lebih tinggi.
          </p>
        </Reveal>

        <Reveal delay={160} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Fortuner atau Pajero Sport?</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            {"Pertanyaan ini sering muncul karena keduanya berada di kelas yang sama, bermesin diesel, dan berkapasitas tujuh penumpang. Perbedaan yang paling terasa ada pada karakter berkendara dan selera terhadap desain, bukan pada kemampuan dasarnya. Kalau Anda ingin membandingkan langsung, tarif dan varian "}
            <Link to="/sewa-pajero-sport-tangerang" className="font-semibold text-blue-600 hover:underline">
              Pajero Sport
            </Link>
            {" bisa dilihat di halamannya. Untuk kebutuhan yang lebih mengutamakan kenyamanan penumpang di jalan beraspal, MPV seperti "}
            <Link to="/sewa-innova-zenix-tangerang" className="font-semibold text-blue-600 hover:underline">
              Innova Zenix
            </Link>
            {" biasanya terasa lebih halus."}
          </p>
        </Reveal>

        <Reveal delay={200} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Lepas Kunci atau dengan Sopir</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            {"Fortuner bisa disewa "}
            <Link to="/sewa-mobil-lepas-kunci-tangerang" className="font-semibold text-blue-600 hover:underline">
              lepas kunci
            </Link>
            {" bagi Anda yang terbiasa mengemudikan kendaraan berdimensi besar, maupun "}
            <Link to="/rental-mobil-plus-driver" className="font-semibold text-blue-600 hover:underline">
              plus driver
            </Link>
            {" — pilihan yang umum diambil untuk acara resmi atau perjalanan luar kota yang panjang. Biaya sopir terpisah dari tarif harian dan dikonfirmasi lebih dulu oleh tim kami."}
          </p>
          <p className="mt-3 leading-relaxed text-slate-700">
            {"Syarat sewanya tetap sederhana: KTP yang masih berlaku dan nomor HP aktif untuk konfirmasi. Untuk pemakaian jangka panjang seperti operasional perusahaan, skema "}
            <Link to="/rental-mobil-bulanan-tangerang" className="font-semibold text-blue-600 hover:underline">
              sewa bulanan
            </Link>
            {" memberi tarif efektif per hari yang lebih rendah. Unit lain bisa dilihat di "}
            <Link to="/katalog" className="font-semibold text-blue-600 hover:underline">katalog mobil</Link>
            {" kami."}
          </p>
        </Reveal>

        <Reveal delay={240} className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900">Cek Ketersediaan Fortuner</h2>
          <p className="mt-2 leading-relaxed text-slate-600">
            Sampaikan tanggal pemakaian dan varian yang Anda inginkan, tim kami akan mengecek ketersediaan unit
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
                href={buildWaLink(profile.whatsapp, "Halo, saya ingin tanya soal sewa Toyota Fortuner di Tangerang.")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("landing_fortuner")}
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
