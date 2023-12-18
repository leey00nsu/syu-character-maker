import { FaRedoAlt } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import { twJoin } from 'tailwind-merge';

import {
  canvasObjectHistoryIndexState,
  canvasObjectHistoryState,
} from '@/store/canvasStore';

import useHistoryControll from '@/hooks/useHistoryControll';

import { HeaderActiveButton } from '@/ui/buttons';

const HeaderUndoButton = () => {
  const [canvasObjectHistory] = useRecoilState(canvasObjectHistoryState);
  const [canvasObjectHistoryIndex] = useRecoilState(
    canvasObjectHistoryIndexState,
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
