import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ParagraphProps {
  children: React.ReactNode;
  size: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  weight: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
}

const Paragraph = ({ children, size, weight }: ParagraphProps) => {
  let sizeClasses = '';
  let weightClasses = '';
  switch (size) {
    case 'sm':
      sizeClasses = 'text-sm sm:text-base';
      break;
    case 'md':
      sizeClasses = 'text-base sm:text-lg';
      break;
    case 'lg':
      sizeClasses = 'text-lg sm:text-xl';
      break;
    case 'xl':
      sizeClasses = 'text-xl sm:text-2xl';
      break;
    case '2xl':
      sizeClasses = 'text-2xl sm:text-3xl';
      break;
    case '3xl':
      sizeClasses = 'text-3xl sm:text-4xl';
      break;
    case '4xl':
      sizeClasses = 'text-4xl sm:text-5xl';
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

  return <p className={twMerge(sizeClasses, weightClasses)}>{children}</p>;
};

export default Paragraph;
