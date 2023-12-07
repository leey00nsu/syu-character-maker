import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import React from 'react';
import { useRecoilState } from 'recoil';
import { authState, userState } from '../store/authStore';
import { googleLogin } from '../apis/auth.api';

const useGoogleAuth = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const [user, setUser] = useRecoilState(userState);

  const getGoogleCode = useGoogleLogin({
    flow: 'auth-code',
    ux_mode: 'redirect',
    redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URL,
  });

  const login = async (code: string) => {
    const response = await googleLogin(code);
    if (response && response.statusCode === 200) {
      setAuth(true);
      setUser(response.user);
    } else {
      console.log(response.message);
    }
  };

  return { getGoogleCode, login };
};

export default useGoogleAuth;
