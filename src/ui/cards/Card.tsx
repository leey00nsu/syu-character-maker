import React from 'react';

interface CardProps {
  clickHandler?: () => void;
  children?: React.ReactNode;
}

const Card = ({ children, clickHandler }: CardProps) => {
  return (
    <div
      onClick={clickHandler}
      className="relative flex aspect-square overflow-hidden rounded-2xl border border-base-300 bg-white hover:cursor-pointer"
    >
      {children}
    </div>
  );
};

export default Card;
