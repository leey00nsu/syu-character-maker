import axios from 'axios';

import { ApiResponse } from '../response.type';
import { User } from './auth.type';

const { VITE_SERVER_HOST } = import.meta.env;

export const getUser = async () => {
  const response = await axios.get<ApiResponse<User>>(
    `${VITE_SERVER_HOST}/auth/user`,
  );

  return response.data;
};

export const googleLoginWithCode = async (code: string) => {
  const response = await axios.post<ApiResponse<User>>(
    `${VITE_SERVER_HOST}/auth/google?code=${code}`,
    null,
  );

  return response.data;
};

export const logout = async () => {
  const response = await axios.post<ApiResponse<unknown>>(
    `${VITE_SERVER_HOST}/auth/logout`,
    null,
  );

  return response.data;
};
