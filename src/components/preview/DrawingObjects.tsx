import { drawingObjectState } from '@/store/store';
import { useRecoilState } from 'recoil';
import { DrawCharacter, DrawImage, DrawLine } from './draws';

interface DrawingObjectsProps {
  objectSelectHandler: (id: string) => void;
}

const DrawingObjects = ({ objectSelectHandler }: DrawingObjectsProps) => {
  const [drawingObjects] = useRecoilState(drawingObjectState);

  return (
    <>
      {drawingObjects.map(object => {
        if (object.type === 'background') {
          return (
            <DrawCharacter
              key={object.id}
              object={object}
              objectSelectHandler={objectSelectHandler}
            />
          );
        }
        if (object.type === 'line') {
          return (
            <DrawLine
              key={object.id}
              object={object}
              objectSelectHandler={objectSelectHandler}
            />
          );
        }
        if (object.type === 'image') {
          return (
            <DrawImage
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

export default DrawingObjects;
