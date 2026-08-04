import { useLayoutEffect, useRef, useState } from "react";

export default function TipeToggle({ tipeList, value, onChange }) {
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false });
  const btnRefs = useRef(new Map());

  const options = ["", ...tipeList];

  useLayoutEffect(() => {
    const btn = btnRefs.current.get(value);
    if (btn) {
      setIndicator({ left: btn.offsetLeft, width: btn.offsetWidth, visible: true });
    } else {
      setIndicator((prev) => ({ ...prev, visible: false }));
    }
  }, [value, options.join("|")]);

  return (
    <div className="scrollbar-none relative flex flex-nowrap gap-1 overflow-x-auto rounded-xl bg-slate-100 p-1.5">
      {indicator.visible && (
        <div
          className="absolute top-1.5 bottom-1.5 rounded-lg bg-white shadow-sm transition-[left,width] duration-300 ease-out"
          style={{ left: indicator.left, width: indicator.width }}
        />
      )}
      {options.map((t) => (
        <button
          key={t || "semua"}
          type="button"
          ref={(el) => {
            if (el) btnRefs.current.set(t, el);
            else btnRefs.current.delete(t);
          }}
          onClick={() => onChange(t)}
          className={`relative z-10 shrink-0 cursor-pointer rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
            value === t ? "text-blue-700" : "text-slate-600 hover:text-slate-900"
          }`}
        >
          {t || "Semua"}
        </button>
      ))}
    </div>
  );
}
