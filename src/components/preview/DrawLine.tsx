import { Line } from "react-konva";
import { useRecoilState } from "recoil";
import {
  DrawingObject,
  drawingObjectState,
  menuState,
  modeState,
} from "../../store/store";

interface DrawObjectProps {
  object: DrawingObject;
  objectSelectHandler: (id: string) => void;
}

const DrawLine = ({ object, objectSelectHandler }: DrawObjectProps) => {
  const [mode, setMode] = useRecoilState(modeState);
  const [menu, setMenu] = useRecoilState(menuState);
  const [drawingObjects, setDrawingObjects] =
    useRecoilState(drawingObjectState);

  // 오브젝트 이동시 좌표값 업데이트
  const objectMoveHandler = (e: any) => {
    const { x, y, id } = e.target.attrs;

    const newObjects = drawingObjects.map((object) => {
      if (object.id === id) {
        return {
          ...object,
          x: x,
          y: y,
        };
      } else {
        return object;
      }
    });
    setDrawingObjects(newObjects);
  };

  // 오브젝트 변형시 변형값 업데이트
  const objectTransformHandler = (e: any) => {
    const { id, scaleX, scaleY, skewX, skewY, rotation } = e.target.attrs;
    const newObjects = drawingObjects.map((object) => {
      if (object.id === id) {
        return {
          ...object,
          skewX: skewX,
          skewY: skewY,
          scaleX: scaleX,
          scaleY: scaleY,
          rotation: rotation,
        };
      } else {
        return object;
      }
    });

    setDrawingObjects(newObjects);
  };

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
      draggable={mode === "move" && menu !== "저장"}
      globalCompositeOperation={"source-over"}
      onSelect={() => objectSelectHandler(object.id)}
      onDragEnd={objectMoveHandler}
      onTransformEnd={objectTransformHandler}
    />
  );
};

export default DrawLine;
