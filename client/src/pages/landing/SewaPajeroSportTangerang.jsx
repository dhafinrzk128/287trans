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

export default function SewaPajeroSportTangerang() {
  const { profile } = useCompanyProfile();

  return (
    <div>
      <Seo
        title="Sewa Pajero Sport Tangerang - Dakar Diesel Matic 7 Kursi"
        description="Sewa Mitsubishi Pajero Sport Dakar di Tangerang mulai Rp1.399.000/hari. SUV diesel matic 2024, 7 penumpang. Lepas kunci atau plus driver."
        path="/sewa-pajero-sport-tangerang"
        jsonLd={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Sewa Pajero Sport Tangerang", path: "/sewa-pajero-sport-tangerang" },
        ])}
      />

      <PageHero
        title="Sewa Pajero Sport Tangerang"
        subtitle="SUV diesel dengan peredaman yang dikenal empuk — pilihan yang masuk akal ketika perjalanan jauh dilakukan bersama penumpang, bukan sendirian."
      />

      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <Reveal>
          <p className="leading-relaxed text-slate-700">
            Mitsubishi Pajero Sport punya reputasi yang cukup spesifik di kalangan penyewa: SUV yang tetap terasa
            nyaman meski jalannya bergelombang. Karakter suspensinya membuat guncangan tidak langsung diteruskan ke
            kabin, sesuatu yang paling terasa ketika perjalanan berlangsung berjam-jam dan ada penumpang di baris
            kedua maupun ketiga. 287 Trans menyediakan Pajero Sport Dakar keluaran 2024 — bermesin diesel,
            bertransmisi matic, berkapasitas tujuh penumpang — mulai Rp1.399.000 per hari.
          </p>
        </Reveal>

        <ArmadaCarousel />

        <Reveal delay={80} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Tentang Unit Pajero Sport Dakar</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            Dakar adalah varian yang paling banyak dikenal dari lini Pajero Sport, dengan kelengkapan interior yang
            sudah memadai untuk perjalanan panjang tanpa masuk ke tarif kelas mewah. Unit kami keluaran 2024,
            sehingga usia kendaraan masih muda dan kondisi kabinnya terjaga. Karena unit ini hanya tersedia dalam
            jumlah terbatas, ketersediaannya bergantung pada jadwal sewa yang sedang berjalan — terutama pada akhir
            pekan dan musim liburan.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Cocok untuk Perjalanan Seperti Apa</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            Pajero Sport paling sering diambil untuk perjalanan luar kota yang jaraknya jauh dan melibatkan keluarga
            atau rombongan kerja. Kombinasi jarak bebas ke tanah yang tinggi dan peredaman yang lembut membuatnya
            tenang menghadapi jalan provinsi yang kualitasnya naik-turun, tanpa membuat penumpang cepat lelah. Mesin
            dieselnya memberi tarikan yang cukup saat mobil terisi penuh, termasuk di jalur menanjak.
          </p>
          <p className="mt-3 leading-relaxed text-slate-700">
            Untuk pemakaian yang murni di dalam kota dengan lalu lintas padat, dimensi besar SUV ini justru bisa
            terasa merepotkan saat parkir. Dalam kondisi seperti itu, MPV biasanya lebih praktis dan tarifnya pun
            lebih rendah.
          </p>
        </Reveal>

        <Reveal delay={160} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Pajero Sport atau Fortuner?</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            {"Keduanya berada di kelas dan rentang tarif yang sama, sama-sama diesel matic tujuh penumpang, sehingga pilihan lebih sering ditentukan oleh selera. Pajero Sport umumnya dinilai lebih lembut peredamannya, sementara "}
            <Link to="/sewa-fortuner-tangerang" className="font-semibold text-blue-600 hover:underline">
              Fortuner
            </Link>
            {" punya karakter yang terasa lebih padat dan tersedia dalam dua varian sehingga peluang mendapat unit di tanggal tertentu lebih besar. Kalau prioritas Anda adalah kenyamanan penumpang di jalan beraspal ketimbang kemampuan melewati medan berat, "}
            <Link to="/sewa-innova-reborn-tangerang" className="font-semibold text-blue-600 hover:underline">
              Innova Reborn
            </Link>
            {" bisa jadi alternatif dengan tarif yang jauh lebih ringan."}
          </p>
        </Reveal>

        <Reveal delay={200} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Lepas Kunci atau dengan Sopir</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            {"Pajero Sport tersedia untuk sewa "}
            <Link to="/sewa-mobil-lepas-kunci-tangerang" className="font-semibold text-blue-600 hover:underline">
              lepas kunci
            </Link>
            {" bila Anda terbiasa mengemudikan SUV berdimensi besar, maupun "}
            <Link to="/rental-mobil-plus-driver" className="font-semibold text-blue-600 hover:underline">
              plus driver
            </Link>
            {" untuk perjalanan luar kota yang panjang. Untuk rute jauh, opsi dengan sopir cukup sering dipilih karena beban menyetir berjam-jam tidak perlu Anda tanggung sendiri. Biaya sopir dihitung terpisah dan dikonfirmasi tim kami sebelum pemesanan diproses."}
          </p>
          <p className="mt-3 leading-relaxed text-slate-700">
            {"Syaratnya cukup KTP yang masih berlaku dan nomor HP aktif untuk konfirmasi unit dan jadwal. Untuk kebutuhan berdurasi panjang, skema "}
            <Link to="/rental-mobil-bulanan-tangerang" className="font-semibold text-blue-600 hover:underline">
              sewa bulanan
            </Link>
            {" lebih hemat dibanding memperpanjang sewa harian berulang kali. Pilihan unit lain bisa dilihat di "}
            <Link to="/katalog" className="font-semibold text-blue-600 hover:underline">katalog mobil</Link>
            {" kami."}
          </p>
        </Reveal>

        <Reveal delay={240} className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900">Cek Ketersediaan Pajero Sport</h2>
          <p className="mt-2 leading-relaxed text-slate-600">
            Karena unitnya terbatas, sebaiknya tanggal pemakaian dikonfirmasi lebih awal. Sampaikan rencana
            perjalanan Anda dan tim kami akan mengecek ketersediaannya.
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
                href={buildWaLink(profile.whatsapp, "Halo, saya ingin tanya soal sewa Mitsubishi Pajero Sport di Tangerang.")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("landing_pajero_sport")}
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
