import { FaUndoAlt } from 'react-icons/fa';
import HeaderActiveButton from '../../ui/buttons/HeaderActiveButton';
import useHistoryControll from '../../../hooks/useHistoryControll';

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
