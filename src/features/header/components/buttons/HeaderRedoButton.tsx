import { HeaderActiveButton } from '@/ui/buttons';
import useHistoryControll from '@/hooks/useHistoryControll';
import { FaRedoAlt } from 'react-icons/fa';

const HeaderUndoButton = () => {
  const { redoHistory } = useHistoryControll();

  const redoHistoryHandler = () => {
    redoHistory();
  };

  return (
    <HeaderActiveButton onClick={redoHistoryHandler}>
      <FaRedoAlt className="h-full w-full" />
    </HeaderActiveButton>
  );
};

export default HeaderUndoButton;
