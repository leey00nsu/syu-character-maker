import { useAuthStore } from '@/store/authStore';

import LikeToggleButton from '@/ui/buttons/LikeToggleButton';
import { Card } from '@/ui/cards';
import { Image } from '@/ui/images';
import { Paragraph } from '@/ui/texts';

import useToggleLikeArticle from '../../hooks/useToggleLikeArticle';

interface ArticleItemProps {
  id: number;
  imgUrl: string;
  likeCount: number;
  author: string;
  isLiked: boolean;
  createdAt: Date;
}

const ArticleItem = ({
  id,
  imgUrl,
  author,
  likeCount,
  isLiked,
  createdAt,
}: ArticleItemProps) => {
  const auth = useAuthStore(state => state.isAuth);

  const { toggleLike } = useToggleLikeArticle();

  const toggleLikeHandler = async () => {
    if (auth) {
      await toggleLike(id);
    }
  };

  const formattedDate = new Intl.DateTimeFormat('ko', {
    dateStyle: 'long',
  }).format(new Date(createdAt));

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
