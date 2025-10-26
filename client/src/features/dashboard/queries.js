import { useAuthenticatedQuery } from '@/hooks/use-authenticated-query';

import { getLowStockParts, getTotalOrders, getTotalSales } from './service';

export function useLowStockParts(opts) {
  return useAuthenticatedQuery({
    queryKey: ['dashboard', 'lowStockParts'],
    queryFn: () => getLowStockParts(),
    initialData: [],
    ...opts,
  });
}

export function useTotalSales(opts) {
  return useAuthenticatedQuery({
    queryKey: ['dashboard', 'totalSales'],
    queryFn: () => getTotalSales(),
    initialData: { totalSales: 0 },
    ...opts,
  });
}

export function useTotalOrders(opts) {
  return useAuthenticatedQuery({
    queryKey: ['dashboard', 'totalOrders'],
    queryFn: () => getTotalOrders(),
    initialData: { totalOrders: 0 },
    ...opts,
  });
}
