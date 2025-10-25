import { useQueryClient } from '@tanstack/react-query';

import { addPurchase, deletePurchase, getPurchases, updatePurchase } from '@/api/purchase';

import { useAuthenticatedMutation } from './use-authenticated-mutation';
import { useAuthenticatedQuery } from './use-authenticated-query';

export function usePurchases(opts) {
  return useAuthenticatedQuery({
    queryKey: ['purchases'],
    queryFn: getPurchases,
    ...opts,
  });
}

export function useAddPurchase(opts) {
  const queryClient = useQueryClient();

  return useAuthenticatedMutation({
    mutationFn: addPurchase,
    onSuccess: () => {
      queryClient.invalidateQueries(['purchases']);
    },
    ...opts,
  });
}

export function useUpdatePurchase(opts) {
  const queryClient = useQueryClient();

  return useAuthenticatedMutation({
    mutationFn: updatePurchase,
    onSuccess: () => {
      queryClient.invalidateQueries(['purchases']);
    },
    ...opts,
  });
}

export function useDeletePurchase(opts) {
  const queryClient = useQueryClient();

  return useAuthenticatedMutation({
    mutationFn: deletePurchase,
    onSuccess: () => {
      queryClient.invalidateQueries(['purchases']);
    },
    ...opts,
  });
}
