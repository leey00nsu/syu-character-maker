import { FaUndoAlt } from 'react-icons/fa';
import ActiveButton from '../../ui/buttons/ActiveButton';
import useHistoryControll from '../../../hooks/useHistoryControll';

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
