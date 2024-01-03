import { motion } from 'framer-motion';
import { useEffect } from 'react';

import { Paragraph } from '@/ui/texts';

import useGetTotalArticleCount from '../../hooks/useGetTotalArticleCount';
import useMotionCount from '../../hooks/useMotionCount';

const TotalArticleCount = () => {
  const { totalArticleCount } = useGetTotalArticleCount();

  const { currentCount, startAnimation } = useMotionCount(0);

  useEffect(() => {
    if (totalArticleCount) {
      startAnimation(totalArticleCount.count);
    }
  }, [totalArticleCount]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="flex items-center justify-center gap-2 text-center"
    >
      <Paragraph size="lg" weight="medium">
        현재까지 그려진 그림 :
      </Paragraph>
      <motion.p
        className=" w-24 text-3xl font-semibold"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: totalArticleCount ? 1 : 0, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {currentCount}
      </motion.p>
      <Paragraph size="lg" weight="medium">
        개
      </Paragraph>
    </motion.div>
  );
};

export default TotalArticleCount;
