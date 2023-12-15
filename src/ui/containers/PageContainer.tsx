import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
}

const Header = ({ children }: PageContainerProps) => {
  return <>{children}</>;
};

const Content = ({ children }: PageContainerProps) => {
  return (
    <div className="xs:pt-28 flex h-screen max-h-screen w-full flex-col pt-36 xl:flex-row">
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
      className="flex h-screen w-screen flex-col "
    >
      {children}
    </div>
  );
};

PageContainer.Header = Header;
PageContainer.Content = Content;

export default PageContainer;
