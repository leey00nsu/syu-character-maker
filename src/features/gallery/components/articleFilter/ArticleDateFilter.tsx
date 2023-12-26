import { FaRegClock } from 'react-icons/fa';
import { twJoin } from 'tailwind-merge';

import { ArticleOrder } from '@/apis/article/article.type';

import { Order } from '@/store/galleryStore';

interface ArticleDateFilterProps {
  orderBy: Order;
  dateOrder: ArticleOrder;
  changeOrderHandler: () => void;
}

const ArticleDateFilter = ({
  orderBy,
  dateOrder,
  changeOrderHandler,
}: ArticleDateFilterProps) => {
  const dateButtonDescription = dateOrder === 'ASC' ? '오래된순' : '최신순';

  return (
    <li onClick={changeOrderHandler}>
      <a
        className={twJoin(
          orderBy === 'date' ? 'active hover:cursor-pointer' : 'text-black',
        )}
      >
        <FaRegClock className="h-6 w-6 " />
        {dateButtonDescription}
      </a>
    </li>
  );
};

export default ArticleDateFilter;
