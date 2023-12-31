import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

import { LoadingDots } from '@/ui/loadings';

import useArticleFilter from '../../hooks/useArticleFilter';
import useGetArticleList from '../../hooks/useGetArticleList';
import ArticleItem from './ArticleItem';

const ArticleList = () => {
  const { currentOrderBy, currentOrder, authorOption } = useArticleFilter();

  const articleListRef = useRef<HTMLDivElement>(null);
  const { ref: observerRef, inView } = useInView({
    threshold: 0.1,
  });

  const { response, fetchNextPage, isFetching, isError, hasNextPage } =
    useGetArticleList();

  // 필터가 변경될 때마다 스크롤을 맨 위로 올림
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!isError && !isFetching && inView) {
      fetchNextPage();
    }
  }, [isError, isFetching, inView]);

  return (
    <div
      ref={articleListRef}
      className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5"
    >
      {response?.map((article, index) => (
        <ArticleItem
          key={
            currentOrderBy +
            currentOrder +
            authorOption +
            `article.id=${article.id}` +
            `index=${index}`
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
