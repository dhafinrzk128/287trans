import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Star, X } from "lucide-react";
import api from "../../api/client";
import FormField from "../../components/ui/FormField";
import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";

const EMPTY_FORM = { nama: "", kota: "", pesan: "", rating: 5, urutan: 0 };

export default function AdminTestimoni() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function load() {
    setLoading(true);
    api.get("/testimoni/admin/all").then(({ data }) => setItems(data)).finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  function openCreate() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setShowForm(true);
  }

  function openEdit(item) {
    setEditingId(item.id);
    setForm({ nama: item.nama, kota: item.kota, pesan: item.pesan, rating: item.rating, urutan: item.urutan });
    setErrors({});
    setShowForm(true);
  }

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate() {
    const e = {};
    if (!form.nama.trim()) e.nama = "Nama wajib diisi.";
    if (!form.kota.trim()) e.kota = "Kota wajib diisi.";
    if (!form.pesan.trim()) e.pesan = "Isi testimoni wajib diisi.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      if (editingId) {
        await api.put(`/testimoni/admin/${editingId}`, form);
      } else {
        await api.post("/testimoni/admin", form);
      }
      setShowForm(false);
      load();
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(item) {
    if (!window.confirm(`Hapus testimoni dari "${item.nama}"?`)) return;
    await api.delete(`/testimoni/admin/${item.id}`);
    load();
  }

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Kelola Testimoni</h1>
          <p className="mt-1 text-slate-500">Kelola testimoni pelanggan yang tampil di halaman Home.</p>
        </div>
        <Button onClick={openCreate}>
          <Plus size={18} />
          Tambah Testimoni
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} noValidate className="mt-6 max-w-2xl space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-[var(--shadow-soft)]">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">{editingId ? "Edit Testimoni" : "Tambah Testimoni"}</h3>
            <button type="button" onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600" aria-label="Tutup form">
              <X size={20} />
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Nama Pelanggan" htmlFor="nama" required error={errors.nama}>
              <Input id="nama" value={form.nama} onChange={(e) => update("nama", e.target.value)} error={errors.nama} />
            </FormField>
            <FormField label="Kota / Asal" htmlFor="kota" required error={errors.kota}>
              <Input id="kota" value={form.kota} onChange={(e) => update("kota", e.target.value)} error={errors.kota} />
            </FormField>
          </div>

          <FormField label="Isi Testimoni" htmlFor="pesan" required error={errors.pesan}>
            <Textarea id="pesan" rows={3} value={form.pesan} onChange={(e) => update("pesan", e.target.value)} error={errors.pesan} />
          </FormField>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Rating" htmlFor="rating" required>
              <Select id="rating" value={form.rating} onChange={(e) => update("rating", Number(e.target.value))}>
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>{r} Bintang</option>
                ))}
              </Select>
            </FormField>
            <FormField label="Urutan Tampil" htmlFor="urutan" hint="Angka lebih kecil tampil lebih dulu">
              <Input id="urutan" type="number" value={form.urutan} onChange={(e) => update("urutan", Number(e.target.value))} />
            </FormField>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" loading={submitting}>Simpan</Button>
            <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>Batal</Button>
          </div>
        </form>
      )}

      <div className="mt-6">
        {loading ? (
          <Spinner />
        ) : items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center text-sm text-slate-500">
            Belum ada testimoni.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((item) => (
              <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[var(--shadow-soft)] transition-shadow duration-200 hover:shadow-[var(--shadow-soft-lg)]">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} fill={i < item.rating ? "currentColor" : "none"} className={i < item.rating ? "" : "text-slate-300"} />
                    ))}
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(item)} className="cursor-pointer rounded-lg p-1.5 text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-600" aria-label="Edit testimoni">
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => handleDelete(item)} className="cursor-pointer rounded-lg p-1.5 text-red-600 transition-colors hover:bg-red-50" aria-label="Hapus testimoni">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">&ldquo;{item.pesan}&rdquo;</p>
                <p className="mt-3 text-sm font-bold text-slate-900">{item.nama}</p>
                <p className="text-xs text-slate-500">{item.kota}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
