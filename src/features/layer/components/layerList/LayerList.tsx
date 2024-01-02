import { useCanvasStore } from '@/store/canvasStore';

import LayerItem from './LayerItem';

const LayerList = () => {
  const canvasObjects = useCanvasStore(state => state.canvasObjects);

  const reversedCanvasObjects = [...canvasObjects].reverse();

  const listable = reversedCanvasObjects.filter(
    object => object.name !== 'eraser',
  );

  return (
    <ul className="menu menu-vertical w-full flex-nowrap gap-1 p-2 py-4">
      {listable.map((object, index) => (
        <LayerItem key={index} object={object} index={index} />
      ))}
    </ul>
  );
};

export default LayerList;
