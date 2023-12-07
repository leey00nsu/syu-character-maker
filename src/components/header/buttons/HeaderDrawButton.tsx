import { FaPencilAlt } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import { ModeState, modeState } from '../../../store/store';
import HeaderToggleButton from '../../ui/buttons/HeaderToggleButton';

const HeaderDrawButton = () => {
  const [mode, setMode] = useRecoilState(modeState);

  const changeModeHandler = (changes: ModeState) => {
    setMode(changes);
  };

  return (
    <HeaderToggleButton mode="draw" onClick={changeModeHandler}>
      <FaPencilAlt className="h-full w-full" />
    </HeaderToggleButton>
  );
};

export default HeaderDrawButton;
