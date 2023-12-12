import ActiveButton from '@/components/ui/buttons/ActiveButton';
import useHistoryControll from '@/hooks/useHistoryControll';
import { FaUndoAlt } from 'react-icons/fa';

const HeaderUndoButton = () => {
  const { undoHistory } = useHistoryControll();

  const undoHistoryHandler = () => {
    undoHistory();
  };

  return (
    <ActiveButton onClick={undoHistoryHandler}>
      <FaUndoAlt className="h-full w-full" />
    </ActiveButton>
  );
};

export default HeaderUndoButton;
