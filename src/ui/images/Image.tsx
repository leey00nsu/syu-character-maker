import { useState } from 'react';
import { twJoin } from 'tailwind-merge';

import { LoadingDots } from '../loadings';

interface ImageProps {
  imgUrl: string;
}

const Image = ({ imgUrl }: ImageProps) => {
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
      <img
        src={imgUrl}
        onError={errorHandler}
        onLoad={loadHandler}
        className={twJoin(
          'w-full h-full p-2 object-contain',
          imageStatus === 'loaded' ? 'block' : 'hidden',
        )}
      />
    </>
  );
};

export default Image;
