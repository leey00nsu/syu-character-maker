import tw from '@/utils/tw';
import { FaHeart } from 'react-icons/fa';

import { ArticleOrder } from '@/store/galleryStore';

interface ArticleLikeCountFilterProps {
  isActive: boolean;
  order: ArticleOrder;
  changeOrderByHandler: () => void;
}

const ArticleLikeCountFilter = ({
  isActive,
  order,
  changeOrderByHandler,
}: ArticleLikeCountFilterProps) => {
  const likeCountButtonDescription = order === 'ASC' ? '좋아요 ↓' : '좋아요 ↑';

  const iconClassNames = tw('h-3 w-3 xs:h-6 xs:w-6 text-accent');
  const classNames = tw(isActive && 'active hover:cursor-pointer');

  return (
    <li onClick={changeOrderByHandler}>
      <a className={classNames}>
        <FaHeart className={iconClassNames} />
        {likeCountButtonDescription}
      </a>
    </li>
  );
};

export default ArticleLikeCountFilter;
