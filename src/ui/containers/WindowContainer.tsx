import React from 'react';
import { twMerge } from 'tailwind-merge';

interface WindowContainerProps {
  children?: React.ReactNode;
  className?: string;
}

const Header = ({ children }: WindowContainerProps) => {
  return (
    <div className="absolute left-1/2 top-[0.6rem] -translate-x-1/2   ">
      {children}
    </div>
  );
};

const HeaderButton = ({ children }: WindowContainerProps) => {
  return (
    <div className="absolute right-0 top-[0.6rem] flex p-2">{children}</div>
  );
};

const WindowContainer = ({ children, className }: WindowContainerProps) => {
  return (
    <section
      className={twMerge(
        'mockup-window flex flex-col border border-base-300 before:shrink-0',
        className,
      )}
    >
      {children}
    </section>
  );
};

WindowContainer.Header = Header;
WindowContainer.HeaderButton = HeaderButton;

export default WindowContainer;
