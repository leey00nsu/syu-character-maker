import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { removeArticle } from '@/apis/article/article.api';

import { TOAST_MESSAGE } from './../../../constants/toast';

const useRemoveArticle = () => {
  const navigate = useNavigate();
  // 상세에서 좋아요 토글
  const { mutateAsync: removeMutate } = useMutation({
    mutationKey: ['removeArticle'],
    retry: false,
    mutationFn: removeArticle,
    onSuccess: () => {
      navigate('/gallery');
      toast.success(TOAST_MESSAGE.REMOVE_ARTICLE);
    },
  });

  return {
    removeMutate,
  };
};

export default useRemoveArticle;
