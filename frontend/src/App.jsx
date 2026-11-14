import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from './components/layout/PublicLayout';
import DashboardLayout from './components/layout/DashboardLayout';
import CustomerLayout from './components/layout/CustomerLayout';
import ProtectedRoute from './components/common/ProtectedRoute';

// Public & Auth Pages
import LandingPage from './pages/public/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import NotFoundPage from './pages/public/NotFoundPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminVendors from './pages/admin/AdminVendors';
import AdminUsers from './pages/admin/AdminUsers';
import AdminEvents from './pages/admin/AdminEvents';
import AdminBookings from './pages/admin/AdminBookings';
import AdminCategories from './pages/admin/AdminCategories';
import AdminSettings from './pages/admin/AdminSettings';

// Vendor Pages
import VendorDashboard from './pages/vendor/VendorDashboard';
import VendorProfile from './pages/vendor/VendorProfile';
import VendorServices from './pages/vendor/VendorServices';
import VendorRequests from './pages/vendor/VendorRequests';
import VendorCalendar from './pages/vendor/VendorCalendar';
import VendorEarnings from './pages/vendor/VendorEarnings';

// Customer Pages
import BrowseVendors from './pages/customer/BrowseVendors';
import VendorDetail from './pages/customer/VendorDetail';
import CreateEvent from './pages/customer/CreateEvent';
import MyEvents from './pages/customer/MyEvents';
import MyBookings from './pages/customer/MyBookings';

export const App = () => {
  return (
    <Routes>
      {/* 1. Public & Marketing Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* 2. Admin Workspace Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <DashboardLayout role="admin" />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="vendors" element={<AdminVendors />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="events" element={<AdminEvents />} />
        <Route path="bookings" element={<AdminBookings />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* 3. Vendor Workspace Routes */}
      <Route
        path="/vendor"
        element={
          <ProtectedRoute allowedRoles={['vendor']}>
            <DashboardLayout role="vendor" />
          </ProtectedRoute>
        }
      >
        <Route index element={<VendorDashboard />} />
        <Route path="profile" element={<VendorProfile />} />
        <Route path="services" element={<VendorServices />} />
        <Route path="requests" element={<VendorRequests />} />
        <Route path="calendar" element={<VendorCalendar />} />
        <Route path="earnings" element={<VendorEarnings />} />
      </Route>

      {/* 4. Customer & Directory Routes */}
      <Route path="/customer" element={<CustomerLayout />}>
        <Route index element={<Navigate to="/customer/browse" replace />} />
        <Route path="browse" element={<BrowseVendors />} />
        <Route path="vendors/:id" element={<VendorDetail />} />
        <Route
          path="create-event"
          element={
            <ProtectedRoute allowedRoles={['customer', 'admin']}>
              <CreateEvent />
            </ProtectedRoute>
          }
        />
        <Route
          path="my-events"
          element={
            <ProtectedRoute allowedRoles={['customer', 'admin']}>
              <MyEvents />
            </ProtectedRoute>
          }
        />
        <Route
          path="my-bookings"
          element={
            <ProtectedRoute allowedRoles={['customer', 'admin']}>
              <MyBookings />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* 404 Fallback */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;

