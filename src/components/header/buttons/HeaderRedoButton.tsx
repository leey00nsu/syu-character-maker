import ActiveButton from '@/components/ui/buttons/ActiveButton';
import useHistoryControll from '@/hooks/useHistoryControll';
import { FaRedoAlt } from 'react-icons/fa';

const HeaderUndoButton = () => {
  const { redoHistory } = useHistoryControll();

  const redoHistoryHandler = () => {
    redoHistory();
  };

  return (
    <ActiveButton onClick={redoHistoryHandler}>
      <FaRedoAlt className="h-full w-full" />
    </ActiveButton>
  );
};

export default HeaderUndoButton;
