export default function StatCard({ icon: Icon, label, value, accent = "blue" }) {
  const accents = {
    blue: "bg-blue-50 text-blue-700",
    orange: "bg-accent-50 text-accent-700",
    emerald: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    slate: "bg-slate-100 text-slate-700",
    red: "bg-red-50 text-red-700",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[var(--shadow-soft)] transition-shadow duration-200 hover:shadow-[var(--shadow-soft-lg)]">
      <div className="flex items-center gap-3">
        <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${accents[accent]}`}>
          <Icon size={22} />
        </span>
        <div>
          <p className="text-2xl font-extrabold text-slate-900">{value}</p>
          <p className="text-sm text-slate-500">{label}</p>
        </div>
      </div>
    </div>
  );
}
