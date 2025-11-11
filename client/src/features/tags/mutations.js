import { useQueryClient } from '@tanstack/react-query';

import { useAuthenticatedMutation } from '@/hooks/use-authenticated-mutation';

import { addTag, deleteTag, deleteTags, updateTag } from './service';

export function useAddTag(opts) {
  const queryClient = useQueryClient();

  return useAuthenticatedMutation({
    mutationFn: (data) => addTag(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['tags']);
    },
    ...opts,
  });
}

export function useUpdateTag(opts) {
  const queryClient = useQueryClient();

  return useAuthenticatedMutation({
    mutationFn: ({ id, updatedTag }) => updateTag(id, updatedTag),
    onSuccess: () => {
      queryClient.invalidateQueries(['tags']);
    },
    ...opts,
  });
}

export function useDeleteTag(opts) {
  const queryClient = useQueryClient();

  return useAuthenticatedMutation({
    mutationFn: (id) => deleteTag(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['tags']);
    },
    ...opts,
  });
}

export function useDeleteTags(opts) {
  const queryClient = useQueryClient();

  return useAuthenticatedMutation({
    mutationFn: (ids) => deleteTags(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(['tags']);
    },
    ...opts,
  });
}
