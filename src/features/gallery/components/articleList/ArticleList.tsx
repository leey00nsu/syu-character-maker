import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { getArticleList } from '@/apis/article/article.api';

import { useFilterStore } from '@/store/galleryStore';

import ArticleItem from './ArticleItem';

const ArticleList = () => {
  const orderBy = useFilterStore(state => state.orderBy);
  const dateOrder = useFilterStore(state => state.dateOrder);
  const likeOrder = useFilterStore(state => state.likeOrder);

  const {
    ref: observerRef,
    inView,
    entry,
  } = useInView({
    threshold: 0.5,
  });

  const {
    data: response,
    fetchNextPage,
    refetch,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['getArticleList', orderBy, dateOrder, likeOrder],
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
  });

  useEffect(() => {
    if (!isLoading && inView) fetchNextPage();
  }, [isLoading, inView]);

  return (
    <div className="grid-auto-rows-max grid grid-cols-1 gap-4 overflow-y-auto p-4 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {response?.pages?.map((page, index) => (
        <React.Fragment key={index}>
          {page?.data?.articles.map(article => (
            <ArticleItem
              key={article.id}
              id={article.id}
              imgUrl={article.imageUrl}
              isLiked={article.isLiked}
              likeCount={article.likeCount}
              author={article.author.name}
            />
          ))}
        </React.Fragment>
      ))}
      <div ref={observerRef}></div>
    </div>
  );
};

export default ArticleList;
