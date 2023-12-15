import React from 'react';

interface HeaderActiveButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
}

const HeaderActiveButton = ({ onClick, children }: HeaderActiveButtonProps) => {
  return (
    <div
      onClick={onClick}
      className="btn-ghost rounded-box btn h-12 w-12 cursor-pointer p-3 sm:h-16 sm:w-16 "
    >
      {children}
    </div>
  );
};

export default HeaderActiveButton;
