import { useEffect, useState, useRef } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import api from "../api/client";
import CarCard from "../components/CarCard";
import Reveal from "../components/Reveal";
import TipeToggle from "../components/TipeToggle";
import Spinner from "../components/ui/Spinner";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";
import { inputClassName } from "../components/ui/FormField";
import Seo from "../components/Seo";
import KayonWayang from "../components/KayonWayang";
import { breadcrumbSchema } from "../utils/schema";
import { getPrerenderedData, setPrerenderedData } from "../utils/prerenderData";

const INITIAL_FILTER = { tipe: "", transmisi: "", kapasitas: "" };
const PRERENDER_KEY = "katalog_mobils";

function sortByAvailability(list) {
  return [...list].sort((a, b) => (a.status === "tersedia" ? 0 : 1) - (b.status === "tersedia" ? 0 : 1));
}

export default function Catalog() {
  const isFirstRun = useRef(true);
  const [mobils, setMobils] = useState(() => getPrerenderedData(PRERENDER_KEY) ?? []);
  const [loading, setLoading] = useState(() => getPrerenderedData(PRERENDER_KEY) === undefined);
  const [filter, setFilter] = useState(INITIAL_FILTER);
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState("");

  // Tipe pills are derived from cars that match the current transmisi/kapasitas
  // filters (independent of the tipe filter itself), so a pill only exists
  // when picking it would actually return results.
  const availableTipes = [...new Set(mobils.map((m) => m.tipe))].sort();

  const displayedMobils = mobils.filter((m) => {
    if (filter.tipe && m.tipe !== filter.tipe) return false;
    return m.namaMobil.toLowerCase().includes(search.trim().toLowerCase());
  });

  useEffect(() => {
    // Silent only on the very first run, and only when the filters are still
    // at their default (matching what was actually prerendered) — avoids the
    // loading=true flash that would discard the already-correct prerendered
    // content (see src/utils/prerenderData.js).
    const isDefaultFilter = !filter.transmisi && !filter.kapasitas;
    const silent = isFirstRun.current && isDefaultFilter && getPrerenderedData(PRERENDER_KEY) !== undefined;
    isFirstRun.current = false;
    if (!silent) setLoading(true);
    const params = {};
    if (filter.transmisi) params.transmisi = filter.transmisi;
    if (filter.kapasitas) params.kapasitas = filter.kapasitas;
    api
      .get("/mobil", { params })
      .then(({ data }) => {
        const sorted = sortByAvailability(data);
        setMobils(sorted);
        if (isDefaultFilter) setPrerenderedData(PRERENDER_KEY, sorted);
      })
      .finally(() => setLoading(false));
  }, [filter.transmisi, filter.kapasitas]);

  useEffect(() => {
    if (filter.tipe && !availableTipes.includes(filter.tipe)) {
      setFilter((f) => ({ ...f, tipe: "" }));
    }
  }, [availableTipes.join("|"), filter.tipe]);

  function updateFilter(field, value) {
    setFilter((f) => ({ ...f, [field]: value }));
  }

  function resetFilter() {
    setFilter(INITIAL_FILTER);
    setSearch("");
  }

  const FilterForm = (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Transmisi</label>
        <Select value={filter.transmisi} onChange={(e) => updateFilter("transmisi", e.target.value)}>
          <option value="">Semua Transmisi</option>
          <option value="Manual">Manual</option>
          <option value="Matic">Matic</option>
        </Select>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Min. Kapasitas</label>
        <Select value={filter.kapasitas} onChange={(e) => updateFilter("kapasitas", e.target.value)}>
          <option value="">Semua Kapasitas</option>
          <option value="2">2+ orang</option>
          <option value="5">5+ orang</option>
          <option value="7">7+ orang</option>
        </Select>
      </div>
    </div>
  );

  return (
    <div>
      <Seo
        title="Katalog Mobil Rental Tangerang - Semua Armada"
        description="Lihat semua armada rental mobil 287 Trans di Tangerang & Jabodetabek. Beragam tipe, transmisi manual/matic, lepas kunci atau plus driver."
        path="/katalog"
        jsonLd={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Katalog Mobil", path: "/katalog" },
        ])}
      />
      <section className="relative overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-800 to-accent-900 py-14 text-white">
        <div className="pointer-events-none absolute -top-16 right-0 h-64 w-64 rounded-full bg-accent-500/15 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="flex h-full items-center justify-center">
            <KayonWayang varian="kompak" prioritas className="opacity-[0.24]" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-950/50 to-neutral-950/15" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold sm:text-4xl">Katalog Mobil</h1>
          <p className="mt-3 max-w-2xl text-blue-100">Pilih mobil sesuai kebutuhan perjalanan Anda dari armada lengkap kami.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="relative mb-4">
          <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama mobil..."
            className={`${inputClassName(false)} py-3 pl-11 text-base`}
          />
        </div>

        <div className="mb-4">
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Tipe Mobil</label>
          <TipeToggle tipeList={availableTipes} value={filter.tipe} onChange={(t) => updateFilter("tipe", t)} />
        </div>

        <div className="hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[var(--shadow-soft)] lg:block">
          {FilterForm}
        </div>

        <div className="lg:hidden">
          <Button variant="secondary" onClick={() => setShowFilter(true)} className="w-full">
            <SlidersHorizontal size={18} />
            Filter Pencarian
          </Button>
        </div>

        {showFilter && (
          <div className="fixed inset-0 z-50 flex items-end bg-black/40 lg:hidden" onClick={() => setShowFilter(false)}>
            <div className="w-full rounded-t-2xl bg-white p-5" onClick={(e) => e.stopPropagation()}>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">Filter</h2>
                <button onClick={() => setShowFilter(false)} className="cursor-pointer rounded-lg p-1 text-slate-500 hover:bg-slate-100" aria-label="Tutup filter">
                  <X size={22} />
                </button>
              </div>
              {FilterForm}
              <Button className="mt-5 w-full" onClick={() => setShowFilter(false)}>Terapkan Filter</Button>
            </div>
          </div>
        )}

        {/* Tak terlihat, hanya untuk pembaca layar: nama mobil di kartu memakai
            h3, dan tanpa h2 di antaranya urutan heading lompat dari h1. */}
        <h2 className="sr-only">Daftar Mobil</h2>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-slate-500">{loading ? "Memuat..." : `${displayedMobils.length} mobil ditemukan`}</p>
          <button onClick={resetFilter} className="cursor-pointer text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 hover:underline">
            Reset Filter
          </button>
        </div>

        {loading ? (
          <Spinner />
        ) : displayedMobils.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-slate-300 py-16 text-center text-slate-500">
            Tidak ada mobil yang sesuai dengan filter Anda.
          </div>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayedMobils.map((mobil, i) => (
              <Reveal key={mobil.idMobil} delay={(i % 4) * 80} className="h-full [&>*]:h-full">
                <CarCard mobil={mobil} priority={i === 0} />
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* Halaman ini menampilkan daftar unit tapi tidak pernah menjelaskan cara
          memilih di antaranya — pengunjung yang belum tahu mau apa hanya
          melihat dua puluh empat kartu. Panduan singkat ini menjawab
          pertanyaan yang biasanya ditanyakan lewat chat sebelum memesan. */}
      <section className="border-t border-slate-200 bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal as="h2" className="text-2xl font-bold text-slate-900">
            Cara Memilih Unit yang Tepat
          </Reveal>
          <div className="mt-6 grid gap-8 lg:grid-cols-3">
            <Reveal className="space-y-3 leading-relaxed text-slate-600">
              <h3 className="text-base font-bold text-slate-900">Mulai dari jumlah penumpang</h3>
              <p>
                Ini penyaring yang paling cepat. Untuk lima orang atau kurang, hatchback dan sedan sudah
                cukup dan tarifnya paling ringan. Untuk enam sampai tujuh orang, pilihannya ada di MPV
                dan SUV tiga baris. Kalau baris ketiga akan terisi orang dewasa sepanjang perjalanan
                jauh, sebutkan saat chat — tidak semua unit tujuh penumpang sama lapangnya.
              </p>
            </Reveal>
            <Reveal delay={100} className="space-y-3 leading-relaxed text-slate-600">
              <h3 className="text-base font-bold text-slate-900">Lalu sesuaikan dengan rutenya</h3>
              <p>
                Rute menentukan mesin. Untuk pemakaian dalam kota Tangerang dan Jakarta yang banyak
                berhenti-jalan, unit hybrid dan bensin terasa paling nyaman sekaligus hemat. Untuk
                perjalanan luar kota yang panjang atau muatan penuh, unit diesel punya tenaga di
                putaran rendah yang membuat bedanya terasa. Kalau jalannya belum mulus, SUV dengan
                ground clearance tinggi lebih aman.
              </p>
            </Reveal>
            <Reveal delay={200} className="space-y-3 leading-relaxed text-slate-600">
              <h3 className="text-base font-bold text-slate-900">Terakhir, cara pakainya</h3>
              <p>
                Seluruh unit di katalog ini bisa disewa lepas kunci maupun plus sopir, mulai dari satu
                hari sampai skema mingguan dan bulanan untuk kebutuhan jangka panjang. Syarat lepas
                kunci cukup KTP yang masih berlaku. Klik unit mana pun untuk melihat keterangan
                lengkap, tarif hariannya, dan tanggal yang masih tersedia.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
