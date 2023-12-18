import { FaUndoAlt } from 'react-icons/fa';
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
