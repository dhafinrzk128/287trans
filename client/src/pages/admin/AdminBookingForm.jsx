import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Users } from "lucide-react";
import api from "../../api/client";
import FormField from "../../components/ui/FormField";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Textarea from "../../components/ui/Textarea";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";
import { isValidHp } from "../../utils/validators";
import { STATUS_MOBIL_LABEL, STATUS_BOOKING_LABEL } from "../../utils/validators";
import { toDateInputValue } from "../../utils/format";

const ESTIMASI_HARI_OPTIONS = [
  { value: 1, label: "1 Hari" },
  { value: 2, label: "2 Hari" },
  { value: 3, label: "3 Hari" },
  { value: 4, label: "4 Hari" },
  { value: 5, label: "5 Hari" },
  { value: 6, label: "6 Hari" },
  { value: 7, label: "1 Minggu (7 Hari)" },
  { value: 14, label: "2 Minggu (14 Hari)" },
  { value: 30, label: "1 Bulan (30 Hari)" },
];

const INITIAL_FORM = {
  idMobil: "",
  namaCustomer: "",
  noHp: "",
  tglAmbil: toDateInputValue(new Date()),
  estimasiHari: 1,
  denganSopir: false,
  statusBooking: "dikonfirmasi",
  catatan: "",
};

export default function AdminBookingForm() {
  const navigate = useNavigate();
  const [mobils, setMobils] = useState([]);
  const [loadingMobils, setLoadingMobils] = useState(true);
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    api.get("/mobil/admin/all").then(({ data }) => setMobils(data)).finally(() => setLoadingMobils(false));
  }, []);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate() {
    const e = {};
    if (!form.idMobil) e.idMobil = "Pilih mobil yang dibooking.";
    if (!form.namaCustomer.trim()) e.namaCustomer = "Nama customer wajib diisi.";
    if (!form.noHp.trim()) e.noHp = "Nomor HP wajib diisi.";
    else if (!isValidHp(form.noHp)) e.noHp = "Format nomor HP tidak valid (contoh: 081234567890).";
    if (!form.tglAmbil) e.tglAmbil = "Tanggal mulai sewa wajib diisi.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    setServerError("");
    if (!validate()) return;
    setSubmitting(true);
    try {
      const { data } = await api.post("/booking/admin", {
        idMobil: form.idMobil,
        namaCustomer: form.namaCustomer,
        noHp: form.noHp,
        tglAmbil: new Date(form.tglAmbil).toISOString(),
        estimasiHari: form.estimasiHari,
        denganSopir: form.denganSopir,
        statusBooking: form.statusBooking,
        catatan: form.catatan,
      });
      navigate(`/admin/booking/${data.idBooking}`);
    } catch (err) {
      setServerError(err.response?.data?.message || "Gagal menyimpan booking.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loadingMobils) return <Spinner />;

  return (
    <div>
      <nav className="mb-4 text-sm text-slate-500">
        <Link to="/admin/booking" className="transition-colors hover:text-blue-600">Kelola Booking</Link> /{" "}
        <span className="text-slate-700">Tambah Booking Manual</span>
      </nav>
      <h1 className="text-2xl font-extrabold text-slate-900">Tambah Booking Manual</h1>
      <p className="mt-1 text-slate-500">Catat pesanan yang masuk lewat WhatsApp atau telepon langsung di sini.</p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 max-w-3xl space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-[var(--shadow-soft)]">
        {serverError && <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700">{serverError}</p>}

        <FormField label="Mobil" htmlFor="idMobil" required error={errors.idMobil}>
          <Select id="idMobil" value={form.idMobil} onChange={(e) => update("idMobil", e.target.value)} error={errors.idMobil}>
            <option value="">Pilih mobil...</option>
            {mobils.map((m) => (
              <option key={m.idMobil} value={m.idMobil}>
                {m.namaMobil} ({STATUS_MOBIL_LABEL[m.status]})
              </option>
            ))}
          </Select>
        </FormField>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Nama Customer" htmlFor="namaCustomer" required error={errors.namaCustomer}>
            <Input id="namaCustomer" value={form.namaCustomer} onChange={(e) => update("namaCustomer", e.target.value)} error={errors.namaCustomer} />
          </FormField>
          <FormField label="Nomor HP" htmlFor="noHp" required error={errors.noHp} hint="Contoh: 081234567890">
            <Input id="noHp" value={form.noHp} onChange={(e) => update("noHp", e.target.value)} error={errors.noHp} />
          </FormField>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Tanggal Mulai Sewa" htmlFor="tglAmbil" required error={errors.tglAmbil}>
            <Input id="tglAmbil" type="date" value={form.tglAmbil} onChange={(e) => update("tglAmbil", e.target.value)} error={errors.tglAmbil} />
          </FormField>
          <FormField label="Estimasi Lama Sewa" htmlFor="estimasiHari" required>
            <Select id="estimasiHari" value={form.estimasiHari} onChange={(e) => update("estimasiHari", Number(e.target.value))}>
              {ESTIMASI_HARI_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </Select>
          </FormField>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Opsi Sewa</label>
          <div className="grid grid-cols-2 gap-3 sm:w-fit sm:grid-cols-2">
            <button
              type="button"
              onClick={() => update("denganSopir", false)}
              className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                !form.denganSopir ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              <User size={16} />
              Lepas Kunci
            </button>
            <button
              type="button"
              onClick={() => update("denganSopir", true)}
              className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                form.denganSopir ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              <Users size={16} />
              Dengan Sopir
            </button>
          </div>
        </div>

        <FormField label="Status Booking" htmlFor="statusBooking" required hint="Sesuaikan dengan kesepakatan yang sudah dikonfirmasi ke customer.">
          <Select id="statusBooking" value={form.statusBooking} onChange={(e) => update("statusBooking", e.target.value)}>
            {Object.entries(STATUS_BOOKING_LABEL).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </Select>
        </FormField>

        <FormField label="Catatan" htmlFor="catatan" hint="Opsional, contoh: minta dijemput di terminal, dsb.">
          <Textarea id="catatan" rows={3} value={form.catatan} onChange={(e) => update("catatan", e.target.value)} />
        </FormField>

        <div className="flex gap-3 pt-2">
          <Button type="submit" loading={submitting}>Simpan Booking</Button>
          <Button type="button" variant="secondary" onClick={() => navigate("/admin/booking")}>Batal</Button>
        </div>
      </form>
    </div>
  );
}
