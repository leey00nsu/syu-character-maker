import { useQuery } from '@tanstack/react-query';

import { getTotalUserCount } from '@/apis/user/user.api';

const useGetTotalUserCount = () => {
  const { data: totalUserCount, isLoading } = useQuery({
    queryKey: ['totalUserCount'],
    queryFn: getTotalUserCount,
    retry: false,
    select: data => data.data,
  });

  return { totalUserCount, isLoading };
};

export default useGetTotalUserCount;
