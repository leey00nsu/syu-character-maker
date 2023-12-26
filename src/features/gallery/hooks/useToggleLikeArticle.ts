import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { produce } from 'immer';

import { toggleLikeArticle } from '@/apis/article/article.api';
import { ArticlePagination, ListArticle } from '@/apis/article/article.type';
import { ApiResponse } from '@/apis/response.type';

const useToggleLikeArticle = () => {
  const queryClient = useQueryClient();

  // 리스트에서 좋아요 토글
  const { mutateAsync: toggleListLike } = useMutation({
    mutationKey: ['toggleListLikeArticle'],
    retry: false,
    mutationFn: toggleLikeArticle,
    onMutate: async id => {
      // 모든 쿼리를 취소한다. (낙관적 업데이트가 덮어쓰지 않도록)
      await queryClient.cancelQueries({ queryKey: ['getArticleList'] }); // 리스트 쿼리 취소

      // 이전 쿼리 캐시를 저장한다.
      const [queries] = queryClient.getQueriesData<
        InfiniteData<ApiResponse<ArticlePagination>>
      >({ queryKey: ['getArticleList'] });

      const queryKeys = queries[0]; // 쿼리 키
      const previousInfiniteQuery = queries[1]; // 이전 쿼리 데이터

      // 쿼리 데이터에 대하여 좋아요 상태를 업데이트한다.
      const updatedArticleList = produce(previousInfiniteQuery, draft => {
        draft?.pages.forEach(page => {
          page.data?.articles.forEach(article => {
            if (article.id === id) {
              article.isLiked = !article.isLiked;
              article.likeCount += article.isLiked ? 1 : -1;
            }
          });
        });
      });

      // 쿼리 데이터를 낙관적 업데이트한다.
      queryClient.setQueryData(
        queryKeys,
        (old: InfiniteData<ApiResponse<ArticlePagination>>) => ({
          ...old,
          pages: updatedArticleList?.pages,
        }),
      );

      return { previousInfiniteQuery };
    },
    onError: (err, _, context) => {
      // 에러 발생시 쿼리 재요청
      queryClient.invalidateQueries({ queryKey: ['getArticleList'] });
    },
  });

  // 상세에서 좋아요 토글
  const { mutateAsync: toggleLike } = useMutation({
    mutationKey: ['toggleLikeArticle'],
    retry: false,
    mutationFn: toggleLikeArticle,
    onMutate: async id => {
      // 모든 쿼리를 취소한다. (낙관적 업데이트가 덮어쓰지 않도록)
      await queryClient.cancelQueries({ queryKey: ['getArticle', id] }); // 상세 쿼리 취소

      const previousArticle = queryClient.getQueryData<
        ApiResponse<ListArticle>
      >(['getArticle', id]);

      // 쿼리 데이터에 대하여 좋아요 상태를 업데이트한다.
      const uploadArticle = produce(previousArticle, draft => {
        const article = draft?.data;
        if (article) {
          article.isLiked = !article?.isLiked;
          article.likeCount += article?.isLiked ? 1 : -1;
        }
      });

      // 쿼리 데이터를 낙관적 업데이트한다.
      queryClient.setQueryData(['getArticle', id], uploadArticle);

      return { previousArticle, id };
    },
    onError: (err, _, context) => {
      // 에러 발생시 쿼리 재요청
      queryClient.invalidateQueries({ queryKey: ['getArticle', context?.id] });
    },
  });

  return {
    toggleListLike,
    toggleLike,
  };
};

export default useToggleLikeArticle;
