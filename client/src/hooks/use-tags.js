import { useQueryClient } from '@tanstack/react-query';
import { useMutation, useQuery } from '@tanstack/react-query';

import { addTag, deleteTag, getTags, updateTag } from '@/api/tag';

export function useTags(opts) {
  return useQuery({
    queryKey: ['tags'],
    queryFn: getTags,
    ...opts,
  });
}

export function useAddTag(opts) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTag,
    onSuccess: () => {
      queryClient.invalidateQueries(['tags']);
    },
    ...opts,
  });
}

export function useUpdateTag(opts) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTag,
    onSuccess: () => {
      queryClient.invalidateQueries(['tags']);
    },
    ...opts,
  });
}

export function useDeleteTag(opts) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTag,
    onSuccess: () => {
      queryClient.invalidateQueries(['tags']);
    },
    ...opts,
  });
}
