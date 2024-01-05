import { useCanvasStore } from '@/store/canvas';

import CanvasObject from './CanvasObjectItem';
import { BackgroundObject } from './objects';


const CanvasObjectList = () => {
  const canvasObjects = useCanvasStore(state => state.canvasObjects);

  return (
    <>
      <BackgroundObject />
      {canvasObjects.map(object => (
        <CanvasObject
          key={object.id}
          object={object}
        />
      ))}
    </>
  );
};

export default CanvasObjectList;
