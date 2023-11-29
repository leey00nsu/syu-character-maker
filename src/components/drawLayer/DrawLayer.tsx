import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

import { useRecoilState } from 'recoil';
import {
  drawingObjectState,
  menuState,
  modeState,
  selectedIdState,
} from '../../store/store';

const drawLayer = () => {
  const [menu, setMenu] = useRecoilState(menuState);
  const [mode, setMode] = useRecoilState(modeState);
  const [selectedId, setSelectedId] = useRecoilState(selectedIdState);
  const [drawingObjects, setDrawingObjects] =
    useRecoilState(drawingObjectState);

  const clickLayerHandler = (selectedId: string) => {
    if (menu !== '저장') {
      setSelectedId([selectedId]);
      setMode('move');
    }
  };

  const layerUpHandler = (index: number) => {
    if (index !== 0) {
      const newObjects = [...drawingObjects];
      const temp = newObjects[index - 1];
      newObjects[index - 1] = newObjects[index];
      newObjects[index] = temp;
      setDrawingObjects([...newObjects]);
    }
  };

  const layerDownHandler = (index: number) => {
    if (index !== drawingObjects.length - 1) {
      const newObjects = [...drawingObjects];
      const temp = newObjects[index + 1];
      newObjects[index + 1] = newObjects[index];
      newObjects[index] = temp;
      setDrawingObjects([...newObjects]);
    }
  };

  return (
    <section className="xl:max-h-1/3 mockup-window h-[200px]  w-[360px] border  border-base-300 bg-white sm:w-[600px]  xl:h-1/3 ">
      <p className=" absolute left-2/4 top-[14px]">레이어</p>

      <div className="h-full w-full overflow-y-auto pb-10 ">
        <ul className="menu w-full gap-1 ">
          {drawingObjects.map((object, index) => (
            <li
              className={
                selectedId.includes(object.id)
                  ? 'btn-active flex w-full flex-row justify-between rounded-lg  '
                  : 'flex w-full flex-row justify-between'
              }
              onClick={() => clickLayerHandler(object.id)}
              key={object.id}
            >
              <p className="w-full">{object.id}</p>

              {selectedId.includes(object.id) && (
                <>
                  <div
                    onClick={() => layerUpHandler(index)}
                    className="absolute right-8 flex h-full w-1 items-center justify-center"
                  >
                    <FaAngleUp className=" shrink-0 " size={15} />
                  </div>
                  <div
                    onClick={() => layerDownHandler(index)}
                    className="absolute right-0 flex h-full w-1 items-center justify-center"
                  >
                    <FaAngleDown className=" shrink-0 " size={15} />
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default drawLayer;
