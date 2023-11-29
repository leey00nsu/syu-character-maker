import { DrawingObject } from '../../store/store';
import DrawBackground from './DrawBackground';
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
  // drawingObject의 z-index를 인덱스 순으로 정렬
  const zIndexedObjects = drawingObjects.map((object, index) => {
    {
      return { ...object, z: index + 1 };
    }
  });

  return (
    <>
      {zIndexedObjects.map(object => {
        if (object.type === 'background') {
          return (
            <DrawBackground
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
