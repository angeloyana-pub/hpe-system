import { useQueryState } from 'nuqs';

import { useAuthenticatedQuery } from '@/hooks/use-authenticated-query';

import { getSalesReport } from './service';

export function useSalesReport(opts) {
  const [interval] = useQueryState('salesInterval');

  return useAuthenticatedQuery({
    queryKey: ['reports', 'sales', { interval }],
    queryFn: () => getSalesReport(interval),
    initialData: [],
    ...opts,
  });
}
