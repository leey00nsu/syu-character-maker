import { drawingObjectState } from '@/store/store';
import { useRecoilState } from 'recoil';
import Layer from './Layer';

const LayerList = () => {
  const [drawingObjects, setDrawingObjects] =
    useRecoilState(drawingObjectState);

  const reversedDrawingObjects = [...drawingObjects].reverse();

  return (
    <ul className="menu w-full gap-1 ">
      {reversedDrawingObjects.map((object, index) => (
        <Layer key={object.id} object={object} index={index} />
      ))}
    </ul>
  );
};

export default LayerList;
