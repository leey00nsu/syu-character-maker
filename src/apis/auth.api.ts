import axios from 'axios';

export const isLogin = async () => {
  const response = await axios.get('http://localhost:3000/auth/isLogin', {
    withCredentials: true,
  });

  return response.data;
};

export const googleLogin = async (code: string) => {
  const response = await axios.get(
    `http://localhost:3000/auth/google?code=${code}`,
    {
      withCredentials: true,
    },
  );

  return response.data;
};
