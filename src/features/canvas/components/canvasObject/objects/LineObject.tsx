import { Group as GroupType } from 'konva/lib/Group';
import { useLayoutEffect } from 'react';
import { Group, Line } from 'react-konva';

import { CanvasObject, useCanvasStore } from '@/store/canvasStore';

import useObjectControll from '@/features/canvas/hooks/useObjectControll';

interface DrawObjectProps {
  object: CanvasObject;
  objectSelectHandler: (id: string) => void;
}

const LineObject = ({ object, objectSelectHandler }: DrawObjectProps) => {
  const canvasObjects = useCanvasStore(state => state.canvasObjects);
  const stageRef = useCanvasStore(state => state.stageRef);
  const mode = useCanvasStore(state => state.mode);

  const { transformObject } = useObjectControll();

  const isDraggable = mode === 'move';

  useLayoutEffect(() => {
    cacheGroup();
  }, [object, canvasObjects]);

  const cacheGroup = () => {
    const objectGroup = stageRef?.current?.findOne(
      '#' + object.id,
    ) as GroupType;
    const isCachedGroup = objectGroup?.children?.length! > 1;

    if (isCachedGroup) {
      objectGroup?.cache();
    }
  };

  return (
    <Group
      id={object.id}
      rotation={object.rotation}
      scaleX={object.scaleX}
      scaleY={object.scaleY}
      skewX={object.skewX}
      skewY={object.skewY}
      x={object.x}
      y={object.y}
      name={object.name}
      key={object.id}
      opacity={object.opacity}
      onDragMove={cacheGroup}
      onTransform={cacheGroup}
      onDragStart={() => {
        objectSelectHandler(object.id);
      }}
      draggable={isDraggable}
      onClick={() => {
        if (mode !== 'move') return;
        objectSelectHandler(object.id);
      }}
      onSelect={() => objectSelectHandler(object.id)}
      onDragEnd={transformObject}
      onTransformEnd={transformObject}
    >
      <Line
        key={object.id}
        points={object.points}
        stroke={object.color}
        strokeWidth={object.size}
        opacity={object.opacity}
        tension={0.5}
        lineCap="round"
        lineJoin="round"
      />
    </Group>
  );
};

export default LineObject;
