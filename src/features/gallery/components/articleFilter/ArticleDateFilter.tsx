import tw from '@/utils/tw';
import { FaRegClock } from 'react-icons/fa';

import { ArticleOrder } from '@/store/galleryStore';

interface ArticleDateFilterProps {
  isActive: boolean;
  order: ArticleOrder;
  changeOrderByHandler: () => void;
}

const ArticleDateFilter = ({
  isActive,
  order,
  changeOrderByHandler,
}: ArticleDateFilterProps) => {
  const dateButtonDescription = order === 'ASC' ? '오래된순' : '최신순';

  const iconClassNames = tw('h-3 w-3 xs:h-6 xs:w-6');
  const classNames = tw(isActive && 'active hover:cursor-pointer');

  return (
    <li onClick={changeOrderByHandler}>
      <a className={classNames}>
        <FaRegClock className={iconClassNames} />
        {dateButtonDescription}
      </a>
    </li>
  );
};

export default ArticleDateFilter;
