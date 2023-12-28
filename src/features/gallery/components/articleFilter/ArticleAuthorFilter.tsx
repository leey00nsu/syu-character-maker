import tw from '@/utils/tw';
import { FaUserEdit } from 'react-icons/fa';

interface ArticleAuthorFilterProps {
  isActive: boolean;
  changeOrderByHandler: () => void;
}

const ArticleAuthorFilter = ({
  isActive,
  changeOrderByHandler,
}: ArticleAuthorFilterProps) => {
  const likeCountButtonDescription = '내 그림';

  const classNames = tw(isActive && 'active hover:cursor-pointer');

  return (
    <li onClick={changeOrderByHandler}>
      <a className={classNames}>
        <FaUserEdit className="h-6 w-6 " />
        {likeCountButtonDescription}
      </a>
    </li>
  );
};

export default ArticleAuthorFilter;
