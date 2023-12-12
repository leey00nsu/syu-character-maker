import axios from 'axios';

const { VITE_SERVER_HOST } = import.meta.env;

export const uploadPost = async (formData: FormData) => {
  const response = await axios.post(
    `${VITE_SERVER_HOST}/posts/upload`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    },
  );

  return response.data;
};
