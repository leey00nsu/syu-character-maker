import { motion } from 'framer-motion';
import { useEffect } from 'react';

import { Paragraph } from '@/ui/texts';

import useGetTotalUserCount from '../../hooks/useGetTotalUserCount';
import useMotionCount from '../../hooks/useMotionCount';

const TotalUserCount = () => {
  const { totalUserCount } = useGetTotalUserCount();

  const { currentCount, startAnimation } = useMotionCount(0);

  useEffect(() => {
    if (totalUserCount) {
      startAnimation(totalUserCount.count);
    }
  }, [totalUserCount]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="flex items-center justify-center gap-2 text-center"
    >
      <Paragraph size="lg" weight="medium">
        현재까지 참여한 유저 :
      </Paragraph>
      <motion.p
        className=" w-24 text-3xl font-semibold"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: totalUserCount ? 1 : 0, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {currentCount}
      </motion.p>
      <Paragraph size="lg" weight="medium">
        명
      </Paragraph>
    </motion.div>
  );
};

export default TotalUserCount;
