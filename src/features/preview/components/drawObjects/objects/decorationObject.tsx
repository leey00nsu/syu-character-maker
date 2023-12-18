import { Image } from 'react-konva';
import useImage from 'use-image';

import { DrawingObject } from '@/store/canvasStore';

import { DEFAULT_WIDTH } from '../../../constants/canvas';

interface DecorationObjectProps {
  object: DrawingObject;
}

const DecorationObject = ({ object }: DecorationObjectProps) => {
  const [image] = useImage(object.url || '');

  if (image) {
    return (
      <Image
        opacity={1}
        name={object.name}
        key={object.id}
        onDragEnd={() => {}}
        onDragStart={() => {}}
        onSelect={() => {}}
        x={50}
        y={50}
        width={DEFAULT_WIDTH - 100}
        height={DEFAULT_WIDTH - 100}
        id={object.id}
        image={image}
      />
    );
  }

  return <></>;
};

export default DecorationObject;
