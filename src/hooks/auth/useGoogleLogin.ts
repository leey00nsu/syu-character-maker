import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { googleLoginWithCode } from '@/apis/auth/auth.api';

import { useAuthStore } from '@/store/authStore';

const useGoogleLogin = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore(state => state.setAuth);
  const setUser = useAuthStore(state => state.setUser);

  const {
    data: response,
    isError,
    error,
    mutateAsync,
  } = useMutation({
    mutationKey: ['googleLoginWithCode'],
    retry: false,
    mutationFn: googleLoginWithCode,
  });

  useEffect(() => {
    if (isError) {
      navigate('/', { replace: true });
    }
    if (response) {
      if (response.statusCode === 200 && response.data) {
        setAuth(true);
        setUser(response.data);
        navigate('/', { replace: true });
      } else {
        console.log(response.message);
      }
    }
  }, [isError, response]);

  return mutateAsync;
};

export default useGoogleLogin;
