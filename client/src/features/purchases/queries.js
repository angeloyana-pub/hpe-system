import { parseAsInteger, useQueryState } from 'nuqs';

import { useAuthenticatedQuery } from '@/hooks/use-authenticated-query';

import { getPurchases } from './service';

export function usePurchases(opts) {
  const [page] = useQueryState('page', parseAsInteger);
  const [perPage] = useQueryState('perPage', parseAsInteger);

  return useAuthenticatedQuery({
    queryKey: ['purchases', { page, perPage }],
    queryFn: () => getPurchases({ page, perPage }),
    placeholderData: (prevData) => prevData,
    ...opts,
  });
}
