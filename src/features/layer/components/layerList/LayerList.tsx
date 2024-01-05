import { useCanvasStore } from '@/store/canvas';

import LayerItem from './LayerItem';

const LayerList = () => {
  const canvasObjects = useCanvasStore(state => state.canvasObjects);

  // 레이어 순서를 역순으로 변경
  const reversedCanvasObjects = [...canvasObjects].reverse();

  return (
    <ul className="menu menu-vertical w-full flex-nowrap gap-1 p-2 py-4">
      {reversedCanvasObjects.map((object, index) => (
        <LayerItem key={index} object={object} index={index} />
      ))}
    </ul>
  );
};

export default LayerList;
