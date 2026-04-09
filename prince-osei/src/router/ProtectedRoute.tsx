import { Navigate, useLocation } from 'react-router-dom';

function isAdminAuthenticated() {
  const flag = localStorage.getItem('admin_authenticated');
  return flag === 'true';
}

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}
