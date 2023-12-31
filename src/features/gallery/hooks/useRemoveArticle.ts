import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { removeArticle } from '@/apis/article/article.api';

const useRemoveArticle = () => {
  const navigate = useNavigate();
  // 상세에서 좋아요 토글
  const { mutateAsync: removeMutate } = useMutation({
    mutationKey: ['removeArticle'],
    retry: false,
    mutationFn: removeArticle,
    onSuccess: () => {
      navigate('/gallery');
      toast.success('그림을 삭제했습니다.');
    },
  });

  return {
    removeMutate,
  };
};

export default useRemoveArticle;
