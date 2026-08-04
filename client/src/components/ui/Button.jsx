const VARIANTS = {
  primary:
    "btn-glow-brand bg-blue-600 text-white shadow-[var(--shadow-brand)] hover:bg-blue-700 focus-visible:outline-blue-600",
  accent:
    "btn-glow-accent bg-accent-600 text-white shadow-sm hover:bg-accent-700 focus-visible:outline-accent-600",
  secondary:
    "bg-white text-blue-700 border border-blue-200 hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-blue-600",
  dark: "bg-slate-900 text-white hover:bg-slate-800 focus-visible:outline-slate-900",
  danger: "btn-glow-danger bg-red-600 text-white hover:bg-red-700 focus-visible:outline-red-600",
  ghost: "text-slate-700 hover:bg-slate-100 focus-visible:outline-slate-400",
};

const SIZES = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  loading = false,
  disabled = false,
  children,
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200
        hover:-translate-y-0.5 active:translate-y-0 disabled:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:translate-y-0
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer
        ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  );
}
