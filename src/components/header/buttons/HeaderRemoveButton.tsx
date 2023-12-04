import { useRecoilState } from 'recoil';
import { modeState } from '../../../store/store';
import React from 'react';

interface HeaderRemoveButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
}

const HeaderRemoveButton = ({ onClick, children }: HeaderRemoveButtonProps) => {
  return (
    <div
      onClick={onClick}
      className="btn-accent btn-outline rounded-box btn h-12 w-12 cursor-pointer border-0 p-3 sm:h-16 sm:w-16"
    >
      {children}
    </div>
  );
};

export default HeaderRemoveButton;
