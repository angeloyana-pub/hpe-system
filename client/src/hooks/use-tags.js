import { useQueryClient } from '@tanstack/react-query';

import { addTag, deleteTag, getTags, updateTag } from '@/api/tag';

import { useAuthenticatedMutation } from './use-authenticated-mutation';
import { useAuthenticatedQuery } from './use-authenticated-query';

export function useTags(opts) {
  return useAuthenticatedQuery({
    queryKey: ['tags'],
    queryFn: getTags,
    ...opts,
  });
}

export function useAddTag(opts) {
  const queryClient = useQueryClient();

  return useAuthenticatedMutation({
    mutationFn: addTag,
    onSuccess: () => {
      queryClient.invalidateQueries(['tags']);
    },
    ...opts,
  });
}

export function useUpdateTag(opts) {
  const queryClient = useQueryClient();

  return useAuthenticatedMutation({
    mutationFn: updateTag,
    onSuccess: () => {
      queryClient.invalidateQueries(['tags']);
    },
    ...opts,
  });
}

export function useDeleteTag(opts) {
  const queryClient = useQueryClient();

  return useAuthenticatedMutation({
    mutationFn: deleteTag,
    onSuccess: () => {
      queryClient.invalidateQueries(['tags']);
    },
    ...opts,
  });
}
