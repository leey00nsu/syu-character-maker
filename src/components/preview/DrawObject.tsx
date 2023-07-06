import React from "react";
import { Image, Line } from "react-konva";
import { modeState, menuState } from "../../store/store";
import useImage from "use-image";
import { useRecoilState } from "recoil";

const DrawObject = ({ ...props }) => {
  const [mode, setMode] = useRecoilState(modeState);
  const [menu, setMenu] = useRecoilState(menuState);
  const { object, objectSelectHandler } = props;
  const [image] = useImage(object.url);

  if (object.type === "background") {
    return (
      <Image
        x={50}
        y={50}
        url={object.url}
        id="background"
        opacity={object.opacity}
        name="backgroundCharactor"
        key={object.z}
        onDragEnd={() => {}}
        onDragStart={() => {}}
        draggable={false}
        onSelect={() => {}}
        image={image}
        width={500}
        height={500}
      />
    );
  } else if (object.type === "image") {
    if (image) {
      let aspect_ratio = image.width / image.height;

      return (
        <Image
          x={50}
          y={50}
          url={object.url}
          id={object.id}
          opacity={object.opacity}
          name="images"
          key={object.z}
          onDragEnd={() => {}}
          onDragStart={() => objectSelectHandler(object.id)}
          draggable={mode === "move" && menu !== "저장"}
          onSelect={() => objectSelectHandler(object.id)}
          image={image}
          width={200}
          height={200 / aspect_ratio}
        />
      );
    }
  } else {
    return (
      <Line
        id={object.id}
        name="lines"
        key={object.z}
        points={object.points}
        stroke={object.color}
        strokeWidth={object.size}
        opacity={object.opacity}
        tension={0.5}
        lineCap="round"
        lineJoin="round"
        onDragEnd={() => {}}
        onDragStart={() => objectSelectHandler(object.id)}
        draggable={mode === "move" && menu !== "저장"}
        globalCompositeOperation={"source-over"}
        onSelect={() => objectSelectHandler(object.id)}
      />
    );
  }

  return <></>;
};

export default DrawObject;
