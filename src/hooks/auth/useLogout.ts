import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { logout } from '@/apis/auth/auth.api';

import { useAuthStore } from '@/store/authStore';

const useLogout = () => {
  const setAuth = useAuthStore(state => state.setAuth);
  const setUser = useAuthStore(state => state.setUser);
  const queryClient = useQueryClient();

  const {
    data: response,
    isError,
    error,
    mutateAsync,
  } = useMutation({
    mutationKey: ['logout'],
    retry: false,
    mutationFn: logout,
  });

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
    if (response) {
      if (response.statusCode === 200) {
        console.log('logout');
        queryClient.removeQueries({ queryKey: ['validateAuth'] });
        setAuth(false);
        setUser({
          name: '',
          email: '',
          photo: '',
        });
      } else {
        console.log(response.message);
      }
    }
  }, [isError, response]);

  return mutateAsync;
};

export default useLogout;
