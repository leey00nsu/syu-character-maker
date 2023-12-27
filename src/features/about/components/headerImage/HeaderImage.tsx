import { motion } from 'framer-motion';

import { DraggableDiv } from '@/ui/motions';

const HeaderImage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex gap-10"
    >
      <DraggableDiv className="h-[150px] w-[150px] sm:h-[300px] sm:w-[300px]">
        <img src="/suya.png" className="h-full w-full p-4" />
      </DraggableDiv>
      <DraggableDiv className="h-[150px] w-[150px] sm:h-[300px] sm:w-[300px]">
        <img src="/suho.png" className="h-full w-full p-4" />
      </DraggableDiv>
    </motion.div>
  );
};

export default HeaderImage;
