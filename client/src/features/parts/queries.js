import { parseAsArrayOf, parseAsInteger, useQueryState } from 'nuqs';

import { useAuthenticatedQuery } from '@/hooks/use-authenticated-query';

import { getAllParts, getParts } from './service';

export function useParts(props) {
  const { queryKeys, ...opts } = props ?? {};
  const [id] = useQueryState(queryKeys?.id ?? 'id', parseAsInteger);
  const [name] = useQueryState(queryKeys?.name ?? 'name');
  const [tagIds] = useQueryState(
    queryKeys?.tagIds ?? 'tagIds',
    parseAsArrayOf(parseAsInteger).withDefault([])
  );
  const [page] = useQueryState(queryKeys?.page ?? 'page', parseAsInteger);
  const [perPage] = useQueryState(queryKeys?.perPage ?? 'perPage', parseAsInteger);

  return useAuthenticatedQuery({
    queryKey: ['parts', { id, name, page, perPage, tagIds }],
    queryFn: () => getParts({ id, name, page, perPage, tagIds }),
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
