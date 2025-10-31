import { parseAsIsoDateTime, parseAsStringLiteral, useQueryStates } from 'nuqs';

import { useAuthenticatedQuery } from '@/hooks/use-authenticated-query';

import { getSalesReport } from './service';

export function useSalesReport(opts) {
  const [filters] = useQueryStates(
    {
      from: parseAsIsoDateTime,
      to: parseAsIsoDateTime,
      interval: parseAsStringLiteral(['month', 'year']),
    },
    {
      urlKeys: {
        interval: 'salesInterval',
      },
    }
  );

  return useAuthenticatedQuery({
    queryKey: ['reports', 'sales', filters],
    queryFn: () => getSalesReport(filters),
    placeholderData: (prevData) => prevData,
    ...opts,
  });
}
