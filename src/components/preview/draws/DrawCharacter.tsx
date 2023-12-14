import { DrawingObject, characterState, itemState } from '@/store/store';
import { Image } from 'react-konva';
import { useRecoilState } from 'recoil';
import useImage from 'use-image';
import DrawItem from './DrawItem';

interface DrawObjectProps {
  object: DrawingObject;
  objectSelectHandler: (id: string) => void;
}

const DrawCharacter = ({ object }: DrawObjectProps) => {
  const [character, setCharacter] = useRecoilState(characterState);
  const [items, setItems] = useRecoilState(itemState);

  const [characterImage] =
    character === '수야' ? useImage('/suya.png') : useImage('/suho.png');

  return (
    <>
      <Image
        x={50}
        y={50}
        image={characterImage}
        id="character"
        opacity={1}
        name="charactor"
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

export default DrawCharacter;
