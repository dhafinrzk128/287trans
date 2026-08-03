export default function Badge({ className = "", children }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${className}`}
    >
      {children}
    </span>
  );
}
