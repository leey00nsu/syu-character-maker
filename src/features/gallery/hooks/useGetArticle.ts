import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { getArticle } from '@/apis/article/article.api';

const useGetArticle = () => {
  const articleId = Number(useParams().articleId);

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['getArticle', articleId],
    retry: false,
    queryFn: () => getArticle({ articleId }),
    select(data) {
      return data.data;
    },
  });

  return {
    response,
    isLoading,
    isError,
  };
};

export default useGetArticle;
