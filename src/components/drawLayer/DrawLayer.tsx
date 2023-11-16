import { FaAngleDown, FaAngleUp } from "react-icons/fa";

import { useRecoilState } from "recoil";
import {
  drawingObjectState,
  menuState,
  modeState,
  selectedIdState,
} from "../../store/store";

const drawLayer = () => {
  const [menu, setMenu] = useRecoilState(menuState);
  const [mode, setMode] = useRecoilState(modeState);
  const [selectedId, setSelectedId] = useRecoilState(selectedIdState);
  const [drawingObjects, setDrawingObjects] =
    useRecoilState(drawingObjectState);

  const clickLayerHandler = (selectedId: string) => {
    if (menu !== "저장") {
      setSelectedId([selectedId]);
      setMode("move");
    }
  };

  const layerUpHandler = (index: number) => {
    if (index !== 0) {
      const new_objects = [...drawingObjects];
      const temp = new_objects[index - 1];
      new_objects[index - 1] = new_objects[index];
      new_objects[index] = temp;
      setDrawingObjects([...new_objects]);
    }
  };

  const layerDownHandler = (index: number) => {
    if (index !== drawingObjects.length - 1) {
      const new_objects = [...drawingObjects];
      const temp = new_objects[index + 1];
      new_objects[index + 1] = new_objects[index];
      new_objects[index] = temp;
      setDrawingObjects([...new_objects]);
    }
  };

  return (
    <section className="mockup-window border border-base-300  w-[200px] h-[400px] bg-white shrink-0">
      <p className=" absolute top-[14px] left-2/4">레이어</p>

      <div className="w-full h-full pb-10 overflow-y-auto ">
        <ul className="w-full gap-1 menu ">
          {drawingObjects.map((object, index) => (
            <li
              className={
                selectedId.includes(object.id)
                  ? "flex flex-row justify-between w-full btn-active rounded-lg  "
                  : "flex flex-row w-full justify-between"
              }
              onClick={() => clickLayerHandler(object.id)}
              key={object.id}
            >
              <p className="w-full">{object.id}</p>

              {selectedId.includes(object.id) && (
                <>
                  <div
                    onClick={() => layerUpHandler(index)}
                    className="absolute flex justify-center items-center right-8 h-full w-1"
                  >
                    <FaAngleUp className=" shrink-0 " size={15} />
                  </div>
                  <div
                    onClick={() => layerDownHandler(index)}
                    className="absolute flex justify-center items-center right-0 h-full w-1"
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
