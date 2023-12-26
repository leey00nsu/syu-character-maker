import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { logout } from '@/apis/auth/auth.api';

import { useAuthStore } from '@/store/authStore';

const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const setAuth = useAuthStore(state => state.setAuth);
  const setUser = useAuthStore(state => state.setUser);

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
    const logout = async () => {
      if (isError) {
        console.log(error);
      }
      if (response) {
        if (response.statusCode === 200) {
          console.log('logout');
          setAuth(false);
          setUser({
            name: '',
            email: '',
            photo: '',
          });
          navigate('/', { replace: true });
        } else {
          console.log(response.message);
        }
      }
    };

    logout();
  }, [isError, response]);

  return mutateAsync;
};

export default useLogout;
