import React from "react";
import DrawItem from "./DrawItem";
import { Image, Line } from "react-konva";
import {
  modeState,
  menuState,
  itemState,
  bgState,
  drawingObjectState,
} from "../../store/store";
import useImage from "use-image";
import { useRecoilState } from "recoil";

const DrawObject = ({ ...props }) => {
  const [bg, setBg] = useRecoilState(bgState);
  const [mode, setMode] = useRecoilState(modeState);
  const [menu, setMenu] = useRecoilState(menuState);
  const [items, setItems] = useRecoilState(itemState);
  const [drawingObjects, setDrawingObjects] =
    useRecoilState(drawingObjectState);
  const { object, objectSelectHandler } = props;
  const [image] = useImage(object.url);

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

  if (object.type === "background") {
    const [bgImage] =
      bg === "수야" ? useImage("/suya.png") : useImage("/suho.png");

    return (
      <>
        <Image
          x={object.x}
          y={object.y}
          image={bgImage}
          id="background"
          opacity={1}
          name="backgroundCharactor"
          key={object.id}
          onDragEnd={() => {}}
          onDragStart={() => {}}
          draggable={false}
          onSelect={() => {}}
          width={500}
          height={500}
        />
        {items.map((i) => (
          <DrawItem key={i.item} url={i.itemUrl} id="background" />
        ))}
      </>
    );
  } else if (object.type === "image") {
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
  } else {
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
  }

  return <></>;
};

export default DrawObject;
