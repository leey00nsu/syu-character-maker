import { useQuery } from '@tanstack/react-query';

import { getTotalArticleCount } from '@/apis/article/article.api';

const useGetTotalArticleCount = () => {
  const { data: totalArticleCount, isLoading } = useQuery({
    queryKey: ['totalArticleCount'],
    queryFn: getTotalArticleCount,
    retry: false,
    select: data => data.data,
  });

  return { totalArticleCount, isLoading };
};

export default useGetTotalArticleCount;
