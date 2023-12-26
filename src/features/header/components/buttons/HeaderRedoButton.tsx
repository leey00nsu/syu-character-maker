import { FaRedoAlt } from 'react-icons/fa';
import { twJoin } from 'tailwind-merge';

import { useCanvasStore } from '@/store/canvasStore';

import useHistoryControll from '@/hooks/canvas/useHistoryControll';

import { ActiveButton } from '@/ui/buttons';

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
    <ActiveButton
      clickHandler={redoHistoryHandler}
      className="btn-ghost h-12 w-12 sm:h-16 sm:w-16"
    >
      <FaRedoAlt
        className={twJoin(
          'h-full w-full  ',
          isRedoAbled ? 'text-accent' : 'text-black',
        )}
      />
    </ActiveButton>
  );
};

export default HeaderUndoButton;
