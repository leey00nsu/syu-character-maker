import tw from '@/utils/tw';
import React, { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';

import ModalList from '../modals/ModalList';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Header = ({ children }: PageContainerProps) => {
  return <>{children}</>;
};

const Content = ({ children, className }: PageContainerProps) => {
  const classNames = tw('flex grow', className);

  return <div className={classNames}>{children}</div>;
};

const PageContainer = ({ children }: PageContainerProps) => {
  const location = useLocation();

  // GA4
  useEffect(() => {
    if (!import.meta.env.DEV) {
      ReactGA.set({ page: location.pathname });
      ReactGA.send('pageview');
    }
  }, [location.pathname]);

  const disableRightClick = (event: any) => {
    event.preventDefault();
  };

  return (
    <div
      onContextMenu={disableRightClick}
      className="flex min-h-[100svh] max-w-[100svw] flex-col"
    >
      <ModalList />
      {children}
    </div>
  );
};

PageContainer.Header = Header;
PageContainer.Content = Content;

export default PageContainer;
