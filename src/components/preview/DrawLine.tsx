import { Line } from 'react-konva';
import { useRecoilState } from 'recoil';
import useObjectTransform from '../../hooks/useObjectTransform';
import { DrawingObject, menuState, modeState } from '../../store/store';

interface DrawObjectProps {
  object: DrawingObject;
  objectSelectHandler: (id: string) => void;
}

const DrawLine = ({ object, objectSelectHandler }: DrawObjectProps) => {
  const [mode, setMode] = useRecoilState(modeState);
  const [menu, setMenu] = useRecoilState(menuState);

  const objectTransformHandler = useObjectTransform();

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
      name="lines"
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
      onDragEnd={objectTransformHandler}
      onTransformEnd={objectTransformHandler}
    />
  );
};

export default DrawLine;
