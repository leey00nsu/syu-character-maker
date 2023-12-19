import { useQuery } from '@tanstack/react-query';

import { getArticleList } from '@/apis/article/article.api';

import ArticleItem from './ArticleItem';

const ArticleList = () => {
  const { data: response } = useQuery({
    queryKey: ['getArticleList'],
    queryFn: getArticleList,
  });

  return (
    <div className="grid grid-auto-rows-max grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4 overflow-y-auto">
      {response?.data?.map(article => (
        <ArticleItem
          key={article.id}
          id={article.id}
          imgUrl={article.imageUrl}
          isLiked={article.isLiked}
          likeCount={article.likeCount}
          author={article.author.name}
        />
      ))}
    </div>
  );
};

export default ArticleList;
