import { useAuthenticatedQuery } from '@/hooks/use-authenticated-query';

import { getParts } from './service';

export function useParts(opts) {
  return useAuthenticatedQuery({
    queryKey: ['parts'],
    queryFn: () => getParts(),
    initialData: [],
    ...opts,
  });
}
