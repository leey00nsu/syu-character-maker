import { motion } from 'framer-motion';
import React from 'react';

interface CardProps {
  clickHandler?: () => void;
  children?: React.ReactNode;
}

const Card = ({ children, clickHandler }: CardProps) => {
  return (
    <motion.div
      onClick={clickHandler}
      transition={{ delay: 0.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative flex aspect-square overflow-hidden rounded-2xl border border-base-300 bg-white hover:cursor-pointer"
    >
      {children}
    </motion.div>
  );
};

export default Card;
