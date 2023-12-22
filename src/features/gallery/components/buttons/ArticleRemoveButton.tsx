import { FaTrashAlt } from 'react-icons/fa';

interface ArticleRemoveButtonProps {
  removeArticleHandler: () => void;
}

const ArticleRemoveButton = ({
  removeArticleHandler,
}: ArticleRemoveButtonProps) => {
  return (
    <button
      onClick={removeArticleHandler}
      className="btn-ghost btn h-6 min-h-0 w-6 p-0 hover:bg-transparent"
    >
      <FaTrashAlt className="h-full w-full text-accent" />
    </button>
  );
};

export default ArticleRemoveButton;
