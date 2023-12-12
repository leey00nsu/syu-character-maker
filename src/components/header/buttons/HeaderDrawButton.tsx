import ToggleButton from '@/components/ui/buttons/ToggleButton';
import { ModeState, modeState } from '@/store/store';
import { FaPencilAlt } from 'react-icons/fa';
import { useRecoilState } from 'recoil';

export const HeaderDrawButton = () => {
  const [mode, setMode] = useRecoilState(modeState);

  const changeModeHandler = (changes: ModeState) => {
    setMode(changes);
  };

  const isActive = mode === 'draw';

  return (
    <ToggleButton mode="draw" isActive={isActive} onClick={changeModeHandler}>
      <FaPencilAlt className="h-full w-full" />
    </ToggleButton>
  );
};

export default HeaderDrawButton;
