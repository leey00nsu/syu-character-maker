import { FaPencilAlt } from 'react-icons/fa';

import { ModeState, useCanvasStore } from '@/store/canvasStore';

import { HeaderToggleButton } from '@/ui/buttons';

export const HeaderDrawButton = () => {
  const mode = useCanvasStore(state => state.mode);
  const setMode = useCanvasStore(state => state.setMode);

  const changeModeHandler = (changes: ModeState) => {
    setMode(changes);
  };

  const isActive = mode === 'draw';

  return (
    <HeaderToggleButton
      mode="draw"
      isActive={isActive}
      onClick={changeModeHandler}
    >
      <FaPencilAlt className="h-full w-full" />
    </HeaderToggleButton>
  );
};

export default HeaderDrawButton;
