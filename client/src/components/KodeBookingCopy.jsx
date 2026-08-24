import { useEffect, useState } from "react";
import { Copy, Check } from "lucide-react";

/**
 * Kode booking berikut tombol salin. Kode ini yang disebutkan tim saat
 * menghubungi penyewa, jadi mengetik ulang manual dari layar adalah titik
 * yang gampang salah — apalagi kombinasi huruf dan angka.
 */
export default function KodeBookingCopy({ kode, className = "" }) {
  const [tersalin, setTersalin] = useState(false);

  // Label "Tersalin" kembali normal sendiri; tanpa ini tombolnya terlihat
  // seolah masih dalam keadaan baru saja ditekan.
  useEffect(() => {
    if (!tersalin) return;
    const t = setTimeout(() => setTersalin(false), 2000);
    return () => clearTimeout(t);
  }, [tersalin]);

  // navigator.clipboard butuh konteks aman dan bisa ditolak browser tertentu.
  // Kalau ditolak, dicoba lagi lewat textarea sementara + execCommand: cara
  // lama, tapi jalan di tempat-tempat yang menolak API barunya. Tanpa jalur
  // kedua ini, tombolnya bisa diam tak melakukan apa-apa di sebagian browser.
  function salinCaraLama(teks) {
    const ta = document.createElement("textarea");
    ta.value = teks;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    let berhasil = false;
    try {
      berhasil = document.execCommand("copy");
    } catch {
      berhasil = false;
    }
    document.body.removeChild(ta);
    return berhasil;
  }

  async function salin() {
    try {
      await navigator.clipboard.writeText(kode);
      setTersalin(true);
      return;
    } catch {
      // lanjut ke jalur cadangan
    }
    if (salinCaraLama(kode)) setTersalin(true);
  }

  return (
    <div className={`inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white py-2 pl-4 pr-2 ${className}`}>
      <span className="font-mono text-lg font-bold tracking-wider text-slate-900">{kode}</span>
      <button
        type="button"
        onClick={salin}
        aria-label={tersalin ? "Kode booking tersalin" : "Salin kode booking"}
        className={`inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors ${
          tersalin
            ? "bg-emerald-50 text-emerald-700"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }`}
      >
        {tersalin ? <Check size={14} /> : <Copy size={14} />}
        {tersalin ? "Tersalin" : "Salin"}
      </button>
    </div>
  );
}
