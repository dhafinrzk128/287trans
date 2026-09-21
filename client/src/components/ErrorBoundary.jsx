import { Component } from "react";
import { useLocation } from "react-router-dom";
import Button from "./ui/Button";

/**
 * Jaring terakhir untuk error saat render — terutama chunk halaman yang
 * gagal diunduh (lihat penangan vite:preloadError di main.jsx, yang
 * mencoba memuat ulang halaman sekali lebih dulu).
 *
 * Tanpa ini, satu error di halaman mana pun membuat React melepas seluruh
 * pohon komponennya dan pengunjung hanya melihat layar putih — gejala yang
 * pernah muncul di panel admin setelah deploy, saat tab yang masih terbuka
 * meminta chunk dari build lama yang sudah tidak ada.
 *
 * Tidak menambah elemen DOM apa pun selama tidak ada error, jadi aman
 * untuk halaman yang diprerender dan di-hydrate.
 */
class Penangkap extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("[ErrorBoundary]", error, info?.componentStack);
  }

  componentDidUpdate(prevProps) {
    // Pindah halaman = kesempatan baru. Tanpa ini, fallback tetap menempel
    // walau pengunjung sudah menekan tautan ke halaman lain yang sehat.
    if (this.state.error && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ error: null });
    }
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div role="alert" className="mx-auto flex max-w-xl flex-1 flex-col items-center justify-center px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Halaman gagal dimuat</h1>
        <p className="mt-2 text-slate-600">
          Kemungkinan situs baru saja diperbarui. Muat ulang halaman untuk mengambil versi terbaru.
        </p>
        <Button className="mt-6" onClick={() => window.location.reload()}>
          Muat Ulang Halaman
        </Button>
      </div>
    );
  }
}

export default function ErrorBoundary({ children }) {
  const { pathname } = useLocation();
  return <Penangkap resetKey={pathname}>{children}</Penangkap>;
}
