export default function FormField({ label, htmlFor, error, required, hint, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={htmlFor} className="text-sm font-medium text-slate-700">
          {label}
          {required && <span className="text-red-600"> *</span>}
        </label>
      )}
      {children}
      {hint && !error && <p className="text-xs text-slate-500">{hint}</p>}
      {error && <p className="text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}

const baseInputClass =
  "w-full rounded-xl border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-blue-600 focus:ring-4 focus:ring-blue-100";

export function inputClassName(hasError) {
  return `${baseInputClass} ${hasError ? "border-red-400" : "border-slate-300"}`;
}
