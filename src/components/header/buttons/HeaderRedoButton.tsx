import { FaRedoAlt } from 'react-icons/fa';
import useHistoryControll from '../../../hooks/useHistoryControll';
import ActiveButton from '../../ui/buttons/ActiveButton';

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
