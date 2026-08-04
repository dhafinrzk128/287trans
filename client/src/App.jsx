import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CompanyProfileProvider } from "./context/CompanyProfileContext";

import Layout from "./components/layout/Layout";
import AdminLayout from "./components/layout/AdminLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";

import Home from "./pages/Home";
import About from "./pages/About";
import Catalog from "./pages/Catalog";
import CarDetail from "./pages/CarDetail";
import BookingForm from "./pages/BookingForm";
import BookingStatus from "./pages/BookingStatus";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCars from "./pages/admin/AdminCars";
import AdminCarForm from "./pages/admin/AdminCarForm";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminBookingForm from "./pages/admin/AdminBookingForm";
import AdminBookingDetail from "./pages/admin/AdminBookingDetail";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminTestimoni from "./pages/admin/AdminTestimoni";
import AdminFaq from "./pages/admin/AdminFaq";

function App() {
  return (
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
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="admin/login" element={<AdminLogin />} />
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
              </Route>
            </Route>
          </Routes>
        </CompanyProfileProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
