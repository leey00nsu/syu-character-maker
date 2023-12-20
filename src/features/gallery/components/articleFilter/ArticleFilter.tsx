import { Order, useFilterStore } from '@/store/galleryStore';

import ArticleDateFilter from './ArticleDateFilter';
import ArticleLikeFilter from './ArticleLikeFilter';

const ArticleFilter = () => {
  const orderBy = useFilterStore(state => state.orderBy);
  const setOrderBy = useFilterStore(state => state.setOrderBy);
  const dateOrder = useFilterStore(state => state.dateOrder);
  const setDateOrder = useFilterStore(state => state.setDateOrder);
  const likeOrder = useFilterStore(state => state.likeOrder);
  const setLikeOrder = useFilterStore(state => state.setLikeOrder);

  const changeOrderHandler = (changes: Order) => {
    // 현재 정렬 기준과 같은 경우, 정렬 순서를 바꿔준다.
    if (changes === orderBy) {
      if (changes === 'date')
        setDateOrder(dateOrder === 'DESC' ? 'ASC' : 'DESC');
      if (changes === 'like')
        setLikeOrder(likeOrder === 'DESC' ? 'ASC' : 'DESC');
    }
    setOrderBy(changes);
  };

  return (
    <div className="w-full p-4">
      <ul className="menu menu-horizontal w-full justify-start gap-2 rounded-box bg-base-200 p-4">
        <ArticleDateFilter
          changeOrderHandler={changeOrderHandler.bind(this, 'date')}
          orderBy={orderBy}
          dateOrder={dateOrder}
        />
        <ArticleLikeFilter
          changeOrderHandler={changeOrderHandler.bind(this, 'like')}
          orderBy={orderBy}
          likeOrder={likeOrder}
        />
      </ul>
    </div>
  );
};

export default ArticleFilter;
