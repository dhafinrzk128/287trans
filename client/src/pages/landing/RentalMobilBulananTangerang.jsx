import { Link } from "react-router-dom";
import { MessageCircle, ArrowRight } from "lucide-react";
import PageHero from "../../components/PageHero";
import Reveal from "../../components/Reveal";
import Seo from "../../components/Seo";
import { breadcrumbSchema } from "../../utils/schema";
import { useCompanyProfile } from "../../context/CompanyProfileContext";
import { buildWaLink } from "../../utils/format";
import { trackWhatsAppClick } from "../../utils/tracking";

export default function RentalMobilBulananTangerang() {
  const { profile } = useCompanyProfile();

  return (
    <div>
      <Seo
        title="Sewa Mobil Bulanan Tangerang - Hemat untuk Jangka Panjang"
        description="Sewa mobil bulanan hingga tahunan di Tangerang, lebih hemat untuk kebutuhan jangka panjang. Lepas kunci atau plus driver. Konsultasi gratis via WA."
        path="/rental-mobil-bulanan-tangerang"
        jsonLd={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Sewa Mobil Bulanan Tangerang", path: "/rental-mobil-bulanan-tangerang" },
        ])}
      />

      <PageHero
        title="Sewa Mobil Bulanan Tangerang"
        subtitle="Kebutuhan kendaraan jangka panjang tanpa beban kepemilikan — cocok untuk operasional pribadi maupun perusahaan."
      />

      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <Reveal>
          <p className="leading-relaxed text-slate-700">
            Untuk kebutuhan kendaraan yang berlangsung lebih dari beberapa hari, menyewa harian berulang kali
            biasanya jadi kurang efisien — baik dari sisi biaya maupun proses administrasinya. 287 Trans menyediakan
            skema sewa bulanan hingga tahunan di Tangerang, dengan pilihan lepas kunci maupun plus driver, sehingga
            Anda punya kendaraan yang bisa diandalkan setiap hari tanpa harus memikirkan perawatan, pajak, atau
            penyusutan nilai seperti kalau membeli unit sendiri.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Siapa yang Cocok Pakai Sewa Bulanan?</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            Skema ini paling sering dipakai oleh karyawan yang butuh kendaraan operasional harian tanpa terikat
            cicilan kepemilikan, perusahaan yang membutuhkan armada tambahan untuk periode tertentu tanpa menambah
            aset tetap, keluarga yang kendaraannya sedang diperbaiki dalam waktu lama, atau siapa pun yang sedang
            menetap sementara di Tangerang dan perlu mobilitas harian yang pasti. Karena sifatnya jangka panjang,
            kami juga terbuka untuk mendiskusikan unit dan skema pembayaran yang paling sesuai dengan pola pemakaian
            Anda.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Kenapa Sewa Bulanan Lebih Hemat</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            Dibanding memperpanjang sewa harian secara berulang, skema bulanan memberi tarif efektif per hari yang
            lebih rendah karena dihitung sebagai satu periode sewa panjang, bukan transaksi terpisah-pisah. Anda
            juga tidak perlu mengulang proses konfirmasi dan serah terima setiap beberapa hari sekali — cukup satu
            kali di awal periode sewa. Untuk kebutuhan yang lebih panjang lagi, skema tahunan tersedia dengan
            penyesuaian tarif yang bisa didiskusikan langsung dengan tim kami sesuai durasi dan jenis unit yang
            dibutuhkan.
          </p>
        </Reveal>

        <Reveal delay={160} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Lepas Kunci atau dengan Sopir untuk Pemakaian Bulanan</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            Sama seperti sewa harian, skema bulanan tersedia dalam dua opsi:{" "}
            <Link to="/sewa-mobil-lepas-kunci-tangerang" className="font-semibold text-blue-600 hover:underline">
              lepas kunci
            </Link>{" "}
            kalau Anda atau tim Anda sendiri yang akan mengemudikan setiap hari, atau{" "}
            <Link to="/rental-mobil-plus-driver" className="font-semibold text-blue-600 hover:underline">
              plus driver
            </Link>{" "}
            kalau kendaraan dipakai bergantian oleh beberapa orang atau dibutuhkan sopir tetap untuk operasional
            harian. Kedua opsi ini bisa disesuaikan lagi di tengah periode sewa kalau kebutuhan Anda berubah —
            cukup sampaikan ke tim kami.
          </p>
        </Reveal>

        <Reveal delay={200} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Perawatan Selama Masa Sewa</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            Untuk sewa jangka panjang, unit tetap dalam tanggung jawab perawatan rutin dari tim kami — bukan
            dibebankan ke penyewa seperti halnya kendaraan pribadi. Kalau ada kendala teknis selama masa sewa,
            hubungi tim kami dan kami akan koordinasikan penanganannya, termasuk opsi unit pengganti sementara kalau
            diperlukan perbaikan lebih dari sehari. Ini salah satu alasan kenapa sewa bulanan sering jadi pilihan
            yang lebih tenang dibanding memiliki kendaraan sendiri untuk kebutuhan jangka menengah.
          </p>
        </Reveal>

        <Reveal delay={220} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Memilih Unit untuk Pemakaian Jangka Panjang</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            Untuk sewa bulanan, pertimbangan pemilihan unit sedikit berbeda dari sewa harian. Selain kebutuhan
            kapasitas dan jenis perjalanan, ada baiknya juga mempertimbangkan efisiensi bahan bakar kalau unit akan
            dipakai setiap hari, serta kenyamanan jok dan ruang kabin kalau perjalanan hariannya cukup panjang.
            Tim kami bisa membantu membandingkan beberapa pilihan kategori — dari hatchback yang paling ekonomis
            untuk pemakaian harian, MPV untuk kebutuhan keluarga, hingga SUV kalau medan yang dilalui cukup
            bervariasi — supaya unit yang Anda pakai selama berbulan-bulan benar-benar sesuai kebutuhan, bukan
            sekadar yang kebetulan tersedia.
          </p>
        </Reveal>

        <Reveal delay={230} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Untuk Kebutuhan Armada Perusahaan</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            Selain penggunaan perorangan, skema bulanan juga bisa dipakai untuk menambah armada operasional
            perusahaan tanpa perlu proses pengadaan aset. Ini cocok untuk kebutuhan sementara seperti proyek dengan
            durasi terbatas, penambahan kapasitas saat musim sibuk, atau sebagai unit cadangan selagi kendaraan
            utama perusahaan dalam perawatan. Untuk kebutuhan beberapa unit sekaligus, hubungi tim kami langsung
            supaya bisa didiskusikan ketersediaan dan skema yang paling efisien sesuai jumlah dan durasi yang
            dibutuhkan.
          </p>
        </Reveal>

        <Reveal delay={240} className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900">Konsultasikan Kebutuhan Sewa Bulanan Anda</h2>
          <p className="mt-2 leading-relaxed text-slate-600">
            Setiap kebutuhan jangka panjang punya pertimbangan yang berbeda — hubungi tim kami via WhatsApp untuk
            mendiskusikan unit dan durasi yang paling sesuai, atau jelajahi katalog untuk melihat pilihan yang
            tersedia.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/katalog"
              className="btn-glow-accent inline-flex items-center justify-center gap-2 rounded-xl bg-accent-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-500"
            >
              Lihat Armada
              <ArrowRight size={16} />
            </Link>
            {profile?.whatsapp && (
              <a
                href={buildWaLink(profile.whatsapp, "Halo, saya ingin tanya soal sewa mobil bulanan di Tangerang.")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("landing_bulanan")}
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
