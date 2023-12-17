import LikeToggleButton from '@/ui/buttons/LikeToggleButton';
import { Card } from '@/ui/cards';
import { Image } from '@/ui/images';
import { Paragraph } from '@/ui/texts';

interface ArticleItemProps {
  imgUrl: string;
  likeCount: number;
  author: string;
  isLiked: boolean;
}

const ArticleItem = ({ imgUrl, author, likeCount, isLiked }: ArticleItemProps) => {
  const toggleLikeHandler = () => {};
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
