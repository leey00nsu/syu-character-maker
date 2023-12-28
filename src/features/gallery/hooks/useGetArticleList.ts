import { useInfiniteQuery } from '@tanstack/react-query';

import { getArticleList } from '@/apis/article/article.api';
import { ListArticle } from '@/apis/article/article.type';

import useArticleFilter from './useArticleFilter';

const useGetArticleList = () => {
  const { filter, currentOrderBy, currentOrder } = useArticleFilter();

  const {
    data: response,
    fetchNextPage,
    isLoading,
    isError,
    isFetching,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['getArticleList', currentOrderBy, currentOrder, filter.author],
    retry: false,
    queryFn: ({ pageParam }) =>
      getArticleList({
        pageParam,
        orderBy: currentOrderBy,
        order: currentOrder,
        author: filter.author,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages, lastPageParam) => {
      if (!lastPage.data?.meta.lastPage) return undefined;

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
    isFetching,
    isLoading,
    isError,
    hasNextPage,
  };
};

export default useGetArticleList;
