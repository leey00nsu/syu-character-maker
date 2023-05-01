import React from "react";
import { Image } from "react-konva";
import useImage from "use-image";

const UseItem = ({ ...props }) => {
  const [image] = useImage(props.url);

  if (image) {
    return (
      <Image
        x={50}
        y={50}
        width={500}
        height={500}
        id={props.id}
        image={image}
      />
    );
  }

  return <></>;
};

export default UseItem;
