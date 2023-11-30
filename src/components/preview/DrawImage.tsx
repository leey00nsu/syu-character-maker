import { Image } from 'react-konva';
import { useRecoilState } from 'recoil';
import useImage from 'use-image';
import useObjectTransform from '../../hooks/useObjectTransform';
import {
  DrawingObject,
  menuState,
  modeState
} from '../../store/store';

interface DrawObjectProps {
  object: DrawingObject;
  objectSelectHandler: (id: string) => void;
}

const DrawImage = ({ object, objectSelectHandler }: DrawObjectProps) => {
  const [mode, setMode] = useRecoilState(modeState);
  const [menu, setMenu] = useRecoilState(menuState);

  const [image] = useImage(object.url || '');
  const objectTransformHandler = useObjectTransform();

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
        draggable={mode === 'move' && menu !== '저장'}
        onSelect={() => objectSelectHandler(object.id)}
        image={image}
        width={200}
        height={200 / aspect_ratio}
        onDragEnd={objectTransformHandler}
        onTransformEnd={objectTransformHandler}
      />
    );
  }

  return <></>;
};

export default DrawImage;
