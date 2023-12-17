import { Article, LikedBy } from '../article/article.type';

export interface User {
  name: string;

  email: string;

  photo: string;

  articles: Article[];

  likedArticles: LikedBy[];
}
