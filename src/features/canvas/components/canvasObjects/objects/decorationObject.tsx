import { Image } from 'react-konva';
import useImage from 'use-image';

import { CanvasObject } from '@/store/canvasStore';

import { DEFAULT_WIDTH } from '@/features/canvas/constants/canvas';

interface DecorationObjectProps {
  object: CanvasObject;
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
