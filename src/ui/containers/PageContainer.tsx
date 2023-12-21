import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
}

const Header = ({ children }: PageContainerProps) => {
  return <>{children}</>;
};

const Content = ({ children }: PageContainerProps) => {
  return (
    <div className="flex h-[100svh] w-full flex-col pt-36 xs:pt-28 ">
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
      className="flex max-w-[100svw] flex-col"
    >
      {children}
    </div>
  );
};

PageContainer.Header = Header;
PageContainer.Content = Content;

export default PageContainer;
