import { DrawingObject, characterState, itemState } from '@/store/store';
import { Image } from 'react-konva';
import { useRecoilState } from 'recoil';
import useImage from 'use-image';
import { DEFAULT_WIDTH } from '../constants/canvas';
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
        x={50} // 이미지를 중앙에 위치시키기 위해 50px을 더해줌
        y={50}
        image={characterImage}
        id="character"
        opacity={1}
        name="charactor"
        key="charactor"
        onDragEnd={() => {}}
        onDragStart={() => {}}
        draggable={false}
        onSelect={() => {}}
        width={DEFAULT_WIDTH - 100}
        height={DEFAULT_WIDTH - 100}
      />
      {items.map(i => (
        <DrawItem key={i.item} url={i.itemUrl} id="background" />
      ))}
    </>
  );
};

export default DrawCharacter;
