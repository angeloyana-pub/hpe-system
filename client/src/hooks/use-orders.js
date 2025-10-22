import { useQueryClient } from '@tanstack/react-query';
import { useMutation, useQuery } from '@tanstack/react-query';

import { addOrder, deleteOrder, getOrders, updateOrder } from '@/api/order';

export function useOrders(opts) {
  return useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
    ...opts,
  });
}

export function useAddOrder(opts) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
    },
    ...opts,
  });
}

export function useUpdateOrder(opts) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
    },
    ...opts,
  });
}

export function useDeleteOrder(opts) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
    },
    ...opts,
  });
}
