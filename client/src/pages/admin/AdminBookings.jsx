import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import api from "../../api/client";
import AdminTable from "../../components/admin/AdminTable";
import StatusBookingBadge from "../../components/StatusBookingBadge";
import Select from "../../components/ui/Select";
import Spinner from "../../components/ui/Spinner";
import { formatTanggal } from "../../utils/format";
import { STATUS_BOOKING_LABEL } from "../../utils/validators";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get("/booking/admin/all", { params: status ? { status } : {} })
      .then(({ data }) => setBookings(data))
      .finally(() => setLoading(false));
  }, [status]);

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
        <Select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full sm:w-56">
          <option value="">Semua Status</option>
          {Object.entries(STATUS_BOOKING_LABEL).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </Select>
      </div>

      <div className="mt-6">
        {loading ? <Spinner /> : <AdminTable columns={columns} data={bookings} keyField="idBooking" emptyMessage="Belum ada booking." />}
      </div>
    </div>
  );
}
