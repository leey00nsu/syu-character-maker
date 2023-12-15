import { drawingObjectState } from '@/store/canvasStore';
import { useRecoilState } from 'recoil';
import {
  BackgroundObject,
  CharacterObject,
  ImageObject,
  LineObject,
} from './objects';

interface DrawObjectsProps {
  objectSelectHandler: (id: string) => void;
}

const DrawObjects = ({ objectSelectHandler }: DrawObjectsProps) => {
  const [drawingObjects] = useRecoilState(drawingObjectState);

  return (
    <>
      <BackgroundObject />
      {drawingObjects.map(object => {
        if (object.type === 'background') {
          return <CharacterObject key={object.id} />;
        }
        if (object.type === 'line') {
          return (
            <LineObject
              key={object.id}
              object={object}
              objectSelectHandler={objectSelectHandler}
            />
          );
        }
        if (object.type === 'image') {
          return (
            <ImageObject
              key={object.id}
              object={object}
              objectSelectHandler={objectSelectHandler}
            />
          );
        }
      })}
    </>
  );
};

export default DrawObjects;
