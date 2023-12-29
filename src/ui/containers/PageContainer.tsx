import tw from '@/utils/tw';
import React, { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';

import ModalList from '../modals/ModalList';

interface PageContainerProps {
  children: React.ReactNode;
  isCanvas?: boolean;
}

const Header = ({ children }: PageContainerProps) => {
  return <>{children}</>;
};

const Content = ({ children, isCanvas }: PageContainerProps) => {
  const classNames = tw(
    'flex w-full flex-col',
    isCanvas
      ? 'h-[calc(100%-152px)] sm:h-[calc(100%-184px)] md:h-[calc(100%-112px)]'
      : 'h-[calc(100%-96px)] sm:h-[calc(100%-112px)]',
  );
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
