import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import api from "../api/client";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import Spinner from "../components/ui/Spinner";
import { breadcrumbSchema } from "../utils/schema";
import { useCompanyProfile } from "../context/CompanyProfileContext";
import { formatRupiah, buildWaLink } from "../utils/format";
import { trackWhatsAppClick } from "../utils/tracking";

function summarizeByTipe(mobils) {
  const byTipe = new Map();
  for (const m of mobils) {
    if (!byTipe.has(m.tipe)) byTipe.set(m.tipe, []);
    byTipe.get(m.tipe).push(m.hargaPerHari);
  }
  return [...byTipe.entries()]
    .map(([tipe, prices]) => ({
      tipe,
      count: prices.length,
      min: Math.min(...prices),
      max: Math.max(...prices),
    }))
    .sort((a, b) => a.min - b.min);
}

export default function Armada() {
  const { profile } = useCompanyProfile();
  const [mobils, setMobils] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/mobil")
      .then(({ data }) => setMobils(data))
      .finally(() => setLoading(false));
  }, []);

  const kategori = summarizeByTipe(mobils);

  return (
    <div>
      <Seo
        title="Daftar Armada Rental Mobil Tangerang - Harga per Kategori"
        description="Daftar lengkap armada rental mobil 287 Trans di Tangerang: hatchback, MPV, SUV, hingga luxury. Cek harga per kategori dan pilih unit sesuai kebutuhan."
        path="/armada"
        jsonLd={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Armada", path: "/armada" },
        ])}
      />

      <PageHero
        title="Daftar Armada 287 Trans"
        subtitle="Dari city car untuk mobilitas harian sampai unit luxury untuk acara khusus — semua armada kami terawat rutin dan siap pakai."
      />

      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <Reveal>
          <p className="leading-relaxed text-slate-700">
            Armada 287 Trans dibagi ke beberapa kategori supaya lebih mudah menemukan unit yang sesuai kebutuhan
            dan bujet perjalanan Anda. Setiap kategori punya karakter berbeda — bukan sekadar beda nama, tapi beda
            peruntukan: ada yang dirancang untuk efisiensi harian di dalam kota, ada yang mengutamakan kapasitas
            untuk rombongan keluarga, dan ada yang ditujukan untuk kebutuhan yang menuntut tampilan lebih eksklusif.
            Ringkasan kategori dan rentang harga per hari bisa dilihat di bawah ini, diperbarui otomatis mengikuti
            unit yang sedang tersedia.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Kategori &amp; Rentang Harga per Hari</h2>
          {loading ? (
            <Spinner />
          ) : (
            <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 shadow-[var(--shadow-soft)]">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">Kategori</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Jumlah Unit</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Harga per Hari</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {kategori.map((k) => (
                    <tr key={k.tipe}>
                      <td className="px-4 py-3 font-medium text-slate-900">{k.tipe}</td>
                      <td className="px-4 py-3 text-slate-600">{k.count} unit</td>
                      <td className="px-4 py-3 text-slate-600">
                        {k.min === k.max ? formatRupiah(k.min) : `${formatRupiah(k.min)} - ${formatRupiah(k.max)}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p className="mt-3 text-sm text-slate-500">
            Harga dapat berubah sewaktu-waktu mengikuti unit yang tersedia. Untuk detail per unit dan foto
            kendaraan, kunjungi <Link to="/katalog" className="font-semibold text-blue-600 hover:underline">katalog lengkap</Link>.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Memilih Kategori yang Tepat</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            Kalau Anda bepergian sendiri atau berdua dan lebih sering menembus jalan sempit di dalam kota, hatchback
            biasanya jadi pilihan paling praktis dan hemat bahan bakar. Untuk perjalanan keluarga dengan bagasi
            lebih banyak, kategori MPV memberi keseimbangan antara kapasitas dan kenyamanan. SUV cocok kalau Anda
            butuh ground clearance lebih tinggi atau sering melewati kondisi jalan yang kurang rata di luar kota.
            Sementara kategori premium dan luxury — baik sedan, SUV, maupun MPV — ditujukan untuk kebutuhan yang
            menuntut kesan lebih eksklusif, misalnya menjemput tamu perusahaan atau acara resmi.
          </p>
        </Reveal>

        <Reveal delay={160} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Semua Kategori Tersedia Lepas Kunci atau Plus Driver</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            Terlepas dari kategori yang Anda pilih, seluruh armada kami bisa disewa dengan skema{" "}
            <Link to="/sewa-mobil-lepas-kunci-tangerang" className="font-semibold text-blue-600 hover:underline">
              lepas kunci
            </Link>{" "}
            maupun{" "}
            <Link to="/rental-mobil-plus-driver" className="font-semibold text-blue-600 hover:underline">
              plus driver
            </Link>
            , untuk durasi harian sampai{" "}
            <Link to="/rental-mobil-bulanan-tangerang" className="font-semibold text-blue-600 hover:underline">
              bulanan
            </Link>
            . Setiap unit diperiksa kondisinya secara rutin sebelum disewakan, dan foto yang ditampilkan di katalog
            adalah foto unit sebenarnya — bukan foto ilustrasi dari internet.
          </p>
        </Reveal>

        <Reveal delay={180} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Perawatan Armada</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            Setiap unit melalui pemeriksaan rutin sebelum disewakan kembali ke penyewa berikutnya — mencakup kondisi
            mesin, kelistrikan, ban, dan kebersihan interior. Kalau ada indikasi masalah pada unit selama masa sewa,
            penyewa bisa langsung menghubungi tim kami untuk penanganan, termasuk opsi penggantian unit kalau
            diperlukan. Pendekatan ini yang membuat status ketersediaan pada katalog selalu mencerminkan kondisi
            unit yang sebenarnya, bukan sekadar status administratif.
          </p>
        </Reveal>

        <Reveal delay={190} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Armada untuk Berbagai Skema Sewa</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            Semua kategori di atas tersedia untuk sewa harian maupun jangka panjang, dan bisa dipesan sebagai unit
            tunggal maupun beberapa unit sekaligus kalau kebutuhan Anda melibatkan rombongan besar atau acara
            dengan banyak tamu. Untuk perjalanan yang melibatkan penjemputan di Bandara Soekarno-Hatta, kategori
            MPV dan SUV biasanya paling banyak dipilih karena ruang bagasinya yang lega. Detail lengkap tiap unit,
            termasuk foto, tahun kendaraan, dan spesifikasi transmisi, selalu bisa dicek langsung di halaman
            masing-masing mobil.
          </p>
        </Reveal>

        <Reveal delay={200} className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900">Belum Yakin Pilih Unit yang Mana?</h2>
          <p className="mt-2 leading-relaxed text-slate-600">
            Ceritakan kebutuhan perjalanan Anda ke tim kami via WhatsApp, kami bantu rekomendasikan unit yang paling
            sesuai — atau langsung jelajahi katalog lengkap untuk melihat semua unit beserta fotonya.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/katalog"
              className="btn-glow-accent inline-flex items-center justify-center gap-2 rounded-xl bg-accent-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-500"
            >
              Lihat Katalog Lengkap
              <ArrowRight size={16} />
            </Link>
            {profile?.whatsapp && (
              <a
                href={buildWaLink(profile.whatsapp, "Halo, saya ingin tanya rekomendasi armada yang sesuai kebutuhan saya.")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("landing_armada")}
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
