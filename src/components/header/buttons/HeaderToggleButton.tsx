import { useRecoilState } from 'recoil';
import { modeState } from '../../../store/store';
import React from 'react';

interface HeaderToggleButtonProps {
  mode: string;
  onClick: (mode: string) => void;
  children?: React.ReactNode;
}

const HeaderToggleButton = ({
  mode,
  onClick,
  children,
}: HeaderToggleButtonProps) => {
  const [currentMode] = useRecoilState(modeState);
  return (
    <div
      onClick={onClick.bind(this, mode)}
      className={
        mode === currentMode
          ? 'btn-ghost rounded-box btn-active btn h-12 w-12 cursor-pointer p-3 sm:h-16 sm:w-16 '
          : 'btn-ghost rounded-box btn h-12 w-12 cursor-pointer p-3 sm:h-16 sm:w-16 '
      }
    >
      {children}
    </div>
  );
};

export default HeaderToggleButton;
