import React from 'react';

interface ItemToggleButtonProps {
  toggleHandler: () => void;
  isActive: boolean;
  children?: React.ReactNode;
}

const ItemToggleButton = ({
  toggleHandler,
  isActive,
  children,
}: ItemToggleButtonProps) => {
  return (
    <button
      onClick={toggleHandler}
      className={
        isActive
          ? 'btn-outline btn-active btn'
          : 'border-1 btn-ghost btn border-base-300'
      }
    >
      {children}
    </button>
  );
};

export default ItemToggleButton;
