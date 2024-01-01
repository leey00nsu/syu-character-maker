import tw from '@/utils/tw';

import { useAuthStore } from '@/store/authStore';

import { Paragraph } from '@/ui/texts';

import useArticleFilter from '../../hooks/useArticleFilter';
import ArticleAuthorFilter from './ArticleAuthorFilter';
import ArticleDateFilter from './ArticleDateFilter';
import ArticleLikeCountFilter from './ArticleLikeCountFilter';

const ArticleFilter = () => {
  const { isAuth } = useAuthStore();
  const { filter, currentOrderBy, changeOrderBy, toggleOption, authorOption } =
    useArticleFilter();

  const classNames = tw(
    'relative menu menu-vertical xs:menu-horizontal w-full justify-between gap-2 rounded-box bg-base-200 xs:justify-start',
    !isAuth && 'justify-start',
  );

  return (
    <ul className={classNames}>
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
      <Paragraph
        className="absolute -top-10 w-full py-4 text-start"
        size="xs"
        weight="light"
      >
        필터를 두 번 누르면 기준을 변경할 수 있어요!
      </Paragraph>
    </ul>
  );
};

export default ArticleFilter;
