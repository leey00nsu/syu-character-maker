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

import useGetTotalUserCount from '../../hooks/useGetTotalUserCount';

const TotalUserCount = () => {
  const count = useMotionValue(0);
  const springCount = useSpring(count, { stiffness: 100, damping: 100 });
  const roundedCount = useTransform(springCount, value => Math.round(value));

  const { totalUserCount } = useGetTotalUserCount();

  useEffect(() => {
    let animation: AnimationPlaybackControls | undefined;
    if (totalUserCount) {
      animation = animate(count, totalUserCount.count, {
        duration: 0.3,
      });
    }

    return () => {
      animation?.stop();
    };
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
        transition={{ duration: 0.5, delay: 1 }}
      >
        {roundedCount}
      </motion.p>
      <Paragraph size="lg" weight="medium">
        명
      </Paragraph>
    </motion.div>
  );
};

export default TotalUserCount;
