import { FaExpandArrowsAlt } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import { ModeState, modeState } from '../../../store/store';
import HeaderToggleButton from '../../ui/buttons/HeaderToggleButton';

const HeaderMoveButton = () => {
  const [mode, setMode] = useRecoilState(modeState);

  const changeModeHandler = (changes: ModeState) => {
    setMode(changes);
  };

  return (
    <HeaderToggleButton mode="move" onClick={changeModeHandler}>
      <FaExpandArrowsAlt className="h-full w-full" />
    </HeaderToggleButton>
  );
};

export default HeaderMoveButton;
