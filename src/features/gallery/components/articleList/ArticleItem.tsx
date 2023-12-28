import { motion } from 'framer-motion';
import { FaUserEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { ListArticle } from '@/apis/article/article.type';

import { useAuthStore } from '@/store/authStore';

import { Card } from '@/ui/cards';
import { Image } from '@/ui/images';
import { Paragraph } from '@/ui/texts';

import useToggleLikeArticle from '../../hooks/useToggleLikeArticle';
import { ArticleLikeToggleButton } from '../buttons';

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
    <motion.div
      transition={{ delay: 0.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card clickHandler={clickCardHandler}>
        <Image imgUrl={article.imageUrl} />
        {article.isAuthor && (
          <div className="absolute right-0 top-0 flex p-4">
            <FaUserEdit className="h-6 w-6 text-neutral" />
          </div>
        )}

        <div className="absolute bottom-0 flex h-16 w-full flex-col justify-center bg-white/80 p-2  ">
          <div className="flex w-full justify-end">
            <Paragraph size="sm" weight="light" ellipsis>
              {article.canvasName}
            </Paragraph>
          </div>
          <div className="flex flex-row justify-end gap-1">
            <Paragraph size="sm" weight="light" ellipsis>
              {article.likeCount}
            </Paragraph>
            <ArticleLikeToggleButton
              isLiked={article.isLiked}
              toggleHandler={toggleLikeHandler}
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ArticleItem;
