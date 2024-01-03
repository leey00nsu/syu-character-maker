import { FaExpandArrowsAlt } from 'react-icons/fa';

import { useCanvasStore } from '@/store/canvas';
import { ModeState } from '@/store/canvas/modeSlice';

import { ToggleButton } from '@/ui/buttons';

const HeaderMoveButton = () => {
  const mode = useCanvasStore(state => state.mode);
  const setMode = useCanvasStore(state => state.setMode);

  const changeModeHandler = (changes: ModeState) => {
    setMode(changes);
  };

  const isActive = mode === 'move';

  return (
    <ToggleButton
      isActive={isActive}
      clickHandler={changeModeHandler.bind(this, 'move')}
      className="btn-ghost h-12 w-12 sm:h-16 sm:w-16"
    >
      <FaExpandArrowsAlt className="h-full w-full" />
    </ToggleButton>
  );
};

export default HeaderMoveButton;
