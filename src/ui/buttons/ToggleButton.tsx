import tw from '@/utils/tw';
import React from 'react';

interface ToggleButtonProps {
  isActive: boolean;
  clickHandler: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  children?: React.ReactNode;
  className?: string;
  activeClassName?: string;
  inActiveClassName?: string;
}

const ToggleButton = ({
  isActive,
  clickHandler,
  children,
  className,
  activeClassName,
  inActiveClassName,
}: ToggleButtonProps) => {
  const classNames = tw(
    'btn cursor-pointer rounded-box p-3',
    className,
    isActive && 'btn-active',
    isActive && activeClassName,
    !isActive && inActiveClassName,
  );

  return (
    <div onClick={clickHandler} className={classNames}>
      {children}
    </div>
  );
};

export default ToggleButton;
