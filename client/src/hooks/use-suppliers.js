import { useQueryClient } from '@tanstack/react-query';
import { useMutation, useQuery } from '@tanstack/react-query';

import { addSupplier, deleteSupplier, getSuppliers, updateSupplier } from '@/api/supplier';

export function useSuppliers(opts) {
  return useQuery({
    queryKey: ['suppliers'],
    queryFn: getSuppliers,
    ...opts,
  });
}

export function useAddSupplier(opts) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addSupplier,
    onSuccess: () => {
      queryClient.invalidateQueries(['suppliers']);
    },
    ...opts,
  });
}

export function useUpdateSupplier(opts) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSupplier,
    onSuccess: () => {
      queryClient.invalidateQueries(['suppliers']);
    },
    ...opts,
  });
}

export function useDeleteSupplier(opts) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSupplier,
    onSuccess: () => {
      queryClient.invalidateQueries(['suppliers']);
    },
    ...opts,
  });
}
