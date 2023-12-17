import axios from 'axios';

import { ApiResponse } from '../response.type';
import { User } from './auth.type';

const { VITE_SERVER_HOST } = import.meta.env;

export const getUser = async () => {
  const response = await axios.get<ApiResponse<User>>(
    `${VITE_SERVER_HOST}/auth/user`,
    {
      withCredentials: true,
    },
  );

  return response.data;
};

export const googleLoginWithCode = async (code: string) => {
  const response = await axios.get<ApiResponse<User>>(
    `${VITE_SERVER_HOST}/auth/google?code=${code}`,
    {
      withCredentials: true,
    },
  );

  return response.data;
};

export const logout = async () => {
  const response = await axios.get<ApiResponse<unknown>>(
    `${VITE_SERVER_HOST}/auth/logout`,
    {
      withCredentials: true,
    },
  );

  return response.data;
};
