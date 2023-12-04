import React from 'react';

interface HeaderActiveButtonProps {
  mode: string;
  onClick: (mode: string) => void;
  children?: React.ReactNode;
}

const HeaderActiveButton = ({
  mode,
  onClick,
  children,
}: HeaderActiveButtonProps) => {
  return (
    <div
      onClick={onClick.bind(this, mode)}
      className="btn-ghost rounded-box btn h-12 w-12 cursor-pointer p-3 sm:h-16 sm:w-16 "
    >
      {children}
    </div>
  );
};

export default HeaderActiveButton;
