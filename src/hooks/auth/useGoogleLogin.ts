import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { googleLoginWithCode } from '@/apis/auth/auth.api';

import { authState, userState } from '@/store/authStore';

const useGoogleLogin = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useRecoilState(authState);
  const [user, setUser] = useRecoilState(userState);

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
      console.log(error);
      navigate('/');
    }
    if (response) {
      if (response.statusCode === 200 && response.data) {
        setAuth(true);
        setUser(response.data);
        navigate('/');
      } else {
        console.log(response.message);
      }
    }
  }, [isError, response]);

  return mutateAsync;
};

export default useGoogleLogin;
