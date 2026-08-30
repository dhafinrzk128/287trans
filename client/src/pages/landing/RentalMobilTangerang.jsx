import { Link } from "react-router-dom";
import { MessageCircle, ArrowRight } from "lucide-react";
import PageHero from "../../components/PageHero";
import Reveal from "../../components/Reveal";
import ArmadaCarousel from "../../components/ArmadaCarousel";
import HargaMulai from "../../components/HargaMulai";
import Seo from "../../components/Seo";
import { breadcrumbSchema } from "../../utils/schema";
import { useCompanyProfile } from "../../context/CompanyProfileContext";
import { buildWaLink, pesanSewa } from "../../utils/format";
import { trackWhatsAppClick } from "../../utils/tracking";

export default function RentalMobilTangerang() {
  const { profile } = useCompanyProfile();

  return (
    <div>
      <Seo
        title="Rental Mobil Tangerang - Lepas Kunci & Plus Driver | Armada Lengkap"
        description="Rental mobil Tangerang terpercaya dari 287 Trans. Lepas kunci atau plus driver, harian sampai tahunan, armada lengkap. Booking online via WA 0811-144-287."
        path="/rental-mobil-tangerang"
        jsonLd={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Rental Mobil Tangerang", path: "/rental-mobil-tangerang" },
        ])}
      />

      <PageHero
        title="Rental Mobil Tangerang Terpercaya"
        subtitle="Armada lengkap, harga transparan, proses booking online tanpa ribet — 287 Trans siap jadi mitra perjalanan Anda di Tangerang dan sekitarnya."
      />

      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <Reveal>
          <p className="leading-relaxed text-slate-700">
            Mencari rental mobil di Tangerang yang bisa diandalkan untuk keperluan harian, perjalanan keluar kota,
            maupun kebutuhan bisnis? 287 Trans melayani rental mobil Tangerang dengan armada yang terus diperbarui,
            mulai dari city car dan hatchback untuk mobilitas ringan di dalam kota, hingga MPV dan SUV premium untuk
            perjalanan bersama keluarga atau rombongan. Setiap unit diperiksa rutin sebelum disewakan, sehingga Anda
            tidak perlu khawatir soal kondisi mesin, kebersihan kabin, maupun kelengkapan surat-surat kendaraan.
          </p>
        </Reveal>

        {/* Diletakkan setinggi ini dengan sengaja. Armada 287 Trans dimulai di
            Rp799.000/hari, sementara sebagian besar orang yang mengetik "sewa
            mobil" membayangkan angka setengahnya — dan selama halaman ini
            tidak menyebut satu angka pun, satu-satunya cara mereka tahu adalah
            bertanya lewat WhatsApp, lalu pergi. Menaruh harganya sebelum
            tombol WhatsApp membuat yang tidak cocok mundur tanpa menghabiskan
            waktu siapa pun, dan yang tetap menghubungi sudah menerima angkanya. */}
        <Reveal delay={60} className="mt-8">
          <HargaMulai />
        </Reveal>

        <ArmadaCarousel />

        <Reveal delay={80} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Kenapa Rental Mobil di Tangerang Bersama 287 Trans?</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            Berbeda dari penyedia rental mobil yang hanya mengandalkan katalog seadanya, 287 Trans membangun proses
            booking yang bisa diselesaikan langsung dari ponsel tanpa perlu membuat akun terlebih dahulu. Anda cukup
            memilih mobil, menentukan tanggal sewa, mengisi data singkat, dan tim kami akan menghubungi untuk
            konfirmasi ketersediaan serta detail serah terima unit. Harga yang tertera di setiap mobil adalah harga
            per hari yang transparan, sehingga Anda bisa membandingkan langsung sebelum memutuskan.
          </p>
          <p className="mt-3 leading-relaxed text-slate-700">
            Karena berbasis di Ciledug, Kota Tangerang, kami memahami rute-rute yang sering dipakai warga Tangerang
            dan sekitarnya — mulai dari akses ke kawasan bisnis, jalur menuju bandara, sampai perjalanan ke luar
            kota. Tim kami siap membantu memberi rekomendasi unit yang sesuai kebutuhan perjalanan Anda, baik untuk
            keperluan pribadi maupun operasional perusahaan.
          </p>
          <p className="mt-3 leading-relaxed text-slate-700">
            Untuk syarat sewa, Anda hanya perlu menyiapkan KTP yang masih berlaku dan mengisi form booking online —
            tidak ada proses rumit atau dokumen tambahan yang berbelit. Kalau ada pertanyaan sebelum memutuskan,
            silakan hubungi tim kami langsung via WhatsApp; kami terbuka untuk konsultasi pilihan unit sebelum Anda
            melakukan pemesanan.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Pilihan Layanan Rental Mobil</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            287 Trans menyediakan beberapa skema sewa agar Anda bisa memilih sesuai kebutuhan:
          </p>
          <ul className="mt-4 space-y-3">
            <li className="rounded-xl border border-slate-200 bg-white p-4 shadow-[var(--shadow-soft)]">
              <Link to="/sewa-mobil-lepas-kunci-tangerang" className="font-semibold text-blue-600 hover:underline">
                Sewa mobil lepas kunci
              </Link>
              <span className="text-slate-600"> — mengemudi sendiri, cocok untuk yang ingin fleksibel mengatur rute dan waktu perjalanan.</span>
            </li>
            <li className="rounded-xl border border-slate-200 bg-white p-4 shadow-[var(--shadow-soft)]">
              <Link to="/rental-mobil-plus-driver" className="font-semibold text-blue-600 hover:underline">
                Rental mobil plus driver
              </Link>
              <span className="text-slate-600"> — didampingi sopir berpengalaman, praktis untuk perjalanan bisnis atau yang belum familiar dengan rute Tangerang.</span>
            </li>
            <li className="rounded-xl border border-slate-200 bg-white p-4 shadow-[var(--shadow-soft)]">
              <Link to="/rental-mobil-bulanan-tangerang" className="font-semibold text-blue-600 hover:underline">
                Sewa bulanan hingga tahunan
              </Link>
              <span className="text-slate-600"> — pilihan lebih hemat untuk kebutuhan jangka panjang, termasuk untuk operasional kantor.</span>
            </li>
            <li className="rounded-xl border border-slate-200 bg-white p-4 shadow-[var(--shadow-soft)]">
              <Link to="/sewa-mobil-bandara-soekarno-hatta" className="font-semibold text-blue-600 hover:underline">
                Antar-jemput Bandara Soekarno-Hatta
              </Link>
              <span className="text-slate-600"> — layanan khusus untuk keberangkatan maupun kedatangan penerbangan.</span>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={160} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Jenis Armada yang Tersedia</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            Katalog kami mencakup berbagai kelas kendaraan, mulai dari hatchback dan city car yang lincah untuk
            mobilitas harian di dalam kota, MPV keluarga dengan kapasitas lega untuk perjalanan bersama rombongan,
            SUV untuk kenyamanan ekstra di perjalanan jarak jauh, hingga lini premium dan luxury untuk kebutuhan
            yang menuntut tampilan lebih eksklusif — misalnya acara resmi, jemputan tamu perusahaan, atau perjalanan
            bisnis. Setiap unit dilengkapi transmisi manual maupun matic sesuai preferensi, dan informasi kapasitas
            penumpang selalu tercantum jelas di setiap halaman mobil agar Anda tidak salah pilih unit.
          </p>
          <p className="mt-3 leading-relaxed text-slate-700">
            Tarif harian untuk tiap kelas sudah tercantum di bagian atas halaman ini, dan harga per unit ditampilkan
            apa adanya di katalog — tanpa biaya tersembunyi yang baru muncul saat konfirmasi.
          </p>
        </Reveal>

        <Reveal delay={200} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Proses Booking Rental Mobil Tangerang</h2>
          <ol className="mt-3 space-y-3 text-slate-700">
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-600">1</span>
              <span className="pt-0.5">Pilih mobil di <Link to="/katalog" className="font-semibold text-blue-600 hover:underline">katalog</Link> sesuai kebutuhan, lalu cek tanggal yang masih tersedia.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-600">2</span>
              <span className="pt-0.5">Isi formulir permintaan booking — cukup nama, nomor HP, tanggal sewa, dan pilihan lepas kunci atau plus driver. Tidak perlu membuat akun.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-600">3</span>
              <span className="pt-0.5">Tim kami menghubungi Anda melalui telepon atau WhatsApp untuk konfirmasi ketersediaan, estimasi biaya, dan detail serah terima unit.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-600">4</span>
              <span className="pt-0.5">Unit siap diambil atau diantar sesuai kesepakatan, dan perjalanan Anda di Tangerang bisa dimulai.</span>
            </li>
          </ol>
        </Reveal>

        <Reveal delay={240} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Area Layanan Jabodetabek</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            {"Selain Tangerang, layanan rental mobil kami menjangkau Tangerang Selatan, Jakarta, Bekasi, Depok, dan Bogor. Untuk melihat seluruh unit yang tersedia beserta harga per hari, silakan cek "}
            <Link to="/armada" className="font-semibold text-blue-600 hover:underline">daftar armada</Link>
            {" atau langsung jelajahi "}
            <Link to="/katalog" className="font-semibold text-blue-600 hover:underline">katalog mobil</Link>
            {" kami. Untuk pertanyaan umum seputar syarat dan proses sewa, kunjungi halaman "}
            <Link to="/faq" className="font-semibold text-blue-600 hover:underline">FAQ</Link>
            {" kami."}
          </p>
        </Reveal>

        <Reveal delay={280} className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900">Siap Booking Mobil di Tangerang?</h2>
          <p className="mt-2 leading-relaxed text-slate-600">
            Ajukan permintaan booking online atau hubungi tim kami langsung via WhatsApp untuk konsultasi pilihan
            unit dan ketersediaan tanggal.
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
                href={buildWaLink(profile.whatsapp, pesanSewa("Halo, saya mau sewa mobil di Tangerang."))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("landing_rental_tangerang")}
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
