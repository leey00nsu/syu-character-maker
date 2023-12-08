import axios from 'axios';

const { VITE_SERVER_HOST } = import.meta.env;

export const getUser = async () => {
  const response = await axios.get(`${VITE_SERVER_HOST}/auth/user`, {
    withCredentials: true,
  });

  return response.data;
};

export const validateGoogleUser = async (code: string) => {
  const response = await axios.get(
    `${VITE_SERVER_HOST}/auth/google?code=${code}`,
    {
      withCredentials: true,
    },
  );

  return response.data;
};

export const logout = async () => {
  const response = await axios.get(`${VITE_SERVER_HOST}/auth/logout`, {
    withCredentials: true,
  });

  return response.data;
};
