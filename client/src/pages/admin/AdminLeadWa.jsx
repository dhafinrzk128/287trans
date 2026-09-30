import { useEffect, useState } from "react";
import { MessageCircle, BadgeCheck, CircleDollarSign, Percent, Download, Search } from "lucide-react";
import api from "../../api/client";
import AdminTable from "../../components/admin/AdminTable";
import StatCard from "../../components/admin/StatCard";
import Select from "../../components/ui/Select";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";
import { formatTanggalWaktu } from "../../utils/format";
import { AWALAN_KODE } from "../../utils/kodeRefWa";

const STATUS_LEAD = {
  baru: "Baru (cuma tanya)",
  qualified: "Qualified (serius)",
  closing: "Closing (deal)",
  tidak_jadi: "Tidak jadi",
};

const WARNA_STATUS = {
  baru: "border-slate-200 bg-white",
  qualified: "border-amber-300 bg-amber-50",
  closing: "border-emerald-300 bg-emerald-50",
  tidak_jadi: "border-slate-200 bg-slate-100 text-slate-500",
};

const PILIHAN_HARI = [7, 30, 90];

function sumber(lead) {
  if (lead.utmCampaign) return lead.utmCampaign;
  if (lead.gclid || lead.gbraid || lead.wbraid) return "Google Ads";
  return "-";
}

export default function AdminLeadWa() {
  const [data, setData] = useState({ leads: [], ringkasan: null });
  const [hari, setHari] = useState(30);
  const [status, setStatus] = useState("");
  const [cari, setCari] = useState("");
  const [loading, setLoading] = useState(true);
  const [pesanEkspor, setPesanEkspor] = useState("");
  const [error, setError] = useState("");

  function muat() {
    setLoading(true);
    const params = { hari };
    if (status) params.status = status;
    if (cari.trim()) params.q = cari.trim();
    return api
      .get("/lead-wa/admin", { params })
      .then(({ data }) => setData(data))
      .catch(() => setError("Gagal memuat data lead."))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    const t = setTimeout(muat, cari ? 300 : 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hari, status, cari]);

  async function ubah(lead, perubahan) {
    setError("");
    try {
      const { data: baru } = await api.patch(`/lead-wa/admin/${lead.id}`, perubahan);
      setData((d) => ({ ...d, leads: d.leads.map((l) => (l.id === baru.id ? baru : l)) }));
      if (perubahan.status) muat(); // angka ringkasan ikut berubah
    } catch (err) {
      setError(err.response?.data?.message || "Gagal menyimpan perubahan.");
    }
  }

  async function ekspor(jenis) {
    setPesanEkspor("");
    setError("");
    try {
      const res = await api.get(`/lead-wa/admin/export/${jenis}`, { responseType: "blob" });
      const jumlah = Number(res.headers["x-jumlah-baris"] || 0);
      const dilewati = JSON.parse(res.headers["x-dilewati"] || "{}");

      const url = URL.createObjectURL(res.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = `google-ads-${jenis}-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);

      const catatan = [];
      if (dilewati.terlaluBaru) catatan.push(`${dilewati.terlaluBaru} belum 24 jam sejak klik (ikut di unduhan berikutnya)`);
      if (dilewati.tanpaGclid) catatan.push(`${dilewati.tanpaGclid} dari iPhone/Safari tanpa gclid`);
      if (dilewati.terlaluLama) catatan.push(`${dilewati.terlaluLama} klik lebih dari 90 hari`);
      setPesanEkspor(
        `${jumlah} baris siap diunggah.${catatan.length ? ` Dilewati: ${catatan.join(", ")}.` : ""}`
      );
    } catch {
      setError("Gagal membuat file CSV.");
    }
  }

  const r = data.ringkasan;
  const rasio = r && r.qualified ? Math.round((r.closing / r.qualified) * 100) : 0;

  const columns = [
    {
      key: "kodeRef",
      header: "Kode",
      render: (row) => (
        <span className="font-mono font-semibold text-slate-900">
          {AWALAN_KODE}
          {row.kodeRef}
        </span>
      ),
    },
    {
      key: "masuk",
      header: "Klik WA",
      render: (row) => (
        <div>
          <p>{formatTanggalWaktu(row.createdAt)}</p>
          {row.jumlahKlik > 1 && <p className="text-xs text-slate-500">{row.jumlahKlik}x klik</p>}
        </div>
      ),
    },
    {
      key: "asal",
      header: "Asal",
      render: (row) => (
        <div>
          <p className="font-medium text-slate-900">{sumber(row)}</p>
          <p className="text-xs text-slate-500">
            {[row.lokasiTombol, row.namaMobil].filter(Boolean).join(" · ") || "-"}
          </p>
        </div>
      ),
    },
    {
      key: "status",
      header: "Tahap",
      render: (row) => (
        <select
          value={row.status}
          onChange={(e) => ubah(row, { status: e.target.value })}
          className={`cursor-pointer rounded-lg border px-2.5 py-1.5 text-sm font-medium outline-none ${WARNA_STATUS[row.status]}`}
          aria-label={`Tahap lead ${row.kodeRef}`}
        >
          {Object.entries(STATUS_LEAD).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      ),
    },
    {
      key: "nilai",
      header: "Nilai Deal (Rp)",
      render: (row) =>
        row.status === "closing" ? (
          <input
            type="number"
            min="0"
            step="1000"
            defaultValue={row.nilaiClosing ?? ""}
            placeholder="mis. 5499000"
            onBlur={(e) => {
              const v = e.target.value === "" ? null : Number(e.target.value);
              if (v !== row.nilaiClosing) ubah(row, { nilaiClosing: v });
            }}
            className="w-32 rounded-lg border border-slate-200 px-2.5 py-1.5 text-sm outline-none focus:border-blue-400"
          />
        ) : (
          <span className="text-slate-400">-</span>
        ),
    },
    {
      key: "catatan",
      header: "Catatan",
      render: (row) => (
        <input
          type="text"
          maxLength={500}
          defaultValue={row.catatan ?? ""}
          placeholder="opsional"
          onBlur={(e) => {
            if (e.target.value !== (row.catatan ?? "")) ubah(row, { catatan: e.target.value });
          }}
          className="w-44 rounded-lg border border-slate-200 px-2.5 py-1.5 text-sm outline-none focus:border-blue-400"
        />
      ),
    },
  ];

  return (
    <div>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Lead WhatsApp dari Iklan</h1>
          <p className="mt-1 max-w-2xl text-slate-500">
            Setiap chat dari iklan membawa baris <span className="font-mono">Kode: {AWALAN_KODE}XXXXXX</span>. Cari kodenya
            di sini, lalu tandai tahapnya. Tahap qualified dan closing diunggah ke Google Ads supaya iklan belajar mencari
            penyewa, bukan penanya.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button variant="secondary" onClick={() => ekspor("qualified")}>
            <Download size={16} />
            CSV Lead Qualified
          </Button>
          <Button onClick={() => ekspor("closing")}>
            <Download size={16} />
            CSV Closing
          </Button>
        </div>
      </div>

      {pesanEkspor && (
        <p className="mt-4 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">{pesanEkspor}</p>
      )}
      {error && <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      {r && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={MessageCircle} label={`Lead WA (${r.hari} hari)`} value={r.total} accent="blue" />
          <StatCard icon={BadgeCheck} label="Qualified" value={r.qualified} accent="amber" />
          <StatCard icon={CircleDollarSign} label="Closing" value={r.closing} accent="emerald" />
          <StatCard icon={Percent} label="Qualified → Closing" value={`${rasio}%`} accent="slate" />
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative sm:w-64">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            value={cari}
            onChange={(e) => setCari(e.target.value)}
            placeholder="Cari kode, mis. K7M3QX"
            className="pl-9"
          />
        </div>
        <Select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full sm:w-52" disabled={Boolean(cari)}>
          <option value="">Semua Tahap</option>
          {Object.entries(STATUS_LEAD).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
        <Select value={hari} onChange={(e) => setHari(Number(e.target.value))} className="w-full sm:w-40" disabled={Boolean(cari)}>
          {PILIHAN_HARI.map((h) => (
            <option key={h} value={h}>
              {h} hari terakhir
            </option>
          ))}
        </Select>
      </div>

      <div className="mt-4">
        {loading ? (
          <Spinner />
        ) : (
          <AdminTable
            columns={columns}
            data={data.leads}
            keyField="id"
            emptyMessage={cari ? "Kode tidak ditemukan." : "Belum ada lead dari iklan pada rentang ini."}
          />
        )}
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
        <p className="font-semibold text-slate-900">Patokan tahap</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>
            <b>Qualified</b>: calon penyewa sudah menyebut tanggal dan unit, atau sudah kirim KTP/SIM. Bukan sekadar tanya harga.
          </li>
          <li>
            <b>Closing</b>: sudah bayar DP atau deal. Isi nilai deal-nya supaya Google tahu mana lead yang paling berharga.
          </li>
          <li>Unggah CSV seminggu sekali di Google Ads: Sasaran &gt; Konversi &gt; Unggahan. Mengunggah ulang baris yang sama aman.</li>
        </ul>
      </div>
    </div>
  );
}
