import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import api from "../../api/client";
import AdminTable from "../../components/admin/AdminTable";
import StatusBookingBadge from "../../components/StatusBookingBadge";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";
import { formatTanggal, toDateInputValue } from "../../utils/format";
import { STATUS_BOOKING_LABEL } from "../../utils/validators";

function shiftDate(dateStr, days) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() + days);
  return toDateInputValue(date);
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState("");
  const [tanggal, setTanggal] = useState(toDateInputValue(new Date()));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (status) params.status = status;
    if (tanggal) params.tanggal = tanggal;
    api
      .get("/booking/admin/all", { params })
      .then(({ data }) => setBookings(data))
      .finally(() => setLoading(false));
  }, [status, tanggal]);

  const columns = [
    { key: "kodeBooking", header: "Kode", render: (row) => <span className="font-mono font-semibold text-slate-900">{row.kodeBooking}</span> },
    {
      key: "customer",
      header: "Pemesan",
      render: (row) => (
        <div>
          <p className="font-medium text-slate-900">{row.namaCustomer}</p>
          <p className="text-xs text-slate-500">{row.noHp}</p>
        </div>
      ),
    },
    { key: "mobil", header: "Mobil", render: (row) => row.mobil?.namaMobil },
    { key: "opsiSewa", header: "Opsi Sewa", render: (row) => (row.denganSopir ? "Dengan Sopir" : "Lepas Kunci") },
    {
      key: "tanggal",
      header: "Tanggal Sewa",
      render: (row) => `${formatTanggal(row.tglAmbil)} - ${formatTanggal(row.tglKembali)} (${row.estimasiHari} hari)`,
    },
    { key: "status", header: "Status", render: (row) => <StatusBookingBadge status={row.statusBooking} /> },
    {
      key: "aksi",
      header: "Aksi",
      render: (row) => (
        <Link to={`/admin/booking/${row.idBooking}`} className="flex items-center gap-1 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 hover:underline">
          <Eye size={16} /> Detail
        </Link>
      ),
    },
  ];

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Kelola Booking</h1>
          <p className="mt-1 text-slate-500">Pantau dan tindak lanjuti permintaan booking pelanggan.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full sm:w-56">
            <option value="">Semua Status</option>
            {Object.entries(STATUS_BOOKING_LABEL).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </Select>
          <Link to="/admin/booking/baru">
            <Button className="w-full sm:w-auto">
              <Plus size={18} />
              Tambah Booking Manual
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1">
          <button
            type="button"
            onClick={() => setTanggal((t) => shiftDate(t || toDateInputValue(new Date()), -1))}
            disabled={!tanggal}
            className="cursor-pointer rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Hari sebelumnya"
          >
            <ChevronLeft size={18} />
          </button>
          <input
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            className="border-0 px-1 py-1.5 text-sm text-slate-700 outline-none"
          />
          <button
            type="button"
            onClick={() => setTanggal((t) => shiftDate(t || toDateInputValue(new Date()), 1))}
            disabled={!tanggal}
            className="cursor-pointer rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Hari berikutnya"
          >
            <ChevronRight size={18} />
          </button>
        </div>
        <button
          type="button"
          onClick={() => setTanggal(toDateInputValue(new Date()))}
          className="cursor-pointer rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
        >
          Hari Ini
        </button>
        <button
          type="button"
          onClick={() => setTanggal("")}
          className={`cursor-pointer rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
            !tanggal ? "bg-blue-50 text-blue-700" : "border border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          Semua Tanggal (Riwayat)
        </button>
      </div>

      <p className="mt-3 text-sm text-slate-500">
        {loading
          ? "Memuat..."
          : tanggal
            ? `${bookings.length} booking masuk pada ${formatTanggal(tanggal)}`
            : `${bookings.length} booking ditemukan (semua tanggal)`}
      </p>

      <div className="mt-4">
        {loading ? <Spinner /> : <AdminTable columns={columns} data={bookings} keyField="idBooking" emptyMessage="Tidak ada booking pada rentang ini." />}
      </div>
    </div>
  );
}
