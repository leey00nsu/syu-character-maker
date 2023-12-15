import useObjectControll from '@/hooks/useObjectControll';
import { DrawingObject, menuState, modeState } from '@/store/canvasStore';
import { Image } from 'react-konva';
import { useRecoilState } from 'recoil';
import useImage from 'use-image';
import { DEFAULT_IMAGE_WIDTH } from '../../../constants/canvas';

interface ImageObjectProps {
  object: DrawingObject;
  objectSelectHandler: (id: string) => void;
}

const ImageObject = ({ object, objectSelectHandler }: ImageObjectProps) => {
  const [mode, setMode] = useRecoilState(modeState);
  const [menu, setMenu] = useRecoilState(menuState);

  const [image] = useImage(object.url || '');
  const { transformObject } = useObjectControll();

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
        width={DEFAULT_IMAGE_WIDTH}
        height={DEFAULT_IMAGE_WIDTH / aspect_ratio}
        onDragEnd={transformObject}
        onTransformEnd={transformObject}
      />
    );
  }

  return <></>;
};

export default ImageObject;
