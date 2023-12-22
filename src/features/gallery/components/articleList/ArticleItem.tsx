import { useNavigate } from 'react-router-dom';

import { ListArticle } from '@/apis/article/article.type';

import { useAuthStore } from '@/store/authStore';

import LikeToggleButton from '@/ui/buttons/LikeToggleButton';
import { Card } from '@/ui/cards';
import { Image } from '@/ui/images';
import { Paragraph } from '@/ui/texts';

import useToggleLikeArticle from '../../hooks/useToggleLikeArticle';

interface ArticleItemProps {
  article: ListArticle;
}

const ArticleItem = ({ article }: ArticleItemProps) => {
  const navigate = useNavigate();
  const auth = useAuthStore(state => state.isAuth);

  const { toggleListLike } = useToggleLikeArticle();

  const toggleLikeHandler = async (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    if (auth) {
      await toggleListLike(article.id);
    }
  };

  const clickCardHandler = () => {
    navigate(`/gallery/${article.id}`);
  };

  return (
    <Card clickHandler={clickCardHandler}>
      <Image imgUrl={article.imageUrl} />
      <div className="absolute flex h-full w-full flex-col justify-end gap-1 p-4 text-end">
        <div className="flex h-6 items-center justify-end rounded-2xl bg-white bg-opacity-80 px-2 ">
          <Paragraph size="sm" weight="light" ellipsis>
            {article.canvasName}
          </Paragraph>
        </div>

        <div className="flex h-6 flex-row items-center justify-end gap-1 rounded-2xl bg-white bg-opacity-80 px-2">
          <Paragraph size="sm" weight="light" ellipsis>
            {article.likeCount}
          </Paragraph>
          <LikeToggleButton
            isLiked={article.isLiked}
            toggleHandler={toggleLikeHandler}
          />
        </div>
      </div>
    </Card>
  );
};

export default ArticleItem;
