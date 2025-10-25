import { useQueryClient } from '@tanstack/react-query';

import { addOrder, deleteOrder, getOrders, updateOrder } from '@/api/order';

import { useAuthenticatedMutation } from './use-authenticated-mutation';
import { useAuthenticatedQuery } from './use-authenticated-query';

export function useOrders(opts) {
  return useAuthenticatedQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
    ...opts,
  });
}

export function useAddOrder(opts) {
  const queryClient = useQueryClient();

  return useAuthenticatedMutation({
    mutationFn: addOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
    },
    ...opts,
  });
}

export function useUpdateOrder(opts) {
  const queryClient = useQueryClient();

  return useAuthenticatedMutation({
    mutationFn: updateOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
    },
    ...opts,
  });
}

export function useDeleteOrder(opts) {
  const queryClient = useQueryClient();

  return useAuthenticatedMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
    },
    ...opts,
  });
}
