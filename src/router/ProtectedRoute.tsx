import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [status, setStatus] = useState<'checking' | 'authenticated' | 'unauthenticated'>('checking');

  useEffect(() => {
    const controller = new AbortController();

    void fetch('/api/admin/auth/session', {
      method: 'GET',
      credentials: 'same-origin',
      signal: controller.signal,
    })
      .then((response) => {
        setStatus(response.ok ? 'authenticated' : 'unauthenticated');
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
        setStatus('unauthenticated');
      });

    return () => {
      controller.abort();
    };
  }, []);

  if (status === 'checking') {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-on-surface-variant">
        Checking session...
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
