import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import api from "../api/client";
import Reveal from "./Reveal";
import { formatRupiah } from "../utils/format";
import { getPrerenderedData, setPrerenderedData } from "../utils/prerenderData";
import { KOLEKSI_KATEGORI } from "../data/koleksi/kategori";
import { unitKoleksi, hargaTermurah } from "../data/koleksiArmada";

const PRERENDER_KEY = "kategori_ringkas";

/**
 * Petak kategori armada — pintu masuk ke seluruh katalog dari satu layar.
 *
 * Angka jumlah tipe dan harga terendahnya ditarik dari katalog, bukan
 * ditulis mati: petak yang menjanjikan "mulai Rp799.000" padahal unit
 * termurahnya sudah naik harga adalah persis kekeliruan yang paling mahal
 * di halaman tujuan iklan — ketahuannya baru saat calon penyewa sudah
 * membuka percakapan.
 *
 * Kategori yang sedang kosong tipenya tidak ditampilkan sama sekali,
 * supaya tidak ada tautan menuju halaman tanpa satu pun mobil.
 */
export default function KategoriArmadaGrid({ mobils: mobilsProp }) {
  const [mobilsSendiri, setMobilsSendiri] = useState(() => getPrerenderedData(PRERENDER_KEY) ?? []);
  // Halaman yang sudah menarik katalog untuk keperluan lain (Home memakainya
  // juga untuk harga terendah di hero) mengoper daftarnya lewat prop, supaya
  // satu halaman tidak meminta /mobil dua kali.
  const ambilSendiri = mobilsProp === undefined;
  const mobils = ambilSendiri ? mobilsSendiri : mobilsProp;

  useEffect(() => {
    if (!ambilSendiri) return;
    api
      .get("/mobil")
      .then(({ data }) => {
        setMobilsSendiri(data);
        setPrerenderedData(PRERENDER_KEY, data);
      })
      .catch(() => {
        /* biarkan kosong: tanpa petak ini, halaman tetap utuh */
      });
  }, [ambilSendiri]);

  const kategori = KOLEKSI_KATEGORI.map((k) => {
    const units = unitKoleksi(k, mobils);
    return { ...k, jumlah: units.length, termurah: hargaTermurah(units) };
  }).filter((k) => k.jumlah > 0);

  if (kategori.length === 0) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kategori.map((k, i) => (
        <Reveal key={k.slug} delay={(i % 4) * 70} className="h-full [&>*]:h-full">
          <Link
            to={`/${k.slug}`}
            className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[var(--shadow-soft-lg)]"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-base font-bold text-slate-900">{k.label}</h3>
              <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                {`${k.jumlah} tipe`}
              </span>
            </div>
            <p className="mt-3 text-xs font-medium uppercase tracking-wide text-slate-500">Mulai dari</p>
            <p className="mt-0.5 text-xl font-extrabold text-accent-700">
              {formatRupiah(k.termurah)}
              <span className="text-sm font-medium text-slate-500"> /hari</span>
            </p>
            <span className="mt-auto flex items-center gap-1 pt-4 text-sm font-semibold text-blue-600">
              Lihat unit
              <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
