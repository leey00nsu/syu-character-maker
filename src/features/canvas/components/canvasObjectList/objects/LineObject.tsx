import { Line } from 'react-konva';

import { useCanvasStore } from '@/store/canvas';
import { CanvasObject } from '@/store/canvas/canvasObjectSlice';

import useObjectControll from '@/features/canvas/hooks/useObjectControll';

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
      key={object.id}
      points={object.points}
      stroke={object.color}
      strokeWidth={object.size}
      opacity={object.opacity}
      tension={0.5}
      lineCap="round"
      lineJoin="round"
      id={object.id}
      rotation={object.rotation}
      scaleX={object.scaleX}
      scaleY={object.scaleY}
      skewX={object.skewX}
      skewY={object.skewY}
      x={object.x}
      y={object.y}
      name={object.name}
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
    />
  );
};

export default LineObject;
