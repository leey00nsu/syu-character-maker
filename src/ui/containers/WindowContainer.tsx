import React from 'react';
import { twMerge } from 'tailwind-merge';

import { Paragraph } from '@/ui/texts';

interface WindowContainerProps {
  children?: React.ReactNode;
  className?: string;
}

const Header = ({ children }: WindowContainerProps) => {
  return (
    <Paragraph
      size="md"
      weight="medium"
      className="absolute left-1/2 top-[14px] -translate-x-1/2 "
    >
      {children}
    </Paragraph>
  );
};

const WindowContainer = ({ children, className }: WindowContainerProps) => {
  return (
    <section
      className={twMerge(
        'mockup-window flex shrink-0 flex-col border border-base-300 before:shrink-0',
        className,
      )}
    >
      {children}
    </section>
  );
};

WindowContainer.Header = Header;

export default WindowContainer;
