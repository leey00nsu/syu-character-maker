import { useCanvasStore } from '@/store/canvas';

import CanvasObject from './CanvasObjectItem';
import { BackgroundObject } from './objects';

interface CanvasObjectListProps {
  objectSelectHandler: (id: string) => void;
}

const CanvasObjectList = ({ objectSelectHandler }: CanvasObjectListProps) => {
  const canvasObjects = useCanvasStore(state => state.canvasObjects);

  return (
    <>
      <BackgroundObject />
      {canvasObjects.map(object => (
        <CanvasObject
          key={object.id}
          object={object}
          objectSelectHandler={objectSelectHandler}
        />
      ))}
    </>
  );
};

export default CanvasObjectList;
