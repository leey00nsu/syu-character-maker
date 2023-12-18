import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';

import { toggleLikeArticle } from '@/apis/article/article.api';
import { ListArticle } from '@/apis/article/article.type';
import { ApiResponse } from '@/apis/response.type';

import { authState } from '@/store/authStore';

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
  const [auth] = useRecoilState(authState);
  const { mutateAsync: toggleLike } = useMutation({
    mutationKey: ['toggleLikeArticle'],
    retry: false,
    mutationFn: toggleLikeArticle,
    onMutate: async () => {
      // 모든 쿼리를 취소한다. (낙관적 업데이트가 덮어쓰지 않도록)
      await queryClient.cancelQueries({ queryKey: ['getArticleList'] });

      // 이전 쿼리 캐시를 저장한다.
      const previousArticleList = queryClient.getQueryData<
        ApiResponse<ListArticle[]>
      >(['getArticleList']);

      // 쿼리 데이터에 대하여 좋아요 상태를 업데이트한다.
      const updatedArticleList = previousArticleList?.data?.map(article => {
        if (article.id === id) {
          return {
            ...article,
            isLiked: !article.isLiked,
            likeCount: article.isLiked
              ? article.likeCount - 1
              : article.likeCount + 1,
          };
        }

        return article;
      });

      // 쿼리 데이터를 낙관적 업데이트한다.
      queryClient.setQueryData(
        ['getArticleList'],
        (old: ApiResponse<ListArticle[]>) => ({
          ...old,
          data: updatedArticleList,
        }),
      );

      // Return a context object with the snapshotted value
      return { previousArticleList };
    },
    onError: (err, _, context) => {
      // 에러 발생시 이전 데이터로 캐시 저장
      queryClient.setQueryData(['getArticleList'], {
        ...context?.previousArticleList,
      });
    },
    onSettled: () => {
      // 쿼리를 다시 요청한다.
      queryClient.invalidateQueries({ queryKey: ['getAllArticles'] });
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
      <div className="flex flex-col absolute w-full h-full justify-end text-end p-4 gap-1">
        <div className="flex justify-end bg-white bg-opacity-80 rounded-2xl ">
          <Paragraph size="sm" weight="medium" isEllipsis>
            {author}
          </Paragraph>
        </div>

        <div className="flex flex-row justify-end gap-1 bg-white bg-opacity-80 rounded-2xl">
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
