import React from 'react';

interface HeaderToggleButtonProps<T> {
  mode: T;
  isActive: boolean;
  onClick: (mode: T) => void;
  children?: React.ReactNode;
}

const HeaderToggleButton = ({
  mode,
  isActive,
  onClick,
  children,
}: HeaderToggleButtonProps<any>) => {
  return (
    <div
      onClick={onClick.bind(this, mode)}
      className={
        isActive
          ? 'btn-ghost rounded-box btn-active btn h-12 w-12 cursor-pointer p-3 sm:h-16 sm:w-16 '
          : 'btn-ghost rounded-box btn h-12 w-12 cursor-pointer p-3 sm:h-16 sm:w-16 '
      }
    >
      {children}
    </div>
  );
};

export default HeaderToggleButton;
