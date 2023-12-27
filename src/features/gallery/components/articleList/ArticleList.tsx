import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useFilterStore } from '@/store/galleryStore';

import { LoadingDots } from '@/ui/loadings';

import useGetArticleList from '../../hooks/useGetArticleList';
import ArticleItem from './ArticleItem';

const ArticleList = () => {
  const { ref: observerRef, inView } = useInView({
    threshold: 0.2,
  });

  const orderBy = useFilterStore(state => state.orderBy);
  const likeOrder = useFilterStore(state => state.likeOrder);
  const dateOrder = useFilterStore(state => state.dateOrder);

  const { response, fetchNextPage, isLoading, isError, hasNextPage } =
    useGetArticleList();

  useEffect(() => {
    if (!isError && !isLoading && inView) {
      fetchNextPage();
    }
  }, [isError, isLoading, inView]);

  return (
    <div className="grid-auto-rows-max grid grid-cols-1 gap-4 overflow-y-scroll p-4 xs:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6">
      {response?.map((article, index) => (
        <ArticleItem
          key={likeOrder + dateOrder + orderBy + index}
          article={article}
        />
      ))}
      {hasNextPage && (
        <div ref={observerRef}>{isLoading && <LoadingDots />}</div>
      )}
    </div>
  );
};

export default ArticleList;
