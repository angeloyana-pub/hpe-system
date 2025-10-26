import { useAuthenticatedQuery } from '@/hooks/use-authenticated-query';

import { getSalesReport } from './service';

export function useSalesReport(opts) {
  return useAuthenticatedQuery({
    queryKey: ['reports', 'sales'],
    queryFn: () => getSalesReport(),
    initialData: [],
    ...opts,
  });
}
