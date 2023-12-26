import { useCanvasStore } from '@/store/canvasStore';

import LayerItem from './LayerItem';

const LayerList = () => {
  const canvasObjects = useCanvasStore(state => state.canvasObjects);

  const reversedCanvasObjects = [...canvasObjects].reverse();

  return (
    <ul className="menu menu-vertical max-h-full h-full w-full flex-nowrap gap-1 overflow-y-auto p-2 pb-10">
      {reversedCanvasObjects.map((object, index) => (
        <LayerItem key={object.id} object={object} index={index} />
      ))}
    </ul>
  );
};

export default LayerList;
