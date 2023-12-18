import { Line } from 'react-konva';
import { useRecoilState } from 'recoil';

import { CanvasObject, menuState, modeState } from '@/store/canvasStore';

import useObjectControll from '@/hooks/useObjectControll';

interface DrawObjectProps {
  object: CanvasObject;
  objectSelectHandler: (id: string) => void;
}

const LineObject = ({ object, objectSelectHandler }: DrawObjectProps) => {
  const [mode, setMode] = useRecoilState(modeState);
  const [menu, setMenu] = useRecoilState(menuState);

  const { transformObject } = useObjectControll();

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
      draggable={mode === 'move' && menu !== '저장'}
      globalCompositeOperation={'source-over'}
      onSelect={() => objectSelectHandler(object.id)}
      onDragEnd={transformObject}
      onTransformEnd={transformObject}
    />
  );
};

export default LineObject;
