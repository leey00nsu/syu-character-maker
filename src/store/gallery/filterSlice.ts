import { StateCreator } from 'zustand';

export interface FilterSlice {
  filter: Filter;
  setFilter: (changes: Filter) => void;
}

export type ArticleOrder = 'ASC' | 'DESC';
export type ArticleOrderBy = 'date' | 'likeCount';
export type ArticleOption = 'author';

export interface Filter {
  orderBy: ArticleOrderBy;
  dateOrder: ArticleOrder;
  likeCountOrder: ArticleOrder;
  author: boolean; // 내가 쓴 글 보는 옵션
}

const DEFAULT_Filter: Filter = {
  orderBy: 'date',
  dateOrder: 'DESC',
  likeCountOrder: 'DESC',
  author: false,
};

export const createFilterSlice: StateCreator<FilterSlice> = set => ({
  filter: DEFAULT_Filter,
  setFilter: (changes: Filter) => set(state => ({ filter: changes })),
});
