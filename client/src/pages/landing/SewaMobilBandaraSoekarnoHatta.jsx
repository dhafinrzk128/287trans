import { Link } from "react-router-dom";
import { MessageCircle, ArrowRight } from "lucide-react";
import PageHero from "../../components/PageHero";
import Reveal from "../../components/Reveal";
import Seo from "../../components/Seo";
import { breadcrumbSchema } from "../../utils/schema";
import { useCompanyProfile } from "../../context/CompanyProfileContext";
import { buildWaLink } from "../../utils/format";
import { trackWhatsAppClick } from "../../utils/tracking";

export default function SewaMobilBandaraSoekarnoHatta() {
  const { profile } = useCompanyProfile();

  return (
    <div>
      <Seo
        title="Sewa Mobil Bandara Soekarno-Hatta - Antar Jemput Tangerang"
        description="Layanan antar-jemput Bandara Soekarno-Hatta dari 287 Trans. Lepas kunci atau plus driver, siap untuk keberangkatan maupun kedatangan. Booking via WA."
        path="/sewa-mobil-bandara-soekarno-hatta"
        jsonLd={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Sewa Mobil Bandara Soekarno-Hatta", path: "/sewa-mobil-bandara-soekarno-hatta" },
        ])}
      />

      <PageHero
        title="Sewa Mobil Bandara Soekarno-Hatta"
        subtitle="Antar-jemput ke dan dari Bandara Soekarno-Hatta, tanpa perlu repot mikirin parkir atau macet menjelang jam penerbangan."
      />

      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <Reveal>
          <p className="leading-relaxed text-slate-700">
            Berangkat atau pulang lewat Bandara Soekarno-Hatta sering kali jadi momen yang bikin was-was soal
            waktu tempuh, terutama kalau harus membawa banyak bagasi atau berangkat di jam-jam padat. Karena lokasi
            kami di Ciledug, Kota Tangerang relatif dekat dengan akses menuju bandara, 287 Trans menyediakan
            layanan sewa mobil khusus untuk keperluan antar-jemput bandara — baik untuk mengantar Anda berangkat
            maupun menjemput saat kedatangan.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Dua Opsi: Antar Sendiri atau Diantar Sopir</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            {"Untuk perjalanan ke bandara, Anda bisa memilih "}
            <Link to="/sewa-mobil-lepas-kunci-tangerang" className="font-semibold text-blue-600 hover:underline">
              sewa lepas kunci
            </Link>
            {" kalau ingin mengemudikan sendiri dan melanjutkan pemakaian mobil setelah kembali dari perjalanan, atau "}
            <Link to="/rental-mobil-plus-driver" className="font-semibold text-blue-600 hover:underline">
              plus driver
            </Link>
            {" supaya Anda tidak perlu memikirkan parkir jangka panjang di area bandara maupun kondisi lalu lintas menjelang jam penerbangan. Opsi plus driver biasanya lebih dipilih untuk keberangkatan pagi buta atau kepulangan larut malam, di mana fokus penuh lebih baik dicurahkan untuk persiapan perjalanan daripada menyetir."}
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Tips Memesan untuk Keperluan Penerbangan</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            Karena jadwal penerbangan sangat sensitif terhadap waktu, sebaiknya ajukan booking beberapa hari sebelum
            tanggal keberangkatan agar tim kami punya cukup waktu mengonfirmasi unit dan, kalau memilih plus driver,
            mengatur jadwal penjemputan sesuai jam boarding Anda. Saat mengisi form booking atau menghubungi kami
            via WhatsApp, sampaikan jam penerbangan dan titik jemput secara spesifik supaya sopir bisa memperkirakan
            waktu berangkat dari lokasi Anda dengan buffer yang wajar untuk kondisi lalu lintas.
          </p>
        </Reveal>

        <Reveal delay={160} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Untuk Kedatangan (Penjemputan)</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            Layanan yang sama berlaku untuk arah sebaliknya — menjemput Anda atau tamu dari Bandara Soekarno-Hatta
            menuju tujuan di Tangerang maupun area Jabodetabek lainnya. Ini cukup praktis dipakai untuk menjemput
            keluarga yang baru mendarat, tamu bisnis dari luar kota, atau siapa pun yang tidak ingin repot mencari
            transportasi lanjutan setelah perjalanan panjang.
          </p>
        </Reveal>

        <Reveal delay={200} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Bukan Hanya untuk Sekali Jalan</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            {"Kalau perjalanan Anda ke bandara adalah bagian dari trip yang lebih panjang — misalnya perjalanan dinas beberapa hari sebelum kembali terbang — unit yang sama bisa dipakai selama masa sewa berlangsung, tidak terbatas hanya untuk rute bandara saja. Lihat "}
            <Link to="/armada" className="font-semibold text-blue-600 hover:underline">daftar armada</Link>
            {" kami untuk unit yang sesuai kebutuhan perjalanan Anda selama di Tangerang dan sekitarnya."}
          </p>
        </Reveal>

        <Reveal delay={220} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Unit yang Cocok untuk Perjalanan ke Bandara</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            Kalau membawa banyak bagasi atau berangkat bersama rombongan keluarga, kategori MPV atau SUV biasanya
            lebih nyaman karena ruang bagasinya lebih lega dibanding hatchback. Untuk penjemputan tamu bisnis atau
            keperluan yang menuntut kesan lebih formal, kategori sedan maupun MPV premium sering jadi pilihan yang
            lebih sesuai. Kalau Anda bepergian sendiri dengan bagasi ringkas, unit hatchback tetap jadi opsi paling
            ekonomis tanpa mengurangi kenyamanan perjalanan menuju bandara.
          </p>
        </Reveal>

        <Reveal delay={240} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Estimasi Waktu Tempuh</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            Waktu tempuh dari Ciledug menuju Bandara Soekarno-Hatta sangat dipengaruhi kondisi lalu lintas, terutama
            pada jam berangkat kerja pagi dan jam pulang sore. Sopir kami akan mempertimbangkan kondisi ini saat
            menentukan jam berangkat dari titik jemput Anda, dengan buffer waktu yang wajar supaya tidak terburu-buru
            menjelang jam check-in. Kalau Anda punya preferensi rute tertentu — misalnya menghindari jalan tol
            karena alasan biaya, atau sebaliknya memilih tol demi kepastian waktu — sampaikan saat booking agar
            sopir bisa menyesuaikan.
          </p>
        </Reveal>

        <Reveal delay={260} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Perjalanan Rombongan ke Bandara</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            Kalau bepergian bersama keluarga besar atau rombongan kerja, memesan satu unit MPV atau SUV sering kali
            lebih praktis dan lebih hemat dibanding memesan beberapa taksi atau ojek daring terpisah — terutama
            kalau bagasi yang dibawa cukup banyak. Semua penumpang bisa berangkat dari satu titik jemput yang sama
            dan tiba di bandara bersamaan, tanpa risiko terpisah rombongan di tengah jalan.
          </p>
        </Reveal>

        <Reveal delay={240} className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900">Jadwalkan Antar-Jemput Bandara</h2>
          <p className="mt-2 leading-relaxed text-slate-600">
            Sampaikan jam penerbangan dan titik jemput Anda, tim kami akan bantu susun jadwal yang paling aman.
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
                href={buildWaLink(profile.whatsapp, "Halo, saya ingin tanya soal antar-jemput Bandara Soekarno-Hatta.")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("landing_bandara")}
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
