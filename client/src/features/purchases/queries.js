import { parseAsArrayOf, parseAsInteger, parseAsString, useQueryState } from 'nuqs';

import { useAuthenticatedQuery } from '@/hooks/use-authenticated-query';

import { getPurchase, getPurchases } from './service';

export function usePurchases(opts) {
  const [id] = useQueryState('id', parseAsInteger);
  const [status] = useQueryState('status', parseAsArrayOf(parseAsString).withDefault([]));
  const [page] = useQueryState('page', parseAsInteger);
  const [perPage] = useQueryState('perPage', parseAsInteger);

  return useAuthenticatedQuery({
    queryKey: ['purchases', { id, status, page, perPage }],
    queryFn: () => getPurchases({ id, status, page, perPage }),
    placeholderData: (prevData) => prevData,
    ...opts,
  });
}

export function usePurchase(id, opts) {
  return useAuthenticatedQuery({
    queryKey: ['purchases', id],
    queryFn: () => getPurchase(id),
    placeholderData: (prevData) => prevData,
    ...opts,
  });
}
