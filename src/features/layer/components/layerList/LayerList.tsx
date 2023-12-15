import { drawingObjectState } from '@/store/canvasStore';
import { useRecoilState } from 'recoil';
import LayerItem from './LayerItem';

const LayerList = () => {
  const [drawingObjects, setDrawingObjects] =
    useRecoilState(drawingObjectState);

  const reversedDrawingObjects = [...drawingObjects].reverse();

  return (
    <ul className="menu menu-vertical h-full w-full flex-nowrap gap-1 overflow-y-auto p-2 pb-10">
      {reversedDrawingObjects.map((object, index) => (
        <LayerItem key={object.id} object={object} index={index} />
      ))}
    </ul>
  );
};

export default LayerList;
