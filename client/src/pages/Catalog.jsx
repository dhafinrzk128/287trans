import { useEffect, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import api from "../api/client";
import CarCard from "../components/CarCard";
import Spinner from "../components/ui/Spinner";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";

const INITIAL_FILTER = { tipe: "", transmisi: "", kapasitas: "" };

export default function Catalog() {
  const [mobils, setMobils] = useState([]);
  const [tipeList, setTipeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(INITIAL_FILTER);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    api.get("/mobil/meta/tipe-list").then(({ data }) => setTipeList(data));
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = {};
    Object.entries(filter).forEach(([key, value]) => {
      if (value) params[key] = value;
    });
    api
      .get("/mobil", { params })
      .then(({ data }) => setMobils(data))
      .finally(() => setLoading(false));
  }, [filter]);

  function updateFilter(field, value) {
    setFilter((f) => ({ ...f, [field]: value }));
  }

  function resetFilter() {
    setFilter(INITIAL_FILTER);
  }

  const FilterForm = (
    <div className="grid gap-4 sm:grid-cols-3">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Tipe Mobil</label>
        <Select value={filter.tipe} onChange={(e) => updateFilter("tipe", e.target.value)}>
          <option value="">Semua Tipe</option>
          {tipeList.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </Select>
      </div>
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
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800 py-14 text-white">
        <div className="pointer-events-none absolute -top-16 right-0 h-64 w-64 rounded-full bg-accent-500/15 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold sm:text-4xl">Katalog Mobil</h1>
          <p className="mt-3 max-w-2xl text-blue-100">Pilih mobil sesuai kebutuhan perjalanan Anda dari armada lengkap kami.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
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
                <h3 className="text-lg font-bold text-slate-900">Filter</h3>
                <button onClick={() => setShowFilter(false)} className="cursor-pointer rounded-lg p-1 text-slate-500 hover:bg-slate-100" aria-label="Tutup filter">
                  <X size={22} />
                </button>
              </div>
              {FilterForm}
              <Button className="mt-5 w-full" onClick={() => setShowFilter(false)}>Terapkan Filter</Button>
            </div>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-slate-500">{loading ? "Memuat..." : `${mobils.length} mobil ditemukan`}</p>
          <button onClick={resetFilter} className="cursor-pointer text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 hover:underline">
            Reset Filter
          </button>
        </div>

        {loading ? (
          <Spinner />
        ) : mobils.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-slate-300 py-16 text-center text-slate-500">
            Tidak ada mobil yang sesuai dengan filter Anda.
          </div>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {mobils.map((mobil) => (
              <CarCard key={mobil.idMobil} mobil={mobil} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
