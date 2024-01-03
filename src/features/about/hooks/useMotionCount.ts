import { animate, useMotionValue, useTransform } from 'framer-motion';

const useMotionCount = (start: number) => {
  const count = useMotionValue(start);
  const roundedCount = useTransform(count, value => Math.round(value));

  const startAnimation = (to: number) => {
    animate(count, to, {
      type: 'spring',
      stiffness: 50,
      damping: 20,
    });
  };

  return { currentCount: roundedCount, startAnimation };
};

export default useMotionCount;
