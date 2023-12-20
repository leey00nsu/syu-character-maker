import { User } from '../auth/auth.type';

export interface ListArticle {
  id: number;

  author: User;

  imageUrl: string;

  isLiked: boolean;

  likeCount: number;

  createdAt: Date;
}

export interface Article {
  id: number;

  author: User;

  imageUrl: string;

  likedBy: LikedBy[];

  createdAt: Date;
}

export interface LikedBy {
  userId?: User;

  articleId?: Article;
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
