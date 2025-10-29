import { parseAsInteger, useQueryState } from 'nuqs';

import { useAuthenticatedQuery } from '@/hooks/use-authenticated-query';

import { getAllTags, getTags } from './service';

export function useTags(opts) {
  const [name] = useQueryState('name');
  const [page] = useQueryState('page', parseAsInteger);
  const [perPage] = useQueryState('perPage', parseAsInteger);

  return useAuthenticatedQuery({
    queryKey: ['tags', { name, page, perPage }],
    queryFn: () => getTags({ name, page, perPage }),
    placeholderData: (prevData) => prevData,
    ...opts,
  });
}

export function useAllTags(opts) {
  return useAuthenticatedQuery({
    queryKey: ['tags'],
    queryFn: () => getAllTags(),
    placeholderData: (prevData) => prevData,
    ...opts,
  });
}
