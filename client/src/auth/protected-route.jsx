import { Navigate, Outlet } from 'react-router';

import logo from '@/assets/logo.png';

import { useAuth } from './context';

export function ProtectedRoute() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading)
    return (
      <div className="h-svh flex flex-col items-center justify-center">
        <img src={logo} alt="logo" className="size-16 mb-4 animate-spin" />
        <div className="text-2xl font-medium">Hydro-Pro</div>
        <div className="text-muted-foreground">Loading, please wait...</div>
      </div>
    );
  if (!isAuthenticated) return <Navigate to="/login" />;
  return <Outlet />;
}
