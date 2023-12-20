import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { produce } from 'immer';

import { toggleLikeArticle } from '@/apis/article/article.api';
import { ArticlePagination } from '@/apis/article/article.type';
import { ApiResponse } from '@/apis/response.type';

import { useAuthStore } from '@/store/authStore';

import LikeToggleButton from '@/ui/buttons/LikeToggleButton';
import { Card } from '@/ui/cards';
import { Image } from '@/ui/images';
import { Paragraph } from '@/ui/texts';

interface ArticleItemProps {
  id: number;
  imgUrl: string;
  likeCount: number;
  author: string;
  isLiked: boolean;
}

const ArticleItem = ({
  id,
  imgUrl,
  author,
  likeCount,
  isLiked,
}: ArticleItemProps) => {
  const queryClient = useQueryClient();
  const auth = useAuthStore(state => state.isAuth);
  const { mutateAsync: toggleLike } = useMutation({
    mutationKey: ['toggleLikeArticle'],
    retry: false,
    mutationFn: toggleLikeArticle,
    onMutate: async () => {
      // 모든 쿼리를 취소한다. (낙관적 업데이트가 덮어쓰지 않도록)
      await queryClient.cancelQueries({ queryKey: ['getArticleList'] });

      // 이전 쿼리 캐시를 저장한다.
      const [queries] = queryClient.getQueriesData<
        InfiniteData<ApiResponse<ArticlePagination>>
      >({ queryKey: ['getArticleList'] });

      const queryKeys = queries[0];
      const previousInfiniteQuery = queries[1];

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

      // Return a context object with the snapshotted value
      return { previousInfiniteQuery };
    },
    onError: (err, _, context) => {
      // 에러 발생시 쿼리 재요청
      queryClient.invalidateQueries({ queryKey: ['getArticleList'] });
    },
    onSettled: () => {
      // 쿼리를 다시 요청한다.
      queryClient.invalidateQueries({ queryKey: ['getArticleList'] });
    },
  });

  const toggleLikeHandler = async () => {
    if (auth) {
      toggleLike(id);
    }
  };

  return (
    <Card>
      <Image imgUrl={imgUrl} />
      <div className="absolute flex h-full w-full flex-col justify-end gap-1 p-4 text-end">
        <div className="flex justify-end rounded-2xl bg-white bg-opacity-80 ">
          <Paragraph size="sm" weight="medium" isEllipsis>
            {author}
          </Paragraph>
        </div>

        <div className="flex flex-row justify-end gap-1 rounded-2xl bg-white bg-opacity-80">
          <Paragraph size="sm" weight="medium" isEllipsis>
            {likeCount}
          </Paragraph>
          <LikeToggleButton
            isLiked={isLiked}
            toggleHandler={toggleLikeHandler}
          />
        </div>
      </div>
    </Card>
  );
};

export default ArticleItem;
