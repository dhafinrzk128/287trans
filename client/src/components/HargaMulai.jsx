import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";
import { formatRupiah } from "../utils/format";
import { getPrerenderedData, setPrerenderedData } from "../utils/prerenderData";

const KUNCI = "harga_kelas";

// Kelas yang paling banyak dicari didahulukan lewat harga termurahnya, jadi
// angka paling terjangkau yang pertama terbaca. Ini disengaja: tujuan tabel
// ini bukan memamerkan unit termahal, tapi memberi calon penyewa ukuran yang
// jujur secepat mungkin.
function ringkasPerKelas(mobils) {
  const kelas = new Map();
  for (const m of mobils) {
    if (!m.tipe || !m.hargaPerHari) continue;
    const isi = kelas.get(m.tipe) || { tipe: m.tipe, termurah: Infinity, contoh: [] };
    isi.termurah = Math.min(isi.termurah, m.hargaPerHari);
    isi.contoh.push({ nama: m.namaMobil, harga: m.hargaPerHari });
    kelas.set(m.tipe, isi);
  }
  return [...kelas.values()]
    .map((k) => ({
      tipe: k.tipe,
      termurah: k.termurah,
      // Dua unit termurah sebagai contoh — merek yang dikenali orang lebih
      // menjelaskan sebuah kelas daripada nama kelasnya sendiri.
      contoh: k.contoh
        .sort((a, b) => a.harga - b.harga)
        .slice(0, 2)
        .map((c) => c.nama)
        .join(", "),
    }))
    .sort((a, b) => a.termurah - b.termurah);
}

/**
 * Tabel "mulai dari" per kelas kendaraan, diambil dari katalog.
 *
 * Sengaja tidak ditulis mati di halaman: harga yang diubah lewat panel admin
 * tapi tidak ikut berubah di sini akan membuat halaman ini berbohong — dan
 * kekeliruan harga yang baru ketahuan saat chat persis masalah yang tabel ini
 * ada untuk mencegahnya.
 */
export default function HargaMulai({ tampilkanSorotan = true }) {
  const [kelas, setKelas] = useState(() => getPrerenderedData(KUNCI) ?? []);

  useEffect(() => {
    api
      .get("/mobil", { params: { status: "tersedia" } })
      .then(({ data }) => {
        const ringkas = ringkasPerKelas(data);
        setKelas(ringkas);
        setPrerenderedData(KUNCI, ringkas);
      })
      .catch(() => {
        /* biarkan apa adanya: tanpa tabel, halaman tetap utuh */
      });
  }, []);

  if (kelas.length === 0) return null;

  const termurah = kelas[0].termurah;

  return (
    <div>
      {/* Halaman model tertentu (Innova Reborn dsb.) sudah menampilkan harga
          varian tepat di atas tabel ini, jadi sorotannya dimatikan di sana —
          mengulang angka yang sama dua kali membuat halamannya terbaca seperti
          iklan, bukan keterangan. */}
      {tampilkanSorotan && (
        <div className="rounded-2xl border border-accent-200 bg-accent-50 px-5 py-4">
          <p className="text-sm text-slate-600">Sewa harian di 287 Trans dimulai dari</p>
          <p className="mt-1 text-3xl font-extrabold text-slate-900">
            {formatRupiah(termurah)}
            <span className="text-base font-semibold text-slate-500">{" / hari"}</span>
          </p>
        </div>
      )}

      <div className={`${tampilkanSorotan ? "mt-5" : ""} overflow-x-auto rounded-2xl border border-slate-200 shadow-[var(--shadow-soft)]`}>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold">Kelas</th>
              <th scope="col" className="px-4 py-3 font-semibold">Contoh Unit</th>
              <th scope="col" className="px-4 py-3 font-semibold">Mulai dari</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {kelas.map((k) => (
              <tr key={k.tipe}>
                <td className="px-4 py-3 font-medium text-slate-900">{k.tipe}</td>
                <td className="px-4 py-3 text-slate-600">{k.contoh}</td>
                <td className="px-4 py-3 font-semibold text-slate-900">{formatRupiah(k.termurah)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-sm text-slate-500">
        {"Tarif di atas berlaku untuk sewa lepas kunci dan dapat berubah mengikuti ketersediaan unit serta durasi sewa. Biaya sopir dihitung terpisah. Harga tiap unit selengkapnya ada di "}
        <Link to="/katalog" className="font-semibold text-blue-600 hover:underline">
          katalog
        </Link>
        {"."}
      </p>
    </div>
  );
}
