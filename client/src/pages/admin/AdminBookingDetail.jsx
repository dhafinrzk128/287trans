import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Phone, MessageCircle, ImagePlus, Receipt } from "lucide-react";
import api from "../../api/client";
import Spinner from "../../components/ui/Spinner";
import Button from "../../components/ui/Button";
import StatusBookingBadge from "../../components/StatusBookingBadge";
import { formatTanggal, formatTanggalWaktu } from "../../utils/format";

const ACTIONS = [
  { status: "dikonfirmasi", label: "Konfirmasi Booking", variant: "primary" },
  { status: "selesai", label: "Tandai Selesai", variant: "dark" },
  { status: "dibatalkan", label: "Batalkan Booking", variant: "danger" },
];

function toWhatsAppNumber(noHp) {
  const digits = noHp.replace(/\D/g, "");
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  if (digits.startsWith("62")) return digits;
  return digits;
}

export default function AdminBookingDetail() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [uploadingBukti, setUploadingBukti] = useState(false);
  const [buktiError, setBuktiError] = useState("");

  function load() {
    setLoading(true);
    api.get(`/booking/admin/${id}`).then(({ data }) => setBooking(data)).finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, [id]);

  async function handleStatusChange(status) {
    setUpdating(true);
    try {
      const { data } = await api.patch(`/booking/admin/${id}/status`, { status });
      setBooking(data);
    } finally {
      setUpdating(false);
    }
  }

  async function handleBuktiUpload(ev) {
    const file = ev.target.files?.[0];
    if (!file) return;
    setBuktiError("");
    setUploadingBukti(true);
    const formData = new FormData();
    formData.append("buktiTransfer", file);
    try {
      const { data } = await api.put(`/booking/admin/${id}/bukti-transfer`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setBooking(data);
    } catch (err) {
      setBuktiError(err.response?.data?.message || "Gagal mengunggah bukti transfer.");
    } finally {
      setUploadingBukti(false);
      ev.target.value = "";
    }
  }

  if (loading) return <Spinner />;
  if (!booking) return null;

  const waNumber = toWhatsAppNumber(booking.noHp);

  return (
    <div>
      <nav className="mb-4 text-sm text-slate-500">
        <Link to="/admin/booking" className="transition-colors hover:text-blue-600">Kelola Booking</Link> / <span className="text-slate-700">{booking.kodeBooking}</span>
      </nav>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Detail Permintaan Booking</h1>
          <p className="mt-1 font-mono text-slate-500">{booking.kodeBooking}</p>
        </div>
        <StatusBookingBadge status={booking.statusBooking} className="px-4 py-1.5 text-sm" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[var(--shadow-soft)] lg:col-span-2">
          <h3 className="text-base font-bold text-slate-900">Data Pemesan</h3>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-xs text-slate-500">Nama Lengkap</dt>
              <dd className="font-medium text-slate-900">{booking.namaCustomer}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">No. HP</dt>
              <dd className="font-medium text-slate-900">{booking.noHp}</dd>
            </div>
          </dl>

          <h3 className="mt-6 text-base font-bold text-slate-900">Detail Sewa</h3>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-xs text-slate-500">Mobil</dt>
              <dd className="font-medium text-slate-900">{booking.mobil?.namaMobil}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Opsi Sewa</dt>
              <dd className="font-medium text-slate-900">{booking.denganSopir ? "Dengan Sopir" : "Lepas Kunci"}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Tanggal Mulai</dt>
              <dd className="font-medium text-slate-900">{formatTanggal(booking.tglAmbil)}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Estimasi Lama Sewa</dt>
              <dd className="font-medium text-slate-900">{booking.estimasiHari} hari (s/d {formatTanggal(booking.tglKembali)})</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Waktu Pengajuan</dt>
              <dd className="font-medium text-slate-900">{formatTanggalWaktu(booking.createdAt)}</dd>
            </div>
            {booking.catatan && (
              <div className="sm:col-span-2">
                <dt className="text-xs text-slate-500">Catatan Customer</dt>
                <dd className="font-medium text-slate-900">{booking.catatan}</dd>
              </div>
            )}
          </dl>

          <div className="mt-6 flex flex-wrap gap-3 border-t border-slate-100 pt-5">
            {ACTIONS.filter((a) => a.status !== booking.statusBooking).map((a) => (
              <Button key={a.status} variant={a.variant} loading={updating} onClick={() => handleStatusChange(a.status)}>
                {a.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[var(--shadow-soft)]">
          <h3 className="text-base font-bold text-slate-900">Hubungi Pemesan</h3>
          <p className="mt-1 text-sm text-slate-500">Tindak lanjuti permintaan ini secara langsung.</p>
          <div className="mt-4 flex flex-col gap-3">
            <a
              href={`https://wa.me/${waNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md"
            >
              <MessageCircle size={18} />
              Chat WhatsApp
            </a>
            <a
              href={`tel:${booking.noHp}`}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              <Phone size={18} />
              Telepon
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[var(--shadow-soft)] lg:col-start-3">
          <h3 className="flex items-center gap-2 text-base font-bold text-slate-900">
            <Receipt size={18} className="text-blue-600" />
            Bukti Transfer
          </h3>
          <p className="mt-1 text-sm text-slate-500">Unggah bukti transfer pembayaran dari customer.</p>

          <div className="mt-4">
            {booking.buktiTransferUrl ? (
              <a href={booking.buktiTransferUrl} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-xl border border-slate-200">
                <img src={booking.buktiTransferUrl} alt="Bukti transfer" className="h-48 w-full object-cover" />
              </a>
            ) : (
              <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-slate-300 text-sm text-slate-400">
                Belum ada bukti transfer
              </div>
            )}

            <label
              htmlFor="buktiTransfer"
              className={`mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 ${uploadingBukti ? "pointer-events-none opacity-60" : ""}`}
            >
              <ImagePlus size={16} />
              {uploadingBukti ? "Mengunggah..." : booking.buktiTransferUrl ? "Ganti Foto" : "Unggah Foto"}
              <input
                id="buktiTransfer"
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploadingBukti}
                onChange={handleBuktiUpload}
              />
            </label>
            {buktiError && <p className="mt-2 text-xs font-medium text-red-600">{buktiError}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
