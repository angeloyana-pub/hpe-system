import { useQueryClient } from '@tanstack/react-query';

import { addSupplier, deleteSupplier, getSuppliers, updateSupplier } from '@/api/supplier';

import { useAuthenticatedMutation } from './use-authenticated-mutation';
import { useAuthenticatedQuery } from './use-authenticated-query';

export function useSuppliers(opts) {
  return useAuthenticatedQuery({
    queryKey: ['suppliers'],
    queryFn: getSuppliers,
    ...opts,
  });
}

export function useAddSupplier(opts) {
  const queryClient = useQueryClient();

  return useAuthenticatedMutation({
    mutationFn: addSupplier,
    onSuccess: () => {
      queryClient.invalidateQueries(['suppliers']);
    },
    ...opts,
  });
}

export function useUpdateSupplier(opts) {
  const queryClient = useQueryClient();

  return useAuthenticatedMutation({
    mutationFn: updateSupplier,
    onSuccess: () => {
      queryClient.invalidateQueries(['suppliers']);
    },
    ...opts,
  });
}

export function useDeleteSupplier(opts) {
  const queryClient = useQueryClient();

  return useAuthenticatedMutation({
    mutationFn: deleteSupplier,
    onSuccess: () => {
      queryClient.invalidateQueries(['suppliers']);
    },
    ...opts,
  });
}
