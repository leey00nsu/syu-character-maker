import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import useGetArticleList from '../../hooks/useGetArticleList';
import ArticleItem from './ArticleItem';

const ArticleList = () => {
  const {
    ref: observerRef,
    inView,
    entry,
  } = useInView({
    threshold: 0.5,
  });

  const { response, fetchNextPage, isLoading, isError } = useGetArticleList();

  useEffect(() => {
    if (!isError && !isLoading && inView) fetchNextPage();
  }, [isError, isLoading, inView]);

  return (
    <div className="grid-auto-rows-max grid grid-cols-1 gap-4 overflow-y-scroll p-4 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
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
