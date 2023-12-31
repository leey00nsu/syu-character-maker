import axios from 'axios';

import { ArticleOrder, ArticleOrderBy } from '@/store/galleryStore';

import { ApiResponse } from '../response.type';
import {
  ArticleLimit,
  ArticlePagination,
  ListArticle,
  TotalArticleCount,
} from './article.type';

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
  author,
}: {
  pageParam: number;
  orderBy: ArticleOrderBy;
  order: ArticleOrder;
  author: boolean;
}) => {
  const response = await axios.get<ApiResponse<ArticlePagination>>(
    `${VITE_SERVER_HOST}/article?page=${pageParam}&orderBy=${orderBy}&order=${order}&author=${author}`,
    {
      withCredentials: true,
    },
  );

  return response.data;
};

export const getArticle = async ({ articleId }: { articleId: number }) => {
  const response = await axios.get<ApiResponse<ListArticle>>(
    `${VITE_SERVER_HOST}/article/${articleId}`,
    {
      withCredentials: true,
    },
  );

  return response.data;
};

export const removeArticle = async ({ articleId }: { articleId: number }) => {
  const response = await axios.delete<ApiResponse<unknown>>(
    `${VITE_SERVER_HOST}/article/${articleId}`,
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

export const getArticleLimit = async () => {
  const response = await axios.get<ApiResponse<ArticleLimit>>(
    `${VITE_SERVER_HOST}/article/limit`,
    {
      withCredentials: true,
    },
  );

  return response.data;
};

export const getTotalArticleCount = async () => {
  const response = await axios.get<ApiResponse<TotalArticleCount>>(
    `${VITE_SERVER_HOST}/article/total`,
    {
      withCredentials: true,
    },
  );

  return response.data;
};
