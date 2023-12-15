import { FaUndoAlt } from 'react-icons/fa';

import useHistoryControll from '@/hooks/useHistoryControll';

import { HeaderActiveButton } from '@/ui/buttons';

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
