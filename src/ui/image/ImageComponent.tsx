import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { HTMLAttributeReferrerPolicy } from 'react';

import tw from '@/utils/tw';

import { LoadingDots } from '../loadings';

interface ImageComponentProps {
  imgUrl: string;
  referrerPolicy?: HTMLAttributeReferrerPolicy;
}

const ImageComponent = ({ imgUrl, referrerPolicy }: ImageComponentProps) => {
  const { data, isFetching } = useQuery<string>({
    queryKey: ['image', imgUrl],
    queryFn: () => {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = imgUrl;
        image.onload = () => resolve(imgUrl);
        image.onerror = () => resolve('/404.png');
      });
    },
  });

  if (isFetching) return <LoadingDots />;

  const classNames = tw('h-full w-full object-contain ');

  return (
    <motion.img
      referrerPolicy={referrerPolicy}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
      src={data}
      className={classNames}
    />
  );
};

export default ImageComponent;
