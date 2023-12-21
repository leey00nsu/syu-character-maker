import { User } from '../auth/auth.type';

export interface ListArticle {
  id: number;

  canvasName: string;

  author: User;

  imageUrl: string;

  isLiked: boolean;

  likeCount: number;

  createdAt: Date;
}

export interface ArticlePagination {
  articles: ListArticle[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
  };
}

export type ArticleOrder = 'ASC' | 'DESC';
