import { useQueryClient } from '@tanstack/react-query';

import { useAuthenticatedMutation } from '@/hooks/use-authenticated-mutation';

import { addOrder } from './service';

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
