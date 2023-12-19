import { FaExpandArrowsAlt } from 'react-icons/fa';

import { ModeState, useCanvasStore } from '@/store/canvasStore';

import { HeaderToggleButton } from '@/ui/buttons';

const HeaderMoveButton = () => {
  const mode = useCanvasStore(state => state.mode);
  const setMode = useCanvasStore(state => state.setMode);

  const changeModeHandler = (changes: ModeState) => {
    setMode(changes);
  };

  const isActive = mode === 'move';

  return (
    <HeaderToggleButton
      mode="move"
      isActive={isActive}
      onClick={changeModeHandler}
    >
      <FaExpandArrowsAlt className="h-full w-full" />
    </HeaderToggleButton>
  );
};

export default HeaderMoveButton;
