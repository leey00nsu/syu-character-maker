import { Image } from 'react-konva';
import useImage from 'use-image';

import { DrawingObject } from '@/store/canvasStore';

import { DEFAULT_WIDTH } from '../../../constants/canvas';

interface CharacterObjectProps {
  object: DrawingObject;
}

const CharacterObject = ({ object }: CharacterObjectProps) => {
  const [image] = useImage(object.url || '');

  return (
    <Image
      x={50} // 이미지를 중앙에 위치시키기 위해 50px을 더해줌
      y={50}
      image={image}
      id={object.id}
      opacity={1}
      name={object.name}
      key={object.id}
      onDragEnd={() => {}}
      onDragStart={() => {}}
      draggable={false}
      onSelect={() => {}}
      width={DEFAULT_WIDTH - 100}
      height={DEFAULT_WIDTH - 100}
    />
  );
};

export default CharacterObject;
