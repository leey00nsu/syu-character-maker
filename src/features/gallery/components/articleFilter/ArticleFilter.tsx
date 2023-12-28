import useArticleFilter from '../../hooks/useArticleFilter';
import ArticleAuthorFilter from './ArticleAuthorFilter';
import ArticleDateFilter from './ArticleDateFilter';
import ArticleLikeCountFilter from './ArticleLikeCountFilter';

const ArticleFilter = () => {
  const { filter, currentOrderBy, changeOrderBy, toggleOption } =
    useArticleFilter();

  return (
    <ul className="menu menu-horizontal w-full justify-between rounded-box bg-base-200 p-4 sm:justify-start sm:gap-2">
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
      <ArticleAuthorFilter
        changeOrderByHandler={toggleOption.bind(this, 'author')}
        isActive={filter.author}
      />
    </ul>
  );
};

export default ArticleFilter;
