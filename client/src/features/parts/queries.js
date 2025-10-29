import { parseAsArrayOf, parseAsInteger, useQueryState } from 'nuqs';

import { useAuthenticatedQuery } from '@/hooks/use-authenticated-query';

import { getAllParts, getParts } from './service';

export function useParts(opts) {
  const [name] = useQueryState('name');
  const [tagIds] = useQueryState('tagIds', parseAsArrayOf(parseAsInteger).withDefault([]));
  const [page] = useQueryState('page', parseAsInteger);
  const [perPage] = useQueryState('perPage', parseAsInteger);

  return useAuthenticatedQuery({
    queryKey: ['parts', { name, page, perPage, tagIds }],
    queryFn: () => getParts({ name, page, perPage, tagIds }),
    placeholderData: (prevData) => prevData,
    ...opts,
  });
}

export function useAllParts(opts) {
  return useAuthenticatedQuery({
    queryKey: ['parts'],
    queryFn: () => getAllParts(),
    placeholderData: (prevData) => prevData,
    ...opts,
  });
}
