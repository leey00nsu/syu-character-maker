import ToggleButton from '@/components/ui/buttons/ToggleButton';
import { ModeState, modeState } from '@/store/store';
import { FaExpandArrowsAlt } from 'react-icons/fa';
import { useRecoilState } from 'recoil';

const HeaderMoveButton = () => {
  const [mode, setMode] = useRecoilState(modeState);

  const changeModeHandler = (changes: ModeState) => {
    setMode(changes);
  };

  const isActive = mode === 'move';

  return (
    <ToggleButton mode="move" isActive={isActive} onClick={changeModeHandler}>
      <FaExpandArrowsAlt className="h-full w-full" />
    </ToggleButton>
  );
};

export default HeaderMoveButton;
