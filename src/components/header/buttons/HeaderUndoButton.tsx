import { HeaderActiveButton } from '@/components/ui/buttons';
import useHistoryControll from '@/hooks/useHistoryControll';
import { FaUndoAlt } from 'react-icons/fa';

const HeaderUndoButton = () => {
  const { undoHistory } = useHistoryControll();

  const undoHistoryHandler = () => {
    undoHistory();
  };

  return (
    <HeaderActiveButton onClick={undoHistoryHandler}>
      <FaUndoAlt className="h-full w-full" />
    </HeaderActiveButton>
  );
};

export default HeaderUndoButton;
