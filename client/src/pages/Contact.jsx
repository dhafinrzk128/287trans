import { useState } from "react";
import { MapPin, Phone, Mail, MessageCircle, CheckCircle2 } from "lucide-react";
import api from "../api/client";
import { useCompanyProfile } from "../context/CompanyProfileContext";
import Reveal from "../components/Reveal";
import FormField from "../components/ui/FormField";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import Button from "../components/ui/Button";
import { isValidEmail } from "../utils/validators";
import { buildWaLink } from "../utils/format";
import { trackWhatsAppClick } from "../utils/tracking";
import Seo from "../components/Seo";
import KayonWayang from "../components/KayonWayang";
import { breadcrumbSchema } from "../utils/schema";

const INITIAL = { nama: "", email: "", subjek: "", pesan: "" };

export default function Contact() {
  const { profile } = useCompanyProfile();
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate() {
    const e = {};
    if (!form.nama.trim()) e.nama = "Nama wajib diisi.";
    if (!form.email.trim()) e.email = "Email wajib diisi.";
    else if (!isValidEmail(form.email)) e.email = "Format email tidak valid.";
    if (!form.pesan.trim()) e.pesan = "Pesan wajib diisi.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    setServerError("");
    if (!validate()) return;
    setSubmitting(true);
    try {
      await api.post("/contact", form);
      setSuccess(true);
      setForm(INITIAL);
    } catch (err) {
      setServerError(err.response?.data?.message || "Gagal mengirim pesan. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <Seo
        title="Kontak 287 Trans - Rental Mobil Tangerang"
        description="Hubungi 287 Trans untuk sewa mobil di Tangerang & Jabodetabek. Chat WhatsApp 0811-144-287 atau kirim pesan lewat form kontak, tim kami siap bantu."
        path="/kontak"
        jsonLd={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Kontak", path: "/kontak" },
        ])}
      />
      <section className="relative overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-800 to-accent-900 py-14 text-white">
        <div className="pointer-events-none absolute -top-16 right-0 h-64 w-64 rounded-full bg-accent-500/15 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="flex h-full items-center justify-center">
            <KayonWayang varian="kompak" prioritas className="opacity-[0.24]" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-950/50 to-neutral-950/15" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold sm:text-4xl">Kontak Kami</h1>
          <p className="mt-3 max-w-2xl text-blue-100">Ada pertanyaan? Kirim pesan atau hubungi kami langsung.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid lg:grid-cols-5 lg:px-8">
        <Reveal className="lg:col-span-2">
          <h2 className="text-xl font-bold text-slate-900">Informasi Kontak</h2>
          <ul className="mt-5 space-y-4 text-slate-700">
            <li className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <MapPin size={18} />
              </span>
              <span className="pt-2">{profile?.alamat}</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Phone size={18} />
              </span>
              <span>{profile?.telepon}</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Mail size={18} />
              </span>
              <span>{profile?.email}</span>
            </li>
            {profile?.whatsapp && (
              <li className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <MessageCircle size={18} />
                </span>
                <a href={buildWaLink(profile.whatsapp)} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("contact_page")} className="font-medium text-blue-600 hover:underline">
                  Chat via WhatsApp
                </a>
              </li>
            )}
          </ul>
        </Reveal>

        <Reveal className="mt-10 lg:col-span-3 lg:mt-0" delay={150}>
          {success ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 p-10 text-center">
              <CheckCircle2 className="text-emerald-600" size={48} />
              <h2 className="mt-4 text-lg font-bold text-slate-900">Pesan Terkirim!</h2>
              <p className="mt-2 text-sm text-slate-600">Terima kasih, tim kami akan segera menghubungi Anda.</p>
              <Button className="mt-5" onClick={() => setSuccess(false)}>Kirim Pesan Lain</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-[var(--shadow-soft)]">
              {serverError && <p className="rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-700">{serverError}</p>}
              <FormField label="Nama Lengkap" htmlFor="nama" required error={errors.nama}>
                <Input id="nama" value={form.nama} onChange={(e) => update("nama", e.target.value)} error={errors.nama} />
              </FormField>
              <FormField label="Email" htmlFor="email" required error={errors.email}>
                <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} error={errors.email} />
              </FormField>
              <FormField label="Subjek" htmlFor="subjek">
                <Input id="subjek" value={form.subjek} onChange={(e) => update("subjek", e.target.value)} />
              </FormField>
              <FormField label="Pesan" htmlFor="pesan" required error={errors.pesan}>
                <Textarea id="pesan" value={form.pesan} onChange={(e) => update("pesan", e.target.value)} error={errors.pesan} rows={5} />
              </FormField>
              <Button type="submit" variant="accent" loading={submitting} className="w-full sm:w-auto">
                Kirim Pesan
              </Button>
            </form>
          )}
        </Reveal>
      </section>

      {/* Halaman ini sebelumnya hanya 149 kata: alamat, nomor, dan sebuah
          formulir. Tidak ada satu pun keterangan yang menjawab pertanyaan
          orang yang sedang bersiap menghubungi. Isi di bawah menjawabnya, dan
          sengaja berbeda dari seksi Area Layanan di /tentang-kami — dua
          halaman dengan paragraf kembar saling menggerus. */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal as="h2" className="text-2xl font-bold text-slate-900">
            Sebelum Anda Menghubungi Kami
          </Reveal>
          <div className="mt-6 grid gap-8 lg:grid-cols-3">
            <Reveal className="space-y-3 leading-relaxed text-slate-600">
              <h3 className="text-base font-bold text-slate-900">Yang perlu disiapkan</h3>
              <p>
                Untuk mempercepat konfirmasi, sebutkan empat hal saat menghubungi kami: unit yang Anda
                inginkan, tanggal mulai dan selesai sewa, apakah lepas kunci atau plus sopir, dan alamat
                lengkap kalau unit ingin diantar.
              </p>
              <p>
                Syarat sewa lepas kunci sendiri sederhana — cukup KTP yang masih berlaku. Tidak ada
                syarat kartu kredit, tanpa jaminan BPKB, dan Anda tidak perlu membuat akun.
              </p>
            </Reveal>
            <Reveal delay={100} className="space-y-3 leading-relaxed text-slate-600">
              <h3 className="text-base font-bold text-slate-900">Cara tercepat</h3>
              <p>
                WhatsApp adalah jalur paling cepat, dan sebagian besar pemesanan memang masuk dari sana.
                Formulir di halaman ini cocok untuk pertanyaan yang tidak mendesak atau penawaran untuk
                kebutuhan perusahaan, karena jawabannya kami kirim lewat email.
              </p>
              <p>
                Kalau tanggal Anda jatuh di musim ramai seperti libur panjang atau Lebaran, hubungi kami
                lebih awal — unit di kategori tertentu jumlahnya terbatas dan tanggalnya cepat terisi.
              </p>
            </Reveal>
            <Reveal delay={200} className="space-y-3 leading-relaxed text-slate-600">
              <h3 className="text-base font-bold text-slate-900">Ambil sendiri atau diantar</h3>
              <p>
                Unit bisa Anda ambil langsung di kantor kami di Ciledug, Kota Tangerang, tanpa biaya
                tambahan. Kalau ingin diantar, biayanya dihitung berdasarkan jarak ke alamat Anda.
              </p>
              <p>
                Angka biaya antar selalu kami sampaikan di awal, bersamaan dengan konfirmasi
                ketersediaan unit — jadi Anda sudah tahu totalnya sebelum memutuskan, bukan setelah
                unit sampai.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
