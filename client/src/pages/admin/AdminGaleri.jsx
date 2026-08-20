import { useEffect, useRef, useState } from "react";
import { Upload, Trash2, Eye, EyeOff, ArrowUp, ArrowDown } from "lucide-react";
import api from "../../api/client";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";
import SmartImage from "../../components/SmartImage";

export default function AdminGaleri() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  function load() {
    setLoading(true);
    api
      .get("/galeri/admin/all")
      .then(({ data }) => setItems(data))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  async function handleUpload(ev) {
    const files = [...(ev.target.files || [])];
    if (files.length === 0) return;

    setError("");
    setUploading(true);
    try {
      const formData = new FormData();
      files.forEach((f) => formData.append("fotos", f));
      await api.post("/galeri/admin", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      load();
    } catch (err) {
      setError(err.response?.data?.message || "Gagal mengupload foto. Coba lagi.");
    } finally {
      setUploading(false);
      // Reset supaya memilih file yang sama dua kali tetap memicu onChange.
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function toggleAktif(item) {
    await api.put(`/galeri/admin/${item.id}`, { aktif: !item.aktif });
    load();
  }

  // Tukar nilai urutan dengan tetangganya, lalu muat ulang. Dua request kecil
  // lebih sederhana daripada mengirim ulang seluruh daftar, dan jumlah foto
  // galeri memang tidak banyak.
  async function move(index, arah) {
    const target = index + arah;
    if (target < 0 || target >= items.length) return;
    const a = items[index];
    const b = items[target];
    await Promise.all([
      api.put(`/galeri/admin/${a.id}`, { urutan: b.urutan }),
      api.put(`/galeri/admin/${b.id}`, { urutan: a.urutan }),
    ]);
    load();
  }

  async function handleDelete(item) {
    if (!window.confirm("Hapus foto ini dari galeri?")) return;
    await api.delete(`/galeri/admin/${item.id}`);
    load();
  }

  const aktifCount = items.filter((i) => i.aktif).length;

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Galeri Armada</h1>
          <p className="mt-1 text-slate-500">
            Foto yang tampil di carousel halaman landing iklan. Terpisah dari foto katalog, jadi
            bisa diisi foto pilihan khusus untuk iklan.
          </p>
        </div>
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            className="hidden"
          />
          <Button loading={uploading} onClick={() => fileInputRef.current?.click()}>
            <Upload size={18} />
            Upload Foto
          </Button>
        </div>
      </div>

      {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-700">{error}</p>}

      {!loading && items.length > 0 && (
        <p className="mt-4 text-sm text-slate-500">
          {`${items.length} foto, ${aktifCount} aktif tampil di landing page.`}
        </p>
      )}

      <div className="mt-6">
        {loading ? (
          <Spinner />
        ) : items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center text-sm text-slate-500">
            Belum ada foto galeri. Upload beberapa foto armada untuk ditampilkan di halaman iklan.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => (
              <div
                key={item.id}
                className={`overflow-hidden rounded-2xl border bg-white shadow-[var(--shadow-soft)] transition-shadow duration-200 hover:shadow-[var(--shadow-soft-lg)] ${
                  item.aktif ? "border-slate-200" : "border-slate-200 opacity-60"
                }`}
              >
                <div className="relative aspect-[4/3] w-full bg-slate-100">
                  <SmartImage
                    src={item.urlFoto}
                    alt={item.judul || "Foto galeri armada"}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  {!item.aktif && (
                    <span className="absolute left-3 top-3 rounded-full bg-slate-900/75 px-2.5 py-1 text-xs font-semibold text-white">
                      Disembunyikan
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between gap-2 p-3">
                  <div className="flex gap-1">
                    <button
                      onClick={() => move(i, -1)}
                      disabled={i === 0}
                      className="cursor-pointer rounded-lg p-1.5 text-slate-600 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
                      aria-label="Pindah ke urutan sebelumnya"
                    >
                      <ArrowUp size={15} />
                    </button>
                    <button
                      onClick={() => move(i, 1)}
                      disabled={i === items.length - 1}
                      className="cursor-pointer rounded-lg p-1.5 text-slate-600 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
                      aria-label="Pindah ke urutan berikutnya"
                    >
                      <ArrowDown size={15} />
                    </button>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => toggleAktif(item)}
                      className="cursor-pointer rounded-lg p-1.5 text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-600"
                      aria-label={item.aktif ? "Sembunyikan foto" : "Tampilkan foto"}
                    >
                      {item.aktif ? <Eye size={15} /> : <EyeOff size={15} />}
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="cursor-pointer rounded-lg p-1.5 text-red-600 transition-colors hover:bg-red-50"
                      aria-label="Hapus foto"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
