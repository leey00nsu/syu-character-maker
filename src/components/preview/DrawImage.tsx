import { Image } from "react-konva";
import { useRecoilState } from "recoil";
import useImage from "use-image";
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

const DrawImage = ({ object, objectSelectHandler }: DrawObjectProps) => {
  const [mode, setMode] = useRecoilState(modeState);
  const [menu, setMenu] = useRecoilState(menuState);

  const [drawingObjects, setDrawingObjects] =
    useRecoilState(drawingObjectState);
  const [image] = useImage(object.url ?? "");

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
        name="images"
        key={object.id}
        onDragStart={() => objectSelectHandler(object.id)}
        draggable={mode === "move" && menu !== "저장"}
        onSelect={() => objectSelectHandler(object.id)}
        image={image}
        width={200}
        height={200 / aspect_ratio}
        onDragEnd={objectMoveHandler}
        onTransformEnd={objectTransformHandler}
      />
    );
  }

  return <></>;
};

export default DrawImage;
