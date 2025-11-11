import { useQueryClient } from '@tanstack/react-query';

import { useAuthenticatedMutation } from '@/hooks/use-authenticated-mutation';

import { addOrder, deleteOrder, deleteOrders, updateOrder } from './service';

export function useAddOrder(opts) {
  const queryClient = useQueryClient();

  return useAuthenticatedMutation({
    mutationFn: (data) => addOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
    },
    ...opts,
  });
}

export function useUpdateOrder(opts) {
  const queryClient = useQueryClient();

  return useAuthenticatedMutation({
    mutationFn: ({ id, updatedOrder }) => updateOrder(id, updatedOrder),
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
    },
    ...opts,
  });
}

export function useDeleteOrder(opts) {
  const queryClient = useQueryClient();

  return useAuthenticatedMutation({
    mutationFn: (id) => deleteOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
    },
    ...opts,
  });
}

export function useDeleteOrders(opts) {
  const queryClient = useQueryClient();

  return useAuthenticatedMutation({
    mutationFn: (ids) => deleteOrders(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
    },
    ...opts,
  });
}
