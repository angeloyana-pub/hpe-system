import { useQueryClient } from '@tanstack/react-query';

import { useAuthenticatedMutation } from '@/hooks/use-authenticated-mutation';

import { addPurchase, deletePurchase, updatePurchase } from './service';

export function useAddPurchase(opts) {
  const queryClient = useQueryClient();

  return useAuthenticatedMutation({
    mutationFn: (data) => addPurchase(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['purchases']);
    },
    ...opts,
  });
}

export function useUpdatePurchase(opts) {
  const queryClient = useQueryClient();

  return useAuthenticatedMutation({
    mutationFn: ({ id, updatedPurchase }) => updatePurchase(id, updatedPurchase),
    onSuccess: () => {
      queryClient.invalidateQueries(['purchases']);
    },
    ...opts,
  });
}

export function useDeletePurchase(opts) {
  const queryClient = useQueryClient();

  return useAuthenticatedMutation({
    mutationFn: (id) => deletePurchase(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['purchases']);
    },
    ...opts,
  });
}
