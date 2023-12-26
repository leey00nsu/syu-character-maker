import { motion } from 'framer-motion';
import { HTMLAttributeReferrerPolicy, useState } from 'react';
import { twJoin } from 'tailwind-merge';

import { LoadingDots } from '../loadings';

interface ImageProps {
  imgUrl: string;
  referrerPolicy?: HTMLAttributeReferrerPolicy;
}

const Image = ({ imgUrl, referrerPolicy }: ImageProps) => {
  const [imageStatus, setImageStatus] = useState('loading');

  const loadHandler = () => {
    setImageStatus('loaded');
  };

  const errorHandler = (e: any) => {
    e.target.src = '/404.png';
    setImageStatus('error');
  };

  return (
    <>
      {imageStatus === 'loading' && <LoadingDots />}
      <motion.img
        referrerPolicy={referrerPolicy}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        src={imgUrl}
        onError={errorHandler}
        onLoad={loadHandler}
        className={twJoin(
          'h-full w-full object-contain ',
          imageStatus === 'loaded' ? 'block' : 'hidden',
        )}
      />
    </>
  );
};

export default Image;
