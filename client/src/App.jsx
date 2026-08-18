import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./context/AuthContext";
import { CompanyProfileProvider } from "./context/CompanyProfileContext";

import Layout from "./components/layout/Layout";
import AdminLayout from "./components/layout/AdminLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import Spinner from "./components/ui/Spinner";

// Route-level code splitting: each page becomes its own chunk instead of
// all being bundled into one ~550kB file. Layout/AdminLayout/ProtectedRoute
// stay eager since they're the shell every route needs immediately; each
// layout has its own <Suspense> around its <Outlet> (see Layout.jsx /
// AdminLayout.jsx) so the navbar/sidebar don't flash away on every
// navigation — only AdminLogin needs its own boundary here, since it's
// the one lazy page that sits outside both layouts.
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Catalog = lazy(() => import("./pages/Catalog"));
const CarDetail = lazy(() => import("./pages/CarDetail"));
const BookingForm = lazy(() => import("./pages/BookingForm"));
const BookingStatus = lazy(() => import("./pages/BookingStatus"));
const Contact = lazy(() => import("./pages/Contact"));
const Armada = lazy(() => import("./pages/Armada"));
const Faq = lazy(() => import("./pages/Faq"));
const NotFound = lazy(() => import("./pages/NotFound"));

const RentalMobilTangerang = lazy(() => import("./pages/landing/RentalMobilTangerang"));
const SewaMobilLepasKunciTangerang = lazy(() => import("./pages/landing/SewaMobilLepasKunciTangerang"));
const RentalMobilPlusDriver = lazy(() => import("./pages/landing/RentalMobilPlusDriver"));
const RentalMobilBulananTangerang = lazy(() => import("./pages/landing/RentalMobilBulananTangerang"));
const SewaMobilBandaraSoekarnoHatta = lazy(() => import("./pages/landing/SewaMobilBandaraSoekarnoHatta"));

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
                <Route path="status/:kodeBooking" element={<BookingStatus />} />
                <Route path="kontak" element={<Contact />} />
                <Route path="armada" element={<Armada />} />
                <Route path="faq" element={<Faq />} />
                <Route path="rental-mobil-tangerang" element={<RentalMobilTangerang />} />
                <Route path="sewa-mobil-lepas-kunci-tangerang" element={<SewaMobilLepasKunciTangerang />} />
                <Route path="rental-mobil-plus-driver" element={<RentalMobilPlusDriver />} />
                <Route path="rental-mobil-bulanan-tangerang" element={<RentalMobilBulananTangerang />} />
                <Route path="sewa-mobil-bandara-soekarno-hatta" element={<SewaMobilBandaraSoekarnoHatta />} />
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
