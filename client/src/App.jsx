import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./context/AuthContext";
import { CompanyProfileProvider } from "./context/CompanyProfileContext";

import Layout from "./components/layout/Layout";
import AdminLayout from "./components/layout/AdminLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import Spinner from "./components/ui/Spinner";

import Home from "./pages/Home";
import About from "./pages/About";
import Catalog from "./pages/Catalog";
import CarDetail from "./pages/CarDetail";
import BookingForm from "./pages/BookingForm";
import BookingLookup from "./pages/BookingLookup";
import BookingStatus from "./pages/BookingStatus";
import Contact from "./pages/Contact";
import Armada from "./pages/Armada";
import Faq from "./pages/Faq";
import NotFound from "./pages/NotFound";

import RentalMobilTangerang from "./pages/landing/RentalMobilTangerang";
import SewaMobilLepasKunciTangerang from "./pages/landing/SewaMobilLepasKunciTangerang";
import RentalMobilPlusDriver from "./pages/landing/RentalMobilPlusDriver";
import RentalMobilBulananTangerang from "./pages/landing/RentalMobilBulananTangerang";
import SewaMobilBandaraSoekarnoHatta from "./pages/landing/SewaMobilBandaraSoekarnoHatta";
import SewaInnovaRebornTangerang from "./pages/landing/SewaInnovaRebornTangerang";
import SewaInnovaZenixTangerang from "./pages/landing/SewaInnovaZenixTangerang";
import SewaFortunerTangerang from "./pages/landing/SewaFortunerTangerang";
import SewaPajeroSportTangerang from "./pages/landing/SewaPajeroSportTangerang";

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
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="tentang-kami" element={<About />} />
                <Route path="katalog" element={<Catalog />} />
                <Route path="katalog/:id" element={<CarDetail />} />
                <Route path="booking/:idMobil" element={<BookingForm />} />
                <Route path="status" element={<BookingLookup />} />
                <Route path="status/:kodeBooking" element={<BookingStatus />} />
                <Route path="kontak" element={<Contact />} />
                <Route path="armada" element={<Armada />} />
                <Route path="faq" element={<Faq />} />
                <Route path="rental-mobil-tangerang" element={<RentalMobilTangerang />} />
                <Route path="sewa-mobil-lepas-kunci-tangerang" element={<SewaMobilLepasKunciTangerang />} />
                <Route path="rental-mobil-plus-driver" element={<RentalMobilPlusDriver />} />
                <Route path="rental-mobil-bulanan-tangerang" element={<RentalMobilBulananTangerang />} />
                <Route path="sewa-mobil-bandara-soekarno-hatta" element={<SewaMobilBandaraSoekarnoHatta />} />
                <Route path="sewa-innova-reborn-tangerang" element={<SewaInnovaRebornTangerang />} />
                <Route path="sewa-innova-zenix-tangerang" element={<SewaInnovaZenixTangerang />} />
                <Route path="sewa-fortuner-tangerang" element={<SewaFortunerTangerang />} />
                <Route path="sewa-pajero-sport-tangerang" element={<SewaPajeroSportTangerang />} />
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
          </CompanyProfileProvider>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
