import { getLowStockParts, getTotalOrders, getTotalSales } from '@/api/dashboard';

import { useAuthenticatedQuery } from './use-authenticated-query';

export function useLowStockParts(opts) {
  return useAuthenticatedQuery({
    queryKey: ['dashboard', 'lowStockParts'],
    queryFn: getLowStockParts,
    ...opts,
  });
}

export function useTotalSales(opts) {
  return useAuthenticatedQuery({
    queryKey: ['dashboard', 'totalSales'],
    queryFn: getTotalSales,
    ...opts,
  });
}

export function useTotalOrders(opts) {
  return useAuthenticatedQuery({
    queryKey: ['dashboard', 'totalOrders'],
    queryFn: getTotalOrders,
    ...opts,
  });
}
