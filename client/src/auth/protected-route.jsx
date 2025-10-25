import { Navigate, Outlet } from 'react-router';

import { useAuth } from './context';

export function ProtectedRoute() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) return <div className="h-svh flex items-center justify-center">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;
  return <Outlet />;
}
