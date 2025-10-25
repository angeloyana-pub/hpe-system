import { getLowStockParts, getTotalRevenue, getTotalSales } from '@/api/dashboard';

import { useAuthenticatedQuery } from './use-authenticated-query';

export function useLowStockParts(opts) {
  return useAuthenticatedQuery({
    queryKey: ['dashboard', 'lowStockParts'],
    queryFn: getLowStockParts,
    ...opts,
  });
}

export function useTotalRevenue(opts) {
  return useAuthenticatedQuery({
    queryKey: ['dashboard', 'totalRevenue'],
    queryFn: getTotalRevenue,
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
