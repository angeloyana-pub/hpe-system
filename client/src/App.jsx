import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router';

import AppLayout from './routes/(app)/layout';
import Orders from './routes/(app)/orders/page';
import Parts from './routes/(app)/parts/page';
import PointOfSale from './routes/(app)/point-of-sale/page';
import Purchases from './routes/(app)/purchases/page';
import Suppliers from './routes/(app)/suppliers/page';
import Tags from './routes/(app)/tags/page';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/parts" element={<Parts />} />
            <Route path="/tags" element={<Tags />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/purchases" element={<Purchases />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/point-of-sale" element={<PointOfSale />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
