import { useAuthenticatedQuery } from '@/hooks/use-authenticated-query';

import { getLowStockParts, getTotalOrders, getTotalSales } from './service';

export function useLowStockParts(opts) {
  return useAuthenticatedQuery({
    queryKey: ['dashboard', 'lowStockParts'],
    queryFn: () => getLowStockParts(),
    placeholderData: (prevData) => prevData,
    ...opts,
  });
}

export function useTotalSales(opts) {
  return useAuthenticatedQuery({
    queryKey: ['dashboard', 'totalSales'],
    queryFn: () => getTotalSales(),
    placeholderData: (prevData) => prevData,
    ...opts,
  });
}

export function useTotalOrders(opts) {
  return useAuthenticatedQuery({
    queryKey: ['dashboard', 'totalOrders'],
    queryFn: () => getTotalOrders(),
    placeholderData: (prevData) => prevData,
    ...opts,
  });
}
