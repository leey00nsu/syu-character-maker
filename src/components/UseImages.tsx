import React from "react";
import { Image } from "react-konva";
import useImage from "use-image";

const UseImages = ({ ...props }: any) => {
  const [image] = useImage(props.url);

  if (image) {
    let aspect_ratio = image.width / image.height;

    return (
      <Image image={image} width={200} height={200 / aspect_ratio} {...props} />
    );
  }

  return <></>;
};

export default UseImages;
