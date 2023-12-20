import { FaUndoAlt } from 'react-icons/fa';
import { twJoin } from 'tailwind-merge';

import { useCanvasStore } from '@/store/canvasStore';

import useHistoryControll from '@/hooks/canvas/useHistoryControll';

import { HeaderActiveButton } from '@/ui/buttons';

const HeaderUndoButton = () => {
  const canvasObjectHistoryIndex = useCanvasStore(
    state => state.canvasObjectHistoryIndex,
  );
  const { undoHistory } = useHistoryControll();

  const undoHistoryHandler = () => {
    undoHistory();
  };

  const isUndoAbled = canvasObjectHistoryIndex !== 0;

  return (
    <HeaderActiveButton onClick={undoHistoryHandler}>
      <FaUndoAlt
        className={twJoin(
          'h-full w-full  ',
          isUndoAbled ? 'text-accent' : 'text-black',
        )}
      />
    </HeaderActiveButton>
  );
};

export default HeaderUndoButton;
