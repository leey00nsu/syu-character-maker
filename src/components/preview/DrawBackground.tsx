import { Image } from 'react-konva';
import { useRecoilState } from 'recoil';
import useImage from 'use-image';
import { DrawingObject, bgState, itemState } from '../../store/store';
import DrawItem from './DrawItem';

interface DrawObjectProps {
  object: DrawingObject;
  objectSelectHandler: (id: string) => void;
}

const DrawBackground = ({ object }: DrawObjectProps) => {
  const [bg, setBg] = useRecoilState(bgState);
  const [items, setItems] = useRecoilState(itemState);

  const [bgImage] =
    bg === '수야' ? useImage('/suya.png') : useImage('/suho.png');

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
      {items.map(i => (
        <DrawItem key={i.item} url={i.itemUrl} id="background" />
      ))}
    </>
  );
};

export default DrawBackground;
