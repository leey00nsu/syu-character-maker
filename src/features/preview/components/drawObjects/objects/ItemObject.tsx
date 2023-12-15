import { Image } from 'react-konva';
import useImage from 'use-image';

import { DEFAULT_WIDTH } from '../../../constants/canvas';

interface ItemObjectProps {
  id: string;
  url: string;
}

const ItemObject = ({ id, url }: ItemObjectProps) => {
  const [image] = useImage(url);

  if (image) {
    return (
      <Image
        x={50}
        y={50}
        width={DEFAULT_WIDTH - 100}
        height={DEFAULT_WIDTH - 100}
        id={id}
        image={image}
      />
    );
  }

  return <></>;
};

export default ItemObject;
