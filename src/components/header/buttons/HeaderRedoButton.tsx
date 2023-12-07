import { FaRedoAlt } from 'react-icons/fa';
import useHistoryControll from '../../../hooks/useHistoryControll';
import HeaderActiveButton from '../../ui/buttons/HeaderActiveButton';

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
