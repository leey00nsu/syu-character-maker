import { motion } from 'framer-motion';
import React from 'react';

interface CardProps {
  children?: React.ReactNode;
}

const Card = ({ children }: CardProps) => {
  return (
    <motion.div
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
