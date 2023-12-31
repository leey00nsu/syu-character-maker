import {
  AnimationPlaybackControls,
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useEffect } from 'react';

import { Paragraph } from '@/ui/texts';

import useGetTotalArticleCount from '../../hooks/useGetTotalArticleCount';

const TotalArticleCount = () => {
  const count = useMotionValue(0);
  const springCount = useSpring(count, { stiffness: 100, damping: 100 });
  const roundedCount = useTransform(springCount, value => Math.round(value));

  const { totalArticleCount } = useGetTotalArticleCount();

  useEffect(() => {
    let animation: AnimationPlaybackControls | undefined;
    if (totalArticleCount) {
      animation = animate(count, totalArticleCount.count, {
        duration: 0.5,
      });
    }

    return () => {
      animation?.stop();
    };
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
        transition={{ duration: 0.5, delay: 1 }}
      >
        {roundedCount}
      </motion.p>
      <Paragraph size="lg" weight="medium">
        개
      </Paragraph>
    </motion.div>
  );
};

export default TotalArticleCount;
