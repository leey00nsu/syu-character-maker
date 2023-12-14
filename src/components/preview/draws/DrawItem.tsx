import { Image } from 'react-konva';
import useImage from 'use-image';
import { DEFAULT_WIDTH } from '../constants/canvas';

const DrawItem = ({ ...props }) => {
  const [image] = useImage(props.url);

  if (image) {
    return (
      <Image
        x={50}
        y={50}
        width={DEFAULT_WIDTH - 100}
        height={DEFAULT_WIDTH - 100}
        id={props.id}
        image={image}
      />
    );
  }

  return <></>;
};

export default DrawItem;
