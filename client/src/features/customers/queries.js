import { parseAsInteger, useQueryState } from 'nuqs';

import { useAuthenticatedQuery } from '@/hooks/use-authenticated-query';

import { getAllCustomers, getCustomers } from './service';

export function useCustomers(opts) {
  const [id] = useQueryState('id', parseAsInteger);
  const [firstName] = useQueryState('firstName');
  const [lastName] = useQueryState('lastName');
  const [page] = useQueryState('page', parseAsInteger);
  const [perPage] = useQueryState('perPage', parseAsInteger);

  return useAuthenticatedQuery({
    queryKey: ['customers', { id, firstName, lastName, page, perPage }],
    queryFn: () => getCustomers({ id, firstName, lastName, page, perPage }),
    placeholderData: (prevData) => prevData,
    ...opts,
  });
}

export function useAllCustomers(opts) {
  return useAuthenticatedQuery({
    queryKey: ['customers'],
    queryFn: () => getAllCustomers(),
    placeholderData: (prevData) => prevData,
    ...opts,
  });
}
