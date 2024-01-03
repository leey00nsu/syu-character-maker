import { Layer } from 'react-konva';

import { useCanvasStore } from '@/store/canvasStore';

import CanvasObject from '../canvasObject/CanvasObject';
import { BackgroundObject } from '../canvasObject/objects';

interface CanvasLayersProps {
  objectSelectHandler: (id: string) => void;
}

const CanvasLayers = ({ objectSelectHandler }: CanvasLayersProps) => {
  const canvasObjects = useCanvasStore(state => state.canvasObjects);

  return (
    <>
      <Layer>
        <BackgroundObject />
      </Layer>

      <Layer>
        {canvasObjects.map(object => (
          <CanvasObject
            key={object.id}
            object={object}
            objectSelectHandler={objectSelectHandler}
          />
        ))}
      </Layer>
    </>
  );
};

export default CanvasLayers;
