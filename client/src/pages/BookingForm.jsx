import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import KalenderTertunda from "../components/KalenderTertunda";
import { User, Users, MessageCircle } from "lucide-react";
import api from "../api/client";
import { useCompanyProfile } from "../context/CompanyProfileContext";
import Spinner from "../components/ui/Spinner";
import FormField from "../components/ui/FormField";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Textarea from "../components/ui/Textarea";
import Button from "../components/ui/Button";
import SmartImage from "../components/SmartImage";
import { formatTanggal, formatRupiah, buildWaLink } from "../utils/format";
import { trackWhatsAppClick, trackBookingSubmit } from "../utils/tracking";
import { isValidHp } from "../utils/validators";
import Seo from "../components/Seo";

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

const INITIAL_FORM = { namaCustomer: "", noHp: "", estimasiHari: 1, denganSopir: false, catatan: "" };

export default function BookingForm() {
  const { idMobil } = useParams();
  const navigate = useNavigate();
  const { profile } = useCompanyProfile();

  const [mobil, setMobil] = useState(null);
  const [bookedRanges, setBookedRanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tglMulai, setTglMulai] = useState(undefined);
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    setLoading(true);
    Promise.all([api.get(`/mobil/${idMobil}`), api.get(`/mobil/${idMobil}/booked-ranges`)])
      .then(([mobilRes, rangesRes]) => {
        setMobil(mobilRes.data);
        setBookedRanges(rangesRes.data.map((r) => ({ from: new Date(r.tglAmbil), to: new Date(r.tglKembali) })));
      })
      .finally(() => setLoading(false));
  }, [idMobil]);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  const tglSelesaiEstimasi = tglMulai ? new Date(tglMulai.getTime() + form.estimasiHari * 24 * 60 * 60 * 1000) : null;
  const estimasiTotal = mobil ? mobil.hargaPerHari * form.estimasiHari : 0;

  function validate() {
    const e = {};
    if (!form.namaCustomer.trim()) e.namaCustomer = "Nama lengkap wajib diisi.";
    if (!form.noHp.trim()) e.noHp = "Nomor HP wajib diisi.";
    else if (!isValidHp(form.noHp)) e.noHp = "Format nomor HP tidak valid (contoh: 081234567890).";
    if (!tglMulai) e.tglMulai = "Pilih tanggal mulai sewa.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    setServerError("");
    if (!validate()) return;
    setSubmitting(true);
    try {
      const { data } = await api.post("/booking", {
        idMobil: mobil.idMobil,
        namaCustomer: form.namaCustomer,
        noHp: form.noHp,
        tglAmbil: tglMulai.toISOString(),
        estimasiHari: form.estimasiHari,
        denganSopir: form.denganSopir,
        catatan: form.catatan,
      });
      trackBookingSubmit(mobil.namaMobil);
      // Penanda "baru saja dibuat" dikirim lewat state navigasi, bukan URL,
      // supaya notifikasi keberhasilan hanya muncul sekali. Kalau penyewa
      // membuka lagi tautan status yang sama nanti, yang tampil status
      // biasa — bukan ucapan selamat untuk booking yang sudah lama lewat.
      navigate(`/status/${data.kodeBooking}`, { state: { baruDibuat: true } });
    } catch (err) {
      setServerError(err.response?.data?.message || "Gagal mengirim permintaan booking. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <Spinner />;
  if (!mobil) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const waMessage = `Halo, saya ingin menanyakan ketersediaan mobil ${mobil.namaMobil} untuk disewa.`;
  const waLink = profile?.whatsapp ? buildWaLink(profile.whatsapp, waMessage) : null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Seo
        title={`Booking ${mobil.namaMobil}`}
        description={`Ajukan permintaan booking sewa ${mobil.namaMobil} di 287 Trans.`}
        path={`/booking/${mobil.idMobil}`}
        noindex
      />
      <nav className="mb-6 text-sm text-slate-500">
        <Link to="/katalog" className="transition-colors hover:text-blue-600">Katalog Mobil</Link>
        {" / "}
        <Link to={`/katalog/${mobil.idMobil}`} className="transition-colors hover:text-blue-600">{mobil.namaMobil}</Link>
        {" / "}
        <span className="text-slate-700">Permintaan Booking</span>
      </nav>

      <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">Ajukan Permintaan Booking</h1>
      <p className="mt-2 text-slate-600">
        Isi data berikut untuk {mobil.namaMobil}. Tim kami akan menghubungi Anda melalui nomor HP yang didaftarkan untuk konfirmasi.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <form onSubmit={handleSubmit} noValidate className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-[var(--shadow-soft)] lg:col-span-2">
          {serverError && <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700">{serverError}</p>}

          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="Nama Lengkap" htmlFor="namaCustomer" required error={errors.namaCustomer}>
              <Input id="namaCustomer" value={form.namaCustomer} onChange={(e) => update("namaCustomer", e.target.value)} error={errors.namaCustomer} />
            </FormField>
            <FormField label="Nomor HP" htmlFor="noHp" required error={errors.noHp} hint="Contoh: 081234567890">
              <Input id="noHp" value={form.noHp} onChange={(e) => update("noHp", e.target.value)} error={errors.noHp} />
            </FormField>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Tanggal Mulai Sewa <span className="text-red-600">*</span>
              </label>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 p-3">
                <KalenderTertunda
                  mode="single"
                  selected={tglMulai}
                  onSelect={setTglMulai}
                  disabled={[{ before: today }, ...bookedRanges]}
                  modifiers={{ booked: bookedRanges }}
                  modifiersClassNames={{ booked: "rdp-booked" }}
                  startMonth={today}
                />
              </div>
              {errors.tglMulai && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.tglMulai}</p>}
            </div>

            <div className="space-y-5">
              <FormField label="Estimasi Lama Sewa" htmlFor="estimasiHari" required>
                <Select id="estimasiHari" value={form.estimasiHari} onChange={(e) => update("estimasiHari", Number(e.target.value))}>
                  {ESTIMASI_HARI_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </Select>
              </FormField>

              {tglMulai && (
                <div className="rounded-xl bg-blue-50/60 p-3 text-sm text-slate-600">
                  <p>Mulai: <span className="font-medium text-slate-900">{formatTanggal(tglMulai)}</span></p>
                  <p className="mt-1">Estimasi selesai: <span className="font-medium text-slate-900">{formatTanggal(tglSelesaiEstimasi)}</span></p>
                </div>
              )}

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Opsi Sewa</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => update("denganSopir", false)}
                    className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 px-3 py-2.5 text-xs font-semibold transition-all duration-200 sm:text-sm ${
                      !form.denganSopir ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    <User size={16} />
                    Lepas Kunci
                  </button>
                  <button
                    type="button"
                    onClick={() => update("denganSopir", true)}
                    className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 px-3 py-2.5 text-xs font-semibold transition-all duration-200 sm:text-sm ${
                      form.denganSopir ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    <Users size={16} />
                    Dengan Sopir
                  </button>
                </div>
              </div>
            </div>
          </div>

          <FormField label="Catatan Tambahan" htmlFor="catatan" hint="Opsional, contoh: minta dijemput di terminal, butuh child seat, dsb.">
            <Textarea id="catatan" rows={2} value={form.catatan} onChange={(e) => update("catatan", e.target.value)} />
          </FormField>

          <Button type="submit" variant="accent" size="lg" loading={submitting} className="w-full">
            Kirim Permintaan Booking
          </Button>
        </form>

        <div className="h-fit space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[var(--shadow-soft)]">
            <h2 className="text-base font-bold text-slate-900">Mobil yang Dipilih</h2>
            <div className="mt-4 flex items-center gap-3">
              {mobil.fotoUtama && <SmartImage src={mobil.fotoUtama} alt={mobil.namaMobil} className="h-16 w-20 rounded-xl object-cover" />}
              <div>
                <p className="font-semibold text-slate-900">{mobil.namaMobil}</p>
                <p className="text-sm text-slate-500">{mobil.tipe} &middot; {mobil.transmisi}</p>
              </div>
            </div>

            <div className="mt-5 space-y-1.5 border-t border-slate-100 pt-4 text-sm">
              <div className="flex items-center justify-between text-slate-600">
                <span>Harga per hari</span>
                <span className="font-medium text-slate-900">{formatRupiah(mobil.hargaPerHari)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Durasi sewa</span>
                <span className="font-medium text-slate-900">{form.estimasiHari} Hari</span>
              </div>
              <div className="mt-2 rounded-xl bg-blue-50 px-3 py-2.5">
                <span className="font-semibold text-slate-900">Estimasi Total</span>
                <p className="mt-0.5 text-xl font-extrabold text-blue-700">{formatRupiah(estimasiTotal)}</p>
              </div>
              {form.denganSopir && (
                <p className="pt-1 text-xs text-slate-500">*Belum termasuk biaya sopir, akan diinfokan tim kami saat konfirmasi.</p>
              )}
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Ini adalah permintaan booking, bukan transaksi final. Estimasi harga di atas belum final — tim kami akan menghubungi Anda untuk konfirmasi ketersediaan dan detail lebih lanjut.
            </p>
          </div>

          {waLink && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
              <h2 className="text-base font-bold text-slate-900">Ingin lebih cepat?</h2>
              <p className="mt-2 text-sm text-slate-600">Anda juga bisa langsung memesan mobil ini melalui WhatsApp.</p>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("booking_form", mobil.namaMobil)}
                className="btn-glow-whatsapp mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-800"
              >
                <MessageCircle size={18} />
                Pesan via WhatsApp
              </a>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .rdp-booked { background-color: #fee2e2; color: #b91c1c; border-radius: 6px; }
      `}</style>
    </div>
  );
}
