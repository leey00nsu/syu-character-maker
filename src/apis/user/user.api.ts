import axiosInstance from '../axios.config';
import { ApiResponse } from '../response.type';
import { TotalUserCount } from './user.type';

const { VITE_SERVER_HOST } = import.meta.env;

export const getTotalUserCount = async () => {
  const response = await axiosInstance.get<ApiResponse<TotalUserCount>>(
    `${VITE_SERVER_HOST}/user/total`,
  );

  return response.data;
};
