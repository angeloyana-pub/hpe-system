import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { getCurrentUser, login, logout } from '@/api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((currentUser) => {
        setUser(currentUser);
        if (!currentUser) navigate('/login');
      })
      .catch((err) => {
        console.error(err);
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleLogin = async (data, opts) => {
    await login(data);

    const currentUser = await getCurrentUser();
    setUser(currentUser);
    if (opts?.redirectTo) navigate(opts.redirectTo);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be within a AuthProvider');
  return ctx;
}
