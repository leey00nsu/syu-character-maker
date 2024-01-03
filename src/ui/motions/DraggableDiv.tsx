import tw from '@/utils/tw';
import { motion } from 'framer-motion';

interface DraggableDivProps {
  children?: React.ReactNode;
  className?: string;
}

const DraggableDiv = ({ children, className }: DraggableDivProps) => {
  const classNames = tw('transformer-box', className);

  return (
    <motion.div drag dragSnapToOrigin className={classNames}>
      {children}
      <div className="transformer-box-left-top"></div>
      <div className="transformer-box-top"></div>
      <div className="transformer-box-right-top"></div>
      <div className="transformer-box-right"></div>
      <div className="transformer-box-right-bottom"></div>
      <div className="transformer-box-bottom"></div>
      <div className="transformer-box-left-bottom"></div>
      <div className="transformer-box-left"></div>
    </motion.div>
  );
};

export default DraggableDiv;
