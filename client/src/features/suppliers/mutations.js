import { useQueryClient } from '@tanstack/react-query';

import { useAuthenticatedMutation } from '@/hooks/use-authenticated-mutation';

import { addSupplier, deleteSupplier, deleteSuppliers, updateSupplier } from './service';

export function useAddSupplier(opts) {
  const queryClient = useQueryClient();

  return useAuthenticatedMutation({
    mutationFn: (data) => addSupplier(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['suppliers']);
    },
    ...opts,
  });
}

export function useUpdateSupplier(opts) {
  const queryClient = useQueryClient();

  return useAuthenticatedMutation({
    mutationFn: ({ id, updatedSupplier }) => updateSupplier(id, updatedSupplier),
    onSuccess: () => {
      queryClient.invalidateQueries(['suppliers']);
    },
    ...opts,
  });
}

export function useDeleteSupplier(opts) {
  const queryClient = useQueryClient();

  return useAuthenticatedMutation({
    mutationFn: (id) => deleteSupplier(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['suppliers']);
    },
    ...opts,
  });
}

export function useDeleteSuppliers(opts) {
  const queryClient = useQueryClient();

  return useAuthenticatedMutation({
    mutationFn: (ids) => deleteSuppliers(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(['suppliers']);
    },
    ...opts,
  });
}
