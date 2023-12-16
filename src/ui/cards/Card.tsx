import React from 'react';

interface CardProps {
  children?: React.ReactNode;
}

const Card = ({ children }: CardProps) => {
  return (
    <div className="relative aspect-square border-base-300 border rounded-2xl bg-white flex overflow-hidden hover:cursor-pointer">
      {children}
    </div>
  );
};

export default Card;
