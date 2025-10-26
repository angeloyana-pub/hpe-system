import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

export function useAuthenticatedMutation(opts) {
  const navigate = useNavigate();

  return useMutation({
    ...opts,
    onError: (err) => {
      opts?.onError?.(err);
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        toast.error('Session expired, please login.');
        navigate('/login');
      }
    },
  });
}
