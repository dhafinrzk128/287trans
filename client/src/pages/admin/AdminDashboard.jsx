import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClipboardList, Car, CarFront, Wrench, Clock, CheckCircle2 } from "lucide-react";
import api from "../../api/client";
import StatCard from "../../components/admin/StatCard";
import StatusBookingBadge from "../../components/StatusBookingBadge";
import Spinner from "../../components/ui/Spinner";
import { formatTanggalWaktu } from "../../utils/format";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/dashboard").then(({ data }) => setData(data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;
  if (!data) return null;

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-slate-900">Dashboard</h1>
      <p className="mt-1 text-slate-500">Ringkasan aktivitas rental mobil Anda.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard icon={ClipboardList} label="Total Permintaan Booking" value={data.totalBooking} accent="blue" />
        <StatCard icon={Clock} label="Menunggu Konfirmasi" value={data.bookingMenunggu} accent="amber" />
        <StatCard icon={CheckCircle2} label="Booking Dikonfirmasi" value={data.bookingDikonfirmasi} accent="orange" />
        <StatCard icon={CarFront} label="Mobil Tersedia" value={data.mobilTersedia} accent="emerald" />
        <StatCard icon={Car} label="Mobil Disewa" value={data.mobilDisewa} accent="slate" />
        <StatCard icon={Wrench} label="Mobil Maintenance" value={data.mobilMaintenance} accent="red" />
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-[var(--shadow-soft)]">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">Booking Terbaru</h2>
          <Link to="/admin/booking" className="text-sm font-semibold text-blue-600 hover:underline">
            Lihat Semua
          </Link>
        </div>

        {data.bookingTerbaru.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">Belum ada permintaan booking masuk.</p>
        ) : (
          <div className="mt-4 divide-y divide-slate-100">
            {data.bookingTerbaru.map((b) => (
              <Link
                key={b.idBooking}
                to={`/admin/booking/${b.idBooking}`}
                className="flex flex-col gap-2 rounded-xl px-2 py-3 transition-colors hover:bg-blue-50/50 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold text-slate-900">{b.namaCustomer} &middot; {b.namaMobil}</p>
                  <p className="text-xs text-slate-500">{b.kodeBooking} &middot; {formatTanggalWaktu(b.createdAt)}</p>
                </div>
                <StatusBookingBadge status={b.statusBooking} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
