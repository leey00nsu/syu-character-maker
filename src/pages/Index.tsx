import Header from "../components/ui/Header";
import Preview from "../components/Preview";
import Menu from "../components/ui/Menu";
import { objectState, selectedIdState, modeState } from "../store/store";
import { useRecoilState } from "recoil";
import { useRef } from "react";

import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const Index = () => {
  const [mode, setMode] = useRecoilState(modeState);
  const [selectedId, setSelectedId] = useRecoilState(selectedIdState);
  const [objects, setObjects] = useRecoilState(objectState);

  const clickLayerHandler = (selectedId: string) => {
    setSelectedId([selectedId]);
    setMode("move");
  };

  const layerUpHandler = (index: number) => {
    if (index !== 0) {
      const new_objects = [...objects];
      const temp = new_objects[index - 1];
      new_objects[index - 1] = new_objects[index];
      new_objects[index] = temp;
      setObjects([...new_objects]);
    }
  };

  const layerDownHandler = (index: number) => {
    if (index !== objects.length - 1) {
      const new_objects = [...objects];
      const temp = new_objects[index + 1];
      new_objects[index + 1] = new_objects[index];
      new_objects[index] = temp;
      setObjects([...new_objects]);
    }
  };

  const stageRef = useRef<any>(null);
  return (
    <div className="flex flex-col w-screen h-screen ">
      <Header />
      <div className="flex w-full">
        <div className="flex flex-col items-center w-2/3 h-full max-w-4xl gap-2">
          <Preview stageRef={stageRef} />
          <Menu stageRef={stageRef} />
        </div>
        <div className="mockup-window border border-base-300  w-[200px] h-[400px] bg-white shrink-0">
          <p className=" absolute top-[14px] left-2/4">레이어</p>

          <div className="w-full h-full pb-10 overflow-y-auto ">
            <ul className="w-full gap-1 menu ">
              {objects.map((object, index) => (
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
        </div>
      </div>
    </div>
  );
};

export default Index;
