import {
  ArticleOption,
  ArticleOrderBy,
  useFilterStore,
} from '@/store/galleryStore';

const useArticleFilter = () => {
  const filter = useFilterStore(state => state.filter);
  const setFilter = useFilterStore(state => state.setFilter);

  const changeOrderBy = (changes: ArticleOrderBy) => {
    const isChanged = changes !== filter.orderBy;

    if (isChanged) {
      setFilter({
        ...filter,
        orderBy: changes,
      });
    }

    // 현재 정렬 기준과 같은 경우, 정렬 순서를 바꿔준다.
    if (!isChanged) {
      if (changes === 'date') toggleDateOrder();
      if (changes === 'likeCount') toggleLikeCountOrder();
    }
  };

  const toggleDateOrder = () => {
    setFilter({
      ...filter,
      dateOrder: filter.dateOrder === 'ASC' ? 'DESC' : 'ASC',
    });
  };

  const toggleLikeCountOrder = () => {
    setFilter({
      ...filter,
      likeCountOrder: filter.likeCountOrder === 'ASC' ? 'DESC' : 'ASC',
    });
  };

  const toggleOption = (changes: ArticleOption) => {
    if (changes === 'author') {
      setFilter({
        ...filter,
        author: !filter.author,
      });
    }
  };

  const getCurrentOrder = () => {
    if (filter.orderBy === 'date') return filter.dateOrder;
    if (filter.orderBy === 'likeCount') return filter.likeCountOrder;
    return 'DESC';
  };

  return {
    filter,
    currentOrderBy: filter.orderBy,
    currentOrder: getCurrentOrder(),
    changeOrderBy,
    toggleOption,
  };
};

export default useArticleFilter;
