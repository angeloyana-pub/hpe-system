import { parseAsInteger, useQueryState } from 'nuqs';

import { useAuthenticatedQuery } from '@/hooks/use-authenticated-query';

import { getAllSuppliers, getSuppliers } from './service';

export function useSuppliers(opts) {
  const [id] = useQueryState('id', parseAsInteger);
  const [name] = useQueryState('name');
  const [page] = useQueryState('page', parseAsInteger);
  const [perPage] = useQueryState('perPage', parseAsInteger);

  return useAuthenticatedQuery({
    queryKey: ['suppliers', { id, name, page, perPage }],
    queryFn: () => getSuppliers({ id, name, page, perPage }),
    placeholderData: (prevData) => prevData,
    ...opts,
  });
}

export function useAllSuppliers(opts) {
  return useAuthenticatedQuery({
    queryKey: ['suppliers'],
    queryFn: () => getAllSuppliers(),
    placeholderData: (prevData) => prevData,
    ...opts,
  });
}
