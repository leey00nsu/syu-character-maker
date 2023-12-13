import { HeaderToggleButton } from '@/components/ui/buttons';
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
    <HeaderToggleButton mode="draw" isActive={isActive} onClick={changeModeHandler}>
      <FaPencilAlt className="h-full w-full" />
    </HeaderToggleButton>
  );
};

export default HeaderDrawButton;
