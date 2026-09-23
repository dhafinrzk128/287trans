import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./context/AuthContext";
import { CompanyProfileProvider } from "./context/CompanyProfileContext";

import Layout from "./components/layout/Layout";
import AdminLayout from "./components/layout/AdminLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import Spinner from "./components/ui/Spinner";
import ErrorBoundary from "./components/ErrorBoundary";

import Home from "./pages/Home";
import About from "./pages/About";
import Catalog from "./pages/Catalog";
import CarDetail from "./pages/CarDetail";
import BookingLookup from "./pages/BookingLookup";
import Contact from "./pages/Contact";
import Armada from "./pages/Armada";
import Faq from "./pages/Faq";
import NotFound from "./pages/NotFound";

import KoleksiArmada from "./pages/KoleksiArmada";
import { KOLEKSI } from "./data/koleksiArmada";
import Artikel from "./pages/Artikel";
import ArtikelDetail from "./pages/ArtikelDetail";
import { ARTIKEL } from "./data/artikel";

// Route-level code splitting only applies to /admin/*: those pages are
// never prerendered (they're behind auth and noindexed), so there's no
// static HTML for hydrateRoot to reconcile against — a lazy chunk there is
// just normal client-side rendering into an empty shell. Public pages
// above stay eager on purpose: they DO get real prerendered HTML, and
// React.lazy() always suspends on its very first render (the dynamic
// import's promise can't resolve synchronously even when the chunk is
// cached), which briefly commits the <Suspense> fallback during hydration.
// Real React SSR papers over that by streaming the fallback into the HTML
// first and patching it later; this app's prerendering just snapshots the
// final settled DOM with a headless browser, so the static HTML has real
// content from the start and none of the markers hydration needs to
// reconcile that gracefully — every public page hydrating through a lazy
// Suspense boundary was hitting error #418 and silently discarding the
// prerendered content for a full client re-render.
// Pengecualian dari aturan "halaman publik eager" di atas: /booking/:idMobil
// dan /status/:kodeBooking TIDAK pernah diprerender (lihat
// scripts/getRoutes.js), jadi pengunjung selalu mendapat spa-shell.html dan
// main.jsx memakai createRoot, bukan hydrateRoot. Tidak ada HTML statis yang
// bisa tidak cocok, jadi aman di-lazy seperti /admin/*. Hasilnya kode kedua
// halaman ini keluar dari bundel utama yang diunduh setiap pengunjung beranda.
const BookingForm = lazy(() => import("./pages/BookingForm"));
const BookingStatus = lazy(() => import("./pages/BookingStatus"));

const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminCars = lazy(() => import("./pages/admin/AdminCars"));
const AdminCarForm = lazy(() => import("./pages/admin/AdminCarForm"));
const AdminBookings = lazy(() => import("./pages/admin/AdminBookings"));
const AdminBookingForm = lazy(() => import("./pages/admin/AdminBookingForm"));
const AdminBookingDetail = lazy(() => import("./pages/admin/AdminBookingDetail"));
const AdminProfile = lazy(() => import("./pages/admin/AdminProfile"));
const AdminAccount = lazy(() => import("./pages/admin/AdminAccount"));
const AdminTestimoni = lazy(() => import("./pages/admin/AdminTestimoni"));
const AdminFaq = lazy(() => import("./pages/admin/AdminFaq"));

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <CompanyProfileProvider>
            <ErrorBoundary>
              <Routes>
                <Route element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="tentang-kami" element={<About />} />
                  <Route path="katalog" element={<Catalog />} />
                  <Route path="katalog/:id" element={<CarDetail />} />
                  <Route
                    path="booking/:idMobil"
                    element={
                      <Suspense fallback={<Spinner />}>
                        <BookingForm />
                      </Suspense>
                    }
                  />
                  <Route path="status" element={<BookingLookup />} />
                  <Route
                    path="status/:kodeBooking"
                    element={
                      <Suspense fallback={<Spinner />}>
                        <BookingStatus />
                      </Suspense>
                    }
                  />
                  <Route path="kontak" element={<Contact />} />
                  <Route path="armada" element={<Armada />} />
                  <Route path="faq" element={<Faq />} />
                  {/* Artikel panduan, digenerate dari src/data/artikel.js
                      dengan pola yang sama seperti halaman koleksi. */}
                  <Route path="artikel" element={<Artikel />} />
                  {ARTIKEL.map((a) => (
                    <Route key={a.slug} path={`artikel/${a.slug}`} element={<ArtikelDetail slug={a.slug} />} />
                  ))}
                  {/* Halaman kategori dan model armada. Digenerate dari satu
                      daftar (src/data/koleksiArmada.js) supaya route, sitemap,
                      prerender, dan menu navbar tidak bisa saling ketinggalan
                      saat ada tujuan iklan baru ditambahkan. */}
                  {KOLEKSI.map((k) => (
                    <Route key={k.slug} path={k.slug} element={<KoleksiArmada slug={k.slug} />} />
                  ))}
                  <Route path="*" element={<NotFound />} />
                </Route>

                <Route
                  path="admin/login"
                  element={
                    <Suspense fallback={<Spinner />}>
                      <AdminLogin />
                    </Suspense>
                  }
                />
                <Route path="admin" element={<ProtectedRoute />}>
                  <Route element={<AdminLayout />}>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="mobil" element={<AdminCars />} />
                    <Route path="mobil/baru" element={<AdminCarForm />} />
                    <Route path="mobil/:id/edit" element={<AdminCarForm />} />
                    <Route path="booking" element={<AdminBookings />} />
                    <Route path="booking/baru" element={<AdminBookingForm />} />
                    <Route path="booking/:id" element={<AdminBookingDetail />} />
                    <Route path="testimoni" element={<AdminTestimoni />} />
                    <Route path="faq" element={<AdminFaq />} />
                    <Route path="profile" element={<AdminProfile />} />
                    <Route path="akun" element={<AdminAccount />} />
                  </Route>
                </Route>
              </Routes>
            </ErrorBoundary>
          </CompanyProfileProvider>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
