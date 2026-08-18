import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, ImageOff, Search } from "lucide-react";
import api from "../../api/client";
import AdminTable from "../../components/admin/AdminTable";
import SmartImage from "../../components/SmartImage";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";
import { inputClassName } from "../../components/ui/FormField";
import { formatRupiah } from "../../utils/format";
import { STATUS_MOBIL_LABEL } from "../../utils/validators";

export default function AdminCars() {
  const [mobils, setMobils] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [search, setSearch] = useState("");

  const filteredMobils = mobils.filter((m) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return m.namaMobil.toLowerCase().includes(q) || m.tipe.toLowerCase().includes(q);
  });

  function load() {
    setLoading(true);
    api.get("/mobil/admin/all").then(({ data }) => setMobils(data)).finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  async function handleStatusChange(id, status) {
    setBusyId(id);
    try {
      await api.put(`/mobil/admin/${id}`, { status });
      setMobils((prev) => prev.map((m) => (m.idMobil === id ? { ...m, status } : m)));
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(id, nama) {
    if (!window.confirm(`Hapus mobil "${nama}"? Tindakan ini tidak dapat dibatalkan.`)) return;
    setBusyId(id);
    try {
      await api.delete(`/mobil/admin/${id}`);
      setMobils((prev) => prev.filter((m) => m.idMobil !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menghapus mobil.");
    } finally {
      setBusyId(null);
    }
  }

  const columns = [
    {
      key: "foto",
      header: "Foto",
      render: (row) =>
        row.fotoUtama ? (
          <SmartImage src={row.fotoUtama} alt={row.namaMobil} className="h-12 w-16 rounded-xl object-cover" />
        ) : (
          <div className="flex h-12 w-16 items-center justify-center rounded-xl bg-slate-100 text-slate-300">
            <ImageOff size={20} />
          </div>
        ),
    },
    {
      key: "namaMobil",
      header: "Nama Mobil",
      render: (row) => (
        <div>
          <p className="font-semibold text-slate-900">{row.namaMobil}</p>
          <p className="text-xs text-slate-500">{row.tahun} &middot; {row.tipe} &middot; {row.transmisi} &middot; {row.bahanBakar} &middot; {row.kapasitas} orang</p>
        </div>
      ),
    },
    { key: "hargaPerHari", header: "Harga/Hari", render: (row) => formatRupiah(row.hargaPerHari) },
    {
      key: "status",
      header: "Status",
      render: (row) => (
        <Select
          value={row.status}
          disabled={busyId === row.idMobil}
          onChange={(e) => handleStatusChange(row.idMobil, e.target.value)}
          className="w-40 py-1.5"
        >
          {Object.entries(STATUS_MOBIL_LABEL).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </Select>
      ),
    },
    {
      key: "aksi",
      header: "Aksi",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Link to={`/admin/mobil/${row.idMobil}/edit`} className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-600" aria-label="Edit mobil">
            <Pencil size={16} />
          </Link>
          <button
            onClick={() => handleDelete(row.idMobil, row.namaMobil)}
            disabled={busyId === row.idMobil}
            className="cursor-pointer rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50"
            aria-label="Hapus mobil"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Kelola Mobil</h1>
          <p className="mt-1 text-slate-500">Kelola data armada mobil rental Anda.</p>
        </div>
        <Link to="/admin/mobil/baru">
          <Button>
            <Plus size={18} />
            Tambah Mobil
          </Button>
        </Link>
      </div>

      <div className="relative mt-5">
        <Search size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama atau tipe mobil..."
          className={`${inputClassName(false)} pl-10`}
        />
      </div>

      <div className="mt-4">
        {loading ? (
          <Spinner />
        ) : (
          <AdminTable
            columns={columns}
            data={filteredMobils}
            keyField="idMobil"
            emptyMessage={search ? "Tidak ada mobil yang cocok dengan pencarian." : "Belum ada data mobil."}
          />
        )}
      </div>
    </div>
  );
}
