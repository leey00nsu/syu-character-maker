import { FaRedoAlt } from 'react-icons/fa';
import { twJoin } from 'tailwind-merge';

import { useCanvasStore } from '@/store/canvasStore';

import useHistoryControll from '@/hooks/useHistoryControll';

import { HeaderActiveButton } from '@/ui/buttons';

const HeaderUndoButton = () => {
  const canvasObjectHistory = useCanvasStore(
    state => state.canvasObjectHistory,
  );
  const canvasObjectHistoryIndex = useCanvasStore(
    state => state.canvasObjectHistoryIndex,
  );

  const { redoHistory } = useHistoryControll();

  const redoHistoryHandler = () => {
    redoHistory();
  };

  const isRedoAbled =
    canvasObjectHistoryIndex !== canvasObjectHistory.length - 1;

  return (
    <HeaderActiveButton onClick={redoHistoryHandler}>
      <FaRedoAlt
        className={twJoin(
          'h-full w-full  ',
          isRedoAbled ? 'text-accent' : 'text-black',
        )}
      />
    </HeaderActiveButton>
  );
};

export default HeaderUndoButton;
