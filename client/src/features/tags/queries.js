import { useAuthenticatedQuery } from '@/hooks/use-authenticated-query';

import { getTags } from './service';

export function useTags(opts) {
  return useAuthenticatedQuery({
    queryKey: ['tags'],
    queryFn: () => getTags(),
    initialData: [],
    ...opts,
  });
}
