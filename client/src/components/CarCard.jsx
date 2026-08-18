import { Link } from "react-router-dom";
import { Users, Fuel, Cog, ImageOff, ArrowRight } from "lucide-react";
import Badge from "./ui/Badge";
import { STATUS_MOBIL_LABEL, STATUS_MOBIL_BADGE } from "../utils/validators";
import { formatRupiah } from "../utils/format";

export default function CarCard({ mobil }) {
  const unavailable = mobil.status !== "tersedia";

  return (
    <article className="h-full">
      <Link
        to={`/katalog/${mobil.idMobil}`}
        className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft-lg)] ${
          unavailable ? "hover:border-slate-300" : "hover:border-blue-200"
        }`}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
          {mobil.fotoUtama ? (
            <img
              src={mobil.fotoUtama}
              alt={`${mobil.namaMobil} - unit rental mobil Tangerang`}
              className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                unavailable ? "grayscale opacity-60" : ""
              }`}
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-slate-300">
              <ImageOff size={40} />
            </div>
          )}
          <Badge className="absolute left-3 top-3 border border-white/50 bg-white/90 text-slate-900 shadow-sm backdrop-blur-sm">
            {mobil.tahun}
          </Badge>
          <Badge className={`absolute right-3 top-3 border shadow-sm ${STATUS_MOBIL_BADGE[mobil.status]}`}>
            {STATUS_MOBIL_LABEL[mobil.status]}
          </Badge>
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">{mobil.tipe}</p>
          <h3 className="text-lg font-bold text-slate-900">{mobil.namaMobil}</h3>

          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <Users size={16} />
              {mobil.kapasitas} orang
            </span>
            <span className="flex items-center gap-1">
              <Cog size={16} />
              {mobil.transmisi}
            </span>
            <span className="flex items-center gap-1">
              <Fuel size={16} />
              {mobil.bahanBakar}
            </span>
          </div>

          <p className="mt-2 text-lg font-extrabold text-accent-700">
            {formatRupiah(mobil.hargaPerHari)}
            <span className="text-sm font-medium text-slate-500"> /hari</span>
          </p>

          <div className="mt-auto pt-3">
            <span
              className={`flex w-full items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                unavailable
                  ? "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                  : "bg-accent-50 text-accent-700 group-hover:bg-accent-600 group-hover:text-white"
              }`}
            >
              Lihat Detail & Ketersediaan
              <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
