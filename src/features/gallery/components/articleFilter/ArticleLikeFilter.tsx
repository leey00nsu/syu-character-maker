import { FaHeart } from 'react-icons/fa';
import { twJoin } from 'tailwind-merge';

import { ArticleOrder } from '@/apis/article/article.type';

import { Order } from '@/store/galleryStore';

interface ArticleDateFilterProps {
  orderBy: Order;
  likeOrder: ArticleOrder;
  changeOrderHandler: () => void;
}

const ArticleDateFilter = ({
  orderBy,
  likeOrder,
  changeOrderHandler,
}: ArticleDateFilterProps) => {
  const likeButtonDescription = likeOrder === 'ASC' ? '좋아요 ↓' : '좋아요 ↑';

  return (
    <li onClick={changeOrderHandler}>
      <a
        className={twJoin(
          orderBy === 'like' ? 'active hover:cursor-pointer' : '',
        )}
      >
        <FaHeart className="h-6 w-6 text-accent" />
        {likeButtonDescription}
      </a>
    </li>
  );
};

export default ArticleDateFilter;
