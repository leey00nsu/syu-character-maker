import axios from 'axios';

const { VITE_SERVER_HOST } = import.meta.env;

export const isLogin = async () => {
  const response = await axios.get(`${VITE_SERVER_HOST}/auth/isLogin`, {
    withCredentials: true,
  });

  return response.data;
};

export const googleLogin = async (code: string) => {
  const response = await axios.get(
    `${VITE_SERVER_HOST}/auth/google?code=${code}`,
    {
      withCredentials: true,
    },
  );

  return response.data;
};
