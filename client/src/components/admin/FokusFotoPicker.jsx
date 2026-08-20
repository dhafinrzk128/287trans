import { useEffect, useRef, useState } from "react";
import { RotateCcw, ZoomIn, ZoomOut, Move } from "lucide-react";

const ZOOM_MIN = 1;
const ZOOM_MAX = 4;
const ZOOM_STEP = 0.1;

function parsePosisi(str) {
  const m = /^(-?[\d.]+)% (-?[\d.]+)%$/.exec(str || "");
  return m ? { x: parseFloat(m[1]), y: parseFloat(m[2]) } : { x: 50, y: 50 };
}

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

/**
 * Editor crop untuk satu foto galeri: geser dengan drag, perbesar dengan
 * scroll atau slider.
 *
 * Hasilnya disimpan sebagai object-position + scale, bukan file baru. Karena
 * keduanya relatif terhadap ukuran frame, crop yang diatur di sini tampil
 * sama persis di halaman publik yang lebarnya berbeda — dan file aslinya utuh,
 * jadi bisa diatur ulang kapan saja tanpa kehilangan kualitas.
 *
 * Drag dihitung dari sisa gambar yang tersembunyi di luar frame (overflow):
 * menggeser sejauh seluruh overflow sama dengan menggeser object-position dari
 * 0% ke 100%. Tanpa itu, kecepatan geser akan terasa berbeda-beda tergantung
 * rasio foto dan tingkat zoom.
 */
export default function FokusFotoPicker({ src, value, zoom: zoomProp, onChange, onClose }) {
  const frameRef = useRef(null);
  const imgRef = useRef(null);
  const dragRef = useRef(null);

  const [pos, setPos] = useState(() => parsePosisi(value));
  const [zoom, setZoom] = useState(() => clamp(Number(zoomProp) || 1, ZOOM_MIN, ZOOM_MAX));

  // Kirim ke induk setiap kali berubah supaya pratinjau kartu ikut bergerak;
  // penyimpanan ke server dilakukan induk dengan penundaan.
  useEffect(() => {
    onChange({ posisiFokus: `${pos.x.toFixed(1)}% ${pos.y.toFixed(1)}%`, zoom });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pos.x, pos.y, zoom]);

  // Berapa piksel gambar yang tersembunyi di luar frame, per sumbu.
  function overflow() {
    const frame = frameRef.current;
    const img = imgRef.current;
    if (!frame || !img || !img.naturalWidth) return { x: 0, y: 0 };
    const fw = frame.clientWidth;
    const fh = frame.clientHeight;
    const skala = Math.max(fw / img.naturalWidth, fh / img.naturalHeight) * zoom;
    return {
      x: Math.max(0, img.naturalWidth * skala - fw),
      y: Math.max(0, img.naturalHeight * skala - fh),
    };
  }

  function mulaiDrag(clientX, clientY) {
    dragRef.current = { clientX, clientY, ...pos, ...{ ov: overflow() } };
  }

  function lanjutDrag(clientX, clientY) {
    const d = dragRef.current;
    if (!d) return;
    const dx = clientX - d.clientX;
    const dy = clientY - d.clientY;
    // Menyeret gambar ke kanan berarti menampilkan bagian yang lebih kiri,
    // makanya tandanya dibalik.
    setPos({
      x: d.ov.x ? clamp(d.x - (dx / d.ov.x) * 100, 0, 100) : d.x,
      y: d.ov.y ? clamp(d.y - (dy / d.ov.y) * 100, 0, 100) : d.y,
    });
  }

  function selesaiDrag() {
    dragRef.current = null;
  }

  useEffect(() => {
    function onMove(e) {
      if (!dragRef.current) return;
      e.preventDefault();
      const t = e.touches?.[0];
      lanjutDrag(t ? t.clientX : e.clientX, t ? t.clientY : e.clientY);
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", selesaiDrag);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", selesaiDrag);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", selesaiDrag);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", selesaiDrag);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoom]);

  function onWheel(e) {
    e.preventDefault();
    setZoom((z) => clamp(z + (e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP), ZOOM_MIN, ZOOM_MAX));
  }

  function reset() {
    setPos({ x: 50, y: 50 });
    setZoom(1);
  }

  return (
    <div className="border-t border-slate-200 bg-slate-50 p-3">
      <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-slate-600">
        <Move size={13} />
        Geser untuk memindahkan, scroll untuk zoom
      </p>

      <div
        ref={frameRef}
        onMouseDown={(e) => {
          e.preventDefault();
          mulaiDrag(e.clientX, e.clientY);
        }}
        onTouchStart={(e) => {
          const t = e.touches[0];
          mulaiDrag(t.clientX, t.clientY);
        }}
        onWheel={onWheel}
        className="relative aspect-[16/9] w-full cursor-grab overflow-hidden rounded-xl border border-slate-300 bg-slate-100 active:cursor-grabbing"
      >
        <img
          ref={imgRef}
          src={src}
          alt="Atur crop foto"
          draggable={false}
          className="pointer-events-none h-full w-full select-none object-cover"
          style={{ objectPosition: `${pos.x}% ${pos.y}%`, transform: `scale(${zoom})` }}
        />
        {/* Garis bantu sepertiga, membantu menempatkan mobil tidak tepat di tengah. */}
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute left-1/3 top-0 h-full w-px bg-white" />
          <div className="absolute left-2/3 top-0 h-full w-px bg-white" />
          <div className="absolute left-0 top-1/3 h-px w-full bg-white" />
          <div className="absolute left-0 top-2/3 h-px w-full bg-white" />
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setZoom((z) => clamp(z - ZOOM_STEP, ZOOM_MIN, ZOOM_MAX))}
          className="cursor-pointer rounded-lg border border-slate-200 bg-white p-1.5 text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50"
          aria-label="Perkecil"
        >
          <ZoomOut size={15} />
        </button>
        <input
          type="range"
          min={ZOOM_MIN}
          max={ZOOM_MAX}
          step={0.05}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-slate-200 accent-blue-600"
          aria-label="Tingkat zoom"
        />
        <button
          type="button"
          onClick={() => setZoom((z) => clamp(z + ZOOM_STEP, ZOOM_MIN, ZOOM_MAX))}
          className="cursor-pointer rounded-lg border border-slate-200 bg-white p-1.5 text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50"
          aria-label="Perbesar"
        >
          <ZoomIn size={15} />
        </button>
        <span className="w-10 text-right text-xs tabular-nums text-slate-500">{zoom.toFixed(1)}x</span>
      </div>

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={reset}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50"
        >
          <RotateCcw size={13} />
          Reset
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex-1 cursor-pointer rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-slate-800"
        >
          Selesai
        </button>
      </div>
    </div>
  );
}
