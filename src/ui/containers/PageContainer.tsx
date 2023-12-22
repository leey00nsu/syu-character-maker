import React from 'react';

import ModalList from '../modals/ModalList';

interface PageContainerProps {
  children: React.ReactNode;
}

const Header = ({ children }: PageContainerProps) => {
  return <>{children}</>;
};

const Content = ({ children }: PageContainerProps) => {
  return (
    <div className="flex h-[calc(100%-152px)] w-full flex-col xs:h-[calc(100%-96px)] sm:h-[calc(100%-112px)] ">
      {children}
    </div>
  );
};

const PageContainer = ({ children }: PageContainerProps) => {
  const disableRightClick = (event: any) => {
    event.preventDefault();
  };

  return (
    <div
      onContextMenu={disableRightClick}
      className="flex h-[100svh] max-w-[100svw] flex-col"
    >
      <ModalList />
      {children}
    </div>
  );
};

PageContainer.Header = Header;
PageContainer.Content = Content;

export default PageContainer;
