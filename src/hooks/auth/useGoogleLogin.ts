import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { googleLoginWithCode } from '@/apis/auth.api';

import { authState, userState } from '@/store/authStore';

const useGoogleLogin = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useRecoilState(authState);
  const [user, setUser] = useRecoilState(userState);

  const {
    data: loginData,
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
    if (loginData) {
      if (loginData.statusCode === 200) {
        setAuth(true);
        setUser(loginData.user);
        navigate('/');
      } else {
        console.log(loginData.message);
      }
    }
  }, [isError, loginData]);

  return mutateAsync;
};

export default useGoogleLogin;
