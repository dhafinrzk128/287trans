import { Link, useLocation } from "react-router-dom";
import Button from "../components/ui/Button";
import Seo from "../components/Seo";

export default function NotFound() {
  const { pathname } = useLocation();

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <Seo
        title="Halaman Tidak Ditemukan"
        description="Halaman yang Anda cari tidak tersedia atau sudah dipindahkan."
        path={pathname}
        noindex
      />
      <p className="text-7xl font-extrabold text-blue-600">404</p>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">Halaman Tidak Ditemukan</h1>
      <p className="mt-2 text-slate-600">Halaman yang Anda cari tidak tersedia atau sudah dipindahkan.</p>
      <Link to="/">
        <Button className="mt-6">Kembali ke Home</Button>
      </Link>
    </div>
  );
}
