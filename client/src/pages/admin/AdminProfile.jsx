import { useEffect, useState } from "react";
import { Plus, Trash2, CheckCircle2 } from "lucide-react";
import api from "../../api/client";
import { useCompanyProfile } from "../../context/CompanyProfileContext";
import FormField from "../../components/ui/FormField";
import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";

export default function AdminProfile() {
  const { profile, loading, refresh } = useCompanyProfile();
  const [form, setForm] = useState(null);
  const [fotoFile, setFotoFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (profile) setForm({ ...profile, keunggulan: profile.keunggulan || [] });
  }, [profile]);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function updateKeunggulan(idx, field, value) {
    setForm((f) => {
      const next = [...f.keunggulan];
      next[idx] = { ...next[idx], [field]: value };
      return { ...f, keunggulan: next };
    });
  }

  function addKeunggulan() {
    setForm((f) => ({ ...f, keunggulan: [...f.keunggulan, { judul: "", deskripsi: "" }] }));
  }

  function removeKeunggulan(idx) {
    setForm((f) => ({ ...f, keunggulan: f.keunggulan.filter((_, i) => i !== idx) }));
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    setError("");
    setSuccess(false);
    setSubmitting(true);

    const formData = new FormData();
    formData.append("namaPerusahaan", form.namaPerusahaan);
    formData.append("deskripsi", form.deskripsi);
    formData.append("alamat", form.alamat);
    formData.append("mapsEmbedUrl", form.mapsEmbedUrl || "");
    formData.append("telepon", form.telepon);
    formData.append("whatsapp", form.whatsapp);
    formData.append("email", form.email);
    formData.append("keunggulan", JSON.stringify(form.keunggulan));
    if (fotoFile) formData.append("foto", fotoFile);

    try {
      await api.put("/profile/admin", formData, { headers: { "Content-Type": "multipart/form-data" } });
      await refresh();
      setSuccess(true);
      setFotoFile(null);
    } catch (err) {
      setError(err.response?.data?.message || "Gagal menyimpan company profile.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading || !form) return <Spinner />;

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-slate-900">Kelola Company Profile</h1>
      <p className="mt-1 text-slate-500">Edit konten yang tampil di halaman Tentang Kami.</p>

      <form onSubmit={handleSubmit} className="mt-6 max-w-3xl space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-[var(--shadow-soft)]">
        {error && <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700">{error}</p>}
        {success && (
          <p className="flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-2.5 text-sm text-emerald-700">
            <CheckCircle2 size={16} /> Perubahan berhasil disimpan.
          </p>
        )}

        <FormField label="Nama Perusahaan" htmlFor="namaPerusahaan" required>
          <Input id="namaPerusahaan" value={form.namaPerusahaan} onChange={(e) => update("namaPerusahaan", e.target.value)} />
        </FormField>

        <FormField label="Deskripsi Perusahaan" htmlFor="deskripsi" required>
          <Textarea id="deskripsi" rows={5} value={form.deskripsi} onChange={(e) => update("deskripsi", e.target.value)} />
        </FormField>

        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700">Keunggulan / Value Proposition</label>
            <button type="button" onClick={addKeunggulan} className="flex cursor-pointer items-center gap-1 text-sm font-semibold text-blue-600 hover:underline">
              <Plus size={16} /> Tambah
            </button>
          </div>
          <div className="mt-3 space-y-3">
            {form.keunggulan.map((item, idx) => (
              <div key={idx} className="flex gap-2 rounded-xl border border-slate-200 p-3">
                <div className="flex-1 space-y-2">
                  <Input placeholder="Judul keunggulan" value={item.judul} onChange={(e) => updateKeunggulan(idx, "judul", e.target.value)} />
                  <Textarea placeholder="Deskripsi singkat" rows={2} value={item.deskripsi} onChange={(e) => updateKeunggulan(idx, "deskripsi", e.target.value)} />
                </div>
                <button type="button" onClick={() => removeKeunggulan(idx)} className="h-fit cursor-pointer rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50" aria-label="Hapus keunggulan">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <FormField label="Alamat" htmlFor="alamat" required>
          <Textarea id="alamat" rows={2} value={form.alamat} onChange={(e) => update("alamat", e.target.value)} />
        </FormField>

        <FormField label="URL Embed Google Maps" htmlFor="mapsEmbedUrl" hint="Salin dari tombol 'Bagikan > Sematkan peta' di Google Maps (ambil src iframe-nya)">
          <Input id="mapsEmbedUrl" value={form.mapsEmbedUrl || ""} onChange={(e) => update("mapsEmbedUrl", e.target.value)} />
        </FormField>

        <div className="grid gap-5 sm:grid-cols-3">
          <FormField label="Telepon" htmlFor="telepon" required>
            <Input id="telepon" value={form.telepon} onChange={(e) => update("telepon", e.target.value)} />
          </FormField>
          <FormField label="WhatsApp" htmlFor="whatsapp" required hint="Format: 62812xxxxxxx">
            <Input id="whatsapp" value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} />
          </FormField>
          <FormField label="Email" htmlFor="email" required>
            <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} />
          </FormField>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Foto Perusahaan</label>
          <div className="flex items-center gap-4">
            <div className="h-24 w-32 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
              <img src={fotoFile ? URL.createObjectURL(fotoFile) : form.fotoUrl} alt="" className="h-full w-full object-cover" />
            </div>
            <label htmlFor="foto" className="cursor-pointer rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50">
              Ganti Foto
              <input id="foto" type="file" accept="image/*" className="hidden" onChange={(e) => setFotoFile(e.target.files?.[0] || null)} />
            </label>
          </div>
        </div>

        <Button type="submit" loading={submitting}>Simpan Perubahan</Button>
      </form>
    </div>
  );
}
