import { useAuthenticatedQuery } from '@/hooks/use-authenticated-query';

import { getOrders } from './service';

export function useOrders(opts) {
  return useAuthenticatedQuery({
    queryKey: ['orders'],
    queryFn: () => getOrders(),
    initialData: [],
    ...opts,
  });
}
