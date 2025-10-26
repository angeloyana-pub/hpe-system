import { useAuthenticatedQuery } from '@/hooks/use-authenticated-query';

import { getSuppliers } from './service';

export function useSuppliers(opts) {
  return useAuthenticatedQuery({
    queryKey: ['suppliers'],
    queryFn: () => getSuppliers(),
    initialData: [],
    ...opts,
  });
}
