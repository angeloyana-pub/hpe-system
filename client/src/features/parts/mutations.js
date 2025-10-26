import { useQueryClient } from '@tanstack/react-query';

import { useAuthenticatedMutation } from '@/hooks/use-authenticated-mutation';

import { addPart, deletePart, updatePart } from './service';

export function useAddPart(opts) {
  const queryClient = useQueryClient();

  return useAuthenticatedMutation({
    mutationFn: (data) => addPart(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['parts']);
    },
    ...opts,
  });
}

export function useUpdatePart(opts) {
  const queryClient = useQueryClient();

  return useAuthenticatedMutation({
    mutationFn: ({ id, updatedPart }) => updatePart(id, updatedPart),
    onSuccess: () => {
      queryClient.invalidateQueries(['parts']);
    },
    ...opts,
  });
}

export function useDeletePart(opts) {
  const queryClient = useQueryClient();

  return useAuthenticatedMutation({
    mutationFn: (id) => deletePart(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['parts']);
    },
    ...opts,
  });
}
