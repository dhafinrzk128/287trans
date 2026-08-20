import SmartImage from "../SmartImage";

// Sembilan titik yang menutupi hampir semua kebutuhan: geser ke atas kalau
// mobil duduk di bawah frame, ke samping kalau agak minggir, dan seterusnya.
const TITIK = [
  { label: "Kiri atas", value: "0% 0%" },
  { label: "Atas", value: "50% 0%" },
  { label: "Kanan atas", value: "100% 0%" },
  { label: "Kiri", value: "0% 50%" },
  { label: "Tengah", value: "50% 50%" },
  { label: "Kanan", value: "100% 50%" },
  { label: "Kiri bawah", value: "0% 100%" },
  { label: "Bawah", value: "50% 100%" },
  { label: "Kanan bawah", value: "100% 100%" },
];

/**
 * Pratinjau memakai rasio dan object-fit yang sama persis dengan slider di
 * halaman landing, jadi yang terlihat di sini benar-benar yang akan tampil
 * ke pengunjung.
 */
export default function FokusFotoPicker({ src, value, onChange, onClose }) {
  return (
    <div className="border-t border-slate-200 bg-slate-50 p-3">
      <p className="mb-2 text-xs font-semibold text-slate-600">
        Pilih bagian foto yang ditampilkan
      </p>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
        <div className="aspect-[16/9] w-full">
          <SmartImage
            src={src}
            alt="Pratinjau tampilan foto di halaman landing"
            className="h-full w-full object-cover transition-[object-position] duration-200"
            style={{ objectPosition: value }}
          />
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-1.5">
        {TITIK.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => onChange(t.value)}
            aria-pressed={value === t.value}
            title={t.label}
            className={`cursor-pointer rounded-lg border px-2 py-1.5 text-[11px] font-medium transition-colors ${
              value === t.value
                ? "border-blue-600 bg-blue-50 text-blue-700"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={onClose}
        className="mt-3 w-full cursor-pointer rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-slate-800"
      >
        Selesai
      </button>
    </div>
  );
}
