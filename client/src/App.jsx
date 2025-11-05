import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import { Toaster } from '@/components/ui/sonner';

import { AuthProvider } from './auth/context';
import { ProtectedRoute } from './auth/protected-route';
import Dashboard from './routes/(app)/dashboard/page';
import AppLayout from './routes/(app)/layout';
import Orders from './routes/(app)/orders/page';
import Parts from './routes/(app)/parts/page';
import PointOfSale from './routes/(app)/point-of-sale/page';
import Purchases from './routes/(app)/purchases/page';
import Reports from './routes/(app)/reports/page';
import Settings from './routes/(app)/settings/page';
import Suppliers from './routes/(app)/suppliers/page';
import Tags from './routes/(app)/tags/page';
import Login from './routes/(auth)/login/page';

const queryClient = new QueryClient();

function App() {
  return (
    <NuqsAdapter>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route index element={<Navigate to="/dashboard" />} />
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route element={<AppLayout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/parts" element={<Parts />} />
                  <Route path="/tags" element={<Tags />} />
                  <Route path="/suppliers" element={<Suppliers />} />
                  <Route path="/purchases" element={<Purchases />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/point-of-sale" element={<PointOfSale />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/settings" element={<Settings />} />
                </Route>
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </NuqsAdapter>
  );
}

export default App;
