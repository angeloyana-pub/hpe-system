import { getSalesReport } from '@/api/reports';

import { useAuthenticatedQuery } from './use-authenticated-query';

export function useSalesReport(opts) {
  return useAuthenticatedQuery({
    queryKey: ['reports', 'sales'],
    queryFn: getSalesReport,
    ...opts,
  });
}
