import { Routes, Route } from 'react-router-dom';
import { publicRoutes } from './publicRoutes';
import { ProtectedRoute } from './ProtectedRoute';
import NotFound from '../pages/shared/NotFound';
import { AdminLayout } from '../components/admin/AdminLayout';
import AdminDashboardPage from '../pages/admin/dashboard/page';
import AdminWebsitePage from '../pages/admin/website/page';
import AdminBookingsPage from '../pages/admin/bookings/page';
import AdminPortfolioPage from '../pages/admin/portfolio/page';
import AdminPortfolioDetailPage from '../pages/admin/portfolio/[id]/page';
import AdminLoginPage from '../pages/admin/login/page';
import AdminSettingsPage from '../pages/admin/settings/page';

export function AppRoutes() {
  return (
    <Routes>
      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboardPage />} />
        <Route path="website" element={<AdminWebsitePage />} />
        <Route path="bookings" element={<AdminBookingsPage />} />
        <Route path="portfolio" element={<AdminPortfolioPage />} />
        <Route path="portfolio/:id" element={<AdminPortfolioDetailPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
