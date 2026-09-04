import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { Users, Fuel, Cog, Tag, Calendar, ImageOff, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import api from "../api/client";
import { useCompanyProfile } from "../context/CompanyProfileContext";
import Spinner from "../components/ui/Spinner";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Seo from "../components/Seo";
import SmartImage from "../components/SmartImage";
import Reveal from "../components/Reveal";
import { productSchema, breadcrumbSchema } from "../utils/schema";
import { STATUS_MOBIL_LABEL, STATUS_MOBIL_BADGE } from "../utils/validators";
import { buildWaLink, formatRupiah, pesanSewa } from "../utils/format";
import { trackWhatsAppClick } from "../utils/tracking";
import { getPrerenderedData, setPrerenderedData } from "../utils/prerenderData";

function toRanges(rawRanges) {
  return rawRanges.map((r) => ({ from: new Date(r.tglAmbil), to: new Date(r.tglKembali) }));
}

export default function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profile } = useCompanyProfile();
  const prerenderKey = `car_detail_${id}`;
  const initialData = getPrerenderedData(prerenderKey);
  const [mobil, setMobil] = useState(() => initialData?.mobil ?? null);
  const [bookedRanges, setBookedRanges] = useState(() => (initialData ? toRanges(initialData.bookedRanges) : []));
  const [loading, setLoading] = useState(() => initialData === undefined);
  const [activeFoto, setActiveFoto] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    // Silent when this exact car's data was already prerendered — avoids the
    // loading=true flash that would discard the already-correct prerendered
    // content (see src/utils/prerenderData.js). A different :id via
    // client-side navigation finds no matching key and loads normally.
    const silent = getPrerenderedData(prerenderKey) !== undefined;
    if (!silent) setLoading(true);
    setError("");
    Promise.all([
      api.get(`/mobil/${id}`),
      api.get(`/mobil/${id}/booked-ranges`),
    ])
      .then(([mobilRes, rangesRes]) => {
        setMobil(mobilRes.data);
        setBookedRanges(toRanges(rangesRes.data));
        setActiveFoto(0);
        setPrerenderedData(prerenderKey, { mobil: mobilRes.data, bookedRanges: rangesRes.data });
      })
      .catch(() => setError("Mobil tidak ditemukan."))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) return <Spinner />;
  if (error || !mobil) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="text-slate-600">{error}</p>
        <Link to="/katalog" className="mt-4 inline-block font-semibold text-blue-600 hover:underline">
          Kembali ke Katalog
        </Link>
      </div>
    );
  }

  const fotos = mobil.fotos?.length ? mobil.fotos : [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Seo
        title={`Sewa ${mobil.namaMobil} Tangerang - Rental Harian & Bulanan`}
        description={`Sewa ${mobil.namaMobil} di Tangerang mulai ${formatRupiah(mobil.hargaPerHari)}/hari. Transmisi ${mobil.transmisi}, kapasitas ${mobil.kapasitas} orang. Booking cepat via WA 0811-144-287.`}
        path={`/katalog/${id}`}
        jsonLd={[
          productSchema(mobil),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Katalog Mobil", path: "/katalog" },
            { name: mobil.namaMobil, path: `/katalog/${id}` },
          ]),
        ]}
      />
      <nav className="mb-6 text-sm text-slate-500">
        <Link to="/katalog" className="transition-colors hover:text-blue-600">Katalog Mobil</Link> / <span className="text-slate-700">{mobil.namaMobil}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Galeri Foto */}
        <Reveal langsung>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100">
            {fotos.length > 0 ? (
              <SmartImage
                src={fotos[activeFoto]?.urlFoto}
                alt={`${mobil.namaMobil} - ${mobil.tipe} rental mobil Tangerang`}
                className="h-full w-full object-cover"
                fetchPriority="high"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-slate-300">
                <ImageOff size={56} />
              </div>
            )}
            {fotos.length > 1 && (
              <>
                <button
                  onClick={() => setActiveFoto((i) => (i === 0 ? fotos.length - 1 : i - 1))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white/90 p-2 shadow-md transition-transform hover:scale-105 hover:bg-white"
                  aria-label="Foto sebelumnya"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setActiveFoto((i) => (i === fotos.length - 1 ? 0 : i + 1))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white/90 p-2 shadow-md transition-transform hover:scale-105 hover:bg-white"
                  aria-label="Foto berikutnya"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
            <Badge className={`absolute right-3 top-3 border ${STATUS_MOBIL_BADGE[mobil.status]}`}>
              {STATUS_MOBIL_LABEL[mobil.status]}
            </Badge>
          </div>
          {fotos.length > 1 && (
            <div className="mt-3 grid grid-cols-5 gap-2">
              {fotos.map((f, i) => (
                <button
                  key={f.idFoto}
                  onClick={() => setActiveFoto(i)}
                  className={`aspect-square cursor-pointer overflow-hidden rounded-xl border-2 transition-colors ${
                    i === activeFoto ? "border-blue-600" : "border-transparent hover:border-blue-200"
                  }`}
                >
                  <SmartImage src={f.urlFoto} alt="" className="h-full w-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </Reveal>

        {/* Info & Spesifikasi */}
        <Reveal delay={90}>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">{mobil.tipe}</p>
          <h1 className="mt-1 text-3xl font-extrabold text-slate-900">{mobil.namaMobil}</h1>

          <p className="mt-2 text-2xl font-extrabold text-accent-700">
            {formatRupiah(mobil.hargaPerHari)}
            <span className="text-base font-medium text-slate-500"> /hari</span>
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <span className="flex items-center gap-2 rounded-xl bg-blue-50 px-3.5 py-2 text-sm font-medium text-blue-700">
              <Calendar size={16} />{` ${mobil.tahun}`}
            </span>
            <span className="flex items-center gap-2 rounded-xl bg-blue-50 px-3.5 py-2 text-sm font-medium text-blue-700">
              <Tag size={16} />{` ${mobil.tipe}`}
            </span>
            <span className="flex items-center gap-2 rounded-xl bg-blue-50 px-3.5 py-2 text-sm font-medium text-blue-700">
              <Cog size={16} />{` ${mobil.transmisi}`}
            </span>
            <span className="flex items-center gap-2 rounded-xl bg-blue-50 px-3.5 py-2 text-sm font-medium text-blue-700">
              <Fuel size={16} />{` ${mobil.bahanBakar}`}
            </span>
            <span className="flex items-center gap-2 rounded-xl bg-blue-50 px-3.5 py-2 text-sm font-medium text-blue-700">
              <Users size={16} />{` ${mobil.kapasitas} orang`}
            </span>
          </div>

          <p className="mt-5 leading-relaxed text-slate-600">{mobil.deskripsi}</p>

          <div className="mt-6">
            <h2 className="text-base font-bold text-slate-900">Cek Ketersediaan Tanggal</h2>
            <p className="mt-1 text-sm text-slate-500">Tanggal yang ditandai merah sudah dibooking pelanggan lain.</p>
            <div className="mt-3 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-3 shadow-[var(--shadow-soft)]">
              <DayPicker
                mode="default"
                disabled={[{ before: today }, ...bookedRanges]}
                modifiers={{ booked: bookedRanges }}
                modifiersClassNames={{ booked: "rdp-booked" }}
                startMonth={today}
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              variant="accent"
              size="lg"
              className="w-full sm:w-auto"
              disabled={mobil.status !== "tersedia"}
              onClick={() => navigate(`/booking/${mobil.idMobil}`)}
            >
              {mobil.status !== "tersedia" ? "Tanyakan Jadwal Ketersediaan di Kontak Kami" : "Ajukan Permintaan Booking"}
            </Button>
            {profile?.whatsapp && (
              <a
                href={buildWaLink(profile.whatsapp, pesanSewa(`Halo, saya mau sewa ${mobil.namaMobil}.`))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("car_detail", mobil.namaMobil)}
                className="btn-glow-whatsapp inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 sm:w-auto"
              >
                <MessageCircle size={18} />
                Pesan via WhatsApp
              </a>
            )}
          </div>
        </Reveal>
      </div>

      <style>{`
        .rdp-booked { background-color: #fee2e2; color: #b91c1c; border-radius: 6px; }
      `}</style>
    </div>
  );
}
