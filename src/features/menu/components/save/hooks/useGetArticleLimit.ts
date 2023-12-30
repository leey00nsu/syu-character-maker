import { useQuery } from '@tanstack/react-query';

import { getArticleLimit } from '@/apis/article/article.api';

const useGetArticleLimit = () => {
  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['articleLimit'],
    retry: false,
    queryFn: getArticleLimit,
    select(data) {
      return data.data;
    },
  });
  return { response };
};

export default useGetArticleLimit;
