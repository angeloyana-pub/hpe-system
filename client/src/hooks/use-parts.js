import { useQueryClient } from '@tanstack/react-query';

import { addPart, deletePart, getParts, updatePart } from '@/api/part';

import { useAuthenticatedMutation } from './use-authenticated-mutation';
import { useAuthenticatedQuery } from './use-authenticated-query';

export function useParts(opts) {
  return useAuthenticatedQuery({
    queryKey: ['parts'],
    queryFn: getParts,
    ...opts,
  });
}

export function useAddPart(opts) {
  const queryClient = useQueryClient();

  return useAuthenticatedMutation({
    mutationFn: addPart,
    onSuccess: () => {
      queryClient.invalidateQueries(['parts']);
    },
    ...opts,
  });
}

export function useUpdatePart(opts) {
  const queryClient = useQueryClient();

  return useAuthenticatedMutation({
    mutationFn: updatePart,
    onSuccess: () => {
      queryClient.invalidateQueries(['parts']);
    },
    ...opts,
  });
}

export function useDeletePart(opts) {
  const queryClient = useQueryClient();

  return useAuthenticatedMutation({
    mutationFn: deletePart,
    onSuccess: () => {
      queryClient.invalidateQueries(['parts']);
    },
    ...opts,
  });
}
