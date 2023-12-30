import { FaUndoAlt } from 'react-icons/fa';
import { twJoin } from 'tailwind-merge';

import { useCanvasStore } from '@/store/canvasStore';

import useHistoryControll from '@/features/canvas/hooks/useHistoryControll';

import { ActiveButton } from '@/ui/buttons';

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
    <ActiveButton
      clickHandler={undoHistoryHandler}
      className="btn-ghost h-12 w-12 sm:h-16 sm:w-16"
    >
      <FaUndoAlt
        className={twJoin(
          'h-full w-full  ',
          isUndoAbled ? 'text-accent' : 'text-black',
        )}
      />
    </ActiveButton>
  );
};

export default HeaderUndoButton;
