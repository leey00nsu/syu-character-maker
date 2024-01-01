import tw from '@/utils/tw';
import React from 'react';

interface WindowContainerProps {
  children?: React.ReactNode;
  className?: string;
}

const Header = ({ children, className }: WindowContainerProps) => {
  const classNames = tw(
    'absolute left-1/2 top-[0.6rem] flex w-1/2 -translate-x-1/2 justify-center',
    className,
  );

  return <div className={classNames}>{children}</div>;
};

const HeaderButton = ({ children }: WindowContainerProps) => {
  return (
    <div className="absolute right-0 top-[0.3rem] flex p-2">{children}</div>
  );
};

const Content = ({ children, className }: WindowContainerProps) => {
  const classNames = tw(className);

  return <div className={classNames}>{children}</div>;
};

const WindowContainer = ({ children, className }: WindowContainerProps) => {
  const classNames = tw(
    'mockup-window flex border border-base-300 ',
    className,
  );

  return <section className={classNames}>{children}</section>;
};

WindowContainer.Header = Header;
WindowContainer.HeaderButton = HeaderButton;
WindowContainer.Content = Content;

export default WindowContainer;
