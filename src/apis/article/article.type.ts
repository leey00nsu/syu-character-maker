import { User } from '../auth/auth.type';

export interface ListArticle {
  id: number;

  author: User;

  imageUrl: string;

  likedBy: LikedBy[];

  createdAt: Date;
}

export interface Article {
  id: number;

  title: string;

  content: string;

  author: User;

  imageUrl: string;

  likedBy: LikedBy[];

  createdAt: Date;
}

export interface LikedBy {
  userId?: User;

  articleId?: Article;
}
