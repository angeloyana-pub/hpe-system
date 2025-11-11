import { useQueryClient } from '@tanstack/react-query';

import { useAuthenticatedMutation } from '@/hooks/use-authenticated-mutation';

import { addCustomer, deleteCustomer, deleteCustomers, updateCustomer } from './service';

export function useAddCustomer(opts) {
  const queryClient = useQueryClient();

  return useAuthenticatedMutation({
    mutationFn: (data) => addCustomer(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['customers']);
    },
    ...opts,
  });
}

export function useUpdateCustomer(opts) {
  const queryClient = useQueryClient();

  return useAuthenticatedMutation({
    mutationFn: ({ id, updatedCustomer }) => updateCustomer(id, updatedCustomer),
    onSuccess: () => {
      queryClient.invalidateQueries(['customers']);
    },
    ...opts,
  });
}

export function useDeleteCustomer(opts) {
  const queryClient = useQueryClient();

  return useAuthenticatedMutation({
    mutationFn: (id) => deleteCustomer(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['customers']);
    },
    ...opts,
  });
}

export function useDeleteCustomers(opts) {
  const queryClient = useQueryClient();

  return useAuthenticatedMutation({
    mutationFn: (ids) => deleteCustomers(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(['customers']);
    },
    ...opts,
  });
}
