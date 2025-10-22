import { useQueryClient } from '@tanstack/react-query';
import { useMutation, useQuery } from '@tanstack/react-query';

import { addPurchase, deletePurchase, getPurchases, updatePurchase } from '@/api/purchase';

export function usePurchases(opts) {
  return useQuery({
    queryKey: ['purchases'],
    queryFn: getPurchases,
    ...opts,
  });
}

export function useAddPurchase(opts) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addPurchase,
    onSuccess: () => {
      queryClient.invalidateQueries(['purchases']);
    },
    ...opts,
  });
}

export function useUpdatePurchase(opts) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePurchase,
    onSuccess: () => {
      queryClient.invalidateQueries(['purchases']);
    },
    ...opts,
  });
}

export function useDeletePurchase(opts) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePurchase,
    onSuccess: () => {
      queryClient.invalidateQueries(['purchases']);
    },
    ...opts,
  });
}
