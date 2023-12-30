import { useAuthStore } from '@/store/authStore';

import useArticleFilter from '../../hooks/useArticleFilter';
import ArticleAuthorFilter from './ArticleAuthorFilter';
import ArticleDateFilter from './ArticleDateFilter';
import ArticleLikeCountFilter from './ArticleLikeCountFilter';

const ArticleFilter = () => {
  const { isAuth } = useAuthStore();
  const { filter, currentOrderBy, changeOrderBy, toggleOption, authorOption } =
    useArticleFilter();

  return (
    <ul className="menu menu-horizontal w-full justify-between gap-2 rounded-box bg-base-200 xs:justify-start">
      <ArticleDateFilter
        changeOrderByHandler={changeOrderBy.bind(this, 'date')}
        isActive={currentOrderBy === 'date'}
        order={filter.dateOrder}
      />
      <ArticleLikeCountFilter
        changeOrderByHandler={changeOrderBy.bind(this, 'likeCount')}
        isActive={currentOrderBy === 'likeCount'}
        order={filter.likeCountOrder}
      />
      {isAuth && (
        <ArticleAuthorFilter
          changeOrderByHandler={toggleOption.bind(this, 'author')}
          isActive={authorOption}
        />
      )}
    </ul>
  );
};

export default ArticleFilter;
