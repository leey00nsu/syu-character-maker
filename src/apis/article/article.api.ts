import { ArticleOrder, ArticleOrderBy } from '@/store/gallery/filterSlice';

import axiosInstance from '../axios.config';
import { ApiResponse } from '../response.type';
import {
  ArticleLimit,
  ArticlePagination,
  ListArticle,
  TotalArticleCount,
} from './article.type';

const { VITE_SERVER_HOST } = import.meta.env;

export const uploadArticle = async (formData: FormData) => {
  const response = await axiosInstance.post<ApiResponse<unknown>>(
    `${VITE_SERVER_HOST}/article/upload`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
};

export const getArticleList = async ({
  pageParam,
  orderBy,
  order,
  author,
}: {
  pageParam: number;
  orderBy: ArticleOrderBy;
  order: ArticleOrder;
  author: boolean;
}) => {
  const response = await axiosInstance.get<ApiResponse<ArticlePagination>>(
    `${VITE_SERVER_HOST}/article?page=${pageParam}&orderBy=${orderBy}&order=${order}&author=${author}`,
  );

  return response.data;
};

export const getArticle = async ({ articleId }: { articleId: number }) => {
  const response = await axiosInstance.get<ApiResponse<ListArticle>>(
    `${VITE_SERVER_HOST}/article/${articleId}`,
  );

  return response.data;
};

export const removeArticle = async ({ articleId }: { articleId: number }) => {
  const response = await axiosInstance.delete<ApiResponse<unknown>>(
    `${VITE_SERVER_HOST}/article/${articleId}`,
  );

  return response.data;
};

export const toggleLikeArticle = async (articleId: number) => {
  const response = await axiosInstance.post<ApiResponse<unknown>>(
    `${VITE_SERVER_HOST}/article/${articleId}/like`,
    null,
  );

  return response.data;
};

export const getArticleLimit = async () => {
  const response = await axiosInstance.get<ApiResponse<ArticleLimit>>(
    `${VITE_SERVER_HOST}/article/limit`,
  );

  return response.data;
};

export const getTotalArticleCount = async () => {
  const response = await axiosInstance.get<ApiResponse<TotalArticleCount>>(
    `${VITE_SERVER_HOST}/article/total`,
  );

  return response.data;
};
