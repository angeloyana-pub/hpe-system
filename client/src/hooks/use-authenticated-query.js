import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

export function useAuthenticatedQuery(opts) {
  const navigate = useNavigate();
  const query = useQuery(opts);
  const { isError, error } = query;

  useEffect(() => {
    if (isError && axios.isAxiosError(error) && error.response?.status === 401) {
      toast.error('Session expired, please login.');
      navigate('/login');
    }
  }, [isError, error]);

  return query;
}
