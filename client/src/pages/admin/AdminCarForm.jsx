import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { X, ImagePlus } from "lucide-react";
import api from "../../api/client";
import FormField from "../../components/ui/FormField";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Textarea from "../../components/ui/Textarea";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";
import { STATUS_MOBIL_LABEL, BAHAN_BAKAR_OPTIONS } from "../../utils/validators";

const INITIAL_FORM = {
  namaMobil: "",
  tipe: "",
  transmisi: "Manual",
  bahanBakar: "Bensin",
  kapasitas: "",
  hargaPerHari: "",
  deskripsi: "",
  status: "tersedia",
};

export default function AdminCarForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(INITIAL_FORM);
  const [existingFotos, setExistingFotos] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    if (!isEdit) return;
    api.get(`/mobil/${id}`).then(({ data }) => {
      setForm({
        namaMobil: data.namaMobil,
        tipe: data.tipe,
        transmisi: data.transmisi,
        bahanBakar: data.bahanBakar,
        kapasitas: data.kapasitas,
        hargaPerHari: data.hargaPerHari,
        deskripsi: data.deskripsi,
        status: data.status,
      });
      setExistingFotos(data.fotos);
      setLoading(false);
    });
  }, [id, isEdit]);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleFilesChange(ev) {
    const files = Array.from(ev.target.files || []);
    setNewFiles((prev) => [...prev, ...files]);
    ev.target.value = "";
  }

  function removeNewFile(idx) {
    setNewFiles((prev) => prev.filter((_, i) => i !== idx));
  }

  async function removeExistingFoto(idFoto) {
    if (!window.confirm("Hapus foto ini?")) return;
    await api.delete(`/mobil/admin/foto/${idFoto}`);
    setExistingFotos((prev) => prev.filter((f) => f.idFoto !== idFoto));
  }

  function validate() {
    const e = {};
    if (!form.namaMobil.trim()) e.namaMobil = "Nama mobil wajib diisi.";
    if (!form.tipe.trim()) e.tipe = "Tipe mobil wajib diisi.";
    if (!form.kapasitas || Number(form.kapasitas) <= 0) e.kapasitas = "Kapasitas wajib diisi.";
    if (!form.hargaPerHari || Number(form.hargaPerHari) <= 0) e.hargaPerHari = "Harga per hari wajib diisi.";
    if (!form.deskripsi.trim()) e.deskripsi = "Deskripsi wajib diisi.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    setServerError("");
    if (!validate()) return;
    setSubmitting(true);

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    newFiles.forEach((file) => formData.append("fotos", file));

    try {
      if (isEdit) {
        await api.put(`/mobil/admin/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
      } else {
        await api.post("/mobil/admin", formData, { headers: { "Content-Type": "multipart/form-data" } });
      }
      navigate("/admin/mobil");
    } catch (err) {
      setServerError(err.response?.data?.message || "Gagal menyimpan data mobil.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <Spinner />;

  return (
    <div>
      <nav className="mb-4 text-sm text-slate-500">
        <Link to="/admin/mobil" className="transition-colors hover:text-blue-600">Kelola Mobil</Link> /{" "}
        <span className="text-slate-700">{isEdit ? "Edit Mobil" : "Tambah Mobil"}</span>
      </nav>
      <h1 className="text-2xl font-extrabold text-slate-900">{isEdit ? "Edit Mobil" : "Tambah Mobil Baru"}</h1>

      <form onSubmit={handleSubmit} className="mt-6 max-w-3xl space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-[var(--shadow-soft)]">
        {serverError && <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700">{serverError}</p>}

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Nama Mobil" htmlFor="namaMobil" required error={errors.namaMobil}>
            <Input id="namaMobil" value={form.namaMobil} onChange={(e) => update("namaMobil", e.target.value)} error={errors.namaMobil} />
          </FormField>
          <FormField label="Tipe" htmlFor="tipe" required error={errors.tipe} hint="Contoh: MPV, SUV, City Car">
            <Input id="tipe" value={form.tipe} onChange={(e) => update("tipe", e.target.value)} error={errors.tipe} />
          </FormField>
          <FormField label="Transmisi" htmlFor="transmisi" required>
            <Select id="transmisi" value={form.transmisi} onChange={(e) => update("transmisi", e.target.value)}>
              <option value="Manual">Manual</option>
              <option value="Matic">Matic</option>
            </Select>
          </FormField>
          <FormField label="Bahan Bakar" htmlFor="bahanBakar" required>
            <Select id="bahanBakar" value={form.bahanBakar} onChange={(e) => update("bahanBakar", e.target.value)}>
              {BAHAN_BAKAR_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </Select>
          </FormField>
          <FormField label="Kapasitas (orang)" htmlFor="kapasitas" required error={errors.kapasitas}>
            <Input id="kapasitas" type="number" min="1" value={form.kapasitas} onChange={(e) => update("kapasitas", e.target.value)} error={errors.kapasitas} />
          </FormField>
          <FormField label="Harga per Hari (Rp)" htmlFor="hargaPerHari" required error={errors.hargaPerHari}>
            <Input id="hargaPerHari" type="number" min="0" value={form.hargaPerHari} onChange={(e) => update("hargaPerHari", e.target.value)} error={errors.hargaPerHari} />
          </FormField>
          <FormField label="Status" htmlFor="status" required>
            <Select id="status" value={form.status} onChange={(e) => update("status", e.target.value)}>
              {Object.entries(STATUS_MOBIL_LABEL).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </Select>
          </FormField>
        </div>

        <FormField label="Deskripsi" htmlFor="deskripsi" required error={errors.deskripsi}>
          <Textarea id="deskripsi" rows={4} value={form.deskripsi} onChange={(e) => update("deskripsi", e.target.value)} error={errors.deskripsi} />
        </FormField>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Foto Mobil</label>

          {existingFotos.length > 0 && (
            <div className="mb-3 grid grid-cols-3 gap-3 sm:grid-cols-5">
              {existingFotos.map((foto) => (
                <div key={foto.idFoto} className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200">
                  <img src={foto.urlFoto} alt="" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeExistingFoto(foto.idFoto)}
                    className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                    aria-label="Hapus foto"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {newFiles.length > 0 && (
            <div className="mb-3 grid grid-cols-3 gap-3 sm:grid-cols-5">
              {newFiles.map((file, idx) => (
                <div key={idx} className="group relative aspect-square overflow-hidden rounded-xl border border-blue-300">
                  <img src={URL.createObjectURL(file)} alt="" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeNewFile(idx)}
                    className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                    aria-label="Batalkan foto"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <label
            htmlFor="fotos"
            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 px-4 py-4 text-sm font-medium text-slate-600 transition-colors hover:border-blue-400 hover:bg-blue-50/40"
          >
            <ImagePlus size={18} />
            Tambah Foto
            <input id="fotos" type="file" accept="image/*" multiple className="hidden" onChange={handleFilesChange} />
          </label>
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit" loading={submitting}>Simpan</Button>
          <Button type="button" variant="secondary" onClick={() => navigate("/admin/mobil")}>Batal</Button>
        </div>
      </form>
    </div>
  );
}
