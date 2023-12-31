import { useCanvasStore } from '@/store/canvasStore';

import CanvasObject from './CanvasObject';
import { BackgroundObject } from './objects';

interface CanvasObjectsProps {
  objectSelectHandler: (id: string) => void;
}

const CanvasObjects = ({ objectSelectHandler }: CanvasObjectsProps) => {
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

export default CanvasObjects;
