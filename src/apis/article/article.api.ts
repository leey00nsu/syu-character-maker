import axios from 'axios';

import { ApiResponse } from '../response.type';
import { ListArticle } from './article.type';

const { VITE_SERVER_HOST } = import.meta.env;

export const uploadArticle = async (formData: FormData) => {
  const response = await axios.post<ApiResponse<unknown>>(
    `${VITE_SERVER_HOST}/article/upload`,
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

export const getArticleList = async () => {
  const response = await axios.get<ApiResponse<ListArticle[]>>(
    `${VITE_SERVER_HOST}/article`,
    {
      withCredentials: true,
    },
  );

  return response.data;
};
