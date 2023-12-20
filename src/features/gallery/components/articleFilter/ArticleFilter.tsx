import { FaHeart, FaRegClock } from 'react-icons/fa';
import { twJoin } from 'tailwind-merge';

import { Order, useFilterStore } from '@/store/galleryStore';

const ArticleFilter = () => {
  const orderBy = useFilterStore(state => state.orderBy);
  const setOrderBy = useFilterStore(state => state.setOrderBy);
  const dateOrder = useFilterStore(state => state.dateOrder);
  const setDateOrder = useFilterStore(state => state.setDateOrder);
  const likeOrder = useFilterStore(state => state.likeOrder);
  const setLikeOrder = useFilterStore(state => state.setLikeOrder);

  const dateButtonDescription = dateOrder === 'ASC' ? '오래된순' : '최신순';
  const likeButtonDescription = likeOrder === 'ASC' ? '좋아요 ↓' : '좋아요 ↑';

  const changeOrderHandler = (target: Order) => {
    if (target === orderBy) {
      if (target === 'date')
        setDateOrder(dateOrder === 'DESC' ? 'ASC' : 'DESC');
      if (target === 'like')
        setLikeOrder(likeOrder === 'DESC' ? 'ASC' : 'DESC');
    }
    setOrderBy(target);
  };

  return (
    <div className="w-full p-4">
      <ul className="menu menu-horizontal w-full justify-start gap-2 rounded-box bg-base-200 p-4">
        <li onClick={changeOrderHandler.bind(this, 'date')}>
          <a
            className={twJoin(
              orderBy === 'date' ? 'active hover:cursor-pointer' : 'text-black',
            )}
          >
            <FaRegClock className="h-6 w-6 " />
            {dateButtonDescription}
          </a>
        </li>
        <li onClick={changeOrderHandler.bind(this, 'like')}>
          <a
            className={twJoin(
              orderBy === 'like' ? 'active hover:cursor-pointer' : '',
            )}
          >
            <FaHeart className="h-6 w-6 text-accent" />
            {likeButtonDescription}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ArticleFilter;
