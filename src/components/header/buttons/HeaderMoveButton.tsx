import { FaExpandArrowsAlt } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import { ModeState, modeState } from '../../../store/store';
import ToggleButton from '../../ui/buttons/ToggleButton';

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
