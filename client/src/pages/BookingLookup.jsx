import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MessageCircle, Info } from "lucide-react";
import { useCompanyProfile } from "../context/CompanyProfileContext";
import FormField from "../components/ui/FormField";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import PageHero from "../components/PageHero";
import Seo from "../components/Seo";
import { breadcrumbSchema } from "../utils/schema";
import { buildWaLink } from "../utils/format";
import { trackWhatsAppClick } from "../utils/tracking";

// Penyewa menyalin kodenya dari mana-mana: ada yang terbawa spasi, ada yang
// huruf kecil, ada yang hanya bagian setelah "BK-". Bentuk-bentuk itu semuanya
// kode yang benar, jadi dirapikan di sini — bukan dijawab "tidak ditemukan".
function rapikanKode(masukan) {
  const bersih = masukan.replace(/\s+/g, "").toUpperCase();
  const inti = bersih.replace(/^BK-?/, "");
  return inti ? `BK-${inti}` : "";
}

export default function BookingLookup() {
  const navigate = useNavigate();
  const { profile } = useCompanyProfile();
  const [kode, setKode] = useState("");
  const [error, setError] = useState("");

  // Kode yang salah ketik sengaja tidak dihadang di sini. Yang tahu pasti kode
  // itu ada atau tidak cuma server, dan menolak duluan berisiko memblokir kode
  // yang sebenarnya sah — halaman status sudah menangani kasus tidak ketemu.
  function handleSubmit(ev) {
    ev.preventDefault();
    const rapi = rapikanKode(kode);
    if (!rapi) {
      setError("Masukkan kode booking Anda.");
      return;
    }
    navigate(`/status/${encodeURIComponent(rapi)}`);
  }

  const waLink = profile?.whatsapp
    ? buildWaLink(
        profile.whatsapp,
        "Halo, saya lupa kode booking saya. Bisa dibantu cek status pesanan saya?"
      )
    : null;

  return (
    <div>
      <Seo
        title="Cek Status Booking - 287 Trans"
        description="Cek status permintaan booking rental mobil 287 Trans. Masukkan kode booking yang Anda terima setelah mengajukan permintaan untuk melihat status terbaru."
        path="/status"
        // Halaman ini sebuah kotak isian dan tidak lebih: 172 kata, hampir
        // seluruhnya navigasi dan footer yang sama dengan halaman lain. Tidak
        // ada pencarian yang pantas mendarat di sini — orang yang punya kode
        // booking datang dari tautan miliknya sendiri, bukan dari Google.
        //
        // Perlu diketahui: prop ini menghasilkan "noindex, nofollow" sekaligus
        // (lihat Seo.jsx), jadi tautan di halaman ini tidak ikut ditelusuri.
        // Di sini itu tidak merugikan — setiap tautannya berasal dari navbar
        // dan footer, yang ada di seluruh halaman lain yang tetap terindeks.
        noindex
        jsonLd={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Cek Status Booking", path: "/status" },
        ])}
      />
      <PageHero
        title="Cek Status Booking"
        subtitle="Masukkan kode booking Anda untuk melihat status permintaan sewa, mulai dari menunggu konfirmasi sampai selesai."
      />

      <div className="mx-auto max-w-lg px-4 py-14 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-[var(--shadow-soft)]"
        >
          <FormField
            label="Kode Booking"
            htmlFor="kode"
            required
            error={error}
            hint="Contoh: BK-5UEWUD. Huruf besar/kecil dan spasi tidak masalah."
          >
            <Input
              id="kode"
              name="kode"
              value={kode}
              onChange={(e) => {
                setKode(e.target.value);
                setError("");
              }}
              error={error}
              placeholder="BK-XXXXXX"
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck="false"
              className="font-mono uppercase tracking-wider"
            />
          </FormField>
          <Button type="submit" variant="accent" className="w-full">
            <Search size={18} />
            Cek Status
          </Button>
        </form>

        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <Info size={20} className="mt-0.5 shrink-0 text-blue-600" />
          <p className="text-sm leading-relaxed text-slate-600">
            {"Kode booking muncul di halaman konfirmasi tepat setelah Anda mengirim permintaan booking lewat website. Kode ini juga yang disebut tim kami saat menghubungi Anda."}
          </p>
        </div>

        {waLink && (
          <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
            <p className="text-sm text-slate-600">
              {"Lupa atau kehilangan kode booking Anda?"}
            </p>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("cek_status_booking")}
              className="btn-glow-whatsapp mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-700"
            >
              <MessageCircle size={18} />
              Tanya via WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
