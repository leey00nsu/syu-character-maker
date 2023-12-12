import { DrawingObject } from '@/store/store';
import DrawCharacter from './DrawChracter';
import DrawImage from './DrawImage';
import DrawLine from './DrawLine';

interface DrawDrawingObjectsProps {
  drawingObjects: DrawingObject[];
  objectSelectHandler: (id: string) => void;
}

const DrawDrawingObjects = ({
  drawingObjects,
  objectSelectHandler,
}: DrawDrawingObjectsProps) => {
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

export default DrawDrawingObjects;
