import React from 'react';

import { ToggleButton } from '@/ui/buttons';

interface DecorationToggleButtonProps {
  toggleHandler: () => void;
  isActive: boolean;
  children?: React.ReactNode;
}

const DecorationToggleButton = ({
  toggleHandler,
  isActive,
  children,
}: DecorationToggleButtonProps) => {
  return (
    <ToggleButton
      isActive={isActive}
      clickHandler={toggleHandler}
      className="rounded-lg"
      inActiveClassName="btn-ghost border-base-300"
      activeClassName="btn-success border-success"
    >
      {children}
    </ToggleButton>
  );
};

export default DecorationToggleButton;
