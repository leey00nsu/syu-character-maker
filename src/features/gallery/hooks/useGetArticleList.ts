import { useInfiniteQuery } from '@tanstack/react-query';

import { getArticleList } from '@/apis/article/article.api';
import { ListArticle } from '@/apis/article/article.type';

import { useFilterStore } from '@/store/galleryStore';

const useGetArticleList = () => {
  const orderBy = useFilterStore(state => state.orderBy);
  const dateOrder = useFilterStore(state => state.dateOrder);
  const likeOrder = useFilterStore(state => state.likeOrder);

  const {
    data: response,
    fetchNextPage,
    isLoading,
    isError,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['getArticleList', orderBy, dateOrder, likeOrder],
    retry: 1,
    queryFn: ({ pageParam }) =>
      getArticleList({
        pageParam,
        orderBy,
        order: orderBy === 'date' ? dateOrder : likeOrder,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages, lastPageParam) => {
      return lastPage.data?.meta.lastPage === lastPageParam
        ? undefined
        : lastPageParam + 1;
    },
    select(data) {
      const articles: ListArticle[] = [];

      // articles 평탄화
      data.pages.forEach(page => articles.push(...page?.data?.articles!));

      return articles;
    },
  });

  return {
    response,
    fetchNextPage,
    isLoading,
    isError,
    hasNextPage,
  };
};

export default useGetArticleList;
