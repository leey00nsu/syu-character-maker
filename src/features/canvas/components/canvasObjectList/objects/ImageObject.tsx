import { Image } from 'react-konva';
import useImage from 'use-image';

import { useCanvasStore } from '@/store/canvas';
import { CanvasObject } from '@/store/canvas/canvasObjectSlice';

import { DEFAULT_IMAGE_WIDTH } from '@/features/canvas/constants/canvas';
import useObjectControll from '@/features/canvas/hooks/useObjectControll';

interface ImageObjectProps {
  object: CanvasObject;
}

const ImageObject = ({ object,  }: ImageObjectProps) => {
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
        draggable={isDraggable}
        width={DEFAULT_IMAGE_WIDTH}
        height={DEFAULT_IMAGE_WIDTH / aspect_ratio}
        onDragEnd={transformObject}
        onTransformEnd={transformObject}
        image={image}
      />
    );
  }

  return <></>;
};

export default ImageObject;
