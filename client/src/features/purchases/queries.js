import { useAuthenticatedQuery } from '@/hooks/use-authenticated-query';

import { getPurchases } from './service';

export function usePurchases(opts) {
  return useAuthenticatedQuery({
    queryKey: ['purchases'],
    queryFn: () => getPurchases(),
    initialData: [],
    ...opts,
  });
}
