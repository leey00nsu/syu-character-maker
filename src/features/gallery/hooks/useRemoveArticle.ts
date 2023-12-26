import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { removeArticle } from '@/apis/article/article.api';

const useRemoveArticle = () => {
  const navigate = useNavigate();
  // 상세에서 좋아요 토글
  const { mutateAsync: remove } = useMutation({
    mutationKey: ['removeArticle'],
    retry: false,
    mutationFn: removeArticle,
    onSuccess: () => {
      navigate('/gallery');
    },
  });

  return {
    remove,
  };
};

export default useRemoveArticle;
