import { animate, useMotionValue, useTransform } from 'framer-motion';

const useMotionCount = (start: number) => {
  const count = useMotionValue(start);
  const roundedCount = useTransform(count, value => Math.round(value));

  const startAnimation = (to: number) => {
    animate(count, to, {
      duration: 0.3,
      type: 'spring',
      stiffness: 10,
      damping: 10,
    });
  };

  return { currentCount: roundedCount, startAnimation };
};

export default useMotionCount;
