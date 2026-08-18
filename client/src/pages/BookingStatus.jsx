import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle2, Clock, XCircle, PartyPopper, MessageCircle } from "lucide-react";
import api from "../api/client";
import { useCompanyProfile } from "../context/CompanyProfileContext";
import Spinner from "../components/ui/Spinner";
import StatusBookingBadge from "../components/StatusBookingBadge";
import SmartImage from "../components/SmartImage";
import { formatTanggal, formatTanggalWaktu, buildWaLink } from "../utils/format";
import { trackWhatsAppClick } from "../utils/tracking";
import Seo from "../components/Seo";

const STATUS_ICON = {
  menunggu_konfirmasi: Clock,
  dikonfirmasi: CheckCircle2,
  selesai: PartyPopper,
  dibatalkan: XCircle,
};

const STATUS_ICON_STYLE = {
  menunggu_konfirmasi: "bg-amber-50 text-amber-600",
  dikonfirmasi: "bg-blue-50 text-blue-600",
  selesai: "bg-emerald-50 text-emerald-600",
  dibatalkan: "bg-red-50 text-red-600",
};

const STATUS_DESC = {
  menunggu_konfirmasi: "Permintaan booking Anda sudah kami terima. Tim kami akan segera menghubungi Anda melalui nomor HP yang didaftarkan.",
  dikonfirmasi: "Booking Anda telah dikonfirmasi oleh tim kami. Silakan tunggu info lebih lanjut via telepon/WhatsApp.",
  selesai: "Terima kasih telah menggunakan layanan 287 Trans!",
  dibatalkan: "Permintaan booking ini telah dibatalkan. Hubungi kami jika ada pertanyaan.",
};

export default function BookingStatus() {
  const { kodeBooking } = useParams();
  const { profile } = useCompanyProfile();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/booking/status/${kodeBooking}`)
      .then(({ data }) => setBooking(data))
      .catch(() => setError("Booking tidak ditemukan. Periksa kembali kode booking Anda."))
      .finally(() => setLoading(false));
  }, [kodeBooking]);

  if (loading) return <Spinner />;
  if (error || !booking) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="text-slate-600">{error}</p>
        <Link to="/katalog" className="mt-4 inline-block font-semibold text-blue-600 hover:underline">
          Kembali ke Katalog
        </Link>
      </div>
    );
  }

  const Icon = STATUS_ICON[booking.statusBooking] || Clock;
  const waLink = profile?.whatsapp
    ? buildWaLink(profile.whatsapp, `Halo, saya ingin menanyakan booking dengan kode ${booking.kodeBooking}.`)
    : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Seo
        title="Status Booking"
        description={`Status permintaan booking dengan kode ${booking.kodeBooking}.`}
        path={`/status/${kodeBooking}`}
        noindex
      />
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-[var(--shadow-soft)]">
        <span className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${STATUS_ICON_STYLE[booking.statusBooking]}`}>
          <Icon size={32} />
        </span>
        <h1 className="mt-4 text-2xl font-extrabold text-slate-900">Status Permintaan Booking</h1>
        <div className="mt-3 flex justify-center">
          <StatusBookingBadge status={booking.statusBooking} className="px-4 py-1.5 text-sm" />
        </div>
        <p className="mt-3 text-sm text-slate-600">{STATUS_DESC[booking.statusBooking]}</p>
        <p className="mt-4 text-sm text-slate-500">
          Kode Booking: <span className="font-mono font-bold text-slate-900">{booking.kodeBooking}</span>
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-[var(--shadow-soft)]">
        <h2 className="text-base font-bold text-slate-900">Detail Permintaan</h2>
        <div className="mt-4 flex items-center gap-3">
          {booking.mobil?.fotoUtama && (
            <SmartImage src={booking.mobil.fotoUtama} alt={booking.mobil.namaMobil} className="h-16 w-20 rounded-xl object-cover" />
          )}
          <div>
            <p className="font-semibold text-slate-900">{booking.mobil?.namaMobil}</p>
            <p className="text-sm text-slate-500">{booking.mobil?.tipe}</p>
          </div>
        </div>

        <dl className="mt-5 space-y-2.5 border-t border-slate-100 pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-slate-500">Nama Pemesan</dt>
            <dd className="font-medium text-slate-900">{booking.namaCustomer}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-500">No. HP</dt>
            <dd className="font-medium text-slate-900">{booking.noHp}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-500">Tanggal Mulai</dt>
            <dd className="font-medium text-slate-900">{formatTanggal(booking.tglAmbil)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-500">Estimasi Lama Sewa</dt>
            <dd className="font-medium text-slate-900">{booking.estimasiHari} hari (s/d {formatTanggal(booking.tglKembali)})</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-500">Opsi Sewa</dt>
            <dd className="font-medium text-slate-900">{booking.denganSopir ? "Dengan Sopir" : "Lepas Kunci"}</dd>
          </div>
          {booking.catatan && (
            <div className="flex justify-between gap-4">
              <dt className="shrink-0 text-slate-500">Catatan</dt>
              <dd className="text-right font-medium text-slate-900">{booking.catatan}</dd>
            </div>
          )}
          <div className="flex justify-between">
            <dt className="text-slate-500">Waktu Pengajuan</dt>
            <dd className="font-medium text-slate-900">{formatTanggalWaktu(booking.createdAt)}</dd>
          </div>
        </dl>
      </div>

      {waLink && (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
          <p className="text-sm text-slate-600">Ada pertanyaan tentang permintaan booking ini?</p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("booking_status")}
            className="btn-glow-whatsapp mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-700"
          >
            <MessageCircle size={18} />
            Chat via WhatsApp
          </a>
        </div>
      )}

      <p className="mt-6 text-center text-sm text-slate-500">
        Simpan kode booking ini sebagai referensi saat dihubungi oleh tim kami.
      </p>
    </div>
  );
}
