import { StateCreator, create } from 'zustand';

export type ArticleOrder = 'ASC' | 'DESC';
export type ArticleOrderBy = 'date' | 'likeCount';
export type ArticleOption = 'author';

interface FilterSlice {
  filter: Filter;
  setFilter: (changes: Filter) => void;
}

interface Filter {
  orderBy: ArticleOrderBy;
  dateOrder: ArticleOrder;
  likeCountOrder: ArticleOrder;
  author: boolean;
}

const DEFAULT_Filter: Filter = {
  orderBy: 'date',
  dateOrder: 'DESC',
  likeCountOrder: 'DESC',
  author: false,
};

const createFilterSlice: StateCreator<FilterSlice> = set => ({
  filter: DEFAULT_Filter,
  setFilter: (changes: Filter) => set(state => ({ filter: changes })),
});

export const useFilterStore = create<FilterSlice>()((...a) => ({
  ...createFilterSlice(...a),
}));
