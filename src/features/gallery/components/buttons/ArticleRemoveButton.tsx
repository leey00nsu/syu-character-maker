import { FaTrashAlt } from 'react-icons/fa';

import { ActiveButton } from '@/ui/buttons';

interface ArticleRemoveButtonProps {
  removeArticleHandler: () => void;
}

const ArticleRemoveButton = ({
  removeArticleHandler,
}: ArticleRemoveButtonProps) => {
  return (
    <ActiveButton
      clickHandler={removeArticleHandler}
      className="btn-ghost btn h-6 min-h-0 w-6 p-0 hover:bg-transparent"
    >
      <FaTrashAlt className="h-full w-full text-accent" />
    </ActiveButton>
  );
};

export default ArticleRemoveButton;
