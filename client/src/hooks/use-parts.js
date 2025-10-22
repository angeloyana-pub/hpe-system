import { useQueryClient } from '@tanstack/react-query';
import { useMutation, useQuery } from '@tanstack/react-query';

import { addPart, deletePart, getParts, updatePart } from '@/api/part';

export function useParts(opts) {
  return useQuery({
    queryKey: ['parts'],
    queryFn: getParts,
    ...opts,
  });
}

export function useAddPart(opts) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addPart,
    onSuccess: () => {
      queryClient.invalidateQueries(['parts']);
    },
    ...opts,
  });
}

export function useUpdatePart(opts) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePart,
    onSuccess: () => {
      queryClient.invalidateQueries(['parts']);
    },
    ...opts,
  });
}

export function useDeletePart(opts) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePart,
    onSuccess: () => {
      queryClient.invalidateQueries(['parts']);
    },
    ...opts,
  });
}
