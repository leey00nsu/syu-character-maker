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
  let sizeClasses = '';
  let weightClasses = '';
  switch (size) {
    case 'xs':
      sizeClasses = twJoin('text-xs', !fixSize && 'sm:text-sm');
      break;
    case 'sm':
      sizeClasses = twJoin('text-sm', !fixSize && 'sm:text-base');
      break;
    case 'md':
      sizeClasses = twJoin('text-ba', !fixSize && 'sm:text-lg');
      break;
    case 'lg':
      sizeClasses = twJoin('text-lg', !fixSize && 'sm:text-xl');
      break;
    case 'xl':
      sizeClasses = twJoin('text-xl', !fixSize && 'sm:text-2xl');
      break;
    case '2xl':
      sizeClasses = twJoin('text-2xl', !fixSize && ' sm:text-3xl');
      break;
    case '3xl':
      sizeClasses = twJoin('text-3xl', !fixSize && ' sm:text-4xl');
      break;
    case '4xl':
      sizeClasses = twJoin('text-4xl', !fixSize && ' sm:text-5xl');
      break;
    case '5xl':
      sizeClasses = twJoin('text-5xl', !fixSize && ' sm:text-6xl');
      break;
    case '6xl':
      sizeClasses = twJoin('text-6xl', !fixSize && ' sm:text-7xl');
      break;
  }

  switch (weight) {
    case 'light':
      weightClasses = 'font-light';
      break;
    case 'normal':
      weightClasses = 'font-normal';
      break;
    case 'medium':
      weightClasses = 'font-medium';
      break;
    case 'semibold':
      weightClasses = 'font-semibold';
      break;
    case 'bold':
      weightClasses = 'font-bold';
      break;
  }

  const textEllipsis =
    'text-ellipsis max-w-full overflow-hidden whitespace-nowrap';

  return (
    <p
      className={tw(
        sizeClasses,
        weightClasses,
        className,
        ellipsis && textEllipsis,
      )}
    >
      {children}
    </p>
  );
};

export default Paragraph;
