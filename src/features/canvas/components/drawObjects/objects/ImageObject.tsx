import { Image } from 'react-konva';
import useImage from 'use-image';

import { CanvasObject, useCanvasStore } from '@/store/canvasStore';

import { DEFAULT_IMAGE_WIDTH } from '@/features/canvas/constants/canvas';
import useObjectControll from '@/features/canvas/hooks/useObjectControll';

interface ImageObjectProps {
  object: CanvasObject;
  objectSelectHandler: (id: string) => void;
}

const ImageObject = ({ object, objectSelectHandler }: ImageObjectProps) => {
  const mode = useCanvasStore(state => state.mode);

  const [image] = useImage(object.url || '');
  const { transformObject } = useObjectControll();

  const isDraggable = mode === 'move';

  if (image) {
    let aspect_ratio = image.width / image.height;

    return (
      <Image
        rotation={object.rotation}
        scaleX={object.scaleX}
        scaleY={object.scaleY}
        skewX={object.skewX}
        skewY={object.skewY}
        x={object.x}
        y={object.y}
        url={object.url}
        id={object.id}
        opacity={object.opacity}
        name={object.name}
        key={object.id}
        onDragStart={() => objectSelectHandler(object.id)}
        draggable={isDraggable}
        onSelect={() => objectSelectHandler(object.id)}
        image={image}
        width={DEFAULT_IMAGE_WIDTH}
        height={DEFAULT_IMAGE_WIDTH / aspect_ratio}
        onDragEnd={transformObject}
        onTransformEnd={transformObject}
      />
    );
  }

  return <></>;
};

export default ImageObject;
