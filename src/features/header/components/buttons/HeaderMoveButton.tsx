import { FaExpandArrowsAlt } from 'react-icons/fa';
import { useRecoilState } from 'recoil';

import { ModeState, modeState } from '@/store/canvasStore';

import { HeaderToggleButton } from '@/ui/buttons';

const HeaderMoveButton = () => {
  const [mode, setMode] = useRecoilState(modeState);

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
