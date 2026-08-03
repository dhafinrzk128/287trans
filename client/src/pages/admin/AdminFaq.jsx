import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import api from "../../api/client";
import FormField from "../../components/ui/FormField";
import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";

const EMPTY_FORM = { pertanyaan: "", jawaban: "", urutan: 0 };

export default function AdminFaq() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function load() {
    setLoading(true);
    api.get("/faq/admin/all").then(({ data }) => setItems(data)).finally(() => setLoading(false));
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
    setForm({ pertanyaan: item.pertanyaan, jawaban: item.jawaban, urutan: item.urutan });
    setErrors({});
    setShowForm(true);
  }

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate() {
    const e = {};
    if (!form.pertanyaan.trim()) e.pertanyaan = "Pertanyaan wajib diisi.";
    if (!form.jawaban.trim()) e.jawaban = "Jawaban wajib diisi.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      if (editingId) {
        await api.put(`/faq/admin/${editingId}`, form);
      } else {
        await api.post("/faq/admin", form);
      }
      setShowForm(false);
      load();
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(item) {
    if (!window.confirm("Hapus pertanyaan FAQ ini?")) return;
    await api.delete(`/faq/admin/${item.id}`);
    load();
  }

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Kelola FAQ</h1>
          <p className="mt-1 text-slate-500">Kelola daftar pertanyaan seputar rental yang tampil di halaman Home.</p>
        </div>
        <Button onClick={openCreate}>
          <Plus size={18} />
          Tambah FAQ
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-6 max-w-2xl space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-[var(--shadow-soft)]">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">{editingId ? "Edit FAQ" : "Tambah FAQ"}</h3>
            <button type="button" onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600" aria-label="Tutup form">
              <X size={20} />
            </button>
          </div>

          <FormField label="Pertanyaan" htmlFor="pertanyaan" required error={errors.pertanyaan}>
            <Input id="pertanyaan" value={form.pertanyaan} onChange={(e) => update("pertanyaan", e.target.value)} error={errors.pertanyaan} />
          </FormField>

          <FormField label="Jawaban" htmlFor="jawaban" required error={errors.jawaban}>
            <Textarea id="jawaban" rows={3} value={form.jawaban} onChange={(e) => update("jawaban", e.target.value)} error={errors.jawaban} />
          </FormField>

          <FormField label="Urutan Tampil" htmlFor="urutan" hint="Angka lebih kecil tampil lebih dulu">
            <Input id="urutan" type="number" value={form.urutan} onChange={(e) => update("urutan", Number(e.target.value))} />
          </FormField>

          <div className="flex gap-3 pt-2">
            <Button type="submit" loading={submitting}>Simpan</Button>
            <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>Batal</Button>
          </div>
        </form>
      )}

      <div className="mt-6 space-y-3">
        {loading ? (
          <Spinner />
        ) : items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center text-sm text-slate-500">
            Belum ada FAQ.
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[var(--shadow-soft)] transition-shadow duration-200 hover:shadow-[var(--shadow-soft-lg)]">
              <div className="flex items-start justify-between gap-3">
                <p className="font-semibold text-slate-900">{item.pertanyaan}</p>
                <div className="flex shrink-0 gap-1">
                  <button onClick={() => openEdit(item)} className="cursor-pointer rounded-lg p-1.5 text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-600" aria-label="Edit FAQ">
                    <Pencil size={15} />
                  </button>
                  <button onClick={() => handleDelete(item)} className="cursor-pointer rounded-lg p-1.5 text-red-600 transition-colors hover:bg-red-50" aria-label="Hapus FAQ">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.jawaban}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
