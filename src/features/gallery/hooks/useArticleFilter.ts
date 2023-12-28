import {
  ArticleOption,
  ArticleOrderBy,
  useFilterStore,
} from '@/store/galleryStore';

const useArticleFilter = () => {
  const filter = useFilterStore(state => state.filter);
  const setFilter = useFilterStore(state => state.setFilter);

  // 리스트의 정렬 기준을 변경한다.
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

  // 날짜 정렬 순서를 변경한다.
  const toggleDateOrder = () => {
    setFilter({
      ...filter,
      dateOrder: filter.dateOrder === 'ASC' ? 'DESC' : 'ASC',
    });
  };

  // 좋아요 정렬 순서를 변경한다.
  const toggleLikeCountOrder = () => {
    setFilter({
      ...filter,
      likeCountOrder: filter.likeCountOrder === 'ASC' ? 'DESC' : 'ASC',
    });
  };

  // 옵션을 토글한다.
  const toggleOption = (changes: ArticleOption) => {
    if (changes === 'author') {
      setFilter({
        ...filter,
        author: !filter.author,
      });
    }
  };

  // 현재 정렬 기준의 정렬 순서를 가져온다.
  const getCurrentOrder = () => {
    if (filter.orderBy === 'date') return filter.dateOrder;
    if (filter.orderBy === 'likeCount') return filter.likeCountOrder;
    return 'DESC';
  };

  return {
    filter,
    currentOrderBy: filter.orderBy,
    currentOrder: getCurrentOrder(),
    authorOption: filter.author,
    changeOrderBy,
    toggleOption,
  };
};

export default useArticleFilter;
