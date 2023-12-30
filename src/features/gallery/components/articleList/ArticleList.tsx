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
    articleListRef.current?.scrollTo(0, 0);
  }, [currentOrderBy, currentOrder, authorOption]);

  // 저장된 스크롤 위치로 이동
  useEffect(() => {
    const srollY = sessionStorage.getItem('scrollY');

    if (srollY) {
      articleListRef.current?.scrollTo(0, Number(srollY));
    }
  }, []);

  useEffect(() => {
    if (!isError && !isFetching && inView) {
      fetchNextPage();
    }
  }, [isError, isFetching, inView]);

  // 스크롤 위치 저장
  const scrollHandler = () => {
    sessionStorage.setItem(
      'scrollY',
      articleListRef.current?.scrollTop.toString() || '0',
    );
  };

  return (
    <div
      ref={articleListRef}
      onScroll={scrollHandler}
      className="custom-scroll-bar grid grid-cols-2 gap-4 overflow-y-scroll p-4 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5"
    >
      {response?.map((article, index) => (
        <ArticleItem
          key={
            currentOrderBy +
            currentOrder +
            authorOption +
            `article.id = ${article.id}` +
            index
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
