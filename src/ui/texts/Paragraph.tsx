import tw from '@/utils/tw';
import React from 'react';
import { twJoin } from 'tailwind-merge';

export type ParagraphSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl';

export type ParagraphWeight =
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold';
interface ParagraphProps {
  children: React.ReactNode;
  size: ParagraphSize;
  weight: ParagraphWeight;
  ellipsis?: boolean;
  fixSize?: boolean;
  className?: string;
}

const Paragraph = ({
  children,
  size,
  weight,
  ellipsis,
  className,
  fixSize,
}: ParagraphProps) => {
  let sizeClassNames = '';
  let weightClassNames = '';

  switch (size) {
    case 'xs':
      sizeClassNames = twJoin('text-xs', !fixSize && 'sm:text-sm');
      break;
    case 'sm':
      sizeClassNames = twJoin('text-sm', !fixSize && 'sm:text-base');
      break;
    case 'md':
      sizeClassNames = twJoin('text-ba', !fixSize && 'sm:text-lg');
      break;
    case 'lg':
      sizeClassNames = twJoin('text-lg', !fixSize && 'sm:text-xl');
      break;
    case 'xl':
      sizeClassNames = twJoin('text-xl', !fixSize && 'sm:text-2xl');
      break;
    case '2xl':
      sizeClassNames = twJoin('text-2xl', !fixSize && ' sm:text-3xl');
      break;
    case '3xl':
      sizeClassNames = twJoin('text-3xl', !fixSize && ' sm:text-4xl');
      break;
    case '4xl':
      sizeClassNames = twJoin('text-4xl', !fixSize && ' sm:text-5xl');
      break;
    case '5xl':
      sizeClassNames = twJoin('text-5xl', !fixSize && ' sm:text-6xl');
      break;
    case '6xl':
      sizeClassNames = twJoin('text-6xl', !fixSize && ' sm:text-7xl');
      break;
  }

  switch (weight) {
    case 'light':
      weightClassNames = 'font-light';
      break;
    case 'normal':
      weightClassNames = 'font-normal';
      break;
    case 'medium':
      weightClassNames = 'font-medium';
      break;
    case 'semibold':
      weightClassNames = 'font-semibold';
      break;
    case 'bold':
      weightClassNames = 'font-bold';
      break;
  }

  const ellipsisClassNames =
    'text-ellipsis max-w-full overflow-hidden whitespace-nowrap';

  const classNames = tw(
    sizeClassNames,
    weightClassNames,
    className,
    ellipsis && ellipsisClassNames,
  );
  
  return <p className={classNames}>{children}</p>;
};

export default Paragraph;
