import { Line } from 'react-konva';

import { CanvasObject, useCanvasStore } from '@/store/canvasStore';

import useObjectControll from '@/hooks/canvas/useObjectControll';

interface DrawObjectProps {
  object: CanvasObject;
  objectSelectHandler: (id: string) => void;
}

const LineObject = ({ object, objectSelectHandler }: DrawObjectProps) => {
  const mode = useCanvasStore(state => state.mode);

  const { transformObject } = useObjectControll();

  const isDraggable = mode === 'move';

  return (
    <Line
      rotation={object.rotation}
      scaleX={object.scaleX}
      scaleY={object.scaleY}
      skewX={object.skewX}
      skewY={object.skewY}
      x={object.x}
      y={object.y}
      id={object.id}
      name={object.name}
      key={object.id}
      points={object.points}
      stroke={object.color}
      strokeWidth={object.size}
      opacity={object.opacity}
      tension={0.5}
      lineCap="round"
      lineJoin="round"
      onDragStart={() => objectSelectHandler(object.id)}
      draggable={isDraggable}
      globalCompositeOperation={'source-over'}
      onSelect={() => objectSelectHandler(object.id)}
      onDragEnd={transformObject}
      onTransformEnd={transformObject}
    />
  );
};

export default LineObject;
