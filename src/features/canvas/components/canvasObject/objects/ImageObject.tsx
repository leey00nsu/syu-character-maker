import { Group as GroupType } from 'konva/lib/Group';
import { useLayoutEffect } from 'react';
import { Group, Image } from 'react-konva';
import useImage from 'use-image';

import { CanvasObject, useCanvasStore } from '@/store/canvasStore';

import { DEFAULT_IMAGE_WIDTH } from '@/features/canvas/constants/canvas';
import useObjectControll from '@/features/canvas/hooks/useObjectControll';

interface ImageObjectProps {
  object: CanvasObject;
  objectSelectHandler: (id: string) => void;
}

const ImageObject = ({ object, objectSelectHandler }: ImageObjectProps) => {
  const stageRef = useCanvasStore(state => state.stageRef);
  const mode = useCanvasStore(state => state.mode);

  const [image] = useImage(object.url || '');
  const { transformObject } = useObjectControll();

  const isDraggable = mode === 'move';

  useLayoutEffect(() => {
    cacheGroup();
  }, [object]);

  const cacheGroup = () => {
    const objectGroup = stageRef?.current?.findOne(
      '#' + object.id,
    ) as GroupType;
    const isCachedGroup = objectGroup?.children?.length! > 1;

    if (isCachedGroup) {
      objectGroup?.cache();
    }
  };

  if (image) {
    let aspect_ratio = image.width / image.height;

    return (
      <Group
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
        onDragMove={cacheGroup}
        onTransform={cacheGroup}
        onDragStart={() => objectSelectHandler(object.id)}
        draggable={isDraggable}
        onClick={() => {
          if (mode !== 'move') return;
          objectSelectHandler(object.id);
        }}
        onSelect={() => objectSelectHandler(object.id)}
        width={DEFAULT_IMAGE_WIDTH}
        height={DEFAULT_IMAGE_WIDTH / aspect_ratio}
        onDragEnd={transformObject}
        onTransformEnd={transformObject}
      >
        <Image url={object.url} image={image} />
      </Group>
    );
  }

  return <></>;
};

export default ImageObject;
