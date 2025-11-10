import { parseAsInteger, useQueryState } from 'nuqs';

import { useAuthenticatedQuery } from '@/hooks/use-authenticated-query';

import { getOrder, getOrders } from './service';

export function useOrders(opts) {
  const [page] = useQueryState('page', parseAsInteger);
  const [perPage] = useQueryState('perPage', parseAsInteger);

  return useAuthenticatedQuery({
    queryKey: ['orders', { page, perPage }],
    queryFn: () => getOrders({ page, perPage }),
    placeholderData: (prevData) => prevData,
    ...opts,
  });
}

export function useOrder(id, opts) {
  return useAuthenticatedQuery({
    queryKey: ['orders', id],
    queryFn: () => getOrder(id),
    placeholderData: (prevData) => prevData,
    ...opts,
  });
}
