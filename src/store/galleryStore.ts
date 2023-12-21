import { StateCreator, create } from 'zustand';

import { ArticleOrder } from '@/apis/article/article.type';

export type Order = 'date' | 'like';

interface FilterSlice {
  orderBy: Order;
  dateOrder: ArticleOrder;
  likeOrder: ArticleOrder;
  setOrderBy: (changes: Order) => void;
  setDateOrder: (changes: ArticleOrder) => void;
  setLikeOrder: (changes: ArticleOrder) => void;
}

const createFilterSlice: StateCreator<FilterSlice> = set => ({
  orderBy: 'date',
  dateOrder: 'ASC',
  likeOrder: 'DESC',
  setOrderBy: (changes: Order) => set(state => ({ orderBy: changes })),
  setDateOrder: (changes: ArticleOrder) =>
    set(state => ({ dateOrder: changes })),
  setLikeOrder: (changes: ArticleOrder) =>
    set(state => ({ likeOrder: changes })),
});

export const useFilterStore = create<FilterSlice>()((...a) => ({
  ...createFilterSlice(...a),
}));
