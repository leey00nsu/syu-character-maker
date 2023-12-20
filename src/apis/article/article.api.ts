import axios from 'axios';

import { ApiResponse } from '../response.type';
import { ArticleOrder, ArticlePagination } from './article.type';

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

export const getArticleList = async ({
  pageParam,
  orderBy,
  order,
}: {
  pageParam: number;
  orderBy: string;
  order: ArticleOrder;
}) => {
  const response = await axios.get<ApiResponse<ArticlePagination>>(
    `${VITE_SERVER_HOST}/article?page=${pageParam}&orderBy=${orderBy}&order=${order}`,
    {
      withCredentials: true,
    },
  );

  return response.data;
};

export const toggleLikeArticle = async (articleId: number) => {
  const response = await axios.post<ApiResponse<unknown>>(
    `${VITE_SERVER_HOST}/article/${articleId}/like`,
    null,
    {
      withCredentials: true,
    },
  );

  return response.data;
};
