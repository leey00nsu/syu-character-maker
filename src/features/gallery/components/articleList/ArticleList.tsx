import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

import { LoadingDots } from '@/ui/loadings';

import useArticleFilter from '../../hooks/useArticleFilter';
import useGetArticleList from '../../hooks/useGetArticleList';
import ArticleItem from './ArticleItem';

const ArticleList = () => {
  const { filter, currentOrderBy, currentOrder } = useArticleFilter();

  const articleListRef = useRef<HTMLDivElement>(null);
  const { ref: observerRef, inView } = useInView({
    threshold: 0.1,
  });

  const { response, fetchNextPage, isFetching, isError, hasNextPage } =
    useGetArticleList();

  useEffect(() => {
    articleListRef.current?.scrollTo(0, 0);
  }, [currentOrderBy, currentOrder, filter.author]);

  useEffect(() => {
    if (!isError && !isFetching && inView) {
      fetchNextPage();
    }
  }, [isError, isFetching, inView]);

  return (
    <div
      ref={articleListRef}
      className="grid-auto-rows-max hidden-scroll mb-2 grid grid-cols-1 gap-4 overflow-y-scroll  xs:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5"
    >
      {response?.map((article, index) => (
        <ArticleItem
          key={
            currentOrderBy + currentOrder + filter.author + article.id + index
          }
          article={article}
        />
      ))}
      {hasNextPage && (
        <div ref={observerRef}>{isFetching && <LoadingDots />}</div>
      )}
    </div>
  );
};

export default ArticleList;
