import { parseAsInteger, useQueryState } from 'nuqs';

import { useAuthenticatedQuery } from '@/hooks/use-authenticated-query';

import { getAllCustomers, getCustomers } from './service';

export function useCustomers(opts) {
  const [firstName] = useQueryState('firstName');
  const [lastName] = useQueryState('lastName');
  const [page] = useQueryState('page', parseAsInteger);
  const [perPage] = useQueryState('perPage', parseAsInteger);

  return useAuthenticatedQuery({
    queryKey: ['customers', { firstName, lastName, page, perPage }],
    queryFn: () => getCustomers({ firstName, lastName, page, perPage }),
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
