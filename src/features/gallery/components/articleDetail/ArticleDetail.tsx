import { ListArticle } from '@/apis/article/article.type';

import { Image } from '@/ui/images';
import { Paragraph } from '@/ui/texts';

import { ArticleLikeToggleButton } from '../buttons';

interface ArticleDetailProps {
  response: ListArticle;
  toggleLikeHandler: () => void;
}

const ArticleDetail = ({ response, toggleLikeHandler }: ArticleDetailProps) => {
  const formattedDate = new Intl.DateTimeFormat('ko', {
    dateStyle: 'long',
  }).format(new Date(response.createdAt));

  return (
    <div className="flex flex-col justify-between gap-2">
      <div className="flex justify-center">
        <Paragraph size="md" weight="medium" ellipsis>
          {response.canvasName}
        </Paragraph>
      </div>

      <div className="flex aspect-square ">
        <Image imgUrl={response.imageUrl} />
      </div>

      <div className="flex flex-col justify-end p-2 text-end">
        <Paragraph size="lg" weight="light" ellipsis>
          {response.author.name}
        </Paragraph>
        <Paragraph size="lg" weight="light" ellipsis>
          {formattedDate}
        </Paragraph>
        <div className="flex flex-row items-center justify-end gap-1 rounded-xl bg-white bg-opacity-80 ">
          <Paragraph size="xl" weight="light" ellipsis>
            {response.likeCount}
          </Paragraph>
          <ArticleLikeToggleButton
            isLiked={response.isLiked}
            toggleHandler={toggleLikeHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
